import React, { useEffect } from "react";

export default ({ closePopBox, t, drawPrizeDatas }) => {
	useEffect(() => {
		const elPopBox = document.getElementById("popup");
		elPopBox.firstChild.classList.add("eventpop");
	}, []);
	const { prizeName } = drawPrizeDatas;
	return (
		<>
			<button onClick={closePopBox} className="icon icon-close" />
			<div className="title">{t("lbl_Congratulations")}</div>
			<div>{t("lbl_AngPow_CreditedAccount1")}</div>
			<div className="am">{prizeName}</div>
			<div>{t("lbl_AngPow_CreditedAccount2")}</div>
		</>
	);
};
