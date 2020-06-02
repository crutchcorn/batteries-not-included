import * as React from "react";

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
		const columnKey = (columnChild as any).props.columnKey;

		const headerEl = React.cloneElement(columnChild as any, {
			_isHeader: true
		});
		return <React.Fragment key={columnKey}>{headerEl}</React.Fragment>;
	});

	const columnEls = items.map((item, _rIndex) => {
		const itemKey = itemKeyGetter(item);
		const rowEl = childrenArr.map((columnChild, _cIndex) => {
			const columnKey = (columnChild as any).props.columnKey;

			const itemEl = React.cloneElement(columnChild as any, {
				_item: item,
				_rIndex,
				_cIndex
			});

			return (
				<React.Fragment key={`${columnKey}${itemKey}`}>{itemEl}</React.Fragment>
			);
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
