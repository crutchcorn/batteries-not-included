import { getArrayAddedAndRemoved } from "../get-array-added-and-removed";
import { describe, test, expect } from "vitest";

describe("Get array added and removed", () => {
  test("to return nothing when they're both the same in the  same order", async () => {
    const { added, removed } = getArrayAddedAndRemoved(
      [1, 2, 3, 4],
      [1, 2, 3, 4]
    );
    expect(added.length).toBe(0);
    expect(removed.length).toBe(0);
  });

  test("to return nothing when they're both the same in a different order", async () => {
    const { added, removed } = getArrayAddedAndRemoved(
      [1, 3, 2, 4],
      [1, 2, 3, 4]
    );
    expect(added.length).toBe(0);
    expect(removed.length).toBe(0);
  });

  test("to return an added item when in a same order", async () => {
    const { added, removed } = getArrayAddedAndRemoved(
      [1, 2, 3, 4],
      [1, 2, 3, 4, 5]
    );
    expect(added).toEqual([5]);
    expect(removed.length).toBe(0);
  });

  test("to return an added item when in a different order", async () => {
    const { added, removed } = getArrayAddedAndRemoved(
      [1, 3, 2, 4],
      [1, 2, 3, 4, 5]
    );
    expect(added).toEqual([5]);
    expect(removed.length).toBe(0);
  });

  test("to return an removed item when in a same order", async () => {
    const { added, removed } = getArrayAddedAndRemoved(
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4]
    );
    expect(removed).toEqual([5]);
    expect(added.length).toBe(0);
  });

  test("to return an removed item when in a different order", async () => {
    const { added, removed } = getArrayAddedAndRemoved(
      [1, 3, 2, 4, 5],
      [1, 2, 3, 4]
    );
    expect(removed).toEqual([5]);
    expect(added.length).toBe(0);
  });

  test("to return an removed and added item when in the same order", async () => {
    const { added, removed } = getArrayAddedAndRemoved(
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 6]
    );
    expect(removed).toEqual([5]);
    expect(added).toEqual([6]);
  });

  test("to return an removed and added item when in a different order", async () => {
    const { added, removed } = getArrayAddedAndRemoved(
      [1, 2, 3, 4, 5],
      [6, 1, 2, 3, 4]
    );
    expect(removed).toEqual([5]);
    expect(added).toEqual([6]);
  });
});
