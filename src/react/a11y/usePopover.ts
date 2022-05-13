/**
 * This hook is meant to provide a utility that can be used to compose functionality
 * for a popover component. This includes the `expanded` property handling as well
 * as the props to be added to the trigger button
 *
 * ✅ Have an open and closed state handlers
 * ✅ Close on escape key
 * ✅ Close on click outside
 * ✅ Focus on popover area upon opening
 * 🐛 Doesn't seem to close on focus loss
 *       Needs an optional prop (?)
 */
import { RefObject, useCallback, useEffect, useState } from "react";
import { useOutsideClick, useOutsideFocus } from "../outside-events";

interface UsePopoverOptions {
	// An add-on CB function to the button event handler
	// Is the popover expanded
	onBtnClick?: (e: MouseEvent, expanded: boolean) => void;
	// An add-on CB function to the button event handler
	onBtnKeyDown?: (e: KeyboardEvent, expanded: boolean) => void;
}

/**
 * @param parentRef - The div that contains the popoverArea and the trigger button
 * @param popoverAreaRef - The div that will be used as the popover area to focus on when the popover is opened
 * @returns {{buttonProps, expanded}}
 */
export const usePopover = (
	parentRef: RefObject<any>,
	popoverAreaRef: RefObject<any>,
	{ onBtnClick, onBtnKeyDown }: UsePopoverOptions
) => {
	const [expanded, setExpanded] = useState(false);

	const onClick = useCallback(
		(e) => {
			const newVal = !expanded;
			setExpanded(newVal);
			if (onBtnClick) {
				e.persist && e.persist();
				onBtnClick(e, newVal);
			}
		},
		[expanded, onBtnClick]
	);

	const onKeyDown = useCallback(
		(e) => {
			const newVal = !expanded;
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				setExpanded(newVal);
			}
			if (onBtnKeyDown) {
				e.persist && e.persist();
				onBtnKeyDown(e, newVal);
			}
		},
		[expanded, onBtnKeyDown]
	);

	const buttonProps = {
		onClick,
		onKeyDown,
	};

	const currentBtnRef = popoverAreaRef && popoverAreaRef.current;

	// Focus the select ref whenever an item is expanded
	useEffect(() => {
		if (currentBtnRef && expanded) {
			currentBtnRef.focus();
		}
	}, [expanded, currentBtnRef]);

	const setExpandedToFalse = useCallback(() => setExpanded(false), []);

	useOutsideClick(parentRef, expanded, setExpandedToFalse);

	useOutsideFocus(parentRef, expanded, setExpandedToFalse);

	return {
		buttonProps,
		expanded,
		setExpanded,
	};
};
