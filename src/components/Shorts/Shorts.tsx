import React from "react";

const Shorts = ({ index }: { index: number }) => {
  return (
    <div className="mx-auto mt-4 aspect-[9/16] h-[calc(100vh-54px)] snap-start rounded-xl bg-gray-350 text-white">
      {index}
    </div>
  );
};

export default Shorts;
