import { ChatMessage } from "../types/message";

export type ChatStateType = {
  messages: ChatMessage[];
  streaming: boolean;
};

export const ChatInitialState = {
  streaming: false,
};
