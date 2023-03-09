import { Grid } from "@mui/material";
import GroupSidebar from "Components/Chat/GroupSidebar/GroupSidebar";
import GroupChat from "Components/Chat/GroupChat/GroupChat";

type Props = {};

const group = (props: Props) => {
  return (
    <Grid container>
      <GroupSidebar />
      <GroupChat />
    </Grid>
  );
};

export default group;
