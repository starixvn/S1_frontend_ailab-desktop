import React, { memo } from "react";

const LuckyWheelTitle = ({ t, langId }) => {
	const className = ["eventTitleBg", langId === "vn" && "vietnam"]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={className}>
			<div className="eventTitle">{t("luckyWheel.lbl_title")}</div>
		</div>
	);
};

export default memo(LuckyWheelTitle);
