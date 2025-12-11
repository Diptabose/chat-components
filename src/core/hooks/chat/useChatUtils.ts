import { useCallback } from "react";

export const useChatUtils = () => {
  const generateMessageId = useCallback(() => {
    return crypto.randomUUID();
  }, []);
  return { generateMessageId };
};
