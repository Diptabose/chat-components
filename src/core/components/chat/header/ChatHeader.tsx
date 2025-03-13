import React, { HTMLAttributes } from "react";

interface ChatHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const ChatHeader = ({ children, ...props }: ChatHeaderProps) => {
  return <div {...props}>{children}</div>;
};

export default ChatHeader;
