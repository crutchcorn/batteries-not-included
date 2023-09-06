# Table

This is meant to be a React Table component that is both easy-to-use out-of-the-box, but also extremely configurable without having to eject from the table itself

## DataTable

The `DataTable` component handles displaying the `tbody`, `thead`, `tfoot`, and more based on the `DataTableColumn` children passed. It also supports many types of children that aren't column defs, such as [`caption`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption). These other children will be injected below the `thead` and above the `tbody` when supplied

### Usage

```typescript jsx
import { DataTable } from "batteries-not-included/react";

<DataTable items={people} itemKeyGetter={(p) => p.id}>
  <caption>This is a test table, please change it before prod</caption>
  {/* ... */}
</DataTable>;
```

### Props

| Prop          | Type                              | Description                                                                                                                                                                               |
| ------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`       | `any[]`                           | The items to use to build the table                                                                                                                                                       |
| `trProps`?    | `({rIndex: number}) => <trProps>` | The `props` to append to each and every `tr` in the table. To provide context to each `tr`, we pass the row index. It's `-1` if it's the `thead` `tr`, and `-2` if it's the `tfoot` `tr`. |
| `tableProps`? | `<tableProps>`                    | The `props` to append to the `table` element. Includes `onClick` and everything else you might append to `table`. Is _not_ a function, unlike `trProps`                                   |

## Table Column

These should be direct children of `DataTable` component. Each of the `DataTableColumn` has it's own props to generate values for each row.

### Usage

```typescript jsx
import { DataTableColumn } from "batteries-not-included/react";

// ...
<DataTableColumn name="Age" columnKey="age" />;
```

### Props

| Prop        | Type                                                     | Description                                                                                                                                                                                                           |
| ----------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `columnKey` | `string`                                                 | A unique `key` to identify the column. If `value` is not defined, we also use this key to get the value of the item: `item[columnKey]`.                                                                               |
| `name`      | `string`                                                 | The name of the column to be used in the header                                                                                                                                                                       |
| `value`?    | `(item) => any`                                          | The function to run on each row to get the value you want to display in the table                                                                                                                                     |
| `header`?   | `({ cIndex: number; columnName: string }) => ReactNode`  | If supplied, will render as the header element for this specific column. Must wrap in `th`. Defaults to: `({columnName}) => <th>{columnName}</th>`                                                                    |
| `footer`?   | `({ cIndex: number; columnName: string }) => ReactNode`  | If supplied, will render as the footer element for this specific column. If a single column in a template has a `footer` prop defined, it will generate a `tfoot` element for you, otherwise one will not be supplied |
| `children`? | `(any, { cIndex: number; rIndex: number }) => ReactNode` | If supplied, will render as the body element for this specific column per-row. Must wrap in `td`. Defaults to: `(val) => <td>{val}</td>`                                                                              |

## Simple Example

```typescript jsx
import * as React from "react";
import { render } from "react-dom";

import { DataTable, DataTableColumn } from "batteries-not-included/react";

const people = [
  { name: "Pedro Spencer", age: { val: "25" }, id: 10 },
  { name: "Benjamin Auer", age: { val: "12" }, id: 11 },
  { name: "Jerome Blick Jr.", age: { val: "35" }, id: 12 },
  { name: "Sabryna Friesen", age: { val: "2" }, id: 13 },
  { name: "Joel Sauer", age: { val: "28" }, id: 14 },
  { name: "Blair Wolff", age: { val: "85" }, id: 15 },
  { name: "Constance Yundt", age: { val: "90" }, id: 16 },
  { name: "Lourdes Pacocha", age: { val: "56" }, id: 17 },
  { name: "Tamia Kshlerin", age: { val: "5" }, id: 18 },
  { name: "Willis Tremblay", age: { val: "22" }, id: 19 },
  { name: "Sunny Reynolds", age: { val: "11" }, id: 20 },
];

const App = () => {
  return (
    <DataTable items={people} itemKeyGetter={(p) => p.id}>
      <DataTableColumn name="Name" columnKey="name" />
      <DataTableColumn name="Age" columnKey="age" />
    </DataTable>
  );
};

render(<App />, document.getElementById("root"));
```

## Advanced Example

```typescript jsx
import * as React from "react";
import { render } from "react-dom";

import { DataTable, DataTableColumn } from "batteries-not-included/react";

const people = [
  { name: "Pedro Spencer", age: { val: "25" }, id: 10 },
  { name: "Benjamin Auer", age: { val: "12" }, id: 11 },
  { name: "Jerome Blick Jr.", age: { val: "35" }, id: 12 },
  { name: "Sabryna Friesen", age: { val: "2" }, id: 13 },
  { name: "Joel Sauer", age: { val: "28" }, id: 14 },
  { name: "Blair Wolff", age: { val: "85" }, id: 15 },
  { name: "Constance Yundt", age: { val: "90" }, id: 16 },
  { name: "Lourdes Pacocha", age: { val: "56" }, id: 17 },
  { name: "Tamia Kshlerin", age: { val: "5" }, id: 18 },
  { name: "Willis Tremblay", age: { val: "22" }, id: 19 },
  { name: "Sunny Reynolds", age: { val: "11" }, id: 20 },
];

const App = () => {
  return (
    <DataTable
      items={people}
      itemKeyGetter={(p) => p.id}
      trProps={({ rIndex }) => ({
        onClick: () => {
          console.log("You clicked on row:", rIndex);
        },
      })}
      tableProps={{ onClick: () => console.log("You clicked on the table") }}
    >
      <caption>This is a test table, please change it before prod</caption>
      <DataTableColumn
        value={(p) => p.name}
        name="Name"
        columnKey="name"
        header={(name) => (
          <th>
            <button style={{ background: "black", color: "white" }}>
              {name}
            </button>
          </th>
        )}
        footer={({ columnName }) => (
          <td>
            <button style={{ background: "red", color: "white" }}>
              {columnName} Footer!
            </button>
          </td>
        )}
      />
      <DataTableColumn value={(p) => p.age.val} name="Age" columnKey="age">
        {(val, meta) => {
          if (meta.cIndex === 0) {
            return <th scope="row">{val}</th>;
          }

          return (
            <td>
              <button style={{ background: "black", color: "white" }}>
                Val: {val} Row: {meta.rIndex} Column: {meta.cIndex}
              </button>
            </td>
          );
        }}
      </DataTableColumn>
    </DataTable>
  );
};

render(<App />, document.getElementById("root"));
```
