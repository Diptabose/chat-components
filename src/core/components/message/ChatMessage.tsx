import { cn } from "@/core/utils/cn";
import { ReactNode, HTMLAttributes, RefObject } from "react";
import { FaUser } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import BaseMessage, { BaseMessageProps } from "./BaseMessage";
import { message } from "./cva-message";
import MarkdownMessage from "./MarkdownMessage";

export interface ChatMessageProps extends BaseMessageProps {
  type: MessageType;
  icon?: ReactNode;
  iconPlacement?: "start" | "end";
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  iconWrapperProps?: HTMLAttributes<HTMLDivElement>;
  markdownWrapperProps?: HTMLAttributes<HTMLDivElement>;
  format?: "markdown" | "text";
  ref?: RefObject<HTMLDivElement | null>;
}

export const ChatMessage = ({
  type,
  icon,
  wrapperProps,
  iconWrapperProps,
  markdownWrapperProps,
  format = "text",
  iconPlacement = "start",
  ...otherProps
}: ChatMessageProps) => {
  const iconMap: Record<MessageType, ReactNode> = {
    user: <FaUser size={16} />,
    assistant: <HiSparkles size={16} />,
  };
  return (
    <div
      {...wrapperProps}
      className={cn(message({ iconPlacement }), wrapperProps?.className)}
    >
      <div
        {...iconWrapperProps}
        className={cn(
          "flex-none size-8 rounded-full bg-slate-300 flex items-center justify-center self-end",
          iconWrapperProps?.className
        )}
      >
        {icon ?? iconMap[type]}
      </div>
      <div className="flex flex-col gap-2">
        {format === "markdown" ? (
          <div
            {...markdownWrapperProps}
            className={cn(
              "prose prose-sm overflow-x-auto text-balance max-w-none",
              markdownWrapperProps?.className
            )}
          >
            <MarkdownMessage content={otherProps.children as string} />
          </div>
        ) : (
          <BaseMessage {...otherProps} />
        )}
        <div className="">
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center rounded-2xl p-2 border border-slate-300">
              <div className="flex rounded-lg size-10 shrink-0 bg-rose-400 p-1 text-center">
                <FaRegFileAlt className="text-white size-5 m-auto" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">File Name</span>
                <span className="text-xs text-slate-400">
                  Created on: 12-Jan-2023
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export type MessageType = "assistant" | "user";
