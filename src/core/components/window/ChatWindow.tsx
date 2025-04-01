import React, { RefObject, ReactElement } from "react";
import { message_aligment } from "./chat-message-alignment";
import { cn } from "@/core/utils/cn";
import UserMessage from "../message/user/UserMessage";
import MessageFooter from "../message/user/UserMessageFooter";
import { ChatMessage } from "@/core/types/message";
import AssitantMessage from "../message/assistant/AssitantMessage";
import AssistantMessageFooter from "../message/assistant/AssistantMessageFooter";
import MessageRenderer from "../message/renderer/MessageRenderer";

interface ChatWindowProps<T extends ChatMessage> {
  scrollableRef: RefObject<HTMLDivElement | null>;
  currentConversation: T[];
  placement?: "sequential" | "extreme";
  messageComponent?: (message: T, index: number) => ReactElement;
}

const ChatWindow = <T extends ChatMessage>({
  scrollableRef,
  currentConversation,
  placement = "sequential",
  messageComponent,
}: ChatWindowProps<T>) => {
  return (
    <div
      className="flex flex-col overflow-y-auto h-full flex-1 py-2"
      ref={scrollableRef}
    >
      <div className="w-[50%] mx-auto">
        <div className="flex flex-col gap-2">
          {currentConversation?.map((message, index) => {
            return (
              <MessageRenderer message={message} position={index} key={index} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
