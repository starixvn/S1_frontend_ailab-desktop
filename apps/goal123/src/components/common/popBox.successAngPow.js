import React from "react";

export default ({ clickClose, t, drawPrizeDatas }) => {
	const { prizeName } = drawPrizeDatas;
	return (
		<div id="popup" className="angpaoPup active">
			<div className="pop eventpop">
				<button onClick={clickClose} className="icon icon-close" />
				<div className="title">{t("lbl_AngPow_Congratulations")}</div>
				<div>{t("lbl_AngPow_CreditedAccount1")}</div>
				<div className="am">{prizeName}</div>
				<div>{t("lbl_AngPow_CreditedAccount2")}</div>
			</div>
		</div>
	);
};
