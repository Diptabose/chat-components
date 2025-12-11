import ChatContext, { ChatContextProps } from "@/core/contexts/ChatContext";
import { ChatStateType } from "@/core/state/ChatState";
import { ChatMessage, MessageType } from "@/core/types/message";
import { useCallback, useContext, useState } from "react";

const useChatMessages = () => {
  const chatContext = useContext<ChatContextProps<ChatStateType>>(ChatContext);

  if (!chatContext) {
    throw new Error(
      "useChatMessages must be used within a ChatContext provider"
    );
  }

  const {
    state: { messages },
    dispatch,
  } = chatContext;

  const addMessage = useCallback((message: ChatMessage) => {
    dispatch("messages", (prev) => [...prev, message]);
  }, []);

  const appendStreamChunk = useCallback((chunk: string) => {
    dispatch("messages", (prev) => {
      // Append to the last message
      const updatedMessages = [...prev];
      const prevLength = prev.length - 1;
      updatedMessages[prevLength] = {
        ...updatedMessages[prevLength],
        text: updatedMessages[prevLength].text + chunk,
      };
      return updatedMessages;
    });
  }, []);

  const thinking = useCallback((think: boolean) => {
    dispatch("messages", (prev) => {
      // Append to the last message
      const updatedMessages = [...prev];
      const prevLength = prev.length - 1;
      updatedMessages[prevLength] = {
        ...updatedMessages[prevLength],
        loading: think,
      };
      return updatedMessages;
    });
  }, []);

  const getLastMessage = useCallback(
    (type: MessageType) => {
      const conversationLength = messages?.length;
      for (let i = conversationLength - 1; i >= 0; i--) {
        const message = messages[i];
        if (message.type === type) {
          return message;
        }
      }
    },
    [messages]
  );

  const getMessageByIndex = useCallback(
    (index: number, offset: number = 0) => {
      return messages[index - offset];
    },
    [messages]
  );

  const updateLastMessage = useCallback(
    <T extends ChatMessage>(message: Partial<T>) => {
      dispatch("messages", (prev) => {
        // Append to the last message
        const updatedMessages = [...prev];
        const prevLength = prev.length - 1;
        updatedMessages[prevLength] = {
          ...updatedMessages[prevLength],
          ...message,
        };
        return updatedMessages;
      });
    },
    []
  );

  const updateMessageAtId = useCallback(
    <T extends ChatMessage>(message: Partial<T>, id: string) => {
      dispatch("messages", (prev) => {
        const updatedMessages = [...prev];
        const at = updatedMessages.findIndex((message) => message.id === id);
        if (at) {
          updatedMessages[at] = {
            ...updatedMessages[at],
            ...message,
          };
        }
        return updatedMessages;
      });
    },
    []
  );

  return {
    addMessage,
    appendStreamChunk,
    thinking,
    getLastMessage,
    updateLastMessage,
    updateMessageAtId,
    getMessageByIndex,
  };
};

export default useChatMessages;
