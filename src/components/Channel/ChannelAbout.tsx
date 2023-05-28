import React from "react";

const ChannelAbout = ({ about }: { about: string }) => {
  const lines = about.split("\n");

  return (
    <div>
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ChannelAbout;
