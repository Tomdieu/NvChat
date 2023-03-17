import { Box, Button, Paper, Typography, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import { useGroup } from "Context/GroupContext";
import moment from "moment";
import ApiService from "Utils/ApiService";
import { useAuth } from "Context/AuthContext";

type Props = {};

const GroupDescription = (props: Props) => {
  const classes = useStyles();
  const { selectedGroup, groups, setGroups, setSelectedGroup, groupId } =
    useGroup();
  const { userToken, userProfile } = useAuth();
  const createdOn = moment(selectedGroup?.created_on).format("DD/MM/YYYY");

  const at = moment(selectedGroup?.created_on).format("HH:MM a");

  const created_by =
    selectedGroup?.created_by?.user?.username === userProfile?.user.username
      ? "You"
      : selectedGroup?.created_by?.user?.username;

  const [formOpen, setFormOpen] = useState(false);

  const [description, setDescription] = useState("");

  const previousDescription = selectedGroup?.description;

  useEffect(() => {
    setDescription(selectedGroup?.description);
  }, []);

  const handleCreateOrUpdate = () => {
    if (description) {
      if (description !== previousDescription) {
        ApiService.updateGroup({ description }, selectedGroup.id, userToken)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            if (data.id) {
              const othersGroups = groups.filter(
                (group) => group.id !== groupId
              );

              othersGroups.push(data);

              setSelectedGroup(data);

              setGroups(othersGroups);
            }
          })
          .catch((err) => console.log(err));
      }
    }
    setFormOpen(false);
    setDescription("");
  };

  return (
    <Box
      component={Paper}
      className={classes.groupDescriptionContainer}
      elevation={0}
      sx={{ borderRadius: 0 }}
    >
      <Box>
        {formOpen ? (
          <Box>
            <TextField
              placeholder="Fill the group description"
              maxRows={7}
              multiline
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Box
              sx={{ mt: 1 }}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Button color="error" onClick={() => setFormOpen(false)}>
                Cancel
              </Button>
              <Button color="success" onClick={handleCreateOrUpdate}>
                Ok
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <Typography
              color={"#3886e5fa"}
              sx={{ cursor: "pointer" }}
              onClick={() => setFormOpen(true)}
            >
              {selectedGroup?.description
                ? "Updated group description"
                : "Add a group description"}
            </Typography>
            <Box
              sx={{
                borderLeft: "3px solid #3886e5fa",
                p: 1,
                bgcolor: "#ece9e9c9",
                borderRadius: 1,
              }}
            >
              <p
                color={"grey"}
                style={{
                  color: "grey",
                  wordBreak: "break-word",
                  wordWrap: "break-word",
                }}
              >
                {selectedGroup?.description}
              </p>
            </Box>
          </>
        )}

        <Typography color="grey" flexWrap={"wrap"}>
          Group created by {created_by} on {createdOn} at {at}{" "}
        </Typography>
      </Box>
    </Box>
  );
};

export default GroupDescription;
