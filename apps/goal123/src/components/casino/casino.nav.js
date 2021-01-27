import React from "react";
import { defNav } from "./casino.def";

export default ({ t, onSelectNav, selNav }) => {
	const rows = Object.keys(defNav).map(k => {
		const _nav = defNav[k];
		return (
			<button
				key={`casino-nav-${k}`}
				className={selNav === k ? "btn-check" : "blueBorder"}
				onClick={onSelectNav.bind(this, k)}>
				{t(_nav.displayKey)}
			</button>
		);
	});

	return <div className="btnGroup promoType">{rows}</div>;
};
