import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { CloseIcon, SearchIcon, YoutubeIcon } from "../Icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleShowGuide } from "@/redux/slices/guideStateSlice";
import {
  BreakPointHooks,
  breakpointsTailwind,
} from "@react-hooks-library/core";
import useDebouncedSearch from "use-debounced-search";
import { fetchSearchResult, setSearchedTerm } from "@/redux/slices/searchSlice";
import LoadingSpinner from "../LoadingSpinner";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const router = useRouter();

  const { search, searched, handleChange, clearSearched, clearSearch } =
    useDebouncedSearch(500);

  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.searchReducer);

  const { isSmaller } = BreakPointHooks(breakpointsTailwind);

  const small = isSmaller("md");

  const handleClearInput = () => {
    clearSearch();
    clearSearched();
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const toggleGuide = () => {
    dispatch(toggleShowGuide());
  };

  useEffect(() => {
    if (small) {
      toggleGuide();
    }
  }, []);

  useEffect(() => {
    if (searched !== "") {
      dispatch(fetchSearchResult(searched));
      dispatch(setSearchedTerm(searched));
    }
  }, [searched]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search/${searched}`);
    clearSearch();
    clearSearched();
  };

  return (
    <div className="sticky top-0 z-50 flex h-14 w-screen flex-1 items-center justify-between space-x-10 bg-black px-4 text-white md:px-7">
      <div className="left | flex items-center space-x-7">
        <div
          onClick={toggleGuide}
          className="block space-y-[5px] hover:cursor-pointer"
        >
          <div className="block h-[2px] w-6 bg-white" />
          <div className="block h-[2px] w-6 bg-white" />
          <div className="block h-[2px] w-6 bg-white" />
        </div>
        <Link href="/">
          <YoutubeIcon />
        </Link>
      </div>
      <div className="middle | relative hidden h-10  w-full max-w-[644px] items-center rounded-[40px] border border-gray-350 md:flex">
        <form onSubmit={handleSubmit} className="h-full w-full  pl-4 ">
          <input
            type="text"
            id="search-box"
            placeholder="Search"
            value={search}
            onChange={handleChange}
            className="h-full w-full bg-transparent outline-none placeholder:text-gray-350"
          />
        </form>
        {searched && (
          <div className="absolute -bottom-2 left-0 mt-2 w-full translate-y-full rounded-lg bg-gray-350 py-4">
            {data.refinements?.map((suggestion) => (
              <Link
                href={`/search/${suggestion}`}
                key={suggestion}
                onClick={handleClearInput}
                className="flex items-center space-y-2 rounded-md px-4 hover:bg-gray-light"
              >
                <SearchIcon small />
                <p className="ml-4">{suggestion}</p>
              </Link>
            ))}
          </div>
        )}
        {status === "loading" && (
          <div className="mr-2">
            <LoadingSpinner h="6" w="6" />
          </div>
        )}
        <div className="center | h-full w-16 rounded-r-[40px] bg-gray-350 hover:cursor-pointer">
          <SearchIcon />
        </div>
      </div>
      <div className="right |">
        {showSearchBar && (
          <div className="absolute left-0 top-0 flex h-full w-screen items-center justify-between bg-gray-350 px-4">
            <form className="flex-1" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search"
                id="search-box-mobile"
                value={search}
                onChange={handleChange}
                className="bg-transparent outline-none"
              />
            </form>
            <div onClick={toggleSearchBar}>
              <CloseIcon />
            </div>
          </div>
        )}
        {showSearchBar && searched && (
          <div className="absolute -bottom-0 left-0 mt-2 w-full translate-y-full rounded-b-lg bg-gray-350 py-4">
            {data.refinements?.map((suggestion) => (
              <Link
                onClick={handleClearInput}
                href={`/search/${suggestion}`}
                key={suggestion}
                className="flex items-center space-y-2 rounded-md px-4 hover:bg-gray-light"
              >
                <SearchIcon small />
                <p className="ml-4">{suggestion}</p>
              </Link>
            ))}
          </div>
        )}
        <div className="block md:hidden">
          <SearchIcon onClick={toggleSearchBar} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
