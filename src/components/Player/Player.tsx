import { Welcome } from "@/types/videoTypes";
import bitsToMegabytes from "@/utils/bitsToMegaBytes";
import React from "react";
import { Player as VideoPlayer } from "react-tuby";
import "react-tuby/css/main.css";

const Player = ({ data }: { data: Welcome }) => {
  const mp4 = data.result.formats
    .filter((format) => format.ext)
    .map((obj) => {
      return {
        quality: obj.format_note + " - " + bitsToMegabytes(obj.filesize),
        url: obj.url,
      };
    });

  return (
    <div className="h-1/2 w-full text-white">
      <VideoPlayer src={mp4} />
    </div>
  );
};

export default Player;
