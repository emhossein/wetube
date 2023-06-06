"use client";

import { useResolveUrlQuery } from "@/redux/slices/urlSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useDebouncedSearch from "use-debounced-search";
import LoadingSpinner from "../LoadingSpinner";

const urlRegex = /^https?:\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/)/;

const ResolveUrl = () => {
  const [error, setError] = useState("");

  const router = useRouter();

  const { search, searched, handleChange } = useDebouncedSearch(500);

  const { data, isLoading, isError } = useResolveUrlQuery(searched);

  useEffect(() => {
    if (urlRegex.test(searched)) {
      if (data?.webPageType === "WEB_PAGE_TYPE_PLAYLIST") {
        router.push(
          `/playlist/${data?.browseId?.slice(2, data?.browseId?.length)}`
        );
      } else if (data?.webPageType === "WEB_PAGE_TYPE_WATCH") {
        router.push(`/video/${data?.videoId}`);
      } else if (data?.webPageType === "WEB_PAGE_TYPE_SHORTS") {
        router.push(`/shorts?sh=${data?.videoId}`);
      } else if (data?.webPageType === "WEB_PAGE_TYPE_CHANNEL") {
        router.push(`/channel/${data?.browseId}`);
      }
    } else {
      setError("Sorry, this url not supported.");
    }
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="center text-xl text-white">
        Error occurred while resolving URL.
      </div>
    );
  }

  console.log(error);

  return (
    <div className="center mx-auto flex h-screen flex-col md:m-0 md:w-full">
      <div className="center w-full text-white">
        <div className="relative h-10  w-full max-w-[644px] items-center rounded-[40px] border border-gray-350 md:flex">
          <form className="h-full w-full  pl-4">
            <input
              type="text"
              placeholder="Enter your YouTube url here"
              className="h-full w-full bg-transparent outline-none placeholder:text-gray-350"
              value={search}
              onChange={handleChange}
            />
          </form>
        </div>
      </div>
      <p className="center mt-6 text-xl text-white">{error}</p>
    </div>
  );
};

export default ResolveUrl;
