import React, { useEffect, useRef, useState } from "react";

import LoadingSpinner from "../LoadingSpinner";
import RelatedVideos from "./RelatedVideos";
import VideoComments from "./VideoComments";
import VideoDetails from "./VideoDetails";
import VisibilitySensor from "react-visibility-sensor";
import { Welcome } from "@/types/videoTypes";
import { Welcome as WelcomeChannel } from "@/types/channelDetailsTypes";
import { Welcome as WelcomeRelated } from "@/types/relatedVideoTypes";
import bytesToMegabytes from "@/utils/bitsToMegaBytes";
import { fetchAdditionalRelatedVideos } from "@/redux/slices/relatedVideosSlice";
import { fetchChannelDetails } from "@/redux/slices/channelDetailsSlice";
import { useAppDispatch } from "@/redux/hooks";

type iProps = {
  data: Welcome;
  related: WelcomeRelated;
  id: string;
  channel: WelcomeChannel;
};

const Player = ({ data, related, id, channel }: iProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const soundRef = useRef<HTMLVideoElement | null>(null);

  const [isLastItemVisible, setIsLastItemVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [video] = data?.result?.formats?.filter(
    (format) => format.format_id === "18"
  );

  const [videoWithoutSound] = data?.result?.formats?.filter(
    (format) => format.format_id === "135"
  );

  const [sound] = data?.result?.formats?.filter(
    (format) => format.format_id === "139"
  );

  const dispatch = useAppDispatch();

  const handleVisibilityChange = (isVisible: boolean, index: number) => {
    if (index === related.data.length - 1) {
      setIsLastItemVisible(isVisible);
    }
  };

  useEffect(() => {
    dispatch(fetchChannelDetails(data.result.channel_id));
  }, []);

  useEffect(() => {
    if (isLastItemVisible && related.continuation) {
      dispatch(
        fetchAdditionalRelatedVideos({ id, token: related.continuation })
      );
      setLoading(true);
    }

    if (!isLastItemVisible) {
      setLoading(false);
    }
  }, [isLastItemVisible]);

  useEffect(() => {
    if (videoRef.current && soundRef.current) {
      soundRef.current.volume = 0.4;
      soundRef.current?.pause();

      const handleStateChange = () => {
        if (videoRef.current?.paused) {
          soundRef.current?.pause();
        } else {
          soundRef.current?.play();
        }
      };

      const handleVideoTimeUpdate = () => {
        if (videoRef.current && soundRef.current) {
          const videoCurrentTime = videoRef.current.currentTime;

          soundRef.current.currentTime = videoCurrentTime;
        }
      };

      videoRef.current.addEventListener("play", handleStateChange);
      videoRef.current.addEventListener("pause", handleStateChange);
      videoRef.current.addEventListener("timeupdate", handleVideoTimeUpdate);

      // Wait for the video to be loaded before playing the sound
      videoRef.current.addEventListener("waiting", () => {
        soundRef.current?.pause();
      });
      videoRef.current.addEventListener("playing", () => {
        soundRef.current?.play();
      });

      return () => {
        videoRef.current?.removeEventListener("play", handleStateChange);
        videoRef.current?.removeEventListener("pause", handleStateChange);
        videoRef.current?.removeEventListener(
          "timeupdate",
          handleVideoTimeUpdate
        );
        videoRef.current?.removeEventListener("waiting", () => {
          soundRef.current?.pause();
        });
        videoRef.current?.removeEventListener("playing", () => {
          soundRef.current?.play();
        });
      };
    }
  }, []);

  return (
    <div className="grid w-full text-white lg:grid-cols-4">
      <div className="relative col-span-3 w-full">
        {video ? (
          <video
            src={video.url}
            controls
            className="z-10 aspect-video w-full hover:cursor-pointer"
            poster={data.result.thumbnail}
            controlsList="noplaybackrate"
            disableRemotePlayback
            playsInline
            webkit-playsInline
          >
            Your browser does not support HTML5 video.
          </video>
        ) : videoWithoutSound && sound ? (
          <>
            <audio className="hidden" ref={soundRef} controls src={sound.url} />
            <video
              ref={videoRef}
              controls
              controlsList="noplaybackrate"
              disableRemotePlayback
              src={videoWithoutSound.url}
              className="z-20 aspect-video w-screen hover:cursor-pointer md:w-full"
              poster={data.result.thumbnail}
              playsInline
              webkit-playsInline
            />
          </>
        ) : (
          <div className="center | aspect-video w-full">
            <h1 className="text-2xl">
              Sorry, this video does not have an unfiltered url.
            </h1>
          </div>
        )}
        {/* {data.result.formats.map((form) => (
          <>
            <video src={form.url} className="aspect-video w-64" controls>
              Your browser does not support HTML5 video.
            </video>
            <p className="text-xs">
              {form.format} - {form.ext} - {bytesToMegabytes(form.filesize)}
            </p>
          </>
        ))} */}
        <p className="px-1 text-[10px] text-gray-light">
          {video
            ? "video size: " + bytesToMegabytes(video.filesize)
            : videoWithoutSound && sound
            ? "video has no sound control - video size: " +
              bytesToMegabytes(videoWithoutSound.filesize + sound.filesize)
            : ""}
        </p>
        <VideoDetails data={data} channel={channel} />
        <VideoComments />
      </div>

      <div className="col-span-1 ml-2 w-full p-3">
        {related.data.map((relate, index) => {
          return (
            <VisibilitySensor
              onChange={(isVisible: boolean) =>
                handleVisibilityChange(isVisible, index)
              }
              partialVisibility
              offset={{ right: 1 }}
              key={relate.videoId}
            >
              <RelatedVideos relate={relate} />
            </VisibilitySensor>
          );
        })}
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Player;
