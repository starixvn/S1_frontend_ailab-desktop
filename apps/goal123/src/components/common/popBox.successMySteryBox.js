import React from "react";

export default ({ clickClose, t, drawPrizeDatas }) => {
	const { prizeName } = drawPrizeDatas;

	return (
		<div className="pop eventpop goldbox_pop">
			<button onClick={clickClose} className="icon icon-close" />
			<div className="title">{t("lbl_MysteryBox_Congratulations")}</div>
			<div>{t("lbl_MysteryBox_CreditedAccount1")}</div>
			<div className="am">{prizeName}</div>
			<div>{t("lbl_MysteryBox_CreditedAccount2")}</div>
		</div>
	);
};
