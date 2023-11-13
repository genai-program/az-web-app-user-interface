import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

export default function TextEditor({ setContents }) {
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