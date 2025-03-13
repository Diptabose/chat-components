import React, { useState } from "react";
import MarkdownMessage from "../base/markdown/MarkdownMessage";
import { FaUser } from "react-icons/fa";
import { ChatMessage } from "@/core/types/message";
import Attachment from "../attachments/Attachment";

interface UserMessage extends ChatMessage {
  onResend?: () => void;
}

const UserMessage = ({ text, icon, footer, attachments }: UserMessage) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className="flex gap-4 p-2 shadow-md rounded-3xl bg-[hsla(0,0%,91%,0.5)] group/message">
      <div className="shrink-0 size-8 rounded-full bg-slate-300 flex items-center justify-center self-end">
        {icon ?? <FaUser size={16} />}
      </div>
      <div className="flex flex-col gap-2 w-full">
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
    </div>
  );
};

export default UserMessage;
