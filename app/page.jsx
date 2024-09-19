"use client";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faFileVideo,
  faFileAudio,
  faFilePdf,
} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import Nav from "./components/Nav";
//import CloudConvert from "cloudconvert";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-normal p-32">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold mb-4">All You Can Convert</h1>
          </div>

          <div className="grid grid-cols-2 justify-center p-32">
            <Link href="/convert-image" className="btn1">
              <div className="flex items-center">
                <span className="pr-5">
                  <FontAwesomeIcon icon={faFileImage} size="3x" />
                </span>
                <div>
                  <p className="text-xl text-left">Image Converter</p>
                  <p className="text-base">
                    Convert your image file to any format you want.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/convert-video" className="btn1 ml-5">
              <div className="flex items-center">
                <span className="pr-5">
                  <FontAwesomeIcon icon={faFileVideo} size="3x" />
                </span>
                <div>
                  <p className="text-xl text-left">Convert Video</p>
                  <p className="text-base">(MP4, AVI, WAV and More)</p>
                </div>
              </div>
            </Link>

            <Link href="/convert-document" className="btn1 mt-5">
              <div className="flex items-center">
                <span className="pr-5">
                  <FontAwesomeIcon icon={faFilePdf} size="3x" />
                </span>
                <div>
                  <p className="text-xl text-left">Convert Document</p>
                  <p className="text-base">(PDF, DOCX, CSV and More)</p>
                </div>
              </div>
            </Link>
          </div>
          {/*<div className="flex justify-center">
          <div className="grid grid-cols-3 text-center">
            <div className="px-48 py-20 mr-5 my-5 outline outline-white">
              <p>box 1</p>
            </div>
            <div className="px-48 py-20 mr-5 my-5 outline outline-white">
              <p>box 2</p>
            </div>
            <div className="px-48 py-20 mr-5 my-5 outline outline-white">
              <p>box 3</p>
            </div>
            <div className="px-48 py-20 mr-5 my-5 outline outline-white">
              <p>box 4</p>
            </div>
            <div className="px-48 py-20 mr-5 my-5 outline outline-white">
              <p>box 5</p>
            </div>
            <div className="px-48 py-20 mr-5 my-5 outline outline-white">
              <p>box 6</p>
            </div>
          </div>
        </div>*/}
        </div>
      </main>
    </>
  );
}
