import ChatContext, { ChatContextProps } from "@/core/contexts/ChatContext";
import { ChatStateType } from "@/core/state/ChatState";
import { useCallback, useContext, useMemo } from "react";

const useChat = () => {
  const chatContext = useContext<ChatContextProps<ChatStateType>>(ChatContext);

  if (!chatContext) {
    throw new Error("useChat must be used within a ChatContext provider");
  }

  const {
    state: { messages, streaming },
    axiosClient,
    dispatch,
  } = chatContext;

  const setStream = useCallback((stream: boolean) => {
    dispatch("streaming", stream);
  }, []);

  const httpClient = useMemo(() => axiosClient, []);

  return { messages, streaming, setStream, httpClient };
};

export default useChat;
