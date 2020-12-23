import React, { useEffect, useRef, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext, popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import Loading from "../common/loading";
import { api_payment_GetWithdrawalInfoRecent } from "../../service/api/payment";

import ReferralContent from "./referral.content";
import ReferralStepBar from "./referral.stepBar";
import RecentHistory from "./referral.recentHistory";

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
					<span>Referral</span>
					<div>
						Share the Nova88 referral code with your friend.You will
						get exclusive referral bonus when your friend sign up
						using your referral code.
					</div>
				</div>
				<ReferralStepBar />
				<ReferralContent />
			</div>
			<RecentHistory
				refreshData={refreshData}
				recentHistory={recentData ?? []}
				getReferralRecent={getReferralRecent}
			/>
		</>
	);
};
