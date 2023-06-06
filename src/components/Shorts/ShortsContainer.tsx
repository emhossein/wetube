"use client";

import React, { useEffect, useRef, useState } from "react";

import Shorts from "./Shorts";
import VisibilitySensor from "react-visibility-sensor";
import { useSearchParams } from "next/navigation";

const ShortsContainer = () => {
  const [bottomReached, setBottomReached] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const shorts = searchParams.get("sh");

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleVisibilityChange = (isVisible: boolean, index: number) => {
    if (isVisible) {
      console.log(`Item ${index} is visible.`);
      if (arr.length === index) {
        setBottomReached(true);
      }
    } else {
      console.log(`Item ${index} is no longer visible.`);
      if (arr.length !== index) {
        setBottomReached(false);
      }
    }
  };

  useEffect(() => {
    console.log(bottomReached);
  }, [bottomReached]);

  return (
    <div className="no-scrollbar | w-full overflow-hidden md:-mt-14">
      <div className="snap-scrollbar-container no-scrollbar | h-[calc(100vh-70px)] w-full snap-y overflow-y-scroll md:mt-14">
        {arr.map((x) => (
          <VisibilitySensor
            key={x}
            partialVisibility
            onChange={(isVisible: boolean) =>
              handleVisibilityChange(isVisible, x)
            }
          >
            <Shorts key={x} index={x} />
          </VisibilitySensor>
        ))}
      </div>
    </div>
  );
};

export default ShortsContainer;
