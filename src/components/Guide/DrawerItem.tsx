import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { pageChange } from "@/redux/slices/guideStateSlice";
import Link from "next/link";
import React, { ComponentType } from "react";

interface Props {
  text: string;
  icon: ComponentType;
}

const DrawerItems: React.FC<Props> = ({ text, icon: Icon }) => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.guideStateReducer);

  const handlePageStateChange = () => {
    dispatch(pageChange(text));
  };

  return (
    <Link
      id={`nav-item-${text}`}
      href={`/${text.toLowerCase()}`}
      onClick={handlePageStateChange}
      className={`flex items-center ${
        text === page && "bg-gray-350"
      }  h-10 space-x-6 rounded-xl px-4 hover:cursor-pointer ${
        text === page ? "hover:bg-gray-hover" : "hover:bg-gray-350"
      }`}
    >
      {Icon && <Icon />}
      <p className={`text-base font-${text === page ? "semibold" : "normal"}`}>
        {text}
      </p>
    </Link>
  );
};

export default DrawerItems;
