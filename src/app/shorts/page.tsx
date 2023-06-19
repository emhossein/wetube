/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";

import React, { useEffect } from "react";
import {
  deleteData,
  fetchShortsSequence,
} from "@/redux/slices/shortsSequenceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePathname, useSearchParams } from "next/navigation";

import ShortsContainer from "@/components/Shorts/ShortsContainer";
import { fetchAdditionalShorts } from "@/redux/slices/shortsVideoSlice";

const Page = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const shortsId = searchParams.get("sh");

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.shortsListReducer);
  console.log(data);

  useEffect(() => {
    dispatch(fetchAdditionalShorts({ id: shortsId! }));
    dispatch(fetchShortsSequence(shortsId!));
  }, []);

  return (
    <div className="no-scrollbar | h-[100vh-54px] w-full">
      <ShortsContainer />
    </div>
  );
};

export default Page;
