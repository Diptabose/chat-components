import { Dispatch, RefObject, createContext } from "react";
import { ChatStateType } from "@/core/state/ChatState";
import { ActionType } from "@/core/hooks/reducer/useCreateReducer";

export interface ChatContextProps {
  state: ChatStateType;
  dispatch: Dispatch<ActionType<ChatStateType>>;
  windowRef: RefObject<HTMLDivElement | null>;
  chatInputRef: RefObject<HTMLTextAreaElement | null>;
}

const ChatContext = createContext<ChatContextProps>(undefined!);
export default ChatContext;
