"use client";
import React, { useState, useEffect } from "react";
import { companyList, absContainerList, absAccountName } from "../utils/config";
import * as Components from "../utils/components";

export default function DocumentUploadPage() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [files, setFiles] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    console.log("Selected company has been set to:", selectedCompany);
  }, [selectedCompany]);

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleFileChange = (event, documentType) => {
    const newFile = event.target.files[0];
    setFiles((prevFiles) => ({
      ...prevFiles,
      [documentType]: newFile,
    }));

    // Update the corresponding file-chosen span
    const fileChosenSpan = document.getElementById(
      "file-chosen-" + documentType
    );
    fileChosenSpan.textContent = newFile ? newFile.name : "No file chosen";
  };

  // Call your API to get the SAS token and URL
  const getBlobSasToken = async (containerName) => {
    const response = await fetch("/api/abs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ containerName }),
    });

    if (!response.ok) {
      throw new Error("Failed to get SAS token");
    }

    const data = await response.json();
    return data.sasToken;
  };

  async function uploadFileToBlobStorage (documentType, file) {
    const containerName = absContainerList[documentType];
    const blobName = `${selectedCompany}__________${file.name}`;
    const sasToken = await getBlobSasToken(containerName);
    const sasUrl = `https://${absAccountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;

    try {
      const response = await fetch(sasUrl, {
        method: "PUT",
        headers: {
          "x-ms-blob-content-type": "application/octet-stream",
          "x-ms-blob-type": "BlockBlob",
          "x-ms-version": "2023-11-03",
          "x-ms-date": new Date().toUTCString(),
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error("Failed to upload to blob storage");
      }

      console.log("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

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

  const allDocumentsSelected = Object.keys(absContainerList).every(
    (type) => files[type]
  );

  return (
    <body>
      <Components.TopHeader />

      <modaldimmer
        id="modalDimmer"
        style={{
          display: "block",
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

          <select value={selectedCompany} onChange={handleCompanyChange}>
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
            /* disabled={!allDocumentsSelected || isUploading} */
            onClick={handleSubmit}
            style={{}}
          >
            Confirm
          </button>
          <button
            onClick={() => {
              setFiles({});
              window.location.href = "/";
            }}
          >
            Cancel
          </button>
        </div>
      </modaldimmer>
    </body>
  );
}
