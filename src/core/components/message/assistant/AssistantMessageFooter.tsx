import useChatMessages from "@/core/hooks/chat/useChatMessages";
import { LuThumbsUp, LuThumbsDown } from "react-icons/lu";
import { TbCopy, TbRefresh } from "react-icons/tb";
import { ChatMessage } from "@/core/types/message";
import { copyText } from "@/core/utils/message";
import useChat from "@/core/hooks/chat/useChat";
import { useChatStreamUtils } from "@/core/hooks/chat/useChatStreamUtils";

interface AssistantMessageFooterProps {
  message: ChatMessage;
}

const AssistantMessageFooter = ({
  message,
}: AssistantMessageFooterProps) => {
  const { streaming } = useChat();
  const { getLastMessage } = useChatMessages();
  const { regenerateAssistantStream } = useChatStreamUtils();

  return (
    <div className="flex items-center gap-2">
      {!streaming && (
        <>
          <button className="rounded-lg hover:bg-gray-50 cursor-pointer text-[#5d5d5d]">
            <span className="flex items-center justify-center size-8">
              <TbCopy
                className="size-6"
                onClick={() => {
                  copyText(message?.text);
                }}
              />
            </span>
          </button>

          <button className="rounded-lg hover:bg-gray-50 cursor-pointer text-[#5d5d5d]">
            <span className="flex items-center justify-center size-8">
              <LuThumbsUp className="size-6" />
            </span>
          </button>
          <button className="rounded-lg hover:bg-gray-50 cursor-pointer text-[#5d5d5d]">
            <span className="flex items-center justify-center size-8">
              <LuThumbsDown className="size-6" />
            </span>
          </button>
          <button
            className="rounded-lg hover:bg-gray-50 cursor-pointer text-[#5d5d5d]"
            onClick={async (e) => {
              const lastUserMessage = getLastMessage("user");
              if (lastUserMessage) {
                await regenerateAssistantStream(lastUserMessage?.text);
              }
            }}
          >
            <span className="flex items-center justify-center size-8">
              <TbRefresh className="size-6" />
            </span>
          </button>
        </>
      )}
    </div>
  );
};

export default AssistantMessageFooter;
