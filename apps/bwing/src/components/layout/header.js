import React, { useContext } from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import { userInfoContext, productTpIdsContext } from "../common/context";
import Logo from "../../styles/img/logo.png";
import Menu from "./header.menu";
import config from "../../config";
import Functions from "./header.functions";
import LanguageDropDown from "./header.langDropdown";
import path from "../../router";
import { isDateRange } from "../common/common";
import { eventPeriodEuro } from "../../datas/euroDef";
import LogoEuro from "../../styles/img/euro/logo.png";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const isInPeriodEuro = isDateRange(null, eventPeriodEuro.endDate);

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
				</div>
				<Menu productTpIds={productTpIds} />
				<div className="function">
					<a
						target="_blank"
						rel="noopener noreferrer"
						className="downloadBtn icon icon-mobile"
						href={`/${userInfo.langId}/${path.appDownload.root}`}>
						{t("lbl_APP_DOWNLOAD")}
					</a>
					<LanguageDropDown />
					<Functions />
				</div>
			</div>
		</header>
	);
};
