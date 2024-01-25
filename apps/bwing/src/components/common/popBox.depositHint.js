import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import path from "../../router";
import { popBoxContext, userInfoContext } from "./context";

export default () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);

	const closePopBox = () => {
		setPopBox({ isOpen: false });
	};

	return (
		<div className="Cancel active">
			<div className="icon icon-icon32px_notification" />
			<div className="title">{t("Label_DepositNowPopBalance")}</div>
			<div className="txt-lightgray">
				{t("Label_DepositNowPopContent1")}
			</div>
			<div className="txt-lightgray">
				{t("Label_DepositNowPopContent2")}
			</div>
			<div className="btnGroup">
				<Link
					to={`/${userInfo.langId}/${path.promotion.root}`}
					className="orange-check"
					onClick={closePopBox}
				>
					{String(t("Label_CheckOutPromos") || "").toUpperCase()}
				</Link>
				<Link
					to={`/${userInfo.langId}/${path.deposit.root}`}
					className="orange"
					onClick={closePopBox}
				>
					{String(t("lbl_DepositNow") || "").toUpperCase()}
				</Link>
			</div>
		</div>
	);
};
