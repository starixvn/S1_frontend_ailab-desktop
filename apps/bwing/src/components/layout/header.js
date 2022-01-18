import React, { useContext } from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import {
	userInfoContext,
	productTpIdsContext,
	maintainListContext
} from "../common/context";
import Menu from "./header.menu";
import config, { bannerImgUrl } from "../../config";
import Functions from "./header.functions";
import LanguageDropDown from "./header.langDropdown";
import path from "../../router";
import { isDateRange } from "../common/common";
import { defEventPeriod } from "../common/eventIcon";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);

	const isEvent = isDateRange(
		defEventPeriod.newYear.start,
		defEventPeriod.newYear.end
	);

	return (
		<header className={isEvent ? "newyear" : ""}>
			<div className="header">
				<div className="logo">
					<Link to={`/${userInfo.langId}`}>
						<img
							src={`${bannerImgUrl}/desktop/img/logo.png`}
							alt={config.siteName}
						/>
					</Link>
				</div>
				<Menu
					productTpIds={productTpIds}
					maintainList={allMaintainList}
				/>
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
