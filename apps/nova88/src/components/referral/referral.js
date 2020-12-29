import React, { useEffect, useRef, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext, popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import Loading from "../common/loading";
import { api_payment_GetWithdrawalInfoRecent } from "../../service/api/payment";

import { api_account_GetReferralCode } from "../../service/api/account";

import ReferralLinks from "./referral.links";
import RecentHistory from "./referral.recentHistory";

import refStepBanner from "../../styles/img/refBanner.png";
import message from "../message/message";

export default () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);
	const [myRef, setMyRef] = useState("");
	const [recentData, setRecentData] = useState([]);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		getReferralCode();
	}, []);

	const showErrorPopBox = (message, errorCode) => {
		const clickClose = () => {
			setPopBox({ isOpen: false });
		};
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.ErrorMsg,
			message: message,
			errorCode: errorCode,
			btnBar: (
				<div className="btnGroup">
					<button className="btn-cancel" onClick={clickClose}>
						{t("lbl_Close")}
					</button>
				</div>
			)
		});
	};

	const getReferralCode = async () => {
		await api_account_GetReferralCode().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						// console.log(res.data.data);
						setMyRef(res.data.data);
					} else {
						// setMyRef(message, res.data.errorCode);
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					showErrorPopBox(message);
				}
			}
		);
	};

	const getReferralRecent = async () => {
		await api_payment_GetWithdrawalInfoRecent().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setRecentData(res.data.data);
					} else {
						showErrorPopBox(message, res.data.errorCode);
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					showErrorPopBox(message);
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
				<ReferralLinks t={t} myRef={myRef} />
			</div>
			<RecentHistory
				refreshData={refreshData}
				recentHistory={recentData ?? []}
				getReferralRecent={getReferralRecent}
			/>
		</>
	);
};
