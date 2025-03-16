import { cn } from "@/core/utils/cn";
import React, { HTMLAttributes } from "react";

interface ChatFooterProps extends HTMLAttributes<HTMLDivElement> {}

const ChatFooter = ({ children, className, ...props }: ChatFooterProps) => {
  return (
    <div {...props} className={cn("p-1", className)}>
      {children}
    </div>
  );
};

export default ChatFooter;
