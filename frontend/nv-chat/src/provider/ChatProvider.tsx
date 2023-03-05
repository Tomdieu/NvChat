import React, { useEffect, useState } from "react";

import { ChatContext } from "context/ChatContext";
import ApiService from "utils/ApiService";
import { useAuthContext } from "context/AuthContext";
import { Conversation } from "types/ConversationSerializer";
import { GroupSerializer } from "types/GroupSerializer";

type Props = {
  children: React.ReactNode;
};

const ChatProvider = (props: Props) => {
  const { children } = props;
  const [selectedButton, setSelectedButton] = useState<
    "chat" | "group" | "post" | "friends" | "settings" | "notifications"
  >("chat");

  const handleClick = (
    option: "chat" | "group" | "post" | "friends" | "settings" | "notifications"
  ) => {
    setSelectedButton(option);
  };
  const [selectedChatType, setSelectedChatType] = useState<
    null | "discussion" | "group" | "post"
  >(null);

  const [discussionsList, setDiscussionsList] = useState<[] | Conversation[]>(
    []
  );
  const [groupsList, setGroupsList] = useState<GroupSerializer[] | []>([]);

  const [selectedDiscussion, setSelectedDiscussion] =
    useState<null | Conversation>(null);

  const [selectedGroup, setSelectedGroup] = useState<null | GroupSerializer>(
    null
  );

  const [isRightOpen, setIsRightOpen] = useState<Boolean>(false);

  const [discussionId, setDiscussionId] = useState<null | number>(null);

  const toggleRight = () => setIsRightOpen(!isRightOpen);

  const { userToken } = useAuthContext();

  useEffect(() => {
    if (discussionId) {
      localStorage.setItem("discussionId", discussionId.toString());
    }
    localStorage.setItem("isRightOpen", String(isRightOpen));

    if (selectedDiscussion) {
      localStorage.setItem(
        "selectedDiscussion",
        JSON.stringify(selectedDiscussion)
      );
    }
    if (selectedGroup) {
      localStorage.setItem("selectedGroup", JSON.stringify(selectedGroup));
    }
    if (discussionsList.length > 0) {
      localStorage.setItem("discussions", JSON.stringify(discussionsList));
    }
    if (groupsList.length > 0) {
      localStorage.setItem("groups", JSON.stringify(groupsList));
    }
  }, [
    discussionId,
    isRightOpen,
    selectedDiscussion,
    selectedGroup,
    discussionsList,
    groupsList,
  ]);

  useEffect(() => {
    const discussions = localStorage.getItem("discussions");
    if (discussions) {
      setDiscussionsList(JSON.parse(discussions));
    }
    const groups = localStorage.getItem("groups");
    if (groups) {
      setGroupsList(JSON.parse(groups));
    }
    const discId = localStorage.getItem("discussionId");
    if (discId) {
      setDiscussionId(Number(discId));
    }
    const iRO = localStorage.getItem("isRightOpen");
    if (iRO) {
      setIsRightOpen(Boolean(iRO === "true"));
    }
    const selectDisc = localStorage.getItem("selectedDiscussion");
    if (selectDisc) {
      setSelectedDiscussion(JSON.parse(selectDisc));
    }
    const selectGroup = localStorage.getItem("selectedGroup");
    if (selectGroup) {
      setSelectedGroup(JSON.parse(selectGroup));
    }
  }, []);

  const getGroups = () => {
    if (userToken) {
      ApiService.getGroups(userToken)
        .then((res) => res.json())
        .then((data) => {
          // console.log("G", { data });
          if (data.success) {
            setGroupsList(data.data);
          } else {
            alert(data.success);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const getDiscussions = () => {
    if (userToken) {
      ApiService.getDiscussion(userToken)
        .then((res) => res.json())
        .then((data) => {
          setDiscussionsList(data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (
      userToken &&
      (discussionsList.length === 0 || groupsList.length === 0)
    ) {
      getDiscussions();
      getGroups();
    }
  }, [userToken]);

  return (
    <ChatContext.Provider
      value={{
        selectedButton,
        setSelectedButton,
        handleClick,
        selectedChatType,
        setSelectedChatType,
        discussionsList,
        setDiscussionsList,
        groupsList,
        setGroupsList,
        selectedDiscussion,
        setSelectedDiscussion,
        discussionId,
        setDiscussionId,
        selectedGroup,
        setSelectedGroup,
        isRightOpen,
        setIsRightOpen,
        toggleRight,
        getGroups,
        getDiscussions,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
