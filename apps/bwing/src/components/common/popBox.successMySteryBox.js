import React from "react";
import PropTypes from "prop-types";

const SuccessMySteryBox = ({ clickClose, t, drawPrizeDatas }) => {
	const { prizeName } = drawPrizeDatas;

	return (
		<div id="popup" className="mysteryPup active">
			<div className="pop eventpop active">
				<button onClick={clickClose} className="icon icon-close" />
				<div className="title">
					{t("lbl_MysteryBox_Congratulations")}
				</div>
				<div>{t("lbl_MysteryBox_CreditedAccount1")}</div>
				<div className="am">{prizeName}</div>
				<div>{t("lbl_MysteryBox_CreditedAccount2")}</div>
			</div>
		</div>
	);
};
SuccessMySteryBox.propTypes = {
	clickClose: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
	drawPrizeDatas: PropTypes.objectOf(PropTypes.any).isRequired
};
export default SuccessMySteryBox;
