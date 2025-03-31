"use client";
import React, { PropsWithChildren, useRef } from "react";
import ChatContext from "../contexts/ChatContext";
import useCreateReducer from "../hooks/reducer/useCreateReducer";
import { ChatInitialState, ChatStateType } from "../state/ChatState";
import { ChatMessage } from "../types/message";

const ChatProvider = (props: PropsWithChildren) => {
  const chatContext = useCreateReducer({
    initialState: ChatInitialState,
  });

  chatContext.dispatch({field:'conversation', value:(prev)=>{
    return prev
  }})

  const windowRef = useRef<HTMLDivElement | null>(null);
  const chatInputRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <ChatContext.Provider value={{ ...chatContext, windowRef, chatInputRef }}>
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
