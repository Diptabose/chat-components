import { cn } from "@/core/utils/cn";
import React, { HTMLAttributes } from "react";

interface ChatHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const ChatHeader = ({ children, className, ...props }: ChatHeaderProps) => {
  return (
    <div {...props} className={cn("p-2 shadow-md", className)}>
      {children}
    </div>
  );
};

export default ChatHeader;
