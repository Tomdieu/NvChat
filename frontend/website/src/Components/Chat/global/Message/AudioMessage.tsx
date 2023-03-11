import React from "react";

type Props = {
  audio: string;
  caption: string;
};

const AudioMessage = (props: Props) => {
  const { audio, caption } = props;
  return (
    <div>
      <audio controls>
        <source src={audio} type="audio/ogg" />
        <source src={audio} type="audio/mpeg" />
        <source src={audio} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioMessage;
