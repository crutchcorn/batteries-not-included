These packages are meant for non-framework based code. This means that every utility in this subpackage should be able to be used
in vanilla JS or in codebases utilizing something like React or Angular.

## Normalize Number

| File               | Function           |
| ------------------ | ------------------ |
| `normalize-number` | `normalizeNumber`  |

```javascript
import {normalizeNumber} from 'batteries-not-included/utils';
```

However, due to potential breaking APIs in the future, it is highly suggested to use the first of the two results.

The function takes three parameters:

1) The number to check the value of
2) The minimum value that the number must be
3) The maximum value that the number must be

All three of these parameters must be numbers

If the number is less than the minimum, the minimum number will be returned
If the number is more than the maximum, the maximum number will be returned

### Examples
```javascript
normalizeNumber(5, 3, 10); // 5
normalizeNumber(1, 3, 10); // 3
normalizeNumber(18, 3, 10); // 10
```

## Wrap Number

| File               | Function           |
| ------------------ | ------------------ |
| `wrap-number` | `wrapNumber`  |

```javascript
import {wrapNumber} from 'batteries-not-included/utils';
```

However, due to potential breaking APIs in the future, it is highly suggested to use the first of the two results.

The function takes three parameters:

1) The number to check the value of
2) The minimum value that the number must be
3) The maximum value that the number must be

All three of these parameters must be numbers

If the number is less than the minimum, the maximum number will be returned
If the number is more than the maximum, the minimum number will be returned

### Examples
```javascript
wrapNumber(5, 3, 10); // 5
wrapNumber(1, 3, 10); // 10
wrapNumber(18, 3, 10); // 3
```


## Make an ASCII Table From 2D Array

| File      | Function   |
| --------- | ---------- |
| `tablize` | `tablize`  |

This function takes a two-dimentional array and treats it as a table,
so it outputs to a string that's an ASCII art of a table. It will
treat the first item in the array as a header to said table

For example, given:
```javascript
const tableArray = [
    ["Item", "Count", "Another count"],
    ["Apples", 3, 1939889988],
    ["Oranges", 399, 213],
    ["Bananas", 1, -129389176]
];

console.log(tablize(tableArray));
```

It will output the following ASCII art:

```
Item    | Count | Another count
-------------------------------
Apples  |     3 |    1939889988
Oranges |   399 |           213
Bananas |     1 |    -129389176
```

> Please be aware that this functionality does not play nicely with A11Y
> when printed out. This is meant only as a demo for some small things
> that are not meant to be public.
> Also, if you use this for outputting data in Node, you may be better suited
> by `console.table`, as in some circumstances it is interactive


## Diff An Array

| File                          | Function                   |
| ----------------------------- | -------------------------- |
| `get-array-added-and-removed` | `getArrayAddedAndRemoved`  |

This function take two arrays and diffs them, telling you what items have been removed from the first array in the second array
and what items have been added in the second array that wasn't originally in the first array

The function takes three parameters:

1) The old array to compare
2) The new array to compare
3) A function that acts as a comparison function. It recieves one item from the old array and one item from the old array and should return a boolean if the two items are the same

```javascript
getArrayAddedAndRemoved([1,2,3], [2,3,4]); // {added: [4], removed: [1]}
```
