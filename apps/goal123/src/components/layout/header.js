import React, { useContext } from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import Logo from "../../styles/img/logo.png";
import Menu from "./header.menu";
import config from "../../config";
import Functions from "./header.functions";
import LanguageDropDown from "./header.langDropdown";

export default ({ productTpIds }) => {
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();

	return (
		<header>
			<div className="header">
				<div className="logo">
					<Link className="logo" to={`/${userInfo.langId}`}>
						<img src={Logo} alt={config.siteName} />
					</Link>
				</div>
				<Menu productTpIds={productTpIds} />
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
