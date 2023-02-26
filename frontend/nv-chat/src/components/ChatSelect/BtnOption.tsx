import { IconButton, SvgIconTypeMap } from "@mui/material";
import React from "react";
import { SvgIconProps } from "@mui/material/SvgIcon/SvgIcon";

type Props = {
  selected?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function BtnOption(props: Props) {
  const { selected = false, children, onClick } = props;
  const childProps = {
    sx: { color: selected ? "#fff" : "inherit" },
  };
  const Icon = React.cloneElement(children, childProps);
  return (
    <IconButton
      onClick={onClick}
      sx={(theme) => ({
        bgcolor: selected ? theme.palette.primary.dark : "white",
        borderRadius: "0.5rem",
        width: "2.5rem",
        height: "2.5rem",
        ":active": {
          bgcolor: selected ? theme.palette.primary.dark : "white",
          transform: "scale(0.9)",
        },
        ":hover": {
          bgcolor: selected ? theme.palette.primary.dark : "white",
        },
        // "& > *":{
        //     '.MuiSvgIcon-root':{
        //         color:'#fff'
        //     }
        // }
      })}
    >
      {/* {children} */}
      {Icon}
    </IconButton>
  );
}

export default BtnOption;
