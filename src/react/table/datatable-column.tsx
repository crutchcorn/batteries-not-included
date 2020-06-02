import * as React from "react";

interface DataTableColumnProps<T = any, ValT = any> {
	// The return value will be used as the `value` for body
	value: (obj: T) => ValT;
	// This is injected by `datatable` rather than an actual input prop
	_item?: T;
	// This is injected by `datatable` rather than an actual input prop. When `true`, there will be no `_item`
	_isHeader?: boolean;
	// This is injected by `datatable` rather than an actual input prop
	_cIndex?: number;
	// This is injected by `datatable` rather than an actual input prop
	_rIndex?: number;
	header?: (name: string) => React.ReactNode;
	body?: (
		val: ValT,
		meta: { cIndex: number; rIndex: number }
	) => React.ReactNode;
	name: string;
	// This must be unique. Acts like the "key" prop elsewhere
	columnKey: string;
}

export const DataTableColumn: React.FC<DataTableColumnProps> = ({
	value,
	header,
	body,
	name,
	_item,
	_isHeader,
	_rIndex,
	_cIndex
}) => {
	if (_isHeader) {
		if (header) return header(name) as any;
		return <th>{name}</th>;
	}

	const val = value(_item);

	if (body) return body(val, { cIndex: _cIndex!, rIndex: _rIndex! });

	return <td>{val}</td>;
};
