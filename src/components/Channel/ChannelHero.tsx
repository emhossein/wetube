import Image from "next/image";
import React from "react";
import { CaretRightIcon, VerifiedIcon } from "../Icons";
import { Welcome } from "@/types/channelDetailsTypes";
import formatNumber from "@/utils/numberFormat";
import Link from "next/link";
import { base64 } from "@/utils/base64Placeholder";

const Channel = ({ data }: { data: Welcome }) => {
  return (
    <div>
      <div className="w-full ">
        <Image
          src={data?.meta?.banner?.[data.meta?.banner.length - 1]?.url}
          alt={data?.meta?.channelHandle}
          fill
          className="position-unset | h-full w-full"
          placeholder="blur"
          blurDataURL={base64}
          priority
        />
      </div>

      <div className="mx-auto flex w-4/5 flex-col items-center pb-1 pt-4 md:flex-row">
        <div className="relative mr-6 h-12 w-12 md:h-24 md:w-24 lg:h-32 lg:w-32">
          <Image
            src={data?.meta?.avatar[data.meta?.avatar.length - 1]?.url}
            alt={data.meta?.title}
            fill
            placeholder="blur"
            blurDataURL={base64}
            className="rounded-full"
            priority
          />
        </div>
        <div className="flex flex-col items-center text-white md:items-start">
          <div className="mb-1 flex items-baseline">
            <p className="mr-2 text-lg leading-8 md:text-2xl">
              {data.meta?.title}
            </p>
            {data?.meta?.isVerified && <VerifiedIcon />}
          </div>
          <div className="mb-2 flex space-x-2">
            <p className="text-xs leading-5 text-gray-light md:text-sm">
              {data.meta?.channelHandle}
            </p>
            <p className="text-xs leading-5 text-gray-light md:text-sm">
              {formatNumber(Number(data.meta?.subscriberCount))} subscribers
            </p>
            <p className="text-xs leading-5 text-gray-light md:text-sm">
              {data.meta?.videosCount} videos
            </p>
          </div>
          <Link
            href={`/channel/${data.meta?.channelId}/about`}
            className="flex items-center text-xs leading-5 text-gray-light hover:underline md:text-sm"
          >
            {data.meta?.description.split("\n")[0].slice(0, 50) + "..."}
            <CaretRightIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Channel;
