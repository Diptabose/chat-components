import { ChatMessage } from "../types/message"

export type ChatStateType = {
  conversation: ChatMessage[]
}

export const ChatInitialState: ChatStateType = {
  conversation: []
}