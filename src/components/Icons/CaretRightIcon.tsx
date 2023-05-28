import React from "react";

interface CaretRightIconProps {
  onClick?: () => void;
}

const CaretRightIcon: React.FC<CaretRightIconProps> = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      height="24"
      viewBox="0 0 24 24"
      width="24"
      focusable="false"
      fill="#AAAAAA"
    >
      <path d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z"></path>
    </svg>
  );
};

export default CaretRightIcon;
