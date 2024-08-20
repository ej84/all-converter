"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
//import CloudConvert from "cloudconvert";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-normal p-24">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold mb-4">All You Can Convert</h1>
        </div>
        <div className="grid grid-cols-3 justify-center p-24 space-x-5">
          <button className="bg-blue-500 text-white px-2 py-2 rounded font-bold">
            <Link href="/convert-image">Convert Image</Link>
          </button>

          <button className="bg-blue-500 text-white px-2 py-2 rounded font-bold">
            <Link href="/convert-video">Convert Video</Link>
          </button>

          <button className="bg-blue-500 text-white rounded font-bold">
            <Link href="/convert-document">Convert Document</Link>
          </button>
        </div>
      </div>
    </main>
  );
}
