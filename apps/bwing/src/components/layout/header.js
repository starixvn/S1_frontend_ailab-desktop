import React, { useContext } from "react";
import { Link } from "gatsby";
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
import { defEventPeriod } from "../common/eventIcon";
import LuckyWheelLink from "../luckyWheel/luckyWheel.link";
import { angPaoEventPeriod } from "../../pages/angpao";

export const christmasPeriod = {
	endDate: "2023-12-26 23:59:59"
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
							src={`${bannerImgUrl}/desktop/img/4.0/${
								isDateRange(christmasPeriod)
									? "christmas-logo"
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
