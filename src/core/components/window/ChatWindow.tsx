import { RefObject, ReactElement, ReactNode, PropsWithChildren } from "react";
import { ChatMessage } from "@/core/types/message";
import MessageRenderer from "../message/renderer/MessageRenderer";

interface ChatWindowProps<T extends ChatMessage> extends PropsWithChildren {
  scrollableRef: RefObject<HTMLDivElement | null>;
  placement?: "sequential" | "extreme";
  messageComponent?: (message: T, index: number) => ReactElement;
}

const ChatWindow = <T extends ChatMessage>({
  scrollableRef,
  children,
}: ChatWindowProps<T>) => {
  return (
    <div
      className="flex flex-col overflow-y-auto h-full flex-1 py-2"
      ref={scrollableRef}
    >
      <div className="w-[50%] mx-auto flex flex-col gap-2">{children}</div>
    </div>
  );
};

export default ChatWindow;
