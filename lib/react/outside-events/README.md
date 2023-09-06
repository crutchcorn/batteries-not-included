This set of utilities is meant to track when a user takes an action outside of a given element.

For example, if you want to check when a user is clicking outside of the currently focused element, you'd use `onOutsideClick`

They're all based on the [onOutsideEvent](./onOutsideEvent.ts) code, which will provide a good baseline for someone to read


Table of Contents
=================

  * [Event Listeners](#event-listeners)
  * [Base Event Listener](#base-event-listener)

------

## Event Listeners

| File              | Function          |
| ----------------- | ----------------- |
| `useOutsideClick` | `useOutsideClick` |
| `useOutsideFocus` | `useOutsideFocus` |

Both of these functions take three parameters:

1) `parentRef`: A reference to the element from a `React.createRef` or `useRef`
2) `enable`: A boolean to enable/disable the listener
3) `onOutsideEvent`: A function to run when the outside event is ran

So, for example, you could find yourself with the following code:
```javascript
const El = () => {
    const ref = useRef();

    // This will always run becuase of the `true`. You may want to disable
    // the event listener in some cases, if so then just change `true` to
    // a changing boolean value
    useOutsideClick(ref, true, () => {
      console.log('The user has clicked outside of the div');
    });
    
    return <div ref={ref}/>;
}
```

## Base Event Listener

If you find yourself needing an event listener from outside of what's been created,
you're able to extend the base code that both of those functions base off of

| File              | Function          |
| ----------------- | ----------------- |
| `useOutsideEvent` | `useOutsideEvent` |

This base hook takes two parameters:

1) `eventName`: The name of the event in a string for the `document.addEventListener` to attach to
2) `params`: An array of the three parameters listed for the above usage

If you read through the code for any of the hooks that extend the base
hook, you'll see that writing your own is rather trivial
