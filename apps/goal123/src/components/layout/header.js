import React, { useContext } from "react";
import { Link, navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { isDateRange } from "@ailab-desktop/common";
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
import { cupEventPeriod } from "../../datas/eventDef";

export const eventPeriod = {
	startDate: "2024-02-01 00:00:00",
	endDate: "2024-02-25 23:59:59"
};

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
						"eurocup-logo": isDateRange(cupEventPeriod)
					})}>
					<Link to={`/${userInfo.langId}`} onClick={reload}>
						<img
							src={`${bannerImgUrl}/desktop/img/${
								isDateRange(cupEventPeriod)
									? "event/eurocup/goal123-logo"
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

					{/* 歐冠杯期間顯示 */}
					{isDateRange(cupEventPeriod) && (
						<div
							onClick={() =>
								navigate(
									`/${userInfo.langId}/${path.cupEvent.root}`
								)
							}>
							<img
								src={`${bannerImgUrl}/desktop/img/event/eurocup/euro-logo-gif.webp`}
								alt=""
							/>
						</div>
					)}
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
