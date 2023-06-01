import { DatumDatum } from "@/types/homeFeedTypes";
import Image from "next/image";
import React from "react";

const HomeFeedShorts = ({ short }: { short: DatumDatum }) => {
  return (
    <div key={short.videoId} className="w-1/4 flex-none md:w-1/6 lg:w-1/12">
      <div className="relative w-full rounded-lg object-cover">
        <Image
          alt={short.title}
          src={short.thumbnail[0].url}
          fill
          className="position-unset | h-full rounded-lg object-cover"
        />
      </div>
      <h2
        title={short.title}
        className="line-clamp-2 w-4/5 overflow-hidden text-sm"
      >
        {short.title}
      </h2>
    </div>
  );
};

export default HomeFeedShorts;
