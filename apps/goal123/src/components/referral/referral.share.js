import React, { useContext } from "react";
import PropTypes from "prop-types";
import { number_format, isConvert } from "../common/common";
import { referralPopBox } from "../common/context";
import usePopBox from "../hook/usePopBox";
import { api_account_GetReferralSettingDetail } from "../../service/api/account";
import { ReferralPopBox } from "./referral.popbox";

const SharePanel = ({ t, currencyId, referralSettingData }) => {
	const { setReferralBox } = useContext(referralPopBox);
	const { errorPopBox } = usePopBox();
	const { periodDays, bonusAmount, vaildBet, deposit } = referralSettingData;
	const currency = t(`Currency_${currencyId}`);
	const _isConvert = isConvert(currencyId);

	const getReferralDetail = async () => {
		const res = await api_account_GetReferralSettingDetail();
		const { errorCode, data, message } = res.data;

		const closePopBox = () => {
			setReferralBox({ isOpen: false });
		};

		if (errorCode === 0) {
			setReferralBox({
				isOpen: true,
				content: (
					<ReferralPopBox
						data={data}
						closePopBox={closePopBox}
						t={t}
					/>
				)
			});
		} else {
			errorPopBox(message || `error`, errorCode);
		}
	};

	return (
		<div className="refShare">
			<div className="title">{t("lbl_Share_with_friend")}</div>
			<div className="refBox">
				<div>
					<div>
						{t("lbl_ValidPeriod")}
						<span>{`${periodDays} ${t("lbl_Days")}`}</span>
					</div>
					<div>
						{t("lbl_Bonus")}
						<span>
							{currency}{" "}
							{number_format({
								number: bonusAmount,
								formatRequired: _isConvert
							})}
						</span>
					</div>
					<div>
						{t("lbl_ValidBet")}
						<span>
							{currency}{" "}
							{number_format({
								number: vaildBet,
								formatRequired: _isConvert
							})}
						</span>
					</div>
					<div>
						{t("lbl_Deposit")}
						<span>
							{currency}{" "}
							{number_format({
								number: deposit,
								formatRequired: _isConvert
							})}
						</span>
					</div>
					<button className="more" onClick={getReferralDetail}>
						{t("lbl_MoreDetails")}
					</button>
				</div>
			</div>
		</div>
	);
};

SharePanel.defaultProps = {
	currencyId: null
};

SharePanel.propTypes = {
	t: PropTypes.func.isRequired,
	currencyId: PropTypes.number,
	referralSettingData: PropTypes.objectOf(PropTypes.any).isRequired
};

export default SharePanel;
