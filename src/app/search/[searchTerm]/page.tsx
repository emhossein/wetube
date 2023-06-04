"use client";

import Search from "@/components/Search/Search";
import { useBottomReached } from "@/hooks/useBottomReached";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchAdditionalSearchResult,
  fetchSearchResult,
  setSearchedTerm,
} from "@/redux/slices/searchSlice";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const pathname = usePathname();
  const term = pathname.split("/")[2].replaceAll("%20", " ");
  const isBottomReached = useBottomReached();

  const dispatch = useAppDispatch();
  const { data, searchedTerm } = useAppSelector((state) => state.searchReducer);

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

  return <Search />;
};

export default Page;
