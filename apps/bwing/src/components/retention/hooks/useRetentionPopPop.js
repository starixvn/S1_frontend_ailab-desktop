import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import { popBoxContext, userInfoContext } from "../../common/context";
import { defPopBoxType } from "../../common/defPopBoxType";
import path from "../../../router";

const useRetentionPopup = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const {
		userInfo: { langId }
	} = useContext(userInfoContext);

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
			titleText: "lbl_Congratulations",
			titleIcon: "icon-bell",
			message1: "lbl_JoinSuccessDescription1",
			message2: "lbl_JoinSuccessDescription2",
			onClickClose: handleOK,
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
						to={`/${langId}/${path.profile.root}`}>
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
