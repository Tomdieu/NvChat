import { Snackbar, SnackbarProps } from "@mui/material";

type Props = {} & SnackbarProps;

const SnackBar = (props: Props) => {
  const { children, ...other } = props;

  return <Snackbar {...other}>{children}</Snackbar>;
};

export default SnackBar;
