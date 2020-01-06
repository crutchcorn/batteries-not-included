These packages are meant for non-framework based code. This means that every utility in this subpackage should be able to be used
in vanilla JS or in codebases utilizing something like React or Angular.

## Utilities


Table of Contents
=================

  * [Normalize Number](#normalize-number)

------

### Normalize Number

| File               | Function           |
| ------------------ | ------------------ |
| `normalize-number` | `normalizeNumber`  |

As a result, you're able to import either from:
```javascript
import {normalizeNumber} from 'batteries-not-included/utils';
import {normalizeNumber} from 'batteries-not-included/utils/normalize-number';
```

However, due to potential breaking APIs in the future, it is highly suggested to use the first of the two results.

The function takes three parameters:

1) The number to check the value of
2) The minimum value that the number must be
3) The maximum value that the number must be

All three of these parameters must be numbers

If the number is less than the minimum, the minimum number will be returned
If the number is more than the maximum, the maximum number will be returned

#### Examples
```javascript
normalizeNumber(5, 3, 10); // 5
normalizeNumber(1, 3, 10); // 3
normalizeNumber(18, 3, 10); // 10
```
