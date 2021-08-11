import React, { useContext } from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import {
	userInfoContext,
	productTpIdsContext,
	maintainListContext
} from "../common/context";
import Logo from "../../styles/img/logo.png";
import Menu from "./header.menu";
import config from "../../config";
import Functions from "./header.functions";
import LanguageDropDown from "./header.langDropdown";
import OlympicCountdown from "./header.olympic.countdown";
import { isDateRange } from "../common/common";
import { eventPeriodEuro } from "../../datas/euroDef";
import LogoEuro from "../../styles/img/logo_euro.png";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const isInPeriodEuro = isDateRange(null, eventPeriodEuro.endDate);
	const { allMaintainList } = useContext(maintainListContext);

	return (
		<header>
			<div className="header">
				<div className="logo">
					<Link className="logo" to={`/${userInfo.langId}`}>
						<img
							src={isInPeriodEuro ? LogoEuro : Logo}
							alt={config.siteName}
						/>
					</Link>

					<OlympicCountdown />
				</div>
				<Menu
					productTpIds={productTpIds}
					allMaintainList={allMaintainList}
				/>
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
