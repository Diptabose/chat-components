import ChatContext, { ChatContextProps } from "@/core/contexts/ChatContext";
import { ChatStateType } from "@/core/state/ChatState";
import { ChatMessage, MessageType } from "@/core/types/message";
import { useCallback, useContext, useState } from "react";

const useChatMessages = () => {
  const chatContext = useContext<ChatContextProps<ChatStateType>>(ChatContext);

  if (!chatContext) {
    throw new Error("useChat must be used within a ChatContext provider");
  }

  const {
    state: { conversation },
    dispatch,
  } = chatContext;

  const addMessage = useCallback((message: ChatMessage) => {
    dispatch("conversation", (prev) => [...prev, message]);
  }, []);

  const appendStreamChunk = useCallback((chunk: string) => {
    dispatch(
      "conversation",
      (prev) => {
        // Append to the last message
        const updatedMessages = [...prev];
        const prevLength = prev.length - 1;
        updatedMessages[prevLength] = {
          ...updatedMessages[prevLength],
          text: updatedMessages[prevLength].text + chunk,
        };
        return updatedMessages;
      },
    );
  }, []);

  const thinking = useCallback((think: boolean) => {
    dispatch(
      "conversation",
      (prev) => {
        // Append to the last message
        const updatedMessages = [...prev];
        const prevLength = prev.length - 1;
        updatedMessages[prevLength] = {
          ...updatedMessages[prevLength],
          loading: think,
        };
        return updatedMessages;
      },
    );
  }, []);

  const getLastMessage = useCallback(
    (type: MessageType) => {
      const conversationLength = conversation?.length;
      for (let i = conversationLength - 1; i >= 0; i--) {
        const message = conversation[i];
        if (message.type === type) {
          return message;
        }
      }
    },
    [conversation]
  );

  const getMessageByIndex = useCallback(
    (index: number, offset: number = 0) => {
      return conversation[index - offset];
    },
    [conversation]
  );

  const updateLastMessage = useCallback((message: Partial<ChatMessage>) => {
    dispatch(
      "conversation",
      (prev) => {
        // Append to the last message
        const updatedMessages = [...prev];
        const prevLength = prev.length - 1;
        updatedMessages[prevLength] = {
          ...updatedMessages[prevLength],
          ...message,
        };
        return updatedMessages;
      },
    );
  }, []);

  const updateMessageAt = useCallback(
    <T extends ChatMessage>(message: Partial<T>, at: number) => {
      dispatch(
        "conversation",
        (prev) => {
          // Append to the last message
          const updatedMessages = [...prev];
          updatedMessages[at] = {
            ...updatedMessages[at],
            ...message,
          };
          return updatedMessages;
        },
      );
    },
    []
  );

  return {
    addMessage,
    appendStreamChunk,
    thinking,
    getLastMessage,
    updateLastMessage,
    updateMessageAt,
    getMessageByIndex,
  };
};

export default useChatMessages;
