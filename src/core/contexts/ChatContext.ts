import { RefObject, createContext } from "react";
import { ChatStateType } from "@/core/state/ChatState";
import { ActionStateType } from "@/core/hooks/reducer/useCreateReducer";

export interface ChatContextProps<T> {
  state: T;
  dispatch: ActionStateType<T>
  windowRef: RefObject<HTMLDivElement | null>;
  chatInputRef: RefObject<HTMLTextAreaElement | null>;
}

const ChatContext = createContext<ChatContextProps<ChatStateType>>(undefined!);
export default ChatContext;
