import { useEffect, RefObject } from "react";

export const useScrollToBottom = (ref: RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [ref]);
};
