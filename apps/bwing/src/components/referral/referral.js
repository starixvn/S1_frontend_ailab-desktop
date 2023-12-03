import React, { useEffect, useRef, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import {
	api_account_GetReferralCode,
	api_account_GetReferralSettingDetail,
	api_account_GetReferralSummary
} from "../../service/api/account";
import {
	loadingContext,
	referralPopBox,
	userInfoContext
} from "../common/context";
import usePopBox from "../hook/usePopBox";
import { bannerImgUrl } from "../../config";
import { ReferralPopBox } from "./referral.popbox";
import ReferralInfo from "./referral.info";
import ReferralStatus from "./referral.status";

export default () => {
	const { t } = useTranslation();
	const { errorPopBox } = usePopBox();
	const isMountedRef = useRef(null);
	const [referralCode, setReferralCode] = useState("");
	const {
		userInfo: { langId }
	} = useContext(userInfoContext);
	const { loading, setLoading } = useContext(loadingContext);
	const { setReferralBox } = useContext(referralPopBox);
	const [referralSum, setReferralSum] = useState({});

	const getReferralCode = async () => {
		setLoading(true);
		await api_account_GetReferralCode().then(
			res => {
				setLoading(false);

				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setReferralCode(res.data.data);
					} else {
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
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

	const getReferralSummary = async () => {
		setLoading(true);
		await api_account_GetReferralSummary().then(
			res => {
				setLoading(false);

				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setReferralSum(res.data.data);
					} else {
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
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

	const onCopy = async column_id => {
		const copyInput = document.getElementById(column_id);
		copyInput.select();
		document.execCommand("copy");
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		getReferralCode();
		getReferralSummary();
	}, []);

	return (
		!loading && (
			<>
				<img
					className="refer-banner"
					src={`${bannerImgUrl}/desktop/img/4.0/referral/referral-bg-${langId}.png`}
					alt=""
				/>
				<button className="refer-moreinfo" onClick={getReferralDetail}>
					{t("lbl_Promotion_MoreInfo")}
				</button>
				<div className="infoModule">
					<ReferralInfo referralCode={referralCode} onCopy={onCopy} />
					<ReferralStatus referralSum={referralSum} />
				</div>
			</>
		)
	);
};
