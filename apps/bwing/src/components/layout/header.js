import React, { useContext } from "react";
import { Link, navigate } from "gatsby";
import { isDateRange } from "@ailab-desktop/common";
import classNames from "classnames";
import {
	userInfoContext,
	productTpIdsContext,
	maintainListContext,
	isRootContext
} from "../common/context";
import path from "../../router";
import Menu from "./header.menu";
import config, { bannerImgUrl } from "../../config";
import Functions from "./header.functions";
import { defEventPeriod } from "../common/eventIcon";
import LuckyWheelLink from "../luckyWheel/luckyWheel.link";
import { angPaoEventPeriod } from "../../pages/angpao";
import { eventPerios } from "../../datas/eventDef";

export const eventPeriod = {
	startDate: "2024-02-01 00:00:00",
	endDate: "2024-02-25 23:59:59"
};

export default () => {
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
			<div className="header-content">
				<div className={classNames("logo")}>
					<Link to={`/${userInfo.langId}`} onClick={reload}>
						<img
							src={`${bannerImgUrl}/desktop/img/4.0/${
								userInfo.langId === "vn" ? "logo-vn" : "logo-en"
							}.png`}
							alt={config.siteName}
						/>
					</Link>
					{/* 歐冠杯期間顯示 */}
					{isDateRange(eventPerios.euroCup) && (
						<div
							onClick={() =>
								navigate(
									`/${userInfo.langId}/${path.euroCup.root}`
								)
							}
						>
							<img
								src={`${bannerImgUrl}/desktop/img/event/eurocup/euro-logo-gif.webp`}
								alt="euro-logo-gif"
							/>
						</div>
					)}
					{/* 僅限過年期間顯示 */}
					{isDateRange(angPaoEventPeriod) && (
						<LuckyWheelLink
							langId={userInfo.langId}
							type="header"
						/>
					)}
				</div>
				<div className="function">
					<Functions />
				</div>
				<Menu
					productTpIds={productTpIds}
					maintainList={allMaintainList}
				/>
			</div>
		</header>
	);
};
