import React from "react";
import extractUrlAndHashtags from "@/utils/extractUrlAndHashtags";

const ChannelAbout = ({ about }: { about: string }) => {
  return (
    <div>
      <div
        className="whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: extractUrlAndHashtags(about) }}
      ></div>
    </div>
  );
};

export default ChannelAbout;
