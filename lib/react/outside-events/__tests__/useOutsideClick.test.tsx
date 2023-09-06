import * as React from "react";
import { useOutsideClick } from "../useOutsideClick";
import { render, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, Mock } from "vitest";

const renderTestEl = (enable: boolean) => {
  // eslint-disable-next-line react/display-name
  const El = React.forwardRef((_, ref) => {
    const currentRef = React.useRef(null);
    const handleFn = vi.fn();

    useOutsideClick(currentRef, enable, handleFn);

    React.useImperativeHandle(ref, () => ({
      handleFn,
    }));

    return (
      <div data-testid={"parent"}>
        <div data-testid={"side"} />
        <div data-testid={"main"} ref={currentRef} />
      </div>
    );
  });

  const ref = React.createRef<{ handleFn: Mock }>();
  const props = render(<El ref={ref} />);
  const sideEl = props.getByTestId("side");
  const mainEl = props.getByTestId("main");
  const parentEl = props.getByTestId("parent");

  return {
    sideEl,
    mainEl,
    parentEl,
    currentRef: ref.current!,
    ...props,
  };
};

describe("useOutsideClick", () => {
  test("handles clicks on the inside", () => {
    const { mainEl, currentRef } = renderTestEl(true);
    fireEvent.mouseDown(mainEl);
    expect(currentRef.handleFn).not.toHaveBeenCalled();
  });

  test("handles clicks on the outside", () => {
    const { sideEl, currentRef } = renderTestEl(true);
    fireEvent.mouseDown(sideEl);
    expect(currentRef.handleFn).toHaveBeenCalled();
  });

  test("disabled properly", () => {
    const { sideEl, currentRef } = renderTestEl(false);
    fireEvent.mouseDown(sideEl);
    expect(currentRef.handleFn).not.toHaveBeenCalled();
  });
});
