import * as React from "react";
import { DataTableColumnProps } from "./datatable-column";
import { DefaultBody, DefaultHeader, DefaultFooter } from "./defaults";
import { ColumnDisplayName } from "./consts";

interface TrPropsFnProps {
  // This will be `-1` for header, since we're already defining `0` as row `0` elsewhere
  // This will be `-2` for footer, as a lack of better options
  rIndex: number;
}

interface DataTableProps<T = any> {
  items: T[];
  // This should be used to get the `key` prop for each item
  itemKeyGetter: (val: T) => any;
  trProps?: (meta: TrPropsFnProps) => React.HTMLAttributes<HTMLTableRowElement>;
  tableProps?: React.HTMLAttributes<HTMLTableElement>;
}

export const DataTable: React.FC<React.PropsWithChildren<DataTableProps>> = ({
  items,
  itemKeyGetter,
  trProps = () => {},
  tableProps = {},
  children,
}) => {
  const childrenArr = React.Children.toArray(children);

  const { columnChildren, otherChildren } = childrenArr.reduce<{
    columnChildren: React.ReactNode[];
    otherChildren: React.ReactNode[];
  }>(
    (prev, el: any) => {
      if (el.type.displayName === ColumnDisplayName) {
        prev.columnChildren.push(el);
      } else {
        prev.otherChildren.push(el);
      }
      return prev;
    },
    { columnChildren: [], otherChildren: [] }
  );

  /**
   * Logic to apply column headers
   */
  const headerEls = columnChildren.map((columnChild, cIndex) => {
    const columnProps: DataTableColumnProps = (columnChild as any).props;
    const { columnKey, header, name: columnName } = columnProps;

    if (header) {
      const headEl = header({ columnName, cIndex });
      return <React.Fragment key={columnKey}>{headEl}</React.Fragment>;
    }

    return <DefaultHeader name={columnName} key={columnKey} />;
  });

  /**
   * Logic to apply column body
   */
  const columnEls = items.map((item, rIndex) => {
    const itemKey = itemKeyGetter(item);
    const rowEl = columnChildren.map((columnChild, cIndex) => {
      const columnProps: DataTableColumnProps = (columnChild as any).props;
      const { value, columnKey, children: columnBodyFn } = columnProps;

      let val;
      if (!value) {
        val = item[columnKey];
      } else {
        val = value(item);
      }

      const key = `${columnKey}${itemKey}`;

      if (columnBodyFn) {
        const body = columnBodyFn(val, { cIndex, rIndex });
        return <React.Fragment key={key}>{body}</React.Fragment>;
      }

      return <DefaultBody val={val} key={key} />;
    });

    const trPropsObj = trProps({ rIndex });

    return (
      <tr key={`${itemKey}-row`} {...trPropsObj}>
        {rowEl}
      </tr>
    );
  });

  /**
   * Conditional logic to apply footer
   */
  let tfoot = null;

  const hasFooter = columnChildren.find((columnChild) => {
    const columnProps: DataTableColumnProps = (columnChild as any).props;
    return !!columnProps.footer;
  });

  if (hasFooter) {
    const tfootChildren = columnChildren.map((columnChild, cIndex) => {
      const columnProps: DataTableColumnProps = (columnChild as any).props;
      const { columnKey, footer, name: columnName } = columnProps;

      if (footer) {
        const footerEl = footer({ columnName, cIndex });
        return <React.Fragment key={columnKey}>{footerEl}</React.Fragment>;
      }

      return <DefaultFooter key={columnKey} />;
    });

    const trPropsFootObj = trProps({ rIndex: -2 });

    tfoot = (
      <tfoot>
        <tr {...trPropsFootObj}>{tfootChildren}</tr>
      </tfoot>
    );
  }

  const trPropsHeadObj = trProps({ rIndex: -1 });

  return (
    <table {...tableProps}>
      <thead>
        <tr {...trPropsHeadObj}>{headerEls}</tr>
      </thead>
      {otherChildren}
      <tbody>{columnEls}</tbody>
      {tfoot}
    </table>
  );
};
