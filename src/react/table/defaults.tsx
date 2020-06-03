import * as React from "react";

export const DefaultHeader = ({ name }: { name: string }) => {
	return <th>{name}</th>;
};

export const DefaultBody = ({ val }: { val: any }) => {
	return <td>{val}</td>;
};
