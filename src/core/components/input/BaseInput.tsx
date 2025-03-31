"use client";
import React, { RefObject } from "react";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

export interface BaseChatInputProps<T> extends TextareaAutosizeProps {
  ref?: RefObject<HTMLTextAreaElement | null>;
}

const BaseChatInput = (props: BaseChatInputProps<HTMLTextAreaElement>) => {
  return <TextareaAutosize {...props} />;
};

export default BaseChatInput;
