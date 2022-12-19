import React, { useContext } from "react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import {
	userInfoContext,
	productTpIdsContext,
	maintainListContext,
	isRootContext
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
	const { isRoot } = useContext(isRootContext);
	const { allMaintainList } = useContext(maintainListContext);
	const isEvent = isDateRange(
		defEventPeriod.newYear.start,
		defEventPeriod.newYear.end
	);

	const reload = () => {
		if (isRoot) {
			window.location.reload();
		}
	};

	return (
		<header className={isEvent ? "newyear" : ""}>
			<div className="header">
				<div className="logo">
					<Link
						className="logo"
						to={`/${userInfo.langId}`}
						onClick={reload}
					>
						<img
							src={`${bannerImgUrl}/desktop/img/logo_event.png`}
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
						to={`/${userInfo.langId}/${path.appDownload.root}`}
					>
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
