import React from "react";
import TextMessage from "./TextMessage";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  img: {
    objectFit: "cover",
    // maxWidth: 500,
    maxHeight: 400,
  },
}));

type Props = {
  caption: string;
  image: string;
};

const PhotoMessage = (props: Props) => {
  const { image, caption } = props;
  const classes = useStyles();
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img src={image} alt={caption} className={classes.img} />
      <TextMessage text={caption} />
    </div>
  );
};

export default PhotoMessage;
