import React, { PropsWithChildren } from "react";

const ChatHeader = (props: PropsWithChildren) => {
  return <div>{props.children}</div>;
};

export default ChatHeader;
