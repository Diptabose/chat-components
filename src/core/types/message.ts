import { ReactNode } from "react";

export interface Attachment {
  fileName: string;
  type?: string;
  createdOn: Date;
}

export type ChatMessage = {
  icon?: ReactNode;
  text: string;
  attachments?: Attachment[];
  footer?: ReactNode;
};
