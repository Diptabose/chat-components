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
}

const MessageRenderer = ({ message }: MessageRendererProps) => {
  const MessageComponent = messageComponents[message.type]?.component;
  const FooterComponent = messageComponents[message.type]?.footer;
  return (
    <MessageComponent
      {...message}
      key={message.id}
      footer={
        FooterComponent ? (
          <FooterComponent message={message} />
        ) : null
      }
    />
  );
};

export default memo(MessageRenderer);
