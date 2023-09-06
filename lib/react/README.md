As many of these packages are hooks, these packages expect a peer dependency of at least React 16.9.

There are various sub-utilities to the React section of this package:

- [A11Y helper utilities](./a11y/README.md)
- [Generic data table](./table/README.md)
- [Event listeners outside a specific element](./outside-events/README.md)

It is suggested that all of these modules are imported from the following:

```
import {functionName} from 'batteries-not-included/react';
```

As any more-specific imports may have breaking changes before a stable release is maintained
