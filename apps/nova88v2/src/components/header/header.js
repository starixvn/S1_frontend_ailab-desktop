import React, { useContext } from "react";
import { Link, navigate } from "gatsby";
import { useTranslation } from "react-i18next";

import {
	userInfoContext,
	popBoxContext,
	productTpIdsContext,
	maintainListContext
} from "../common/context";
import Menu from "./header.menu";
import config, { cloudImgUrl } from "../../config";
import Functions from "./header.functions";
import LanguageDropDown from "./header.langDropdown";
import { LOGOUT } from "../../service/auth";
import path from "../../router";
import defPopBoxType from "../common/defPopBoxType";
import { isDateRange } from "../common/common";
import { eventPeriodEuro } from "../../datas/euroDef";

export default () => {
	const { t } = useTranslation();
	const { productTpIds } = useContext(productTpIdsContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { allMaintainList } = useContext(maintainListContext);
	const { setPopBox } = useContext(popBoxContext);
	const isInPeriodEuro = isDateRange(null, eventPeriodEuro.endDate);

	const handleLogout = () => {
		LOGOUT(() => {
			const clickClose = () => {
				if (
					window.location.pathname.includes(
						`/${userInfo.langId}/${path.resetPassword.root}`
					)
				) {
					navigate(`/${userInfo.langId}`);
				}

				setPopBox({ isOpen: false });
				setUserInfo(prevState => ({
					isLogin: false,
					langId: prevState.langId,
					kickout: true,
					willLogout: true,
					defaultLang: prevState.defaultLang
				}));
			};

			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.LogoutHint,
				content: t("msg_loggedout"),
				btnBar: (
					<div className="btnGroup">
						<button className="btn-check" onClick={clickClose}>
							OK
						</button>
					</div>
				)
			});
		});
	};

	const LogoutButton = () => {
		if (!userInfo.isLogin) return null;

		return <button className="icon icon-exit" onClick={handleLogout} />;
	};

	return (
		<header id="header">
			<div className="header">
				<div className="logo">
					<Link className="logo" to={`/${userInfo.langId}`}>
						{isInPeriodEuro ? (
							<img
								src={`${cloudImgUrl}/SiteSkin/img/logo_evt.png`}
								alt="Logo_Euro"
							/>
						) : (
							<img
								src={`${cloudImgUrl}/SiteSkin/img/logo_en_w.png`}
								alt={config.siteName}
							/>
						)}
					</Link>
				</div>
				<div className="function">
					<Functions />
					<LanguageDropDown />
					{userInfo.isLogin ? null : (
						<Link
							to={`/${userInfo.langId}/${path.forgetPassword.root}`}
							className="forgot">
							{t("lbl_ForgetPassword")}
						</Link>
					)}
					<LogoutButton />
				</div>
				<Menu
					productTpIds={productTpIds}
					maintainList={allMaintainList}
				/>
			</div>
		</header>
	);
};
