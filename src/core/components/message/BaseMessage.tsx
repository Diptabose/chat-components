import { cn } from "@/core/utils/cn";
import React, { HTMLAttributes, ReactNode } from "react";
import { FaUser } from "react-icons/fa";
import { message } from "./cva-message";
import { HiSparkles } from "react-icons/hi2";
import MarkdownMessage from "./TestMarkdown";

interface BaseMessageProps extends HTMLAttributes<HTMLDivElement> {}

const BaseMessage = ({
  children,
  className,
  ...otherProps
}: BaseMessageProps) => {
  return (
    <div {...otherProps} className={cn("break-all", className)}>
      {children}
    </div>
  );
};

export default BaseMessage;

type MessageType = "assistant" | "user";

export interface ChatMessageProps extends BaseMessageProps {
  type: MessageType;
  icon?: ReactNode;
  iconPlacement?: "start" | "end";
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  iconWrapperProps?: HTMLAttributes<HTMLDivElement>;
  format?: "markdown" | "text";
}

export const ChatMessage = ({
  type,
  icon,
  wrapperProps,
  iconWrapperProps,
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
      {format === "markdown" ? (
        <div style={{ wordBreak: "break-word" }}>
          <MarkdownMessage content={otherProps.children as string} />
        </div>
      ) : (
        <BaseMessage {...otherProps} />
      )}
    </div>
  );
};
