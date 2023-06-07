/* eslint-disable @next/next/no-img-element */

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Image from "next/image";
import Link from "next/link";
import { fetchChannelFeaturedChannels } from "@/redux/slices/channelFeaturedChannelsSlice";

const ChannelChannelListing = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { data: channels } = useAppSelector(
    (state) => state.channelFeaturedChannelsReducer
  );

  useEffect(() => {
    dispatch(fetchChannelFeaturedChannels(id));
  }, []);

  return (
    <>
      {!channels?.data?.length && (
        <p className="my-3">No other channels by this creator.</p>
      )}
      <div className="mb-6 mt-6 grid w-80% grid-cols-2 gap-y-3 text-white md:grid-cols-4 lg:grid-cols-6">
        {channels?.data?.map((channel) => {
          return (
            <Link
              href={`/channel/${channel.channelId}`}
              className="w-full"
              key={channel.channelId}
            >
              <div className="center flex-col">
                <div className="h-[90px] w-[90px] rounded-full">
                  <img
                    src={`https:${
                      channel.thumbnail[channel.thumbnail.length - 1].url
                    }`}
                    alt={channel.title}
                    className="position-unset | rounded-full"
                  />
                </div>
                <p className="my-1 text-center text-sm">{channel.title}</p>
                <p className="text-center text-xs text-gray-light">
                  {channel.subscriberCount} subscribers
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ChannelChannelListing;
