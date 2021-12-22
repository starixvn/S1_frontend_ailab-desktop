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
import { isDateRange } from "../common/common";
import LogoEvent from "../../styles/img/logo_event.png";
import path from "../../router";
import { defEventPeriod } from "../common/eventIcon";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const isInPeriodEvent = isDateRange(null, defEventPeriod.xmas.end);
	const { allMaintainList } = useContext(maintainListContext);

	return (
		<header>
			<div className="header">
				<div className="logo">
					<Link className="logo" to={`/${userInfo.langId}`}>
						<img
							src={isInPeriodEvent ? LogoEvent : Logo}
							alt={config.siteName}
						/>
					</Link>
				</div>
				<Menu
					productTpIds={productTpIds}
					allMaintainList={allMaintainList}
				/>
				<div className="function">
					<Link
						className="appDownload"
						to={`/${userInfo.langId}/${path.appDownload.root}`}>
						<i className="icon icon-mobile" />
						{t("lbl_APPDownload")}
					</Link>
					<LanguageDropDown />
					<Functions />
				</div>
			</div>
		</header>
	);
};
