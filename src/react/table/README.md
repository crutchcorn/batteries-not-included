# Docs

When `header` is supplied, you _must_ wrap your element in a `th`, as it will not be supplied to you

Likewise, when using `body`, you'll want to supply your `td`

# Simple Example

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
  { name: "Sunny Reynolds", age: { val: "11" }, id: 20 }
];

const App = () => {
  return (
      <DataTable
          items={people}
          itemKeyGetter={p => p.id}
      >
        <DataTableColumn
            name="Name"
            columnKey="name"
        />
        <DataTableColumn
            name="Age"
            columnKey="age"
        />
      </DataTable>
  );
};

render(<App />, document.getElementById("root"));
```

# Advanced Example

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
  { name: "Sunny Reynolds", age: { val: "11" }, id: 20 }
];


const App = () => {
  return (
      <DataTable
          items={people}
          itemKeyGetter={p => p.id}
          trProps={({rIndex}) => ({
              onClick: () => {console.log('You clicked on row:', rIndex)}
          })}
          tableProps={{onClick: () => console.log("You clicked on the table")}}
      >
        <caption>This is a test table, please change it before prod</caption>
        <DataTableColumn
            value={p => p.name}
            name="Name"
            columnKey="name"
            header={name => (
                <th>
                  <button style={{ background: "black", color: "white" }}>
                    {name}
                  </button>
                </th>
            )}
            footer={({ columnName }) => (
                <td>
                    <button style={{ background: 'red', color: 'white' }}>{columnName} Footer!</button>
                </td>
            )}
        />
        <DataTableColumn
            value={p => p.age.val}
            name="Age"
            columnKey="age"
        >
            {(val, meta) => {
                if (meta.cIndex === 0) {
                    return <th scope="row" >{val}</th>;
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
