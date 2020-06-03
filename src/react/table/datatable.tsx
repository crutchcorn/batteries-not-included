import * as React from "react";
import { DataTableColumnProps } from "./datatable-column";
import { DefaultBody, DefaultHeader } from "./defaults";

interface DataTableProps<T = any> {
	items: T[];
	// This should be used to get the `key` prop for each item
	itemKeyGetter: (val: T) => any;
}

export const DataTable: React.FC<DataTableProps> = ({
	items,
	itemKeyGetter,
	children
}) => {
	const childrenArr = React.Children.toArray(children);

	const headerEls = childrenArr.map(columnChild => {
		const columnProps: DataTableColumnProps = (columnChild as any).props;
		const { columnKey, header, name } = columnProps;

		if (header) {
			const headEl = header(name);
			return <React.Fragment key={columnKey}>{headEl}</React.Fragment>;
		}

		return <DefaultHeader name={name} key={columnKey} />;
	});

	const columnEls = items.map((item, rIndex) => {
		const itemKey = itemKeyGetter(item);
		const rowEl = childrenArr.map((columnChild, cIndex) => {
			const columnProps: DataTableColumnProps = (columnChild as any).props;
			const { value, columnKey, children: columnBodyFn } = columnProps;

			const val = value(item);

			const key = `${columnKey}${itemKey}`;

			if (columnBodyFn) {
				const body = columnBodyFn(val, { cIndex, rIndex });
				return <React.Fragment key={key}>{body}</React.Fragment>;
			}

			return <DefaultBody val={val} key={key} />;
		});

		return <tr key={`${itemKey}-row`}>{rowEl}</tr>;
	});

	return (
		<table>
			<thead>
				<tr>{headerEls}</tr>
			</thead>
			<tbody>{columnEls}</tbody>
		</table>
	);
};
