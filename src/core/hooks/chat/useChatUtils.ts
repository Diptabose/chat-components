import { useCallback, useRef } from "react";
import useChatMessages from "./useChatMessages";
import {
  readableStreamToAsyncIterable,
  toDecodedReadableStream,
  transformSSEStream,
} from "@/core/utils/stream";
import { AssistantMessage } from "@/core/types/message";
import useChat from "./useChat";
import { Client } from "@diptabose/chat-client/client/client.js";
import { SSETransport } from "@diptabose/chat-client/transports/sse/sse.js";
import { StreambleHttpTransport } from "@diptabose/chat-client/transports/streamableHttp/streamableHttp.js";

export const useChatUtils = () => {
  const { httpClient, setStream } = useChat();
  const abortController = useRef<AbortController | null>(null);
  const { addMessage, appendStreamChunk, updateLastMessage } =
    useChatMessages();

  const streamAssistantResponse = useCallback(
    async (
      query: string,
      body?: Record<string, unknown>,
      headers?: Record<string, unknown>
    ) => {
      if (!abortController.current) {
        abortController.current = new AbortController();
      }
      addMessage({ text: "", type: "assistant", loading: true });
      try {
        // const serverResp = await httpClient.post(
        //   "/stream",
        //   {
        //     query,
        //     ...body,
        //   },
        //   {
        //     headers: {
        //       Accept: "text/event-stream",
        //       ...headers,
        //     },
        //     responseType: "stream",
        //     adapter: "fetch",
        //     signal: abortController.current.signal,
        //   }
        // );

        const client = new Client(
          new StreambleHttpTransport("http://localhost:5000/stream"),
          {
            objectMode: true,
            stream: true,
          }
        );

        const { readableStream } = await client.send(
          "http://localhost:5000/stream",
          {
            query,
            ...body,
          }
        );
        updateLastMessage({ loading: false });
        setStream(true);
        // const reader = serverResp.data;
        // const transformStream = toDecodedReadableStream(reader).pipeThrough(
        //   transformSSEStream()
        // );
        const responseIterable = readableStreamToAsyncIterable<{
          data: unknown;
        }>(readableStream);
        for await (let chunk of responseIterable) {
          appendStreamChunk(chunk.data as string);
        }
      } catch (err) {
        updateLastMessage({ loading: false });
      } finally {
        setStream(false);
      }
    },
    []
  );

  const regenerateAssistantStream = useCallback(
    async (
      query: string,
      body?: Record<string, unknown>,
      headers?: Record<string, unknown>
    ) => {
      if (!abortController.current) {
        abortController.current = new AbortController();
      }
      updateLastMessage({ text: "", loading: true });
      try {
        const serverResp = await httpClient.post(
          "/stream",
          {
            query,
            ...body,
          },
          {
            headers: {
              Accept: "text/event-stream",
              ...headers,
            },
            responseType: "stream",
            adapter: "fetch",
            signal: abortController.current.signal,
          }
        );
        updateLastMessage<AssistantMessage>({
          loading: false,
          streaming: true,
        });
        setStream(true);
        const reader = serverResp.data;
        const transformStream = toDecodedReadableStream(reader).pipeThrough(
          transformSSEStream()
        );
        const responseIterable =
          readableStreamToAsyncIterable<string>(transformStream);
        for await (let chunk of responseIterable) {
          appendStreamChunk(chunk.toString());
        }
      } catch (err) {
        updateLastMessage<AssistantMessage>({
          loading: false,
          streaming: false,
          error: true,
        });
      } finally {
        setStream(false);
      }
    },
    []
  );

  const abortChat = () => {
    if (abortController?.current) {
      abortController.current.abort();
    }
  };

  return {
    streamAssistantResponse,
    regenerateAssistantStream,
    abortChat,
  };
};
