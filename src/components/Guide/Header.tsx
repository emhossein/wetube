import React from "react";
import Link from "next/link";
import { SearchIcon, YoutubeIcon } from "../Icons";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-20 flex h-14 w-screen flex-1 items-center justify-between space-x-10 bg-black px-4 px-7 text-white">
      <div className="left | flex items-center md:space-x-7">
        <div className="hidden space-y-[5px] hover:cursor-pointer md:block">
          <div className="block h-[2px] w-6 bg-white" />
          <div className="block h-[2px] w-6 bg-white" />
          <div className="block h-[2px] w-6 bg-white" />
        </div>
        <Link href="/">
          <YoutubeIcon />
        </Link>
      </div>
      <div className="middle | hidden h-10  w-full max-w-[644px] items-center overflow-hidden rounded-[40px] border border-gray-350 md:flex">
        <input
          type="text"
          id="search-box"
          placeholder="Search"
          className="h-full w-full bg-transparent pl-4 outline-none placeholder:text-gray-350"
        />
        <div className="center | h-full w-16 bg-gray-350 hover:cursor-pointer">
          <SearchIcon />
        </div>
      </div>
      <div className="right |" />
    </div>
  );
};

export default Navbar;
