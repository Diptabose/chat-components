"use client";
import ChatBody from "@/core/components/chat/body/ChatBody";
import ChatFooter from "@/core/components/chat/footer/ChatFooter";
import ChatHeader from "@/core/components/chat/header/ChatHeader";
import { ChatInput } from "@/core/components/input/ChatInput";
import ChatWindow from "@/core/components/window/ChatWindow";
import useChatInput from "@/core/hooks/chat/useChatInput";
import useChatScroll from "@/core/hooks/chat/useChatScroll";
import useChatWindow from "@/core/hooks/chat/useChatWindow";
import useChat from "@/core/hooks/chat/useChat";
import useChatMessages from "@/core/hooks/chat/useChatMessages";
import MessageRenderer from "@/core/components/message/renderer/MessageRenderer";
import { useChatStreamUtils } from "@/core/hooks/chat/useChatStreamUtils";
import { useChatUtils } from "@/core/hooks/chat/useChatUtils";

export default function Chat() {
  const { messages, streaming } = useChat();
  const { streamAssistantResponse } = useChatStreamUtils();
  const { generateMessageId } = useChatUtils();
  const { addMessage } = useChatMessages();

  const scrollableRef = useChatWindow();
  const inputRef = useChatInput();

  const { scrollBottom } = useChatScroll(
    scrollableRef,
    {
      autoScroll: true,
    },
    [messages]
  );

  return (
    <div className="flex flex-col h-svh overflow-auto gap-2 ">
      <ChatHeader>
        <div className="w-full text-center font-semibold text-lg">
          Chat Application
        </div>
      </ChatHeader>
      <ChatBody>
        <ChatWindow scrollableRef={scrollableRef} placement="sequential">
          {messages?.map((message) => {
            return <MessageRenderer message={message} key={message.id} />;
          })}
        </ChatWindow>
        <ChatInput
          ref={inputRef}
          rootProps={{
            className: "w-[50%] mx-auto my-2 ",
          }}
          disabled={streaming}
          placeholder="Type a message"
          onHeightChange={scrollBottom}
          onSend={async ({ text }) => {
            addMessage({ text, id: generateMessageId(), type: "user" });
            await streamAssistantResponse(text);
          }}
        />
        <ChatFooter>
          <div className="w-full text-center text-sm text-slate-600">
            ChatGPT can make mistakes, please check for facts.
          </div>
        </ChatFooter>
      </ChatBody>
    </div>
  );
}
