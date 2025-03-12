import React, { PropsWithChildren } from "react";

const ChatBody = (props: PropsWithChildren) => {
  return (
    <div className="flex flex-col flex-1 h-full overflow-y-auto">
      {props.children}
    </div>
  );
};

export default ChatBody;
