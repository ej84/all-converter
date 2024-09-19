import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="grid grid-rows-3 bg-white text-indigo-800 text-center font-bold w-full">
      <Link href="/convert-image">Convert Image</Link>
      <Link href="/convert-video">Convert Video</Link>
      <Link href="/convert-document">Convert Document</Link>

      <Link href="/">Video to Audio</Link>
      <Link href="/">Video to Gif</Link>
    </nav>
  );
};

export default Nav;
