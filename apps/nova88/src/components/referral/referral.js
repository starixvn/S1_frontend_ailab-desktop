import React, { useEffect, useRef, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import {
	api_account_GetReferralCode,
	api_account_GetReferralSetting,
	api_account_GetReferralSummary
} from "../../service/api/account";
import { loadingContext, userInfoContext } from "../common/context";
import usePopBox from "../hook/usePopBox";
import { number_format, isConvert } from "../common/common";
import ReferralLinks from "./referral.links";
import ReferralShare from "./referral.share";

const initReferralSettingData = {
	periodDays: 0,
	bonusAmount: 0,
	vaildBet: 0,
	deposit: 0
};

export default () => {
	const { t } = useTranslation();
	const { errorPopBox } = usePopBox();
	const isMountedRef = useRef(null);
	const [referralCode, setReferralCode] = useState("");
	const [referralSettingData, setReferralSettingData] = useState(
		initReferralSettingData
	);
	const { loading, setLoading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);
	const refStepBanner = require(`../../styles/img/refbanner-${userInfo.langId}.png`);
	const [referralSum, setReferralSum] = useState({
		conditionCount: 0,
		amountCount: 0,
		referralCount: 0,
		amountSum: 0
	});
	const _isConvert = isConvert(userInfo.currencyId);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		getReferralCode();
		getReferralSetting();
		getReferralSummary();
	}, []);

	const getReferralCode = async () => {
		setLoading(true);
		await api_account_GetReferralCode().then(
			res => {
				setLoading(false);

				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setReferralCode(res.data.data);
					} else {
						errorPopBox(res.data.message, res.data.errorCode);
					}
				}
			},
			() => {
				setLoading(false);
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);
	};

	const getReferralSetting = () => {
		api_account_GetReferralSetting().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						if (res.data.data.length > 0) {
							setReferralSettingData(res.data.data[0]);
						}
					} else {
						errorPopBox(res.data.message, res.data.errorCode);
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);
	};

	const getReferralSummary = async () => {
		setLoading(true);
		await api_account_GetReferralSummary().then(
			res => {
				setLoading(false);

				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setReferralSum(prevS => ({
							...prevS,
							conditionCount: res.data.data.conditionCount,
							amountCount: res.data.data.amountCount,
							referralCount: res.data.data.referralCount,
							amountSum: res.data.data.amountSum
						}));
					} else {
						errorPopBox(res.data.message, res.data.errorCode);
					}
				}
			},
			() => {
				setLoading(false);
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);
	};

	return (
		!loading && (
			<div className="infoModule">
				<div className="inside-title icon icon-friend">
					<span>{t("lbl_ReferFriends")}</span>
				</div>
				<div className="achievement">
					{t("lbl_ReferralStatus")} :
					<br />
					{t("lbl_InvitationAccepted")} / {t("lbl_MissionCompleted")}
					<span>
						{referralSum.conditionCount} / {referralSum.amountCount}
					</span>
					<br /> {t("lbl_NoOfAchievements")} / {t("lbl_RewardAmount")}
					<span>
						{referralSum.referralCount} /{" "}
						{t(`Currency_${userInfo.currencyId}`)}{" "}
						{number_format(referralSum.amountSum, _isConvert)}
					</span>
					<div className="txt-lightgray">
						{t("lbl_Referral_description")}
					</div>
				</div>

				<img src={refStepBanner} className="referral_banner" />
				<div className="referralModule">
					<ReferralShare
						t={t}
						langId={userInfo.langId}
						currencyId={userInfo.currencyId}
						referralSettingData={referralSettingData}
					/>
					<ReferralLinks t={t} referralCode={referralCode} />
				</div>
			</div>
		)
	);
};
