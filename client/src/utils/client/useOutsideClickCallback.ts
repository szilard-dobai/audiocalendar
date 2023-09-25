import type { RefObject } from "react";
import { useEffect } from "react";

/**
 * Hook that calls callback when click occured outside of the passed ref
 */
const useOutsideClickCallback = (
  ref: RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    /**
     * Call callback if clicked on outside of element
     */
    const handleClickOutside = (event: Event) => {
      if (ref?.current && !ref?.current?.contains(event.target as Node)) {
        callback?.();
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClickCallback;
