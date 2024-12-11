"use client";
import React, { useState } from "react";
import Image from "next/image";
//import FileUploadButton from "../components/FileUploadButton";

const Page = () => {
  const [file, setFile] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [format, setFormat] = useState("jpeg");
  const [newFileSize, setNewFileSize] = useState("800x600");
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
    formData.append("width", newFileSize.split("x")[0]);
    formData.append("height", newFileSize.split("x")[1]);

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
        setNewFile(data.filePath);
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
              className="p-10 m-10 border-2 border-white rounded font-bold text-lg"
              placeholder="Select or drag any file from your device"
            />

            {file && (
              <>
                <div className="flex justify-center space-x-3">
                  <select
                    value={format}
                    onChange={handleFormatChange}
                    className="min-w-10 px-5 py-3 bg-white text-fuchsia-900 font-bold rounded"
                  >
                    <option value="jpeg" className="font-bold">
                      JPG
                    </option>
                    <option value="png" className="font-bold">
                      PNG
                    </option>
                    <option value="webp" className="font-bold">
                      WEBP
                    </option>
                    <option value="gif" className="font-bold">
                      GIF
                    </option>
                  </select>
                  <select
                    value={newFileSize}
                    onChange={(e) => {
                      setNewFileSize(e.target.value);
                    }}
                    className="min-w-10 px-4 py-3 bg-white text-violet-900 font-bold rounded"
                  >
                    <option value="1920x1080">1920x1080 (Full HD)</option>
                    <option value="1280x720">1280x720 (HD)</option>
                    <option value="800x600">800x600 (Standard)</option>
                  </select>
                </div>
                <div className="flex justify-center p-24 m-8">
                  <button
                    type="submit"
                    className="px-20 py-10 bg-white text-indigo-700 rounded"
                  >
                    <p className="text-3xl font-bold">Convert File</p>
                  </button>
                </div>
              </>
            )}
          </form>

          {downloadURL && (
            <p>
              Download URL: <a href={downloadURL}>{downloadURL}</a>
            </p>
          )}

          {message && <p className="mb-4">{message}</p>}

          {newFile ? (
            <div>
              <h2 className="text-xl font-semibold">Converted Image:</h2>
              {/*<Image
                src={newFile}
                alt="Converted"
                className="mt-4"
                width={500}
                height={500}
              />*/}
              <img src={`/api/download?file=${fileName}`} alt="Converted image" className="mt-5" width={400} height={400} />
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
