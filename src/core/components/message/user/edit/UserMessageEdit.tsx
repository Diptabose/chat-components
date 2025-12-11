import BaseChatInput from "@/core/components/input/BaseInput";
import useChatMessages from "@/core/hooks/chat/useChatMessages";
import { useChatStreamUtils } from "@/core/hooks/chat/useChatStreamUtils";
import { UserMessage } from "@/core/types/message";
import { cn } from "@/core/utils/cn";
import { HTMLAttributes, useState } from "react";

interface UserMessageEditProps {
  id: string;
  textAreaWrapperProps?: HTMLAttributes<HTMLDivElement>;
}

const UserMessageEdit = ({
  id,
  textAreaWrapperProps,
}: UserMessageEditProps) => {
  const { updateMessageAtId } = useChatMessages();
  const { regenerateAssistantStream } = useChatStreamUtils();

  const [editedMessage, setEditedMessage] = useState<string>("");

  return (
    <div className="flex flex-col p-2 w-full gap-2">
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
          className="py-1 px-4 text-black cursor-pointer rounded-xl bg-white border border-slate-200"
          onClick={() => {
            updateMessageAtId<UserMessage>({ edit: false }, id);
          }}
        >
          Cancel
        </button>
        <button
          className="py-1 px-4 text-white cursor-pointer rounded-xl bg-black"
          onClick={async () => {
            if (editedMessage?.trim().length > 0) {
              updateMessageAtId<UserMessage>(
                { text: editedMessage, edit: false },
                id
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
