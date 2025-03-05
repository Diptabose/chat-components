import React, { RefObject, ReactElement, useCallback } from "react";
import { ChatMessage } from "../message/ChatMessage";
import { Message } from "@/core/types/ChatTypes";
import { message_aligment } from "./chat-message-alignment";
import { cn } from "@/core/utils/cn";

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
  const renderMessage = useCallback(
    (message: T, index: number) =>
      messageComponent
        ? messageComponent(message, index)
        : defaultMessageRenderer({ ...message, placement } as T, index),
    [messageComponent, placement]
  );

  return (
    <div
      className="flex flex-col overflow-y-auto flex-1 p-2"
      ref={scrollableRef}
    >
      <div className="flex flex-col gap-2 w-1/2 self-center">
        {currentConversation.map(renderMessage)}
      </div>
    </div>
  );
};

export default ChatWindow;
