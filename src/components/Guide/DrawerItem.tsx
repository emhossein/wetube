import React, { ComponentType } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Link from "next/link";
import { pageChange } from "@/redux/slices/guideStateSlice";

interface Props {
  text: string;
  icon: ComponentType;
}

const DrawerItems: React.FC<Props> = ({ text, icon: Icon }) => {
  const tabName = text.toLowerCase().replaceAll(" ", "-");

  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.guideStateReducer);

  const handlePageStateChange = () => {
    dispatch(pageChange(tabName));
  };

  return (
    <Link
      id={`nav-item-${text}`}
      href={`/${tabName}`}
      onClick={handlePageStateChange}
      className={`flex items-center ${
        tabName === page && "bg-gray-350"
      }  h-10 space-x-6 rounded-xl px-4 hover:cursor-pointer ${
        tabName === page ? "hover:bg-gray-hover" : "hover:bg-gray-350"
      }`}
    >
      {Icon && <Icon />}
      <p
        className={`text-base font-${tabName === page ? "semibold" : "normal"}`}
      >
        {text}
      </p>
    </Link>
  );
};

export default DrawerItems;
