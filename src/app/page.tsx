"use client";
import ChatBody from "@/core/components/chat/body/ChatBody";
import ChatFooter from "@/core/components/chat/footer/ChatFooter";
import ChatHeader from "@/core/components/chat/header/ChatHeader";
import { ChatInput } from "@/core/components/input/ChatInput";
import ChatWindow from "@/core/components/window/ChatWindow";
import { useChatUtils } from "@/core/hooks/chat/useChatUtils";
import useChatInput from "@/core/hooks/chat/useChatInput";
import useChatScroll from "@/core/hooks/chat/useChatScroll";
import useChatWindow from "@/core/hooks/chat/useChatWindow";
import useChat from "@/core/hooks/chat/useChat";
import useChatMessages from "@/core/hooks/chat/useChatMessages";

export default function Home() {
  const { conversation } = useChat();
  const { streamAssistantResponse } = useChatUtils();
  const { addMessage } = useChatMessages();

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
        <div className="w-full text-center font-semibold text-lg">
          Chat Application
        </div>
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
            className: "w-[50%] mx-auto my-2 ",
          }}
          placeholder="Type a message"
          onHeightChange={scrollBottom}
          onSend={async (message) => {
            addMessage(message);
            await streamAssistantResponse(message.text);
          }}
        />
        <ChatFooter>
          <div className="w-full text-center text-sm text-slate-600">
            Can make mistakes, please check for facts.
          </div>
        </ChatFooter>
      </ChatBody>
    </div>
  );
}
