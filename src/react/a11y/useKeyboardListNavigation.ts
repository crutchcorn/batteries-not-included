/**
 * This hook is intended to handle keyboard navigation of a list. It is not
 * meant for handling selecting any of those items. There are ways to compose
 * a hook to do so, but that is not this file. To see an example of how to do that,
 * you can see our own composed hook meant for similar:
 *
 * @see ./useSelectableArray.js
 * @see ./useSelectRef.js
 *
 * ✅ Maintain a currently used index
 * ✅ Handle arrow-up to change index
 * ✅ Handle arrow-down to change index
 * ✅ Handle home to change index to first
 * ✅ Handle end to change index to last
 * 🔲 Handle arrow-left/right to change index via optional prop (?)
 * 🔲 Handle wrapping around the index via optional prop (?)
 */

import { RefObject, SyntheticEvent, useEffect, useState } from "react";
import { normalizeNumber } from "../../utils";

type KeyboardSyntheticEvent = KeyboardEvent & Partial<SyntheticEvent>;

export type UseKeyboardListNavigationSubmitFn = (
	// If this event is undefined it's because it wasn't passed by `selectIndex`
	event: (KeyboardEvent & Partial<SyntheticEvent>) | undefined,
	// The old index that's presently selected
	focusedIndex: number,
	// The new index that's being selected
	newIndex: number | undefined
) => void;

export interface UseKeyboardListNavigationOptions {
	maxLength?: number;
	enable?: boolean;
	runOnIndexChange?: UseKeyboardListNavigationSubmitFn;
	wrapOnOverflow?: boolean;
}

/**
 * @param parentRef - The parent ref to bind the event handling to
 * @param $1
 * @param $1.maxLength - The maximum number that can be bound to
 * @param $1.enable - Disable event handling
 * @param [$1.wrapOnOverflow] - If true, when max + 1 is reached, go to zero, etc. Defaults false
 * @param [$1.runOnIndexChange] - An optional function to hook into the event handler logic
 */
export const useKeyboardListNavigation = (
	parentRef: RefObject<any>,
	{
		maxLength = Infinity,
		enable = true,
		runOnIndexChange,
		wrapOnOverflow = false
	}: UseKeyboardListNavigationOptions
) => {
	const [focusedIndex, setFocusedIndex] = useState(0);

	const maxIndex = maxLength - 1;

	// Arrow key handler
	useEffect(() => {
		const onKeyDown = (event: KeyboardSyntheticEvent) => {
			if (!enable) {
				return;
			}
			/**
			 * This is to enable proper usage of passing a `onKeydown` from props
			 * @see https://reactjs.org/docs/events.html#event-pooling
			 */
			event && event.persist && event.persist();
			let _newIndex;
			switch (event.key) {
				case "ArrowDown":
					event.preventDefault();
					_newIndex = normalizeNumber(focusedIndex + 1, 0, maxIndex);
					break;
				case "ArrowUp":
					event.preventDefault();
					_newIndex = normalizeNumber(focusedIndex - 1, 0, maxIndex);
					break;
				case "Home":
					event.preventDefault();
					if (maxIndex !== Infinity) _newIndex = 0;
					break;
				case "End":
					event.preventDefault();
					if (maxIndex !== Infinity) _newIndex = maxIndex;
					break;
				default:
					break;
			}

			if (runOnIndexChange) {
				runOnIndexChange(event, focusedIndex, _newIndex);
			}

			// None of the keys were selected
			if (_newIndex === undefined) {
				return;
			}

			setFocusedIndex(_newIndex);
		};

		const el = parentRef && parentRef.current;

		if (!el) return;
		el.addEventListener("keydown", onKeyDown);
		return () => el.removeEventListener("keydown", onKeyDown);
	}, [focusedIndex, parentRef, enable, maxIndex, runOnIndexChange]);

	const selectIndex = (i: number, e?: KeyboardSyntheticEvent) => {
		if (wrapOnOverflow === true) {
			if (i < 0) {
				setFocusedIndex(maxIndex);
			} else if (i > maxIndex) {
				setFocusedIndex(0);
			} else {
				setFocusedIndex(i);
			}
		} else {
			setFocusedIndex(normalizeNumber(i, 0, maxIndex));
		}

		if (runOnIndexChange) {
			if (e && e.persist) e.persist();
			runOnIndexChange(e, focusedIndex, i);
		}
	};

	return {
		focusedIndex,
		selectIndex
	};
};
