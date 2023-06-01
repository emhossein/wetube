import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { MoreIcon, PlaylistsIcon, ShareIcon } from "../Icons";
import Image from "next/image";

const PlaylistCard = () => {
  const { data } = useAppSelector((state) => state.playlistDetailsReducer);

  console.log(data);

  return (
    <div className="w-full overflow-hidden md:sticky md:top-14 md:h-[90vh] md:w-1/3 md:rounded-2xl">
      <div className="relative mb-6 h-full w-full overflow-hidden bg-gradient-to-b from-transparent from-60% to-black to-100% p-6 pb-0 md:rounded-2xl">
        <div className="mb-4 rounded-2xl">
          <Image
            fill
            alt={data.meta.title}
            src={data.meta.thumbnail?.[data.meta.thumbnail.length - 1]?.url}
            className="position-unset | rounded-2xl"
          />
        </div>
        <div className="absolute left-0 top-0 -z-10 h-full blur-3xl">
          <Image
            fill
            alt={data.meta.title}
            src={data.meta.thumbnail?.[data.meta.thumbnail.length - 1]?.url}
            className="position-unset"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{data.meta.title}</h2>
          <div className="mt-4">
            <p className="mb-1 text-sm">{data.meta.channelTitle}</p>
            <div className="mb-3 flex space-x-2 truncate text-xs">
              <p>{data.meta.videoCountText}</p>{" "}
              <p>{data.meta.viewCountText} </p>
              <p>{data.meta.lastUpdated}</p>
            </div>
            <div className="flex space-x-2">
              <button className="center | glass glass-hover h-9 w-9 rounded-full">
                <PlaylistsIcon />
              </button>
              <button className="center | glass glass-hover h-9 w-9 rounded-full">
                <ShareIcon />
              </button>
              <button className="center | glass glass-hover h-9 w-9 rounded-full">
                <MoreIcon />
              </button>
            </div>
            <div className="mt-4 flex w-full justify-between space-x-2 pr-6">
              <button className="center | h-9 w-1/2 rounded-full bg-white text-black hover:bg-opacity-80">
                Play
              </button>
              <button className="center | glass glass-hover h-9 w-1/2 rounded-full">
                Shuffle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
