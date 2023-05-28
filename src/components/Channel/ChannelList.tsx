import { DatumDatum } from "@/types/channelDetailsTypes";
import Link from "next/link";
import React, { useState } from "react";
import ChannelItems from "./ChannelItems";

const ChannelList = ({ video }: { video: DatumDatum }) => {
  const [pos, setPos] = useState(0);

  const short = video.data.filter((s) => s.type === "shorts");
  const hiddenBtn =
    video.type === "shorts_listing"
      ? short.length <= 12
        ? 100
        : short.length <= 18
        ? 200
        : 300
      : 100;

  return (
    <div className="relative mx-auto w-[70vw] space-x-1 overflow-hidden">
      <h3 className="my-3 text-lg font-semibold">{video.title}</h3>
      {video.data.length > 6 && (
        <>
          <button
            className={`left | ${
              pos === 0 ? "hidden" : "block"
            } absolute left-0 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-gray-600`}
            onClick={() => setPos((prev) => (prev -= 100))}
          >
            &lt;
          </button>
          <button
            className={`right | ${
              pos === hiddenBtn ? "hidden" : "block"
            } absolute right-0 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-gray-600`}
            onClick={() => setPos((prev) => (prev += 100))}
          >
            &gt;
          </button>
        </>
      )}
      {/* <div className="grid grid-cols-1 gap-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"> */}
      <div
        className={`flex space-x-1 transition-transform duration-150 ease-in-out`}
        style={{ transform: `translateX(-${pos}%)` }}
      >
        {video.data?.map((dt) => {
          return (
            <Link
              href={`/video/${dt.videoId}`}
              key={dt.videoId}
              className="mb-3 w-[16.4%] flex-none"
            >
              <ChannelItems dt={dt} />
            </Link>
          );
        })}
      </div>
      <div className="mt-3 h-px w-full bg-gray-350" />
    </div>
  );
};

export default ChannelList;
