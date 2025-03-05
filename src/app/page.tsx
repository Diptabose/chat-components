"use client";
import { ChatInput } from "@/core/components/input/BaseInput";
import MarkdownMessage from "@/core/components/message/TestMarkdown";
import ChatWindow from "@/core/components/window/ChatWindow";
import useChat, { useChatUtils } from "@/core/hooks/chat/useChat";
import useChatScroll from "@/core/hooks/chat/useChatScroll";
import { useRef } from "react";

export default function Home() {
  const { conversation } = useChat();
  const { addMessage, getServerResponse, abortChat } = useChatUtils();

  const scrollableRef = useRef<HTMLDivElement>(null);

  const { scrollBottom } = useChatScroll(
    scrollableRef,
    {
      autoScroll: true,
    },
    [conversation]
  );
  const sampleMarkdown = `
  # Markdown with Code, Math, and More!  
  ## Code Example:
  \`\`\`js
  const greet = () => console.log("Hello, world!");
  greet();
  \`\`\`
  
  ## Table Example:
  | Name  | Age |
  |-------|-----|
  | Alice | 25  |
  | Bob   | 30  |
  
  ## Math Example:
  Inline math: $E = mc^2$  
  Block math:
  $$
  \\int_0^\\infty e^{-x}dx = 1
  $$
  
  ## Image Example:
  ![Markdown Logo](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)
  
  ## Link Example:
  [Visit OpenAI](https://openai.com)
  `;
  
  
  
  return (
    <div className="flex flex-col h-svh gap-2">
      <ChatWindow
        scrollableRef={scrollableRef}
        currentConversation={conversation}
        placement="extreme"
      />

      <div className="w-1/2 self-center p-2">
        <ChatInput
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
