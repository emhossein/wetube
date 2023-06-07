/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";

import React, { useEffect } from "react";
import {
  fetchAdditionalShorts,
  fetchShorts,
} from "@/redux/slices/shortsVideoSlice";

import ShortsContainer from "@/components/Shorts/ShortsContainer";
import { fetchShortsSequence } from "@/redux/slices/shortsSequenceSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const shorts = searchParams.get("sh");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdditionalShorts({ id: shorts! }));
    dispatch(fetchShortsSequence(shorts!));
  }, []);

  return (
    <div className="no-scrollbar | h-[100vh-54px] w-full">
      <ShortsContainer />
    </div>
  );
};

export default Page;
