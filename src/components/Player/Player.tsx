import { Welcome } from "@/types/videoTypes";
import bitsToMegabytes from "@/utils/bitsToMegaBytes";
import React from "react";
import { Player as VideoPlayer } from "react-tuby";
import "react-tuby/css/main.css";

const Player = ({ data }: { data: Welcome }) => {
  const mp4 = data?.result?.formats
    ?.filter((format) => format.ext === "mp4")
    .map((obj) => {
      return {
        quality: obj.format_note + " - " + bitsToMegabytes(obj.filesize),
        url: obj.url,
      };
    });

  console.log(mp4);

  return (
    <div className="center w-full text-white">
      <VideoPlayer src={mp4} />
      <video src="https://youtube.one-api.ir/64789a6d7a849" controls />
    </div>
  );
};

export default Player;

// import { Welcome } from "@/types/videoTypes";
// import bitsToMegabytes from "@/utils/bitsToMegaBytes";
// import React from "react";
// import { Player as VideoPlayer } from "react-tuby";
// import "react-tuby/css/main.css";

// const Player = ({ data }: { data: Welcome }) => {
//   console.log(data);

//   const mp4 = data?.result?.formats?.filter(
//     (format) => format.format === "18 - 640x360 (360p)"
//   );
//   // .map((obj) => {
//   //   return {
//   //     quality: obj.format_note + " - " + bitsToMegabytes(obj.filesize),
//   //     url: obj.url,
//   //   };
//   // });

//   console.log(mp4);

//   return (
//     <div className="w-full text-white">
//       {mp4 && (
//         <video
//           src={mp4[0]?.url}
//           controls
//           className="aspect-video w-full md:w-4/5"
//         />
//       )}
//     </div>
//   );
// };

// export default Player;
