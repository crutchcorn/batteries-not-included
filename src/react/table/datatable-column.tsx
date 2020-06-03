import * as React from "react";

export interface DataTableColumnProps<T = any, ValT = any> {
	// The return value will be used as the `value` for body
	value: (obj: T) => ValT;
	header?: (name: string) => React.ReactNode;
	children?: (
		val: ValT,
		meta: { cIndex: number; rIndex: number }
	) => React.ReactNode;
	name: string;
	// This must be unique. Acts like the "key" prop elsewhere
	columnKey: string;
}

export const DataTableColumn = ({ children }: DataTableColumnProps) => {
	// This is a `noop`. See the './defaults' file
	return children as any;
};
