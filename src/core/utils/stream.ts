export async function* getIterableStream(
  body: ReadableStream<Uint8Array>
): AsyncIterable<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    const decodedChunk = decoder.decode(value, { stream: true });
    yield decodedChunk;
  }
}

export function toDecodedReadableStream(reader: ReadableStream<Uint8Array>) {
  const readerInstance = reader.getReader();
  const decoder = new TextDecoder();
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await readerInstance.read();
      const decodedChunk = decoder.decode(value, { stream: true });
      if (done) {
        controller.close();
      }
      controller.enqueue(decodedChunk);
    },
  });
}

export function transformSSEStream() {
  return new TransformStream<string, string>({
    transform: (chunk, controller) => {
      const subChunks = chunk.split(/(?<=})\n\ndata: (?={)/);
      for (const subChunk of subChunks) {
        const payload = subChunk.replace(/^data: /, "");
        controller.enqueue(JSON.parse(payload).chunk);
      }
    },
  });
}

export async function* readableStreamToAsyncIterable<T>(
  reader: ReadableStream<any>
) {
  const readerInstance = reader.getReader();
  while (true) {
    const { value, done } = await readerInstance.read();
    if (done) {
      break;
    }
    yield value as T;
  }
}
