This set of utilities is meant to help developers create accessible components without making assumptions about how it's UI will display

## ID Generation

| File       | Function  |
| ---------- | --------- |
| `genNewId` | `genId`   |

This function has no parameters, but will return a number that's unique to that
instance. We use it to generate new IDs that can be used by an `id` attribute

## Keyboard Detection

There may be an instance where you want to check if the user last used a keyboard on an element
in order to render different UI (or highlight items when the user is using a keyboard),
this hook may be of help

| File                  | Function              |
| --------------------- | --------------------- |
| `useUsedKeyboardLast` | `useUsedKeyboardLast` |

This hook takes two parameters:

1) `elRef`: A reference to an element used to attach the event listeners to
2) `options`: An optional object of options for the hook

### Options Object

- `options.enable`: A boolean of if it should be enabled or not. If disabled, the `usedKeyboardLast` value will remain the same

### Returns

This hook returns an object with two keys:

- `usedKeyboardLast`: A boolean of if the user had last used a keyboard
- `resetLastUsedKeyboard`: A function that takes no parameters and sets `usedKeyboardLast` to false

## Keyboard List Navigation

There are various UI elements that may want to use keyboard arrow key navigation on.
This hook will assist you in handling this, although it will not handle the
"selection" element of a UI element that might expect that.

By default, it handles up arrow, down arrow, end and home button navigation.
The up and down arrow moves by one and the home and end go to the first and
last index item

| File                        | Function                    |
| --------------------------- | --------------------------- |
| `useKeyboardListNavigation` | `useKeyboardListNavigation` |

This hook takes two parameters:

1) `parentRef`: A reference to an element used to attach the event listeners to
2) `options`: An optional object of options for the hook

### Options Object

- `options.maxLength`: The maximum number that should be allowed. By default,
    - If this is not defined, home and end buttons will not work
- `options.enable`: A boolean of if it should be enabled or not
- `options.runOnIndexChange`: A callback that should be ran whenever the selected index is changed

#### Run On Index Change Callback

The `runOnIndexChange` callback allows a developer the ability to add additional
key listeners to the existing keypress listener, or run other custom
code when the user changes the index of the currently selected item

- `event`: The keyboard event that's used on the element, useful for extending functionality of the keyboard listener for more keypress checks
    - Be aware that if you use `selectIndex`, this may be `undefined` if you do not manually pass the keyboard event
- `focusedIndex`: The previous index that was selected before user interaction
- `newIndex`: The new index that's now being selected by user interaction
    - Be aware that this may also be `undefined` if the user selects a key that is not being bound to any specific index value

It's useful to have both the old and new index for scenarios like allowing
a user to have a selection that's toggled when the user holds shift and selects two indexes

### Returns

The `useKeyboardListNavigation` hook returns an object with two keys:

- `focusedIndex`: The index of the currently focused item
- `selectIndex`: A function that takes two parameters:
    1) `index`: The new index that you'd like to have selected
    2) `event`: The event that was used to trigger the selection. This will get passed to `runOnIndexChange`, so it's suggested to pass it when the user makes keyboard events at least

## Selectable Array

In many UI elements, there are times where having a selectable array with
unique elements and a state of if an item is selected or not can be greatly
useful. This hook assists in scenarios of the sort

| File                 | Function             |
| -------------------- | -------------------- |
| `useSelectableArray` | `useSelectableArray` |

This base hook takes two parameters:

1) `valArr`: The original value array that you want to make selectable
2) `runAfterSelectChange`: An optional function that can be ran after selection changes are made
    - This is present as the `ref.current` value changes may not trigger a detection change, so this allows you to do so manually

### Returns

This hook returns an object with three keys:

- `internalArr`: An array the same length as `valArr`, but with more metadata on each item in the array
    - Each item of the array will have the following values:
        - `id`: A unique ID that can be safely placed in the DOM
        - `val`: The original value in the `valArr` array
        - `index`: The original index in the `valArr` array
        - `selected`: If this item is selected in the data
- `selectAll`: A function with no parameters that will mark all items in the array with `selected: true`
- `markAsSelected`: A function that takes two parameters - a from index and a to index. It will then select all the items from one value to another
    - If the `from` index is lower than the `to` index, it will simply swap the two numbers and mark the items in between as `selected: true`0

## Popover

This hook is meant to provide a utility that can be used to compose functionality
for a popover component. A popover component is one that has a trigger button and a 
popup after the button is pressed. This hook handles the `expanded` property as well
as the props to be added to the trigger button

| File         | Function     |
| ------------ | ------------ |
| `usePopover` | `usePopover` |

This hook takes three parameters:

1) `parentRef`: The div that contains the popoverArea and the trigger button
2) `popoverAreaRef`: The div that will be used as the popover area to focus on when the popover is opened
3) `options`: An optional object of options for the hook

### Options Object

- `options.onBtnClick`
- `options.onBtnKeyDown`

Because the return object expects you to pass the `buttonProps` `onClick` and `onKeyDown` to the button used to trigger a popover, passing these functions will run after the `usePopover` hook's implementation of each of these functions, allowing you to configure the behavior of them manually without ejecting from the object property spread.

### Returns

The `usePopover` hook returns an object with three keys:

- `buttonProps`: The set of props that should be expanded on into a button. IE: `<button {...buttonProps}/>`
    - The two included props in this object are `onClick` and `onKeyDown`. Your own implementations of these will be overwritten if you follow the above code
- `expanded`: A boolean of if the popover is expanded or not
- `setExpanded`: A function that takes a single boolean parameter and sets the value of `expanded`
