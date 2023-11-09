"use client";
import React, { useState, useEffect } from "react";
import { companyList, absContainerList, absAccountName } from "../utils/config";

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
    setFiles({
      ...files,
      [documentType]: event.target.files[0],
    });
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

  const uploadFileToBlobStorage = async (documentType, file) => {
    const containerName = absContainerList[documentType];
    const blobName = `${selectedCompany}__________${file.name}`;
    const sasToken = await getBlobSasToken(containerName);
    //const sasToken = '?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-11-17T15:54:02Z&st=2023-11-07T07:54:02Z&spr=https&sig=%2BJItwlV0VgwN9ZKZFgoz3B%2FVlGI0f%2F9hj65D1yXS4C4%3D'
    const sasUrl = `https://${absAccountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;
    //const sasUrl = `https://cawudev85bb.blob.core.windows.net/${blobName}?sp=racwd&st=2023-11-07T07:49:45Z&se=2023-11-16T15:49:45Z&spr=https&sv=2022-11-02&sr=c&sig=7UTLuMDkbRbtUBL%2F0gFkrcIFH%2FswUmkZP5Itnvpv9bc%3D`;

    console.log("SAS URL:", sasUrl);

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

  const handleSubmit = async () => {
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
  };

  const allDocumentsSelected = Object.keys(absContainerList).every(
    (type) => files[type]
  );

  return (
    <body>
      <header>
        <h1 class="gradient-text">CA GenAI</h1>
      </header>

      <content
        className="content"
        style={{
          display: "block",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          padding: "15px",
          margin: "15px",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            fontSize: "25px",
            fontWeight: "bold",
            textAlign: "center",
            padding: "15px",
            margin: "15px",
          }}
        >
          Upload Documents for {selectedCompany}
        </div>
        <select value={selectedCompany} onChange={handleCompanyChange}>
          {companyList.map((company, idx) => (
            <option key={idx} value={company}>
              {company}
            </option>
          ))}
        </select>

        {Object.keys(absContainerList).map((documentType, idx) => (
          <section key={idx}>
            <h2>{documentType}</h2>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, documentType)}
            />
          </section>
        ))}

        <button
          disabled={!allDocumentsSelected || isUploading}
          onClick={handleSubmit}
        >
          Confirm
        </button>
        <button onClick={() => setFiles({})}>Cancel</button>
      </content>
    </body>
  );
}
