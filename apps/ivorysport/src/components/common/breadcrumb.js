import React from "react";

export const Breadcrumb = ({ children }) => {
	return (
		<nav className="breadcrumb">
			<ul>{children}</ul>
		</nav>
	);
};

const BreadcrumbItem = ({ children }) => {
	return <li className="icon breadcrumb-item">{children}</li>;
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
