import React, { useContext } from "react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import {
	dragonBoatFestivalEventPeriod,
	isDateRange
} from "@ailab-desktop/common";
import classNames from "classnames";
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

import LuckyWheelLink from "../luckyWheel/luckyWheel.link";
import { angPaoEventPeriod } from "../../pages/angpao";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { isRoot } = useContext(isRootContext);
	const { allMaintainList } = useContext(maintainListContext);

	const reload = () => {
		if (isRoot) {
			window.location.reload();
		}
	};

	return (
		<header>
			<div className="header">
				<div
					className={classNames("logo", {
						dragon: isDateRange(dragonBoatFestivalEventPeriod)
					})}
				>
					<Link to={`/${userInfo.langId}`} onClick={reload}>
						<img
							src={`${bannerImgUrl}/desktop/img/logo.png`}
							alt={config.siteName}
						/>
					</Link>
					{isDateRange(dragonBoatFestivalEventPeriod) && (
						<img
							className="zongzi"
							src={`${bannerImgUrl}/desktop/img/zongzi.png`}
							alt={config.siteName}
						/>
					)}

					{/* 僅限過年期間顯示 */}
					{isDateRange(angPaoEventPeriod) && (
						<LuckyWheelLink
							langId={userInfo.langId}
							type="header"
						/>
					)}
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
