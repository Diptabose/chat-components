import { cn } from "@/core/utils/cn";
import React, { HTMLAttributes, RefObject } from "react";

export interface ChatBodyProps extends HTMLAttributes<HTMLDivElement> {
  ref?: RefObject<HTMLDivElement | null>;
}

const ChatBody = ({ children, className, ...props }: ChatBodyProps) => {
  return (
    <div
      {...props}
      className={cn("flex flex-col flex-1 h-full overflow-y-auto", className)}
    >
      {children}
    </div>
  );
};

export default ChatBody;
