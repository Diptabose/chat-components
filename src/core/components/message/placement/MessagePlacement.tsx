import { cn } from "@/core/utils/cn";
import React, { HTMLAttributes } from "react";

interface MessagePlacementProps extends HTMLAttributes<HTMLDivElement> {}

const MessagePlacement = ({
  children,
  className,
  ...props
}: MessagePlacementProps) => {
  return (
    <div {...props} className={cn(className)}>
      {children}
    </div>
  );
};

export default MessagePlacement;
