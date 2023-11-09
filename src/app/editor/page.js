"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cognitiveSearch, initiateCognitiveSearch } from "../utils/function";
import * as Components from "../utils/components";
import "suneditor/dist/css/suneditor.min.css";

export default function Editor() {
  /* const [loadingText, setLoadingText] = useState("Loading data");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadingTextList = [
      "Loading data",
      "Analyzing documents",
      "Processing information",
      "Generating results",
    ];

    function updateTextAndAnimate() {
      setLoadingText(""); // Hide the text
      setTimeout(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % loadingTextList.length
        );
        setLoadingText(loadingTextList[currentIndex]); // Show the text
      }, 1000); // Wait for 1 second before changing text
    }

    updateTextAndAnimate();
    const interval = setInterval(updateTextAndAnimate, 2000);

    return () => clearInterval(interval);
  }, []);

  const urlParams = useSearchParams();
  const companyName = urlParams.get("companyName");

  async function pageLoading() {
    const companyNameElement = document.getElementById("companyName");
    const loadingModal = document.getElementById("loadingModal");
    loadingModal.style.display = "block";
    const textContainer = document.getElementById("content");

    if (companyName === null) {
      companyNameElement.textContent = "Company Name Co., Ltd.";
    } else {
      companyNameElement.textContent = companyName + " Co., Ltd.";
      console.log("Loading");
      const output = await initiateCognitiveSearch(companyName);

      if (output && output.length > 0) {
        try {
          const responsePlaceholder = document.getElementById(
            "response-placeholder"
          );
          output.forEach((entry) => {
            const sectionElement = document.createElement("h3");
            sectionElement.textContent = entry.section;
            responsePlaceholder.appendChild(sectionElement);
            const summaryElement = document.createElement("p");
            summaryElement.textContent = entry.summary;
            responsePlaceholder.appendChild(summaryElement);
            const lineBreak = document.createElement("br");
            responsePlaceholder.appendChild(lineBreak);
          });
        } catch (error) {
          console.error("Error = " + error);
        }
        loadingModal.style.display = "none"; // Disable the modal after loading finishes
        textContainer.style.display = "block";
      } else {
        console.log("didn't process");
      }
    }
  }

  useEffect(() => {
    pageLoading();
  }, []); */

  return (
    <body>
      <div id="loadingModal" class="modal">
        <div class="modal-content">
          <div class="loader"></div>
          <div class="loadingTextContainer">
            <div id="loadingText" class="loadingText">
              Loading data
            </div>
          </div>
        </div>
      </div>

      <Components.TopHeader />

      <div id="companyName" class="company-name-header">
        Company Name Co., Ltd.
      </div>

      <div style={{ marginLeft: "40px", marginRight: "40px", padding: "10px" }}>
        <Components.SunEditorComponent />
      </div>
      <div id="content" class="content" style={{ display: "none" }}>
        <div id="response-placeholder" class="response-placeholder"></div>
      </div>
    </body>
  );
}
