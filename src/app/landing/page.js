"use client";

import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import { companyList } from "../utils/config";
import { parse } from "url";

import UploadModal from "../utils/components/upload-modal";
import NavigationBar from "../utils/components/navigation-bar";

export default function Landing() {
  const [modalDisplay, setModalDisplay] = useState("none");

  function handleUploadButton() {
    setModalDisplay("block");
  }

  function handleCloseUpload() {
    setModalDisplay("none");
  }

  function redirectToNew() {
    const selectedCompany = document.getElementById("select").value;
    if (!selectedCompany) {
      alert("Please select a company.");
    } else {
      const queryString = "?companyName=" + encodeURIComponent(selectedCompany);
      window.location.href = "upload" + queryString;
    }
  }

  function redirectToReview() {
    alert("This button is under development");
    return;
  }

  return (
    <div>
      <Head>
        <title>CA GenAI</title>
        <link rel="stylesheet" href="style.css" />
      </Head>

      <NavigationBar />
      <UploadModal modalDisplay={modalDisplay} closeModal={handleCloseUpload} />

      <div className="welcome-container">
        <h2
          style={{
            padding: "2.5%",
            fontWeight: "bold",
            fontSize: "45px",
            whiteSpace: "nowrap",
            background: "-webkit-linear-gradient(45deg, #2b59ff, #68cff7)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {" "}
          CA Write-up Copilot
        </h2>
      </div>
      <main>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            width: "700px",
            height: "125px",
            border: "1px solid #e4e4e4",
            boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.1)",
            paddingLeft: "3%",
            paddingRight: "3%",
          }}
        >
          <div
            style={{
              alignSelf: "center",
              margin: "auto",
              color: "#595959",
              textAlign: "left",
              fontSize: "small",
            }}
          >
            <p style={{ paddingBottom: "1%" }}>
              <strong>Generative AI Enablement</strong> in credit application
              write-up process
            </p>
            <p>
              Introducing CA Write-up Copilot: The companion application
              transforming how RM create credit applications with easy document
              uploads and automated generation of applications, RM can swiftly
              review and refine submissions.
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", padding: "5%" }}>
          <div className="step">
            <p>
              <strong>- Select operation -</strong>
            </p>
          </div>

          <div>
            <button
              id="uploadDocuments"
              type="submit"
              href="/upload"
              onClick={handleUploadButton}
              className="landing-button"
              style={{
                marginRight: "1%",
              }}
            >
              Upload documents
            </button>
            <button
              id="coPilot"
              type="submit"
              href="/coPilot"
              onClickCapture={redirectToReview}
              className="landing-button"
              style={{
                marginLeft: "1%",
              }}
            >
              CA Copilot
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
