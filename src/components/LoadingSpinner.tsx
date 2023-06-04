import React from "react";

const LoadingSpinner = ({ h, w }: { h?: string; w?: string }) => {
  return (
    <div className="my-4 flex items-center justify-center">
      <div
        className={`inline-block ${h ? "h-" + h : "h-12"} ${
          w ? "w-" + w : "w-12"
        } animate-spin rounded-full border-4 border-solid border-current border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
