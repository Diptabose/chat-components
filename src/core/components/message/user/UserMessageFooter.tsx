import useChatMessages from "@/core/hooks/chat/useChatMessages";
import { LuThumbsUp, LuThumbsDown } from "react-icons/lu";
import { TbCopy, TbRefresh, TbPencilUp } from "react-icons/tb";
import UserMessage from "./UserMessage";
import { useChatUtils } from "@/core/hooks/chat/useChatUtils";

interface MessageFooterProps {
  message: UserMessage;
  postion: number;
}

const MessageFooter = ({ message, postion }: MessageFooterProps) => {
  const { thinking, getLastMessage } = useChatMessages();
  const { regenerateAssistantStream } = useChatUtils();

  return (
    <div className="flex items-center gap-2">
      <button className="rounded-lg hover:bg-gray-50 cursor-pointer text-[#5d5d5d]">
        <span className="flex items-center justify-center size-8">
          <TbCopy className="size-6" />
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
            thinking(true);
            await regenerateAssistantStream(lastUserMessage?.text);
            thinking(false);
          }
        }}
      >
        <span className="flex items-center justify-center size-8">
          <TbRefresh className="size-6" />
        </span>
      </button>
      <button className="rounded-lg hover:bg-gray-50 cursor-pointer text-[#5d5d5d]">
        <span className="flex items-center justify-center size-8">
          <TbPencilUp className="size-6" />
        </span>
      </button>
    </div>
  );
};

export default MessageFooter;
