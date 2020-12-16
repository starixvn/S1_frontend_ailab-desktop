import React from "react";

export default ({ t, updatedTime, titleDisplayKey, children }) => {
	return (
		<div className="right">
			<div className="titleGroup"></div>
			<div className="title">{t(titleDisplayKey)}</div>
			<div className="rankingList">
				<ul className="rankScroll">
					<li>
						<div>{t("lbl_Rank")}</div>
						<div>{t("lbl_Username")}</div>
						<div>{t("lbl_Points")}</div>
					</li>
					{children}
				</ul>
			</div>
			<div className="message">
				{t(`lbl_LastUpdTime`, {
					time: updatedTime
				})}
			</div>
		</div>
	);
};
