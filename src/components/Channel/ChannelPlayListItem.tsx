/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { useEffect, useState } from "react";

import { ColorData } from "@/types/colorDataTypes";
import { Datum } from "@/types/channelVideosTypes";
import Image from "next/image";
import Link from "next/link";
import { PlaylistsIcon } from "../Icons";
import { fetchColorData } from "@/utils/fetchColorData";

const ChannelPlayListItem = ({ dt }: { dt: Datum }) => {
  const [colorData, setColorData] = useState<ColorData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchColorData(dt.thumbnail[0].url);
        setColorData(data);
      } catch (error) {
        console.error("Failed to fetch color data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Link
      href={`/video/${dt.videoId}`}
      className="h-fit hover:cursor-pointer md:w-full"
    >
      <div>
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-gray-350">
          <Image
            src={dt.thumbnail?.[dt.thumbnail?.length - 1]?.url}
            alt={dt.playlistId!}
            fill
            className="position-unset | rounded-md"
          />
          <div
            className={`absolute bottom-0 flex h-6 w-full items-center justify-between rounded-b-md px-2`}
            style={{ backgroundColor: `${colorData?.vibrant}`, opacity: 0.7 }}
          >
            <div className="opacity-100">
              <PlaylistsIcon />
            </div>
            <p className="text-xs opacity-100">{dt.videoCount} videos</p>
          </div>
        </div>
        <h3 className="mt-2 text-white">{dt.title}</h3>
        <Link
          href={`/playlist/${dt.playlistId}`}
          className="text-xs text-gray-light hover:text-white"
        >
          View full playlist
        </Link>
      </div>
    </Link>
  );
};

export default ChannelPlayListItem;
