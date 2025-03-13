"use client";
import React, { HTMLAttributes, ReactNode, RefObject, useState } from "react";
import { IoMdSend } from "react-icons/io";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";
import { cn } from "@/core/utils/cn";
import { Message } from "@/core/types/ChatTypes";

interface BaseChatInputProps<T> extends TextareaAutosizeProps {
  ref: RefObject<HTMLTextAreaElement | null>;
}

const BaseChatInput = (props: BaseChatInputProps<HTMLTextAreaElement>) => {
  return <TextareaAutosize {...props} />;
};

export default BaseChatInput;

interface ChatInputProps extends BaseChatInputProps<HTMLTextAreaElement> {
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  rootProps?: HTMLAttributes<HTMLDivElement>;
  textAreaWrapperProps?: HTMLAttributes<HTMLDivElement>;
  sendIcon?: ReactNode;
  extensions?: ReactNode[];
  onSend?: (message: Message) => void;
}

export const ChatInput = ({
  rootProps,
  textAreaWrapperProps,
  sendIcon,
  extensions,
  onSend,
  ...textAreaProps
}: ChatInputProps) => {
  const [chatText, setText] = useState("");

  function handleSend() {
    onSend?.({
      text: chatText,
      type: "user",
    });
    setText("");
  }

  return (
    <div
      {...rootProps}
      className={cn(
        "p-2 flex flex-col gap-2 rounded-lg shadow-md border border-slate-300",
        rootProps?.className
      )}
    >
      <div
        {...textAreaWrapperProps}
        className={cn("flex items-center gap-2", textAreaProps?.className)}
      >
        <BaseChatInput
          value={chatText}
          maxRows={5}
          onChange={(event) => {
            setText(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.code === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSend();
            }
          }}
          {...textAreaProps}
          className={cn(
            "outline-none w-full resize-none",
            textAreaProps?.className
          )}
        />
        <button
          className="flex-none cursor-pointer bg-slate-300 rounded-full self-end size-8 flex items-center justify-center"
          onClick={handleSend}
        >
          {sendIcon ?? <IoMdSend size={16} className="ml-0.5" />}
        </button>
      </div>
      {extensions && <div>Extensions come here.</div>}
    </div>
  );
};
