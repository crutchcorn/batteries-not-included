# Stable Options

`useStableOps` allows you to mark some keys in an object as referentially stable, avoiding re-renders.

## Usage

```tsx
const Child = ({ options }: { options: { a: number } }) => {
  return <div>{options.a}</div>;
};

const Parent = () => {
  const [opts, setOpts] = useState({
    a: 1,
  });

  const options = useStableOpts(opts, {
    unstableKeys: [],
    stableKeys: ["a"],
  } as const);
  return (
    <div>
      <Child options={options} />
      {/* Will not trigger a re-render */}
      <button onClick={() => setOpts({ a: 2 })}>Change a</button>
    </div>
  );
};
```

## The Problem We're Solving

Sometimes, in React applications, you need to have an API that accepts an object:

```tsx
const item = useItem({
  index: 2,
  onClick: () => {},
});
```

Let's assume we implement this hook like so:

```tsx
import { useEffect } from "react";

function useItem(opts) {
  // Pass `opts` to a useEffect here
  useEffect(() => {
    // ...
  }, [opts]);
}
```

By doing this, the `useEffect` will always run because the object passed to `useItem` is not [referentially stable](https://unicorn-utterances.com/posts/object-mutation).

To solve this, we wrote `useStableOpts` to allow you to select which keys in the object are stable vs unstable.
