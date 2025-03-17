import MarkdownMessage from "../base/markdown/MarkdownMessage";
import { FaUser } from "react-icons/fa";
import { type UserMessage } from "@/core/types/message";
import Attachment from "../attachments/Attachment";
import BaseChatInput from "../../input/BaseInput";
import useChatMessages from "@/core/hooks/chat/useChatMessages";
import UserMessageEdit from "./edit/UserMessageEdit";
import { message } from "../base/cva-message";

const UserMessage = ({
  text,
  icon,
  footer,
  attachments,
  edit,
  position,
}: UserMessage) => {
  const { updateMessageAt } = useChatMessages();

  return (
    <div className="flex gap-4 p-2 items-center shadow-md rounded-3xl bg-[hsla(0,0%,91%,0.5)] group/message">
      <div className="shrink-0 size-8 rounded-full bg-slate-300 flex items-center justify-center self-end">
        {icon ?? <FaUser size={16} />}
      </div>

      {edit ? (
        (<UserMessageEdit  position={position!}   />)
      ) : (
        <div
          className="flex flex-col gap-2 w-full"
          style={{ wordBreak: "break-word" }}
        >
          <MarkdownMessage content={text} />
          {attachments && (
            <div className="grid grid-cols-5 gap-2">
              {attachments?.map((attachment) => {
                return <Attachment />;
              })}
            </div>
          )}
          {footer}
        </div>
      )}
    </div>
  );
};

export default UserMessage;
