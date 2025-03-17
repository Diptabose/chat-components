import { memo } from "react";
import AssistantMessageFooter from "@/core/components/message/assistant/AssistantMessageFooter";
import AssitantMessage from "@/core/components/message/assistant/AssitantMessage";
import UserMessage from "@/core/components/message/user/UserMessage";
import UserMessageFooter from "@/core/components/message/user/UserMessageFooter";
import { ChatMessage } from "@/core/types/message";

const messageComponents = Object.freeze({
  assistant: {
    component: memo(AssitantMessage),
    footer: memo(AssistantMessageFooter),
  },
  user: {
    component: memo(UserMessage),
    footer: memo(UserMessageFooter),
  },
});

interface MessageRendererProps {
  message: ChatMessage;
  position: number;
}

const MessageRenderer = ({ message, position }: MessageRendererProps) => {
  const MessageComponent = messageComponents[message.type]?.component;
  const FooterComponent = messageComponents[message.type]?.footer;
  return (
    <MessageComponent
      {...message}
      key={position}
      footer={
        FooterComponent ? (
          <FooterComponent message={message} position={position} />
        ) : null
      }
    />
  );
};

export default memo(MessageRenderer);
