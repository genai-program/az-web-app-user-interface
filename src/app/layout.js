import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CA Write-up Copilot",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
      </head>

      <body className={inter.className}>{children}</body>

    </html>
  );
}
