import React, { useContext } from "react";
import { Link } from "gatsby";
import { isDateRange } from "@ailab-desktop/common";
import classNames from "classnames";
import HeaderNewMenu from "./header.menu";
import { userInfoContext, isRootContext } from "../common/context";
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

	// TODO: 因應聖誕節更換ＬＯＧＯ（期間：2024.12.17~12.26）(之後若有其他活動也可以在此調整)
	const logoUrl = isDateRange(eventPerios.christmas)
		? `${bannerImgUrl}/desktop/img/4.0/logo-mid.png`
		: `${bannerImgUrl}/desktop/img/4.0/${
				userInfo.langId === "vn" ? "logo-vn" : "logo-en"
		  }.png`;

	return (
		<header className={isEvent ? "newyear" : ""}>
			<div className="header-content">
				<div className={classNames("logo")}>
					<Link to={`/${userInfo.langId}`} onClick={reload}>
						<img src={logoUrl} alt={config.siteName} />
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
				<HeaderNewMenu
					menuList={menuList}
					onClickProductItem={onClickProductItem}
				/>
			</div>
		</header>
	);
};
