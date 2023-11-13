import { companyList, absContainerList } from "../config";
import { useState } from "react";
import React from "react";

export default function UploadModal({ modalDisplay, closeModal }) {
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
      console.log("Selected files:", newFiles);
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
      console.log("Dropped files:", newFiles);
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

    //validate company name
    //abs upload

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
            backgroundColor: "#ffffff",
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

          <select style={{ margin: "15px 50px" }}>
            <option value="" selected disabled hidden>
              select a company
            </option>
            {companyList.map((company, idx) => (
              <option key={idx} value={company}>
                {company}
              </option>
            ))}

            <option
              style={{ fontWeight: "bold", borderTop: "1px solid #d1d1d1" }}
            >
              Create a new company
            </option>
          </select>

          {/* drag and drop section */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
              border: "3px dashed",
              borderColor: "#E6E6E6",
              padding: "20px",
              margin: "15px 50px",
              textAlign: "center",
              borderRadius: "12px",
            }}
          >
            Drag and drop documents here or&nbsp;
            <button
              onClick={() => document.getElementById("fileInput").click()}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              CLICK HERE
            </button>
            <input
              id="fileInput"
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
          </div>

          <div style={{ padding: "1%" }}>
            {/* file details */}
            {droppedFiles.map((fileEntry, index) => (
              <section
                key={index}
                style={{
                  padding: "0 50px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "10px",
                  fontSize: "12px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                    flex: "1 1 auto",
                    marginRight: "20px",
                  }}
                >
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "300px",
                    }}
                  >
                    {fileEntry.file ? fileEntry.file.name : "No file selected"}
                  </div>
                  <div style={{ fontSize: "12px" }}>
                    {fileEntry.file
                      ? (fileEntry.file.size / 1024 / 1024).toFixed(2) + " MB"
                      : ""}
                  </div>
                </div>

                <select
                  style={{
                    marginRight: "10px",
                    width: "160px",
                    borderRadius: "12px",
                  }}
                >
                  <option value="">Select Document Type</option>
                  {Object.keys(absContainerList).map((docType, idx) => (
                    <option key={idx} value={docType}>
                      {docType}
                    </option>
                  ))}
                </select>
                <button onClick={() => removeFile(index)}>X</button>
              </section>
            ))}
          </div>

          {/* buttons */}
          <div style={{}}>
            <button
              className="upload-button"
              onClick={handleSubmit}
              style={{
                color: "#808080",
                marginRight: "1%",
              }}
            >
              Confirm
            </button>
            <button
              className="upload-button"
              onClick={closeModal}
              style={{
                color: "#808080",
                marginLeft: "1%",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </uploadmodal>
    </div>
  );
}
