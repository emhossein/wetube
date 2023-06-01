import { Welcome } from "@/types/videoTypes";
import bitsToMegabytes from "@/utils/bitsToMegaBytes";
import React from "react";
import { Player as VideoPlayer } from "react-tuby";
import "react-tuby/css/main.css";

const Player = ({ data }: { data: Welcome }) => {
  console.log(data);

  const mp4 = data?.result?.formats?.filter(
    (format) => format.format === "18 - 640x360 (360p)"
  );
  // .map((obj) => {
  //   return {
  //     quality: obj.format_note + " - " + bitsToMegabytes(obj.filesize),
  //     url: obj.url,
  //   };
  // });

  console.log(mp4);

  return (
    <div className="w-full text-white">
      <video src={mp4[0].url} controls className="aspect-video w-4/5" />
    </div>
  );
};

export default Player;
