import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="flex gap-x-4 items-center justify-center bg-gray-800 p-4 text-white">
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/login">Login</Link>
      <Link href="/product">Product</Link>
    </div>
  );
};

export default NavBar;
