import { Grid } from "@mui/material";
import GroupSidebar from "Components/Chat/GroupSidebar/GroupSidebar";
import GroupChat from "Components/Chat/GroupChat/GroupChat";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GroupRightbar from "Components/Chat/GroupRightbar/GroupRightbar";

type Props = {};

const group = (props: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/auth/login");
    }
  }, []);
  return (
    <Grid container>
      <GroupSidebar />
      <GroupChat />
      <GroupRightbar />
    </Grid>
  );
};

export default group;
