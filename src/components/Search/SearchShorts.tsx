import React, { useState } from "react";
import { DatumDatum, WelcomeDatum } from "@/types/searchTypes";
import Image from "next/image";
import VisibilitySensor from "react-visibility-sensor";
import Link from "next/link";

const SearchShorts = ({ dt }: { dt: WelcomeDatum }) => {
  const [pos, setPos] = useState(0);
  const [isLastItemVisible, setIsLastItemVisible] = useState(false);

  const handleBtnClick = (value: boolean) => {
    if (pos < 0) {
      setPos(0);
    }

    if (value) {
      setPos((prev) => (prev -= 70));
    } else {
      setPos((prev) => (prev += 70));
    }
  };

  const handleVisibilityChange = (
    index: number,
    isVisible: boolean,
    data: DatumDatum[]
  ) => {
    if (index === data.length - 1) {
      setIsLastItemVisible(isVisible);
    }
  };

  return (
    <div className="relative">
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
      <div
        className="flex space-x-1 transition-transform duration-100 ease-in-out"
        style={{ transform: `translateX(-${pos}%)` }}
      >
        {dt.data.map((short, index: number) => {
          return (
            <VisibilitySensor
              key={short.videoId}
              onChange={(isVisible: boolean) =>
                handleVisibilityChange(index, isVisible, dt.data)
              }
              partialVisibility
              offset={{ right: 1 }}
            >
              <Link
                href={`/shorts?sh=${short.videoId}`}
                key={short.videoId}
                className="w-1/4 flex-none md:w-1/6 lg:w-1/12"
              >
                <div className="w-full">
                  <Image
                    alt={short.title}
                    src={short.thumbnail[short.thumbnail.length - 1].url}
                    fill
                    className="position-unset | w-full rounded-lg"
                  />
                </div>
                <p className="line-clamp-2">{short.title}</p>{" "}
              </Link>
            </VisibilitySensor>
          );
        })}
      </div>
    </div>
  );
};

export default SearchShorts;
