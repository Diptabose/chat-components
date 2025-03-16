import useChatMessages from "@/core/hooks/chat/useChatMessages";
import { LuThumbsUp, LuThumbsDown } from "react-icons/lu";
import { TbCopy, TbPencilUp } from "react-icons/tb";
import UserMessage from "./UserMessage";
import { useChatUtils } from "@/core/hooks/chat/useChatUtils";

interface MessageFooterProps {
  message: UserMessage;
  postion: number;
}

const UserMessageFooter = ({ message, postion }: MessageFooterProps) => {
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
          <TbPencilUp className="size-6" />
        </span>
      </button>
    </div>
  );
};

export default UserMessageFooter;
