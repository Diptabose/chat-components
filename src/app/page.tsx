"use client";
import { ChatInput } from "@/core/components/input/BaseInput";
import MarkdownMessage from "@/core/components/message/MarkdownMessage";
import ChatWindow from "@/core/components/window/ChatWindow";
import useChat, { useChatUtils } from "@/core/hooks/chat/useChat";
import useChatInput from "@/core/hooks/chat/useChatInput";
import useChatScroll from "@/core/hooks/chat/useChatScroll";
import useChatWindow from "@/core/hooks/chat/useChatWindow";

export default function Home() {
  const { conversation } = useChat();
  const { addMessage, getServerResponse, abortChat } = useChatUtils();

  const scrollableRef = useChatWindow();
  const inputRef = useChatInput();

  const { scrollBottom } = useChatScroll(
    scrollableRef,
    {
      autoScroll: true,
    },
    [conversation]
  );

  return (
    <div className="flex flex-col h-svh gap-2">
      <ChatWindow
        scrollableRef={scrollableRef}
        currentConversation={conversation}
        placement="sequential"
      />

      <div className="w-1/2 self-center p-2">
        <ChatInput
          ref={inputRef}
          placeholder="Type a message"
          onHeightChange={scrollBottom}
          onSend={async (message) => {
            addMessage(message);
            await getServerResponse();
          }}
        />
      </div>
    </div>
  );
}
