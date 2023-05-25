import React from "react";
import Link from "next/link";
import { SearchIcon, YoutubeIcon } from "../Icons";

const Navbar = () => {
  return (
    <header className="container | flex items-center justify-between h-14 space-x-10 text-white">
      <div className="left | flex items-center md:space-x-7">
        <div className="md:block hidden space-y-[5px] hover:cursor-pointer">
          <span className="block w-6 h-[2px] bg-white" />
          <span className="block w-6 h-[2px] bg-white" />
          <span className="block w-6 h-[2px] bg-white" />
        </div>
        <Link href="/">
          <YoutubeIcon />
        </Link>
      </div>
      <div className="middle | md:flex hidden  items-center max-w-[644px] w-full h-10 overflow-hidden rounded-[40px] border border-gray-350">
        <input
          type="text"
          id="search-box"
          placeholder="Search"
          className="h-full w-full bg-transparent outline-none pl-4 placeholder:text-gray-350"
        />
        <div className="center | w-16 h-full bg-gray-350 hover:cursor-pointer">
          <SearchIcon />
        </div>
      </div>
      <div className="right |" />
    </header>
  );
};

export default Navbar;
