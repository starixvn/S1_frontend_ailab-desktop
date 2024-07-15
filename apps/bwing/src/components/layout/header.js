import React, { useContext } from "react";
import { Link, navigate } from "gatsby";
import { isDateRange } from "@ailab-desktop/common";
import classNames from "classnames";
import HeaderNewMenu from "./header.menu";
import { userInfoContext, isRootContext } from "../common/context";
import path from "../../router";
import config, { bannerImgUrl } from "../../config";
import Functions from "./header.functions";
import { defEventPeriod } from "../common/eventIcon";
import LuckyWheelLink from "../luckyWheel/luckyWheel.link";
import { angPaoEventPeriod } from "../../pages/angpao";
import { eventPerios } from "../../datas/eventDef";
import useMenu from "../hook/useMenu";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const { isRoot } = useContext(isRootContext);
	const { menuList = [], onClickProductItem } = useMenu();

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
					{/* TODO: 歐洲盃期間LOGO => 結束後可刪 */}
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

					{/* 巴黎奧運期間顯示 */}
					{isDateRange(eventPerios.olympic) && (
						<div>
							<img
								src={`${bannerImgUrl}/desktop/img/event/olympic/bwing-logo-desktop.webp`}
								alt="olympic-logo-gif"
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
				<HeaderNewMenu
					menuList={menuList}
					onClickProductItem={onClickProductItem}
				/>
			</div>
		</header>
	);
};
