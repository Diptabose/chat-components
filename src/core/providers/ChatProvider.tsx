"use client";
import React, { PropsWithChildren, ReactNode, useRef } from "react";
import ChatContext from "../contexts/ChatContext";
import useCreateReducer from "../hooks/reducer/useCreateReducer";
import { ChatInitialState } from "../state/ChatState";
import { AxiosInstance } from "axios";
import { ChatMessage } from "../types/message";

interface ChatProviderProps {
  config: {
    UserMessage?: ReactNode;
    AssistantMessage?: ReactNode;
    axiosClient: AxiosInstance;
  };
  messages: ChatMessage[];
}

const ChatProvider = ({
  children,
  config,
  messages,
}: PropsWithChildren & ChatProviderProps) => {
  const chatContext = useCreateReducer({
    initialState: {
      ...ChatInitialState,
      messages,
    },
  });

  const { AssistantMessage, UserMessage, axiosClient } = config;
  const windowRef = useRef<HTMLDivElement | null>(null);
  const chatInputRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <ChatContext.Provider
      value={{
        ...chatContext,
        windowRef,
        chatInputRef,
        UserMessage,
        AssistantMessage,
        axiosClient,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
