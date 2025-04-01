import { RefObject, useEffect, useRef } from "react";
import useChat from "./useChat";

interface ChatScrollConfig {
  autoScroll: boolean;
}

const useChatScroll = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  config: ChatScrollConfig,
  deps: unknown[]
) => {
  const allowScroll = useRef(true);
  const { streaming } = useChat();
  const scrollBottom = () => {
    if (config.autoScroll) {
      ref?.current?.scrollTo({
        top: ref?.current?.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    function handleScrollUp(e: any) {
      console.log(e);
      if (ref?.current) {
        const scrollAtBottom = Math.abs(
          ref?.current?.scrollHeight -
            ref?.current?.clientHeight -
            ref?.current?.scrollTop
        );

        if (scrollAtBottom >= 100 && streaming) {
          allowScroll.current = false;
        }
        if (scrollAtBottom <= 1 && streaming) {
          allowScroll.current = true;
        }
      }
    }
    ref?.current?.addEventListener("scroll", handleScrollUp);
    return () => {
      ref?.current?.removeEventListener("scroll", handleScrollUp);
    };
  }, [...deps, streaming]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (allowScroll.current === true) {
      timerId = setTimeout(() => {
        scrollBottom();
      }, 10);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, deps);

  return {
    scrollBottom,
  };
};

export default useChatScroll;
