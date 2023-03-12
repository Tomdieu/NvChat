import React, { createContext, useContext, useEffect, useState } from "react";
import { GroupSerializer } from "types/GroupSerializer";

type groupContextType = {
  groups: GroupSerializer[] | [];
  setGroups: React.Dispatch<React.SetStateAction<[] | GroupSerializer[]>>;
  selectedGroup: GroupSerializer;
  setSelectedGroup: React.Dispatch<React.SetStateAction<GroupSerializer>>;
  isRightOpen: boolean;
  setIsRightOpen: React.Dispatch<React.SetStateAction<boolean>>;
  groupId: number;
  setGroupId: React.Dispatch<React.SetStateAction<number>>;
  toggle: () => void;
};

export const GroupContext = createContext<groupContextType>(null);

export const useGroup = () => useContext(GroupContext);

type Props = {
  children: React.ReactNode;
};

export const GroupContextProvider = (props: Props) => {
  const { children } = props;
  const [groups, setGroups] = useState<GroupSerializer[] | []>([]);
  const [selectedGroup, setSelectedGroup] = useState<GroupSerializer | null>(
    null
  );
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [groupId, setGroupId] = useState<number | null>(null);

  const toggle = () => {
    setIsRightOpen(!isRightOpen);
  };

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
