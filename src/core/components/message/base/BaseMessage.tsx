import { cn } from "@/core/utils/cn";
import React, { HTMLAttributes } from "react";


export interface BaseMessageProps extends HTMLAttributes<HTMLDivElement> {}

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

