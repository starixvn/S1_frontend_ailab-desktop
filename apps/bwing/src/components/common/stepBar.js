import React from "react";

export default ({ t, step, defStep, className }) => {
	const rows = defStep.map((s, sIdx) => {
		return (
			<div
				className={sIdx <= step - 1 ? "active" : ""}
				key={`step-${sIdx}`}>
				<span>{t(s.descriptionKey)}</span>
			</div>
		);
	});

	return <div className={className || "stepBar"}>{rows}</div>;
};
