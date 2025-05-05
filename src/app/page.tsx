"use client";
import ChatProvider from "@/core/providers/ChatProvider";
import axios from "axios";
import Chat from "./chat";
import { ChatMessage } from "@/core/types/message";

const axiosClient = axios.create({
  baseURL: "http://localhost:3003",
});

export default function Home() {
  // Usually this messages will come from the server side.
  const messages: ChatMessage[] = [];
  return (
    <ChatProvider
      config={{
        axiosClient,
      }}
      messages={messages}
    >
      <Chat />
    </ChatProvider>
  );
}
