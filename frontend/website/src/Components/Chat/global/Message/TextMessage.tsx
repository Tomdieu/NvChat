import React from "react";

type Props = {
  text: string;
};

const TextMessage = (props: Props) => {
  const { text } = props;
  return (
    <span
      style={{
        borderRadius: 5,
        padding: 2,
        overflow: "wrap",
        wordBreak: "break-all",
      }}
    >
      {text}
    </span>
  );
};

export default TextMessage;
