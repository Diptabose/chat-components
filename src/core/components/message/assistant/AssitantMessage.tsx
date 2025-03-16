import MarkdownMessage from "../base/markdown/MarkdownMessage";
import { TbSparkles } from "react-icons/tb";
import { type AssistantMessage } from "@/core/types/message";
import Attachment from "../attachments/Attachment";

const AssitantMessage = ({
  text,
  icon,
  footer,
  attachments,
  loading,
}: AssistantMessage) => {
  return (
    <div className="flex gap-4 p-2 items-center shadow-md rounded-3xl bg-[hsla(0,0%,91%,0.5)] group/message">
      <div className="shrink-0 size-8 rounded-full bg-slate-300 flex items-center justify-center self-end">
        {icon ?? <TbSparkles size={16} />}
      </div>

      {loading ? (
        <div className="size-5 rounded-full bg-black transition-transform animate-shrink"></div>
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

export default AssitantMessage;
