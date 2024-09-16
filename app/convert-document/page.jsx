"use client";

import React, { useState } from "react";

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleConvert = async () => {
    if (!file) return alert("Please select a DOCX file to convert");

    setIsConverting(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/convert-document/route", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "converted.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        alert("Error converting file");
      }
    } catch (error) {
      console.error("Error during conversion:", error);
      alert("An error occurred while converting the file.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div>
      <h1>Word to PDF Converter</h1>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      <button onClick={handleConvert} disabled={isConverting}>
        {isConverting ? "Converting..." : "Convert to PDF"}
      </button>
    </div>
  );
};

export default HomePage;
