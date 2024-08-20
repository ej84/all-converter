"use client";
import React, { useState } from "react";
import Image from "next/image";

const Page = () => {
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

    try {
      const res = await fetch("/api/convert-image/route", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to convert file.");
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
      <div>
        <h1 className="text-4xl">Convert Image</h1>
        <div>
          <form onSubmit={handleSubmit} className="p-10">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="p-10"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Convert
            </button>
          </form>

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
