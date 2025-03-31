import { ChatMessage } from "../types/message";

export type ChatStateType = {
  conversation: ChatMessage[];
  streaming?: boolean;
};

export const ChatInitialState: ChatStateType = {
  conversation: [],
  streaming: false,
};
