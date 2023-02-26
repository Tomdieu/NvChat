import React, { useEffect, useState } from "react";

import { ChatContext } from "context/ChatContext";
import ApiService from "utils/ApiService";
import { useAuthContext } from "context/AuthContext";

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

  const [discussionsList, setDiscussionsList] = useState([]);
  const [groupsList, setGroupsList] = useState([]);

  const [selectedDiscussion, setSelectedDiscussion] = useState({});

  const [selectedGroup, setSelectedGroup] = useState({});

  const [isRightOpen, setIsRightOpen] = useState(false);

  const [discussionId, setDiscussionId] = useState(null);

  const toggleRight = () => setIsRightOpen(!isRightOpen);

  const { userToken } = useAuthContext();

  useEffect(() => {
    const discussions = localStorage.getItem("discussions");
    if (discussions) {
      setDiscussionsList(JSON.parse(discussions));
    }
    const groups = localStorage.getItem("groups");
    if (groups) {
      setGroupsList(JSON.parse(groups));
    }
  }, []);

  useEffect(() => {
    if (discussionsList.length > 0) {
      localStorage.setItem("discussions", JSON.stringify(discussionsList));
    }
    if (groupsList.length > 0) {
      localStorage.setItem("groups", JSON.stringify(groupsList));
    }
  }, [discussionsList, groupsList]);

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

  console.log("Running every time");

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
