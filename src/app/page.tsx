"use client";
import ChatBody from "@/core/components/chat/body/ChatBody";
import ChatFooter from "@/core/components/chat/footer/ChatFooter";
import ChatHeader from "@/core/components/chat/header/ChatHeader";
import { ChatInput } from "@/core/components/input/BaseInput";
import MarkdownMessage from "@/core/components/message/base/markdown/MarkdownMessage";
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
    <div className="flex flex-col h-svh overflow-auto gap-2 ">
      <ChatHeader>
        <div>Hello world</div>
      </ChatHeader>
      <ChatBody>
        <ChatWindow
          scrollableRef={scrollableRef}
          currentConversation={conversation}
          placement="sequential"
        />

        <ChatInput
          ref={inputRef}
          rootProps={{
            className: "w-[50%] mx-auto my-2",
          }}
          placeholder="Type a message"
          onHeightChange={scrollBottom}
          onSend={async (message) => {
            addMessage(message);
            await getServerResponse();
          }}
        />
        <ChatFooter>
          <div>Hello this is footer</div>
        </ChatFooter>
      </ChatBody>
    </div>
  );
}
