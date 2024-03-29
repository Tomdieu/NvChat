import ApiService from "utils/ApiService";
import React, { createContext, useContext, useEffect, useState } from "react";
import { GroupSerializer } from "types/GroupSerializer";
import { useAuth } from "./AuthContext";

type groupContextType = {
  groups: GroupSerializer[];
  setGroups: React.Dispatch<React.SetStateAction<GroupSerializer[]>>;
  selectedGroup: GroupSerializer;
  setSelectedGroup: React.Dispatch<React.SetStateAction<GroupSerializer>>;
  isRightOpen: boolean;
  setIsRightOpen: React.Dispatch<React.SetStateAction<boolean>>;
  groupId: number;
  setGroupId: React.Dispatch<React.SetStateAction<number>>;
  toggle: () => void;
};

export const GroupContext = createContext<groupContextType>(null);
GroupContext.displayName = "GroupContext";

export const useGroup = () => useContext(GroupContext);

type Props = {
  children: React.ReactNode;
};

export const GroupContextProvider = (props: Props) => {
  const { children } = props;
  const [groups, setGroups] = useState<GroupSerializer[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<GroupSerializer | null>(
    null
  );
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [groupId, setGroupId] = useState<number | null>(null);

  const { newGroup, setNewGroup } = useAuth();

  useEffect(() => {
    if (newGroup) {
      setGroups([...groups, newGroup]);
      setNewGroup(null);
    }
  }, [newGroup]);

  const toggle = () => {
    setIsRightOpen(!isRightOpen);
  };

  useEffect(() => {
    if (groupId) {
      localStorage.setItem("groupId", groupId.toString());
    }
    if (selectedGroup) {
      // setIsRightOpen(false);
      localStorage.setItem("selectedGroup", JSON.stringify(selectedGroup));

      setGroupId(selectedGroup.id);
    }
  }, [groupId, selectedGroup]);

  useEffect(() => {
    const _groupId = localStorage.getItem("groupId");
    if (_groupId) {
      setGroupId(Number(_groupId));
    }
    const _groups = localStorage.getItem("groups");
    if (_groups) {
      setGroups(JSON.parse(_groups));
    }
    const _selectedGroup = localStorage.getItem("selectedGroup");
    if (_selectedGroup && _groups) {
      const x: GroupSerializer = JSON.parse(_selectedGroup);
      setSelectedGroup(x);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      ApiService.getGroups(token)
        .then((res) => res.json())
        .then((data) => {
          setGroups(data.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(() => {
    if (groups.length > 0) {
      localStorage.setItem("groups", JSON.stringify(groups));
    }
  }, [groups]);

  useEffect(() => {
    const _groups = localStorage.getItem("groups");
    if (_groups) {
      setGroups(JSON.parse(_groups));
    }
  }, []);

  return (
    <GroupContext.Provider
      value={{
        groups,
        setGroups,
        selectedGroup,
        setSelectedGroup,
        groupId,
        setGroupId,
        isRightOpen,
        setIsRightOpen,
        toggle,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
