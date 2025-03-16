import ChatContext, { ChatContextProps } from "@/core/contexts/ChatContext";
import { Message } from "@/core/types/ChatTypes";
import { useCallback, useContext } from "react";

const useChat = () => {
  const chatContext = useContext<ChatContextProps>(ChatContext);

  if (!chatContext) {
    throw new Error("useChat must be used within a ChatContext provider");
  }

  const {
    state: { conversation },
  } = chatContext;

  return { conversation };
};

export default useChat;
