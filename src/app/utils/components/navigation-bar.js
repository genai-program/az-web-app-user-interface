import Link from "next/link";

export default function NavigationBar() {
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