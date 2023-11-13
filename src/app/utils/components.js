import React from "react";
import dynamic from "next/dynamic";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Link from "next/link";
import { companyList, absContainerList } from "./config";
import { useState } from "react";

export function TopHeader() {
  return (
    <div
      className="gradient-text"
      style={{
        paddingTop: "15px",
        paddingLeft: "20px",
        paddingBottom: "15px",
        borderBottom: "1px solid #d1d1d1",
        background:
          "linear-gradient(to right, #2b59ff, #68cff7, #68cff7, #68cff7, #68cff7)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: "medium",
        fontWeight: 800,
      }}
    >
      <Link href="/">CA GenAI</Link>
    </div>
  );
}

/* const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
}); */

export function SunEditorComponent({ setContents }) {
  return (
    <div style={{ fontFamily: '"Inter", sans-serif' }}>
      <SunEditor
        placeholder="Please type here..."
        height="500px"
        width="100%"
        autoFocus={true}
        setDefaultStyle="font-family: Latin, sans-serif; font-size: 16px;"
        setContents={setContents}
      />
    </div>
  );
}

export function OldUploadModal({ modalDisplay, closeModal }) {
  async function handleSubmit() {
    if (!allDocumentsSelected || isUploading) {
      alert("Please select documents.");
    }

    console.log("Submit button clicked");
    setIsUploading(true);
    try {
      for (const [documentType, file] of Object.entries(files)) {
        await uploadFileToBlobStorage(documentType, file);
      }
      console.log("All files uploaded successfully");
    } catch (error) {
      console.error("An error occurred during the upload:", error);
    }
    setIsUploading(false);
  }

  return (
    <div>
      <uploadmodal
        id="modalDimmer"
        style={{
          display: modalDisplay,
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          zIndex: "1",
          paddingTop: "100px",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          overflow: "auto",
          backgroundColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        }}
      >
        <div
          className="content"
          style={{
            height: "750px",
            backgroundColor: "#fefefe",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "15px",
            margin: "15px",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          <div
            style={{
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              padding: "10px",
              margin: "10px",
            }}
          >
            Select a company to upload documents
          </div>

          <select style={{ margin: "0 50px" }}>
            <option value="" selected disabled hidden>
              select a company
            </option>
            {companyList.map((company, idx) => (
              <option key={idx} value={company}>
                {company}
              </option>
            ))}
          </select>

          {Object.keys(absContainerList).map((documentType, idx) => (
            <section
              key={idx}
              style={{
                fontSize: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "10px",
              }}
            >
              <h2 style={{ margin: "10px", textAlign: "left" }}>
                {documentType}
              </h2>

              <input
                id={"file-upload-" + documentType}
                style={{
                  display: "none",
                  margin: "10px",
                  textAlign: "right",
                }}
                type="file"
                onChange={(e) => handleFileChange(e, documentType)}
              />
              <div>
                <div>
                  <label
                    for={"file-upload-" + documentType}
                    style={{
                      border: "1px solid #ccc",
                      display: "block",
                      padding: "6px 12px",
                      margin: "10px",
                      cursor: "pointer",
                      textAlign: "center",
                      justifyContent: "right",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100px",
                    }}
                  >
                    Choose File
                  </label>
                </div>
                <div>
                  <span
                    id={"file-chosen-" + documentType}
                    style={{
                      display: "block",
                      textAlign: "right",
                      alignItems: "right",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100px",
                    }}
                  >
                    No file chosen
                  </span>
                </div>
              </div>
            </section>
          ))}

          <button
            className="upload-button"
            onClick={handleSubmit}
            style={{
              marginRight: "1%",
            }}
          >
            Confirm
          </button>
          <button
            className="upload-button"
            onClick={closeModal}
            style={{
              marginLeft: "1%",
            }}
          >
            Cancel
          </button>
        </div>
      </uploadmodal>
    </div>
  );
}

export function UploadModal({ modalDisplay, closeModal }) {
  const [droppedFiles, setDroppedFiles] = useState([]);

  const allowedExtensions = [
    "txt",
    "pdf",
    "xls",
    "xlsx",
    "doc",
    "docx",
    "png",
    "jpg",
  ];

  function handleFileSelect(e) {
    const selectedFiles = Array.from(e.target.files)
      .filter((file) =>
        allowedExtensions.includes(file.name.split(".").pop().toLowerCase())
      )
      .map((file) => ({ file, type: "" }));
    setDroppedFiles((prevFiles) => {
      const newFiles = [...prevFiles, ...selectedFiles];
      console.log("Selected files:", newFiles); // Debugging line
      return newFiles;
    });
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const filesFromDrop = Array.from(e.dataTransfer.files)
      .filter((file) =>
        allowedExtensions.includes(file.name.split(".").pop().toLowerCase())
      )
      .map((file) => ({ file, type: "" }));
    setDroppedFiles((prevFiles) => {
      const newFiles = [...prevFiles, ...filesFromDrop];
      console.log("Dropped files:", newFiles); // Debugging line
      return newFiles;
    });
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleFileChange(e, index) {
    const updatedFile = e.target.files[0];
    setDroppedFiles((prevFiles) =>
      prevFiles.map((file, idx) =>
        idx === index ? { ...file, file: updatedFile } : file
      )
    );
  }

  function removeFile(index) {
    setDroppedFiles((prevFiles) => prevFiles.filter((_, idx) => idx !== index));
  }

  async function handleSubmit() {
    if (!allDocumentsSelected || isUploading) {
      alert("Please select documents.");
    }

    console.log("Submit button clicked");
    setIsUploading(true);
    try {
      for (const [documentType, file] of Object.entries(files)) {
        await uploadFileToBlobStorage(documentType, file);
      }
      console.log("All files uploaded successfully");
    } catch (error) {
      console.error("An error occurred during the upload:", error);
    }
    setIsUploading(false);
  }

  return (
    <div>
      <uploadmodal
        id="modalDimmer"
        style={{
          display: modalDisplay,
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          zIndex: "1",
          paddingTop: "100px",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          overflow: "auto",
          backgroundColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        }}
      >
        <div
          className="content"
          style={{
            height: "750px",
            backgroundColor: "#fefefe",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "15px",
            margin: "15px",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          <div
            style={{
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              padding: "10px",
              margin: "10px",
            }}
          >
            Select a company to upload documents
          </div>

          <select style={{ margin: "0 50px" }}>
            <option value="" selected disabled hidden>
              select a company
            </option>
            {companyList.map((company, idx) => (
              <option key={idx} value={company}>
                {company}
              </option>
            ))}
          </select>

          {/* drag and drop section */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
              border: "2px dashed grey",
              padding: "20px",
              margin: "5%",
              textAlign: "center",
              borderRadius: "12px",
            }}
          >
            Drag and drop documents here or&nbsp;
            <button
              onClick={() => document.getElementById("fileInput").click()}
            >
              Upload Document
            </button>
            <input
              id="fileInput"
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
          </div>

          {droppedFiles.map((fileEntry, index) => (
            <section
              key={index}
              style={{
                fontSize: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "10px",
              }}
            >

              <h2
                style={{
                  margin: "10px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "150px"
                }}
              >
                {fileEntry.file.name}
              </h2>

              <select
                style={{ margin: "10px", alignItems: "right", width: "300px " }}
                onChange={(e) =>
                  setDroppedFiles((prevFiles) =>
                    prevFiles.map((file, idx) =>
                      idx === index ? { ...file, type: e.target.value } : file
                    )
                  )
                }
              >
                <option value="">Select Document Type</option>
                {Object.keys(absContainerList).map((docType, idx) => (
                  <option key={idx} value={docType}>
                    {docType}
                  </option>
                ))}
              </select>
{/*               <input
                id={"file-upload-" + index}
                style={{ display: "none" }}
                type="file"
                onChange={(e) => handleFileChange(e, index)}
              />
              <label
                htmlFor={"file-upload-" + index}
                style={{
                  border: "1px solid #ccc",
                  display: "inline-block",
                  padding: "6px 12px",
                  cursor: "pointer",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100px",
                }}
              >
                Change File
              </label> */}
              <button
                onClick={() => removeFile(index)}
                style={{ margin: "10px" }}
              >
                X
              </button>
            </section>
          ))}

          <button
            className="upload-button"
            onClick={handleSubmit}
            style={{
              marginRight: "1%",
            }}
          >
            Confirm
          </button>
          <button
            className="upload-button"
            onClick={closeModal}
            style={{
              marginLeft: "1%",
            }}
          >
            Cancel
          </button>
        </div>
      </uploadmodal>
    </div>
  );
}
