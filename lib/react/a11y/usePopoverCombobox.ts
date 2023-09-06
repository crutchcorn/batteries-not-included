/**
 * This hook is meant to serve as a general utility for multi-select,
 * pop-over combo-box. It composes the ability to have a popover, keyboard navigation
 * multi-selects, and tests to see if the user had last used a keyboard
 */

import { useMemo, useRef, useState } from "react";
import {
  useKeyboardListNavigation,
  UseKeyboardListNavigationSubmitFn,
} from "./useKeyboardListNavigation";
import { useUsedKeyboardLast } from "./useUsedKeyboardLast";
import { usePopover } from "./usePopover";
import { useSelectableArray } from "./useSelectableArray";

export const usePopoverCombobox = <T>(arrVal: T[]) => {
  /**
   * Because of timing issues within the `runOnSubmit` CB, we need to have
   * an index to add to the tracking index, otherwise pressing spacebar
   * will not update immediately and will wait until this hook re-runs. See
   * the second param for `useSelectableArray` for more info
   * @type {React.RefObject<number>}
   */
  const [manuallyUpdateSelectedArrIndex, setManualUpdateIndex] = useState(0);

  const { selectAll, markAsSelected, internalArr } = useSelectableArray(
    arrVal,
    () => {
      /**
       * Must use a function here as there are timing issues otherwise. Because
       * this can be called from outside of a render, the value will be persistent
       * and only allow us to be able to have a single value. This causes particular
       * problems when dealing with clicking on an item many times
       * @see https://reactjs.org/docs/hooks-reference.html#functional-updates
       */
      setManualUpdateIndex((val) => val + 1);
    }
  );

  // The parent container
  const parentRef = useRef();

  // The reference to the combobox container div that opens when the expanded is true
  const comboBoxListRef = useRef();

  /**
   * This ref allows us to compose two circular hooks without having
   * to assume that one already knows of another
   * @type {React.RefObject<Function>}
   */
  const resetLastUsedKeyboardRef = useRef<() => void>(() => undefined);

  const resetLastUsedKeyboard = resetLastUsedKeyboardRef.current;

  const { buttonProps, expanded, setExpanded } = usePopover(
    parentRef,
    comboBoxListRef,
    { onBtnClick: resetLastUsedKeyboard }
  );

  const { resetLastUsedKeyboard: tmpResetUsedKeyboardLast, usedKeyboardLast } =
    useUsedKeyboardLast(comboBoxListRef, { enable: expanded });

  resetLastUsedKeyboardRef.current = tmpResetUsedKeyboardLast;

  const runOnIndexChange: UseKeyboardListNavigationSubmitFn = (
    kbEvent,
    focusedIndex,
    newIndex
  ) => {
    // If arrow keys were handled,
    if (newIndex !== undefined) {
      // We're selecting using mouse and not holding shift, select only one
      const isMouseEvent =
        kbEvent?.nativeEvent instanceof window.MouseEvent ||
        (window.TouchEvent &&
          kbEvent?.nativeEvent instanceof window.TouchEvent);
      if (isMouseEvent && !kbEvent?.shiftKey) {
        markAsSelected(newIndex, newIndex);
        resetLastUsedKeyboard();
        return;
      }

      // If shift or shift+ctrl were being handled, mark the items as selected
      const isKeyboardSelecting = ["Home", "End"].includes(kbEvent?.key || "")
        ? kbEvent?.shiftKey && kbEvent?.ctrlKey
        : kbEvent?.shiftKey;

      // If a single item is selected, go ahead and toggle it
      if (isKeyboardSelecting) {
        markAsSelected(focusedIndex, newIndex);
        return;
      }
    }

    // At this point, we're using mouse to toggle an item, we can stop checking
    // If there are other keys
    if (!kbEvent) return;

    const isSingleSelecting = [" ", "Spacebar"].includes(kbEvent.key);

    if (isSingleSelecting) {
      kbEvent.preventDefault();
      const newIndex = internalArr[focusedIndex].index;
      markAsSelected(newIndex, newIndex);
      return;
    }

    if (kbEvent.code === "KeyA" && kbEvent.ctrlKey) {
      kbEvent.preventDefault();
      selectAll();
      return;
    }

    if (kbEvent.key === "Escape") {
      kbEvent.preventDefault();
      setExpanded(false);
    }
  };

  // Arrow key handler
  const { focusedIndex, selectIndex } = useKeyboardListNavigation(
    comboBoxListRef,
    {
      maxLength: internalArr.length,
      enable: expanded,
      runOnIndexChange,
    }
  );

  const active = useMemo(() => {
    return internalArr[focusedIndex];
  }, [focusedIndex, internalArr, manuallyUpdateSelectedArrIndex]);

  // This will be empty if `enableSelect` is null
  const selectedArr = useMemo(
    () => internalArr.filter((item) => item.selected),
    [internalArr, manuallyUpdateSelectedArrIndex]
  );
  return {
    // The array of selected items
    selected: selectedArr,
    // The currently highlighted item
    active,
    // The reference to the element to apply to the div
    comboBoxListRef,
    parentRef,
    // The array of values
    values: internalArr,
    selectIndex,
    expanded,
    setExpanded,
    usedKeyboardLast,
    buttonProps,
  };
};
