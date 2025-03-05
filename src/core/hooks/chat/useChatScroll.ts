import { RefObject, useEffect } from "react";

interface ChatScrollConfig {
  autoScroll: boolean;
}

const useChatScroll = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  config: ChatScrollConfig,
  deps: unknown[]
) => {
  const scrollBottom = () => {
    if (config.autoScroll) {
      ref?.current?.scrollTo({
        top: ref?.current?.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Differ the scrollAction until rendering is complete
    const timerId = setTimeout(() => {
      scrollBottom();
    }, 0);

    return () => {
      clearTimeout(timerId);
    };
  }, deps);

  return {
    scrollBottom,
  };
};

export default useChatScroll;
