import { RefObject, useCallback, useEffect, useState } from "react";

interface UseUsedKeyboardLastOptions {
	enable: boolean;
}

/**
 * A hook to handle when the keyboard was used last
 *
 * It's impossible (and non-performant) to handle all events,
 * so we're having the consumer themselves handle when to set the value to
 * false by returning the function `resetLastUsedKeyboard`
 */
export const useUsedKeyboardLast = (
	elRef: RefObject<any>,
	{ enable = true }: UseUsedKeyboardLastOptions
) => {
	const [usedKeyboardLast, setUsedKeyboardLast] = useState(false);

	const resetLastUsedKeyboard = useCallback(
		() => setUsedKeyboardLast(false),
		[]
	);

	useEffect(() => {
		const currRef = elRef && elRef.current;
		const setUsedKeyboardLastToTrue = () => setUsedKeyboardLast(true);

		if (enable && currRef) {
			currRef.addEventListener("keydown", setUsedKeyboardLastToTrue);

			return () => {
				currRef.removeEventListener("keydown", setUsedKeyboardLastToTrue);
			};
		}
	}, [enable, elRef, elRef.current]);

	return {
		usedKeyboardLast,
		resetLastUsedKeyboard
	};
};
