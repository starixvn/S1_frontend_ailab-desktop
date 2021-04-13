import React from "react";

export default ({ t, step, defStep }) => {
	const rows = defStep.map((item, idx) => {
		return (
			<div
				key={`step-${item.title}`}
				className={idx <= step - 1 ? "active" : ""}>
				<span>{item.title}</span>
				<span>{t(item.displayKey)}</span>
			</div>
		);
	});

	return (
		<div className="stepBar">
			<div
				className="stepLine"
				style={{ width: `${(100 / defStep.length) * step}%` }}
			/>
			{rows}
		</div>
	);
};
