import useChatMessages from "@/core/hooks/chat/useChatMessages";
import { TbCopy, TbPencilUp } from "react-icons/tb";
import { type UserMessage } from "@/core/types/message";
import { copyText } from "@/core/utils/message";

interface MessageFooterProps {
  message: UserMessage;
  position: number;
}

const UserMessageFooter = ({ message, position }: MessageFooterProps) => {
  const { updateMessageAt } = useChatMessages();

  return (
    <div className="flex items-center gap-2">
      <button className="rounded-lg hover:bg-gray-50 cursor-pointer text-[#5d5d5d]">
        <span className="flex items-center justify-center size-8">
          <TbCopy className="size-6" onClick={()=>{copyText(message?.text)}}/>
        </span>
      </button>
      <button className="rounded-lg hover:bg-gray-50 cursor-pointer text-[#5d5d5d]">
        <span className="flex items-center justify-center size-8">
          <TbPencilUp
            className="size-6"
            onClick={() => {
              updateMessageAt<UserMessage>({ edit: true }, position);
            }}
          />
        </span>
      </button>
    </div>
  );
};

export default UserMessageFooter;
