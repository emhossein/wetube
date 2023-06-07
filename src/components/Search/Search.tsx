import {
  BreakPointHooks,
  breakpointsTailwind,
} from "@react-hooks-library/core";

import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner";
import React from "react";
import SearchShorts from "./SearchShorts";
import formatNumber from "@/utils/numberFormat";
import { useAppSelector } from "@/redux/hooks";

const Search = () => {
  const { isSmaller } = BreakPointHooks(breakpointsTailwind);

  const small = isSmaller("md");

  const { data, status } = useAppSelector((state) => state.searchReducer);

  return (
    <div
      className={`mx-auto mt-6 w-full text-white md:w-4/5 md:overflow-hidden`}
    >
      {data.data.map((dt, index) => {
        const key = dt.title + String(index);

        if (dt.type === "video") {
          return (
            <div
              className={`mb-3 flex w-full border-b pb-2 md:border-none ${
                small ? "flex-col" : "h-48"
              }`}
              key={key}
            >
              <Link
                href={`/video/${dt.videoId}`}
                className="relative md:mr-4 md:aspect-video"
              >
                <Image
                  alt={dt.title}
                  src={dt.thumbnail[dt.thumbnail?.length - 1].url}
                  fill
                  className="position-unset | md:rounded-lg"
                />
                <p className="absolute bottom-[3%] right-[3%] rounded-sm bg-black bg-opacity-70 px-1 text-xs">
                  {dt.lengthText}
                </p>
              </Link>
              <div className="w-full px-2 md:flex-1 md:px-0">
                <Link href={`/video/${dt.videoId}`}>
                  <h1 title={dt.title} className="text-xl">
                    {dt.title}
                  </h1>
                </Link>
                <p className="text-xs text-gray-light">
                  {formatNumber(Number(dt.viewCount))} views •{" "}
                  {dt.publishedTimeText}
                </p>
                <div className="my-3">
                  <Link
                    href={`/channel/${dt.channelId}`}
                    className="flex items-center space-x-2"
                  >
                    <div className="h-6 w-6">
                      <Image
                        alt={dt.channelTitle}
                        src={
                          dt.channelThumbnail[dt.channelThumbnail?.length - 1]
                            .url
                        }
                        fill
                        className="position-unset | rounded-full"
                      />
                    </div>
                    <p className="text-xs text-gray-light">{dt.channelTitle}</p>
                  </Link>
                </div>
                <p className="md:line-clamp-0 line-clamp-1 text-xs text-gray-light">
                  {dt.description}
                </p>
                <div className="mt-1 flex space-x-1">
                  {dt.badges?.map((badge) => (
                    <p
                      key={badge}
                      className="rounded-sm bg-gray-350 px-1 text-xs"
                    >
                      {badge}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        if (dt.type === "shorts_listing") {
          return (
            <div
              key={dt.data[0].sequenceParams}
              className="no-scrollbar | relative mx-auto mb-6 overflow-y-scroll"
            >
              <SearchShorts dt={dt} />
            </div>
          );
        }

        // if (dt.type === "query_listing") {
        //   return (
        //     <div key={dt.data[0].query} className="my-6">
        //       <h2 className="mb-4 text-lg">{dt.title}</h2>
        //       <div className="flex space-x-2 overflow-y-scroll">
        //         {dt.data.map((query) => (
        //           <Link href={`/search/${query.query}`} key={query.query}>
        //             <div className="w-28">
        //               <Image
        //                 fill
        //                 alt={query.query}
        //                 src={`https:${
        //                   query.thumbnail[query.thumbnail.length - 1].url
        //                 }`}
        //                 className="position-unset | rounded-md"
        //               />
        //             </div>
        //             <p className="text-center text-sm">{query.query}</p>
        //           </Link>
        //         ))}
        //       </div>
        //     </div>
        //   );
        // }

        return <p key={key}>{/* {dt.title} */}</p>;
      })}
      {status === "loading" && <LoadingSpinner />}
    </div>
  );
};

export default Search;
