/* eslint-disable react-hooks/exhaustive-deps */

import {
  BreakPointHooks,
  breakpointsTailwind,
} from "@react-hooks-library/core";
import React, { useEffect, useRef, useState } from "react";

import ChannelItems from "./ChannelItems";
import { DatumDatum } from "@/types/channelDetailsTypes";
import Link from "next/link";
import { ShortsIcon } from "../Icons";
import VisibilitySensor from "react-visibility-sensor";

const ChannelList = ({
  video,
  dtType,
}: {
  video: DatumDatum;
  dtType?: string;
}) => {
  const [pos, setPos] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [isLastItemVisible, setIsLastItemVisible] = useState(false);

  const itemRef = useRef<HTMLDivElement>(null);

  const { isSmaller } = BreakPointHooks(breakpointsTailwind);

  const small = isSmaller("md");

  const bigScreenMoveAmount = itemWidth * 6 + (video.data.length - 1) * 4;
  const moveAmount = bigScreenMoveAmount;

  const handleVisibilityChange = (index: number, isVisible: boolean) => {
    if (index === video.data.length - 1) {
      setIsLastItemVisible(isVisible);
    }
  };

  useEffect(() => {
    if (itemRef.current) {
      const itemWidth = itemRef.current.offsetWidth;
      setItemWidth(itemWidth);
    }
  }, [video]);

  const handleBtnClick = (direction: boolean) => {
    setPos((prev) => (direction ? (prev += moveAmount) : (prev -= moveAmount)));

    if (pos < 0) {
      setPos(0);
    }
  };

  return (
    <div className="relative space-x-0 overflow-hidden md:w-[70vw] md:space-x-1 lg:mx-auto">
      <h3 className="my-3 flex px-2 text-sm font-semibold md:p-0 md:text-lg">
        {dtType === "shorts" && <ShortsIcon className="mr-2" />}
        {video.title}
      </h3>
      {video.data.length > 6 && !small && (
        <>
          <button
            className={`left | ${
              pos > 0 ? "md:block" : "hidden"
            } absolute left-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-gray-600 lg:h-10 lg:w-10`}
            onClick={() => handleBtnClick(false)}
          >
            &lt;
          </button>
          <button
            className={`right | ${
              isLastItemVisible ? "hidden" : "md:block"
            } absolute right-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-gray-600 lg:h-10 lg:w-10`}
            onClick={() => handleBtnClick(true)}
          >
            &gt;
          </button>
        </>
      )}
      <div
        className={`no-scrollbar | ${
          small && "overflow-y-scroll"
        } flex  transition-transform duration-100 ease-in-out md:space-x-1`}
        style={{ transform: `translateX(-${pos}px)` }}
      >
        {video.data?.map((dt, index) => {
          return (
            <VisibilitySensor
              onChange={(isVisible: boolean) =>
                handleVisibilityChange(index, isVisible)
              }
              offset={{ right: 1 }}
              key={dt.videoId}
            >
              <div
                ref={itemRef}
                className={`mb-3 w-full flex-none ${
                  dt.type === "video"
                    ? "sm:w-1/4 md:w-1/4 lg:w-[16.4%]"
                    : "sm:w-1/4 md:w-1/4 lg:w-1/12"
                }`}
              >
                <Link
                  href={`/${dtType === "shorts" ? "shorts" : "video"}/${
                    dt.videoId
                  }`}
                >
                  <ChannelItems dt={dt} />
                </Link>
              </div>
            </VisibilitySensor>
          );
        })}
      </div>
      <div className="mt-3 h-px w-full bg-gray-350" />
    </div>
  );
};

export default ChannelList;
