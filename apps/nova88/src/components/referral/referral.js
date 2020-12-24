import React, { useEffect, useRef, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext, popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import Loading from "../common/loading";
import { api_payment_GetWithdrawalInfoRecent } from "../../service/api/payment";

import ReferralLinks from "./referral.links";
import RecentHistory from "./referral.recentHistory";

import refStepBanner from "../../styles/img/refBanner.png";

export default () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);

	const [recentData, setRecentData] = useState([]);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const getReferralRecent = async () => {
		await api_payment_GetWithdrawalInfoRecent().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setRecentData(res.data.data);
					} else {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: res.data.message,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={clickClose}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: t("msg_ApiServerError"),
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
									onClick={clickClose}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			}
		);
	};

	const refreshData = () => {
		getReferralRecent();
	};

	return (
		<>
			<div className="infoModule">
				<div className="inside-title icon icon-friend">
					<span>{t("lbl_Referral")}</span>
					<div>{t("lbl_Referral_description")}</div>
				</div>
				<img src={refStepBanner} className="referral_banner" />
				<ReferralLinks t={t} />
			</div>
			<RecentHistory
				refreshData={refreshData}
				recentHistory={recentData ?? []}
				getReferralRecent={getReferralRecent}
			/>
		</>
	);
};
