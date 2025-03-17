import BaseChatInput from "@/core/components/input/BaseInput";
import useChatMessages from "@/core/hooks/chat/useChatMessages";
import { useChatUtils } from "@/core/hooks/chat/useChatUtils";
import { UserMessage } from "@/core/types/message";
import { cn } from "@/core/utils/cn";
import React, { HTMLAttributes, useState } from "react";

interface UserMessageEditProps {
  position: number;
  textAreaWrapperProps?: HTMLAttributes<HTMLDivElement>;
}

const UserMessageEdit = ({
  position,
  textAreaWrapperProps,
}: UserMessageEditProps) => {
  const { updateMessageAt } = useChatMessages();
  const { regenerateAssistantStream } = useChatUtils();

  const [editedMessage, setEditedMessage] = useState<string>("");

  return (
    <div className="flex flex-col p-2 border-2 border-red-50 w-full gap-2">
      <BaseChatInput
        maxRows={5}
        placeholder="Edit here"
        value={editedMessage}
        onChange={(e) => setEditedMessage(e.target.value)}
        className={cn(
          "outline-none w-full resize-none min-h-[50px] border rounded-md border-slate-700 p-2"
        )}
      />
      <div className="self-end flex items-center gap-2">
        <button
          className="py-1 px-4 text-black cursor-pointer rounded-xl bg-slate-300"
          onClick={() => {
            updateMessageAt<UserMessage>({ edit: false }, position!);
          }}
        >
          Cancel
        </button>
        <button
          className="py-1 px-4 text-white cursor-pointer rounded-xl bg-black"
          onClick={async () => {
            if (editedMessage?.trim().length > 0) {
              updateMessageAt<UserMessage>(
                { text: editedMessage, edit: false },
                position!
              );
              await regenerateAssistantStream(editedMessage);
            }
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UserMessageEdit;
