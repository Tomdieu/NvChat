import React, { createContext, useContext, useState } from "react";

export const GroupContext = createContext(null);

export const useGroup = () => useContext(GroupContext);

type Props = {
  children: React.ReactNode;
};

export const GroupContextProvider = (props: Props) => {
  const { children } = props;
  const [groups, setGroups] = useState();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupId, setGroupId] = useState(null);
  return (
    <GroupContext.Provider
      value={{
        groups,
        setGroups,
        selectedGroup,
        setSelectedGroup,
        groupId,
        setGroupId,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
