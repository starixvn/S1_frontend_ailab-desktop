import React, { useContext, useEffect, useState } from "react";
import { Link } from "@reach/router";
import { userInfoContext } from "../common/context";
import Logo from "../../styles/img/logo.png";
import Menu from "./header.menu";
import config from "../../config";
import Functions from "./header.functions";
import LanguageDropDown from "./header.langDropdown";
import { api_site_GetTpIds } from "../../service/api/site";
import { useTranslation } from "react-i18next";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const [casinoTpIds, setCasinoTpIds] = useState(null);
	const { t } = useTranslation();

	useEffect(() => {
		let mounted = true;
		if (userInfo.isLogin && casinoTpIds === null) {
			api_site_GetTpIds().then(res => {
				if (res.data.errorCode === 0 && mounted) {
					setCasinoTpIds(res.data.data);
				}
			});
		} else if (userInfo.isLogin === false && casinoTpIds?.length > 0) {
			setCasinoTpIds(null);
		}

		return () => {
			mounted = false;
		};
	}, [userInfo.isLogin, casinoTpIds]);

	return (
		<header>
			<div className="header">
				<div className="logo">
					<Link className="logo" to={`/${userInfo.langId}`}>
						<img src={Logo} alt={config.siteName} />
					</Link>
				</div>
				<Menu casinoTpIds={casinoTpIds} />
				<div className="function">
					<a
						className="appDownload"
						href={`SiteSkin/Goal123/appDownload/${userInfo.langId}.html`}
						target="_blank">
						<i className="icon icon-mobile" />
						{t("lbl_APPDownload")}
					</a>
					<LanguageDropDown />
					<Functions />
				</div>
			</div>
		</header>
	);
};
