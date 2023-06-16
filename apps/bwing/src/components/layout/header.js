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
import { defEventPeriod } from "../common/eventIcon";
import LuckyWheelLink from "../luckyWheel/luckyWheel.link";
import { angPaoEventPeriod } from "../../pages/angpao";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);
	const { isRoot } = useContext(isRootContext);

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
				<div
					className={classNames("logo", {
						dragon: isDateRange(dragonBoatFestivalEventPeriod)
					})}
				>
					<Link to={`/${userInfo.langId}`} onClick={reload}>
						<img
							className={classNames({
								"dragon-logo": isDateRange(
									dragonBoatFestivalEventPeriod
								)
							})}
							src={`${bannerImgUrl}/desktop/img/${
								isDateRange(dragonBoatFestivalEventPeriod)
									? "dragon-logo"
									: "logo"
							}.png`}
							alt={config.siteName}
						/>
					</Link>

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
					maintainList={allMaintainList}
				/>
				<div className="function">
					<a
						target="_blank"
						rel="noopener noreferrer"
						className="downloadBtn icon icon-mobile"
						href={`/${userInfo.langId}/${path.appDownload.root}`}
					>
						{t("lbl_APP_DOWNLOAD")}
					</a>
					<LanguageDropDown />
					<Functions />
				</div>
			</div>
		</header>
	);
};
