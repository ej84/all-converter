"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
//import CloudConvert from "cloudconvert";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-normal p-32">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold mb-4">All You Can Convert</h1>
        </div>
        <div className="flex justify-center p-32 space-x-8">
          <button className="btn1">
            <Link href="/convert-image">Image</Link>
          </button>

          <button className="btn1">
            <Link href="/convert-video">Video</Link>
          </button>

          <button className="btn1">
            <Link href="/convert-document">Document</Link>
          </button>
        </div>
        <div className="flex justify-center">
          <h2 className="text-xl font-semibold">
            You can convert your files freely!
          </h2>
        </div>
      </div>
    </main>
  );
}
