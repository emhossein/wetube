import { useAppDispatch } from "@/redux/hooks";
import { Welcome } from "@/types/videoTypes";
import { Welcome as WelcomeRelated } from "@/types/relatedVideoTypes";
import { Welcome as WelcomeChannel } from "@/types/channelDetailsTypes";
import React, { useEffect, useState } from "react";
import { fetchAdditionalRelatedVideos } from "@/redux/slices/relatedVideosSlice";
import VisibilitySensor from "react-visibility-sensor";
import LoadingSpinner from "../LoadingSpinner";
import RelatedVideos from "./RelatedVideos";
import VideoDetails from "./VideoDetails";
import VideoComments from "./VideoComments";

type iProps = {
  data: Welcome;
  related: WelcomeRelated;
  id: string;
  channel: WelcomeChannel;
};

const Player = ({ data, related, id, channel }: iProps) => {
  const [isLastItemVisible, setIsLastItemVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const mp4 = data?.result?.formats?.filter(
    (format) => format.format === "18 - 640x360 (360p)"
  );

  const dispatch = useAppDispatch();

  const handleVisibilityChange = (isVisible: boolean, index: number) => {
    if (index === related.data.length - 1) {
      setIsLastItemVisible(isVisible);
    }
  };

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

  return (
    <div className="grid w-full text-white lg:grid-cols-4">
      {mp4 && (
        <div className="relative col-span-3 w-full">
          {mp4.length ? (
            <video
              src={mp4[0].url}
              controls
              className="z-10 w-full hover:cursor-pointer"
              poster={data.result.thumbnail}
              playsInline
              webkit-playsInline
            >
              Your browser does not support HTML5 video.
            </video>
          ) : (
            <div className="center | aspect-video w-full">
              <h1 className="text-2xl">
                Sorry, this video does not have an unfiltered url.
              </h1>
            </div>
          )}
          <VideoDetails data={data} channel={channel} />
          <VideoComments />
        </div>
      )}
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
