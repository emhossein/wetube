import { WelcomeDatum } from "@/types/channelDetailsTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ChannelChannelListing = ({ channels }: { channels: WelcomeDatum[] }) => {
  console.log(channels);

  return (
    <>
      {!channels.length && (
        <p className="my-3">No other channels by this creator.</p>
      )}
      <div className="mx-auto mt-6 w-80% text-white">
        {channels.map((channel) => {
          return (
            <div key={channel.title}>
              <p>{channel.title}</p>
              <div className="mt-6 flex flex-col items-center space-y-5 md:flex-row md:space-y-0">
                {channel.data.map((dt) => {
                  return (
                    <Link
                      key={dt.channelId}
                      href={`/channel/${dt.channelId}`}
                      className="flex w-48 flex-col items-center justify-between"
                    >
                      <div className="relative mb-1 min-h-[90px] min-w-[90px] overflow-hidden rounded-full md:h-24 md:w-24">
                        <Image
                          src={`https:${dt.thumbnail?.[1].url}`}
                          alt={channel.title}
                          fill
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="mb-2 text-center text-lg">{dt.title}</p>
                        <p className="text-center text-xs text-gray-light">
                          {dt.subscriberCount} subscribers
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChannelChannelListing;
