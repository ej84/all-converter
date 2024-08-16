"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
//import CloudConvert from "cloudconvert";

export default function Home() {
  const [file, setFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please upload a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    let apiEndpoint = "/api/convert"; // 기본값: 이미지 변환

    if (file.type.startsWith("video/")) {
      apiEndpoint += "-video"; // 비디오 파일인 경우
    }

    try {
      const res = await fetch(apiEndpoint + "/route", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("파일 변환에 실패했습니다.");
      }

      const data = await res.json();

      if (res.ok) {
        setConvertedFile(data.filePath);
        setMessage(data.message);
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Image Converter</h1>

        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Convert to JPG
          </button>
        </form>

        {message && <p className="mb-4">{message}</p>}

        {convertedFile && (
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
        )}

        <div>
          <h1>Upload Video file to convert</h1>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} accept="video/*" />
            <button type="submit">Convert Video</button>
          </form>
        </div>
      </div>
    </main>
  );
}
