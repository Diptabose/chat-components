"use client";
import React, { PropsWithChildren } from "react";
import ChatContext from "../contexts/ChatContext";
import useCreateReducer from "../hooks/reducer/useCreateReducer";
import { ChatInitialState } from "../state/ChatState";

const ChatProvider = (props: PropsWithChildren) => {
  const chatContext = useCreateReducer({
    initialState: ChatInitialState,
  });

  return (
    <ChatContext.Provider value={chatContext}>
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
