import React from "react";
import { defNav } from "./casino.def";

export default ({ t, onSelectNav, selNav }) => {
	const rows = Object.keys(defNav).map(k => {
		const _nav = defNav[k];
		return (
			<button
				key={`casino-nav-${k}`}
				className={selNav === k ? "blueGradient" : "blueBorder"}
				onClick={onSelectNav.bind(this, k)}>
				{t(_nav.displayKey).toUpperCase()}
			</button>
		);
	});

	return <>{rows}</>;
};
