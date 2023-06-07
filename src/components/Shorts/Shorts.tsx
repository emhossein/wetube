/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import LoadingSpinner from "../LoadingSpinner";
import VisibilitySensor from "react-visibility-sensor";
import { fetchAdditionalShorts } from "@/redux/slices/shortsVideoSlice";

type iProps = {
  id?: string;
  currentShorts?: string;
  setCurrentShorts: React.Dispatch<React.SetStateAction<string>>;
};

const Shorts = ({ id, currentShorts, setCurrentShorts }: iProps) => {
  const [current, setCurrent] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);

  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.shortsListReducer);

  const [visible, setVisible] = useState(false);

  const [shorts] = data.data.filter((v) => v?.id === current);

  const handleVisibilityChange = (isVisible: boolean) => {
    if (isVisible) {
      setCurrentShorts(id!);
      setCurrent(id!);
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const handlePlayShorts = () => {
    videoRef.current?.play();
  };

  if (videoRef.current) {
    console.log(videoRef.current?.paused);
  }

  useEffect(() => {
    if (visible) {
      if (data.data.some((v) => v?.id === id)) {
        console.log("video found");
      } else {
        dispatch(fetchAdditionalShorts({ id: id! }));
        console.log("it has not the video");
      }
    }
  }, [visible]);

  return (
    <VisibilitySensor
      onChange={(isVisible: boolean) => handleVisibilityChange(isVisible)}
    >
      <div
        className={`relative mx-auto mt-3 aspect-[9/16] h-[calc(100vh-80px)] snap-start overflow-hidden rounded-xl bg-gray-350 text-white
        `}
      >
        {visible && (
          <>
            <video
              ref={videoRef}
              autoPlay
              loop
              playsInline
              onClick={handlePlayShorts}
              src={
                shorts?.formats.filter((format) => format.format_id === "18")[0]
                  ?.url
              }
              className="z-10 h-full w-full"
            />
            <div className="absolute bottom-[3%] pl-2">
              <p className="text-sm">{shorts?.title}</p>
              <p className="text-sm">{shorts?.uploader_id}</p>
            </div>
          </>
        )}
        {status === "loading" ? (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoadingSpinner />
          </div>
        ) : status === "succeeded" &&
          shorts?.formats.filter((format) => format.format_id === "18")[0]
            ?.url === undefined ? (
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            Sorry this shorts does not have an unfiltered url.
          </p>
        ) : (
          <p></p>
        )}
      </div>
    </VisibilitySensor>
  );
};

export default Shorts;
