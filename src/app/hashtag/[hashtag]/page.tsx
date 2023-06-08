/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import {
  fetchAdditionalHashtagResult,
  fetchHashtagResult,
} from "@/redux/slices/hashtagSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Search from "@/components/Search/Search";
import { Welcome } from "@/types/hashtagTypes";
import { useBottomReached } from "@/hooks/useBottomReached";
import { usePathname } from "next/navigation";

const Page = () => {
  const isBottomReached = useBottomReached();

  const pathname = usePathname();
  const tag = pathname.split("/")[2];

  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.hashtagReducer);

  useEffect(() => {
    dispatch(fetchHashtagResult(tag));
  }, []);

  useEffect(() => {
    if (isBottomReached && data.continuation) {
      dispatch(fetchAdditionalHashtagResult({ tag, token: data.continuation }));
    }
  }, [isBottomReached]);

  return (
    <>
      <Search data={data as Welcome} status={status} />
    </>
  );
};

export default Page;
