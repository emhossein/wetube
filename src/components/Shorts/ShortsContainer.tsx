"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import LoadingSpinner from "../LoadingSpinner";
import Shorts from "./Shorts";
import VisibilitySensor from "react-visibility-sensor";
import { fetchAdditionalShortsSequence } from "@/redux/slices/shortsSequenceSlice";

const ShortsContainer = () => {
  const [bottomReached, setBottomReached] = useState<boolean>(false);
  const [currentShorts, setCurrentShorts] = useState("");

  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(
    (state) => state.shortsSequenceReducer
  );
  const { data: video } = useAppSelector((state) => state.shortsListReducer);

  const handleVisibilityChange = (
    isVisible: boolean,
    index: number,
    id: string
  ) => {
    if (isVisible) {
      setCurrentShorts(id);
      if (data.data.length - 1 === index) {
        setBottomReached(true);
      }
    } else {
      if (data.data.length !== index) {
        setBottomReached(false);
      }
    }
  };

  const videoIds = data.data.map((item) => item.videoId);
  const shortsIds = [video.data[0]?.id, ...videoIds];

  useEffect(() => {
    if (data.continuation) {
      dispatch(fetchAdditionalShortsSequence({ params: data.continuation }));
    }
  }, [bottomReached]);

  return (
    <div className="no-scrollbar | w-full overflow-hidden md:-mt-14">
      <div className="snap-scrollbar-container no-scrollbar | h-[calc(100vh-70px)] w-full snap-y overflow-y-scroll md:mt-14">
        {shortsIds.map((short, index) => (
          <VisibilitySensor
            key={short}
            partialVisibility
            onChange={(isVisible: boolean) =>
              handleVisibilityChange(isVisible, index, short)
            }
          >
            <Shorts
              id={short}
              currentShorts={currentShorts}
              setCurrentShorts={setCurrentShorts}
            />
          </VisibilitySensor>
        ))}
      </div>
      {status === "loading" && <LoadingSpinner />}
    </div>
  );
};

export default ShortsContainer;
