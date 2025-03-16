import { useCallback, useRef } from "react";
import axios from "axios";
import useChatMessages from "./useChatMessages";
import {
  getIterableStream,
  readableStreamToAsyncIterable,
  toDecodedReadableStream,
  transformSSEStream,
} from "@/core/utils/stream";

export const useChatUtils = () => {
  const abortController = useRef<AbortController | null>(null);
  const { addMessage, appendStreamChunk, updateLastMessage } =
    useChatMessages();

  const streamAssistantResponse = useCallback(async (query: string) => {
    if (!abortController.current) {
      abortController.current = new AbortController();
    }
    addMessage({ text: "", type: "assistant", loading: true });
    await new Promise((res, rej) => setTimeout(res, 5000));
    try {
      const serverResp = await axios.post(
        "http://localhost:3001/stream",
        {
          query,
        },
        {
          headers: {
            Accept: "text/event-stream",
          },
          responseType: "stream",
          adapter: "fetch",
          signal: abortController.current.signal,
        }
      );
      updateLastMessage({ loading: false });
      const reader = serverResp.data;
      const transformStream = toDecodedReadableStream(reader).pipeThrough(
        transformSSEStream()
      );
      const responseIterable = readableStreamToAsyncIterable(transformStream);
      for await (let chunk of responseIterable) {
        appendStreamChunk(chunk.toString());
      }
    } catch (err) {
      console.log("The errror is", err);
    }
  }, []);

  const regenerateAssistantStream = useCallback(async (query: string) => {
    if (!abortController.current) {
      abortController.current = new AbortController();
    }

    updateLastMessage({ text: "", loading: true });

    try {
      const serverResp = await axios.post(
        "http://localhost:3001/stream",
        {
          query,
        },
        {
          headers: {
            Accept: "text/event-stream",
          },
          responseType: "stream",
          adapter: "fetch",
          signal: abortController.current.signal,
        }
      );

      const reader = serverResp.data;
      const transformStream = toDecodedReadableStream(reader).pipeThrough(
        transformSSEStream()
      );
      const responseIterable = readableStreamToAsyncIterable(transformStream);
      for await (let chunk of responseIterable) {
        appendStreamChunk(chunk.toString());
      }
    } catch (err) {
      // Handle errors gracefully.
    }
  }, []);

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
