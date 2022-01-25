import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { defPopBoxType } from "../common/defPopBoxType";
import { popBoxContext } from "../common/context";

const usePopBox = handlePopBox => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);

	const closePopBox = () => {
		const value = { isOpen: false };
		if (handlePopBox) handlePopBox(value);
		else setPopBox(value);
	};

	const errorPopBox = (
		message = t("msg_ApiServerError"),
		errorCode = null,
		openNextPopUp = null
	) => {
		const value = {
			message,
			errorCode,
			isOpen: true,
			popBoxType: defPopBoxType.ErrorMsg,
			icon: "icon-bell",
			btnBar: (
				<div className="btnGroup">
					<button
						className="btn-cancel"
						onClick={openNextPopUp ?? closePopBox}>
						{t("lbl_Close")}
					</button>
				</div>
			)
		};

		if (handlePopBox) handlePopBox(value);
		else setPopBox(value);
	};

	return { closePopBox, errorPopBox, setPopBox };
};

export default usePopBox;
