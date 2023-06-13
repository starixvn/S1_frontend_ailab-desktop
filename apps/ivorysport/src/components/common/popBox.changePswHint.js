import React from "react";

export default ({ btnBar, title, message, ClickClose }) => {
	return (
		<div className="changePassWordpop active">
			<button className="icon icon-cross" onClick={ClickClose} />
			<div className="icon icon-icon32px_password" />
			<div className="title">{title}</div>
			<div>{message}</div>
			{btnBar}
		</div>
	);
};
