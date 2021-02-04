import React from "react";

export default ({ closePopBox, t, drawPrizeDatas }) => {
	const { prizeName } = drawPrizeDatas;
	return (
		<>
			<div className="pop eventpop">
				<button onClick={closePopBox} className="icon icon-close" />
				<div className="title">{t("lbl_AngPow_Conditions")}</div>
				<div>{t("lbl_AngPow_CreditedAccount1")}</div>
				<div className="am">{prizeName}</div>
				<div>{t("lbl_AngPow_CreditedAccount2")}</div>
			</div>
			;
		</>
	);
};
