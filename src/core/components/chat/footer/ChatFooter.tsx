import React, { HTMLAttributes } from "react";

interface ChatFooterProps extends HTMLAttributes<HTMLDivElement> {}

const ChatFooter = ({ children, ...props }: ChatFooterProps) => {
  return <div {...props}>{children}</div>;
};

export default ChatFooter;
