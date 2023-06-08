import React, { useEffect } from "react";
import {
  fetchAdditionalChannelSearch,
  fetchChannelSearchResults,
} from "@/redux/slices/channelSearch";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner";
import formatNumber from "@/utils/numberFormat";
import { useBottomReached } from "@/hooks/useBottomReached";
import useDebouncedSearch from "use-debounced-search";

const ChannelSearch = ({ id }: { id: string }) => {
  const isBottomReached = useBottomReached();
  const { search, searched, handleChange } = useDebouncedSearch(500);

  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(
    (state) => state.channelSearchReducer
  );

  useEffect(() => {
    if (searched !== "") {
      dispatch(fetchChannelSearchResults({ id, query: searched }));
    }
  }, [searched]);

  useEffect(() => {
    if (isBottomReached && data.continuation) {
      dispatch(
        fetchAdditionalChannelSearch({
          token: data.continuation,
          id,
          query: searched,
        })
      );
    }
  }, [isBottomReached]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search"
        className="mb-6 w-full border-b border-gray-light bg-transparent p-2 outline-none"
      />

      {data.data.map((dt, index) => {
        if (dt.type === "video") {
          return (
            <div
              className={`mb-3 flex w-full flex-col border-b pb-2 md:h-48 md:flex-row md:border-none`}
              key={dt.title + "-" + index}
            >
              <Link
                href={`/video/${dt.videoId}`}
                className="relative rounded-lg bg-gray-350 md:mr-4 md:aspect-video"
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

                <p className="md:line-clamp-0 my-3 line-clamp-2 text-xs text-gray-light">
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

        return <div key={dt.title}></div>;
      })}
      {status === "loading" && <LoadingSpinner />}
      {data.msg && <p>{data.msg}</p>}
    </div>
  );
};

export default ChannelSearch;
