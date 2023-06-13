import React from "react";
import PropTypes from "prop-types";

const SuccessMySteryBox = ({ closePopBox, t, drawPrizeDatas }) => {
	const { prizeName } = drawPrizeDatas;

	return (
		<div className="pop eventpop2">
			<button onClick={closePopBox} className="icon icon-close" />
			<div className="title">{t("lbl_MysteryBox_Congratulations")}</div>
			<div>{t("lbl_MysteryBox_CreditedAccount1")}</div>
			<div className="am">{prizeName}</div>
			<div>{t("lbl_MysteryBox_CreditedAccount2")}</div>
		</div>
	);
};

SuccessMySteryBox.propTypes = {
	closePopBox: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
	drawPrizeDatas: PropTypes.objectOf(PropTypes.any).isRequired
};
export default SuccessMySteryBox;
