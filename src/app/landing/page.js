"use client";

import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import { companyList } from "../utils/config";
import { parse } from "url";

export default function Landing() {
  function redirectToNew() {
    const selectedCompany = document.getElementById("select").value;
    if (!selectedCompany) {
      alert("Please select a company.");
    } else {
      const queryString = "?companyName=" + encodeURIComponent(selectedCompany);
      window.location.href = "details" + queryString;
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
      <header>
        <h1 className="gradient-text">CA GenAI</h1>
      </header>
      <div className="welcome-container" style={{ fontWeight: "bold" }}>
        <h2 className="welcome-text">Welcome to </h2>
        <h2 className="welcome-text-grad"> CA Write-up Assistant</h2>
      </div>
      <main>
        <div className="description-container">
          <p className="description-top">
            <strong>Gen AI Enablement</strong> in CA write up process
          </p>
          <p className="description-body">
            <strong>
              Gen AI to empower RM team on CA write-up with focus on Credit
              Analysis process –
            </strong>{" "}
            by automating information collection, analysis, summarization, and
            write up the document
          </p>
        </div>
        <div className="step">
          <p>
            <strong>Step 1</strong>
            <br />- Select company -
          </p>
        </div>

        <div style={{ textAlign: "center" }}>
          <select id="select" className="select">
            <option value="" selected disabled hidden>
              select a company
            </option>

            {companyList.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>

          <div className="step">
            <p>
              <strong>Step 2</strong>
              <br />- Select scenario -
            </p>
          </div>
          <div>
            <button
              id="uploadDocuments"
              type="submit"
              href="/upload"
              onClick={redirectToNew}
              style={{ marginRight: "1%", width:"250px", height:"60px" }}
            >
              Upload documents
            </button>
            <button
              id="coPilot"
              type="submit"
              href="/coPilot"
              onClickCapture={redirectToReview}
              style={{ marginLeft: "1%", width:"250px", height:"60px" }}
            >
              CA Copilot
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
