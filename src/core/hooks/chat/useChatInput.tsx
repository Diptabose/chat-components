import ChatContext from "@/core/contexts/ChatContext";
import { RefObject, useContext } from "react";

const useChatInput = (): RefObject<HTMLTextAreaElement | null> => {
  const { chatInputRef } = useContext(ChatContext);
  return chatInputRef;
};

export default useChatInput;
