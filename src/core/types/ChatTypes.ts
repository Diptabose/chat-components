export type Message = {
  placement?: "sequential" | "extreme";
  type: "assistant" | "user";
  text: string;
  attachments?: unknown[];
};
