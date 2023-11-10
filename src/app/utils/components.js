import React from "react";
import dynamic from "next/dynamic";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Link from "next/link";

export function TopHeader() {
  return (
    <topHeader>
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
    </topHeader>
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
