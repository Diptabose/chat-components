import ChatContext from "@/core/contexts/ChatContext";
import { RefObject, useContext } from "react";

const useChatWindow = (): RefObject<HTMLDivElement | null> => {
  const { windowRef } = useContext(ChatContext);
  return windowRef;
};

export default useChatWindow;
