import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="flex justify-between bg-black text-white font-bold p-5">
      <Link to="/">Blog</Link>
      <Link to="/contact">お問い合わせ</Link>

    </header>
  )

};

