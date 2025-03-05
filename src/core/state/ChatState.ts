import { Message } from "../types/ChatTypes"

export type ChatStateType = {
  conversation: Message[]
}

export const ChatInitialState: ChatStateType = {
  conversation: []
}