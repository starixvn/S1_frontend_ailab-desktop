import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import { popBoxContext } from "../../common/context";
import { defPopBoxType } from "../../common/popBox";
import path from "../../../router";

const useRetentionPopup = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);

	const handleClose = () => {
		setPopBox({ isOpen: false });
	};

	const handleOK = () => {
		setPopBox({ isOpen: false });
		window.location.reload();
	};

	const openSuccessPopup = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Success,
			icon: "icon icon-bell",
			description: (
				<>
					<div>{t("lbl_JoinSuccessDescription1")}</div>
					<div>{t("lbl_JoinSuccessDescription2")}</div>
				</>
			),
			btnBar: (
				<div className="btnGroup">
					<button className="btn-cancel" onClick={handleOK}>
						OK
					</button>
				</div>
			)
		});
	};

	const openVerificationPopup = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.UpdateProfile,
			title: t("lbl_ImportantNote"),
			content: t("lbl_UpdatePersonalInfoPromotion"),
			btnBar: (
				<div className="btnGroup">
					<Link
						className="btn-check"
						to={`/${langId}/${path.profile.root}?prevPage=${path.promotion.root}&BonusCode=${bonusCode}`}>
						{t("lbl_UpdatePersonalDetail")}
					</Link>
				</div>
			)
		});
	};

	const openErrorPopup = (message, errorCode) => {
		setPopBox({
			message,
			errorCode,
			isOpen: true,
			popBoxType: defPopBoxType.ErrorMsg,
			icon: "icon-icon32px_notification",
			btnBar: (
				<div className="btnGroup">
					<button className="btn-cancel" onClick={handleClose}>
						{t("lbl_Close")}
					</button>
				</div>
			)
		});
	};

	return {
		openSuccessPopup,
		openVerificationPopup,
		openErrorPopup
	};
};

export default useRetentionPopup;
