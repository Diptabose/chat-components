import React, { RefObject, ReactElement } from "react";
import { ChatMessage } from "../message/ChatMessage";
import { Message } from "@/core/types/ChatTypes";
import { message_aligment } from "./chat-message-alignment";
import { cn } from "@/core/utils/cn";
import UserMessage from "../message/user/UserMessage";
import MessageFooter from "../message/user/UserMessageFooter";

interface ChatWindowProps<T extends Message> {
  scrollableRef: RefObject<HTMLDivElement | null>;
  currentConversation: T[];
  placement?: "sequential" | "extreme";
  messageComponent?: (message: T, index: number) => ReactElement;
}

// Default message renderer for ChatMessage
const defaultMessageRenderer = <T extends Message>(
  message: T,
  index: number
) => (
  <ChatMessage
    key={index}
    type={message.type}
    format="markdown"
    wrapperProps={{
      className: cn(
        message_aligment({
          align: message.placement,
          type: message.type,
        })
      ),
    }}
  >
    {message.text}
  </ChatMessage>
);

const ChatWindow = <T extends Message>({
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
          {currentConversation.map((message, value) => {
            return (
              <UserMessage
                key={value}
                text={message.text}
                footer={<MessageFooter />}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
