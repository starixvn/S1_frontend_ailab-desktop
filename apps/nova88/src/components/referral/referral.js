import React, { useEffect, useRef, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { api_account_GetReferralCode } from "../../service/api/account";
import { loadingContext } from "../common/context";
import usePopBox from "../hook/usePopBox";

import ReferralLinks from "./referral.links";

import refStepBanner from "../../styles/img/refBanner.png";

export default () => {
	const { t } = useTranslation();
	const { errorPopBox } = usePopBox();
	const isMountedRef = useRef(null);

	const [referralCode, setReferralCode] = useState("");

	const { loading, setLoading } = useContext(loadingContext);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		getReferralCode();
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

	return (
		!loading && (
			<div className="infoModule">
				<div className="inside-title icon icon-friend">
					<span>{t("lbl_Referral")}</span>
					<div>{t("lbl_Referral_description")}</div>
				</div>
				<img src={refStepBanner} className="referral_banner" />
				<ReferralLinks t={t} referralCode={referralCode} />
			</div>
		)
	);
};
