import { Datum } from "@/types/playlistDetailTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PlaylistItem = ({ dt }: { dt: Datum }) => {
  return (
    <Link
      href={`/video/${dt.videoId}`}
      className="flex h-28 w-full rounded-lg py-2 hover:bg-gray-350"
    >
      <p className="self-center px-3">{dt.index}</p>
      <div className="relative mr-2 rounded-lg">
        <div className="h-full w-full rounded-lg">
          <Image
            fill
            alt={dt.title}
            src={dt.thumbnail[dt.thumbnail.length - 1].url}
            className="position-unset | rounded-lg"
          />
        </div>
        <p className="absolute bottom-[2%] right-[2%] rounded-md bg-black bg-opacity-50 px-1 text-xs">
          {dt.lengthText}
        </p>
      </div>
      <div>
        <h3 className="mb-2 text-base">{dt.title}</h3>
        <p className="text-xs text-gray-light">
          {dt.channelTitle} • {dt.videoInfo}
        </p>
      </div>
    </Link>
  );
};

export default PlaylistItem;
