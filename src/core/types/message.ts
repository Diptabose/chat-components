import { ReactNode } from "react";

export type MessageType = "assistant" | "user";

export interface Attachment {
  fileName: string;
  type?: string;
  createdOn: Date;
}

export type ChatMessage = {
  id: string;
  icon?: ReactNode;
  text: string;
  attachments?: Attachment[];
  footer?: ReactNode;
  loading?: boolean;
  type: MessageType;
};

export interface UserMessage extends ChatMessage {
  edit?: boolean;
  onResend?: () => void;
  onEdit?: (text: string) => void;
}

export interface AssistantMessage extends ChatMessage {
  loading?: boolean;
  streaming?: boolean;
  error?: boolean;
}
