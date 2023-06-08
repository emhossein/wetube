/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import {
  fetchAdditionalSearchResult,
  fetchSearchResult,
  setSearchedTerm,
} from "@/redux/slices/searchSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Search from "@/components/Search/Search";
import { Welcome } from "@/types/searchTypes";
import { useBottomReached } from "@/hooks/useBottomReached";
import { usePathname } from "next/navigation";

const Page = () => {
  const pathname = usePathname();
  const term = pathname.split("/")[2].replaceAll("%20", " ");
  const isBottomReached = useBottomReached();

  const dispatch = useAppDispatch();
  const { data, searchedTerm, status } = useAppSelector(
    (state) => state.searchReducer
  );

  useEffect(() => {
    if (term !== searchedTerm) {
      dispatch(fetchSearchResult(term));
      dispatch(setSearchedTerm(term));
    }
  }, []);

  useEffect(() => {
    if (isBottomReached && data.continuation) {
      dispatch(
        fetchAdditionalSearchResult({
          token: data.continuation,
          query: searchedTerm,
        })
      );
    }
  }, [isBottomReached]);

  return <Search data={data as Welcome} status={status} />;
};

export default Page;
