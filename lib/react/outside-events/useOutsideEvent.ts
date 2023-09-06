import { RefObject, useCallback, useEffect } from "react";

export type UseOutsideEventParams = [RefObject<any>, boolean, () => void];

/**
 * @param eventName - The name of the event to be bound to
 * @param {*[]} params - Params from parent hook to call
 * @param {React.RefObject} params.$0 - An existing ref to use as the parent ref
 * @param {boolean} params.$1 - Boolean to enable
 * @param {Function} params.$2 - A function to run if the user clicks outside the parent ref
 */
export const useOutsideEvent = (
  eventName: string,
  params: UseOutsideEventParams
) => {
  const [parentRef, enable, onOutsideEvent] = params;

  const handleClickOutside = useCallback(
    (e: Event) => {
      if (parentRef.current.contains(e.target)) {
        // inside click
        return;
      }
      // outside click
      onOutsideEvent();
    },
    [parentRef, parentRef.current, onOutsideEvent]
  );

  useEffect(() => {
    if (enable) {
      document.addEventListener(eventName, handleClickOutside);

      return () => {
        document.removeEventListener(eventName, handleClickOutside);
      };
    }
  }, [enable, handleClickOutside, onOutsideEvent, eventName]);
};
