"use client";
import React, { useState } from "react";
import Image from "next/image";

const Page = () => {
  const [file, setFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);
  const [format, setFormat] = useState("jpeg");
  const [downloadURL, setDownloadURL] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please upload a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    //formData.append("format", format);

    try {
      const res = await fetch(`/api/convert-image/route?format=${format}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to convert file.");
      }
      /*
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `converted.${formatSelect.value}`;
      document.body.appendChild(link);
      link.click();
      link.remove();*/

      const data = await res.json();
      setDownloadURL(data.url);

      if (res.ok) {
        setConvertedFile(data.filePath);
        setMessage(data.message);
        setDownloadURL(data.downloadUrl);
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-normal p-24">
      <div>
        <h1 className="text-4xl text-center font-bold">Convert Image</h1>
        <div>
          <form onSubmit={handleSubmit} className="p-10">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="p-10 m-10 border-2 border-white rounded"
            />
            <div className="flex justify-center space-x-3">
              <select
                value={format}
                onChange={handleFormatChange}
                className="min-w-10 p-3 bg-violet-500 rounded"
              >
                <option value="jpeg">JPG</option>
                <option value="png">PNG</option>
                <option value="webp">WEBP</option>
              </select>
              <select
                value={format}
                onChange={handleFormatChange}
                className="min-w-10 px-4 py-3 bg-violet-500 rounded"
              >
                <option value="jpeg">Size 1</option>
                <option value="png">Size 2</option>
                <option value="webp">Size 3</option>
              </select>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Convert
              </button>
            </div>
          </form>

          {downloadURL && (
            <p>
              Download URL: <a href={downloadURL}>{downloadURL}</a>
            </p>
          )}

          {message && <p className="mb-4">{message}</p>}

          {convertedFile ? (
            <div>
              <h2 className="text-xl font-semibold">Converted Image:</h2>
              <Image
                src={convertedFile}
                alt="Converted"
                className="mt-4"
                width={500}
                height={500}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
