import * as React from "react";
import { useOutsideEvent } from "../useOutsideEvent";
import { render, fireEvent } from "@testing-library/react";

const renderTestEl = (enable: boolean) => {
	// eslint-disable-next-line react/display-name
	const El = React.forwardRef((_, ref) => {
		const currentRef = React.useRef();
		const handleFn = jest.fn();

		useOutsideEvent("click", [currentRef, enable, handleFn]);

		React.useImperativeHandle(ref, () => ({
			handleFn
		}));

		return (
			<div data-testid={"parent"}>
				<div data-testid={"side"} />
				<div data-testid={"main"} ref={currentRef} />
			</div>
		);
	});

	const ref = React.createRef<{ handleFn: jest.Mock }>();
	const props = render(<El ref={ref} />);
	const sideEl = props.getByTestId("side");
	const mainEl = props.getByTestId("main");
	const parentEl = props.getByTestId("parent");

	return {
		sideEl,
		mainEl,
		parentEl,
		currentRef: ref.current,
		...props
	};
};

describe("useOutsideEvent", () => {
	test("handles clicks on the inside", () => {
		const { mainEl, currentRef } = renderTestEl(true);
		fireEvent.click(mainEl);
		expect(currentRef.handleFn).not.toHaveBeenCalled();
	});

	test("handles clicks on the outside", () => {
		const { sideEl, currentRef } = renderTestEl(true);
		fireEvent.click(sideEl);
		expect(currentRef.handleFn).toHaveBeenCalled();
	});

	test("disabled properly", () => {
		const { sideEl, currentRef } = renderTestEl(false);
		fireEvent.click(sideEl);
		expect(currentRef.handleFn).not.toHaveBeenCalled();
	});
});
