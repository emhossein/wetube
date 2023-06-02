import { WelcomeDatum } from "@/types/homeFeedTypes";
import React, { useState } from "react";
import { ShortsIcon } from "../Icons";
import HomeFeedShorts from "./HomeFeedShorts";
import VisibilitySensor from "react-visibility-sensor";
import {
  BreakPointHooks,
  breakpointsTailwind,
} from "@react-hooks-library/core";

const HomeFeedShortsListing = ({
  shorts,
  dtType,
}: {
  shorts: WelcomeDatum[];
  dtType?: "shorts" | "video";
}) => {
  const [pos, setPos] = useState(0);
  const [isLastItemVisible, setIsLastItemVisible] = useState(false);

  const { isSmaller } = BreakPointHooks(breakpointsTailwind);

  const small = isSmaller("md");

  const handleVisibilityChange = (index: number, isVisible: boolean) => {
    if (index === shorts?.[0]?.data!.length - 1) {
      setIsLastItemVisible(isVisible);
    }
  };

  const handleBtnClick = (value: boolean) => {
    if (pos < 0) {
      setPos(0);
    }

    if (value) {
      setPos((prev) => (prev -= 60));
    } else {
      setPos((prev) => (prev += 60));
    }
  };

  return (
    <div className="relative mb-3 text-white md:overflow-hidden">
      <button
        className={`left | ${
          pos > 0 ? "md:block" : "hidden"
        } absolute left-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-gray-600 lg:h-10 lg:w-10`}
        onClick={() => handleBtnClick(true)}
      >
        &lt;
      </button>
      <button
        className={`right | ${
          !isLastItemVisible && "md:block"
        } absolute right-0 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 rounded-full bg-gray-600 lg:h-10 lg:w-10`}
        onClick={() => handleBtnClick(false)}
      >
        &gt;
      </button>
      <div className="my-4 flex items-center space-x-2">
        {dtType === "shorts" && <ShortsIcon />}
        <h1 className="text-lg">{shorts[0].title}</h1>
      </div>
      {shorts.map((shorts, i) => {
        return (
          <div
            key={i}
            className={`no-scrollbar | ${small && "overflow-y-scroll"} ${
              dtType === "shorts" && "px-2"
            } flex space-x-1 transition-transform duration-100 ease-in-out`}
            style={{ transform: `translateX(-${pos}%)` }}
          >
            {shorts.data!.map((short, index) => {
              return (
                <VisibilitySensor
                  onChange={(isVisible: boolean) =>
                    handleVisibilityChange(index, isVisible)
                  }
                  partialVisibility={"right"}
                  key={short.videoId}
                >
                  <HomeFeedShorts
                    dtType={dtType}
                    short={short}
                    key={short.videoId}
                  />
                </VisibilitySensor>
              );
            })}
          </div>
        );
      })}
      <div className="my-4 h-[2px] w-full bg-gray-350" />
    </div>
  );
};

export default HomeFeedShortsListing;
