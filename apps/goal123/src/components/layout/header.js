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
import Menu from "./header.menu";
import config, { bannerImgUrl } from "../../config";
import Functions from "./header.functions";
import LanguageDropDown from "./header.langDropdown";
import path from "../../router";
import { eventPeriods } from "../../datas/eventDef";

export const eventPeriod = {
	startDate: "2024-02-01 00:00:00",
	endDate: "2024-02-25 23:59:59"
};

export default () => {
	const {
		userInfo: { langId, isLogin }
	} = useContext(userInfoContext);
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
						"eurocup-logo": isDateRange(eventPeriods.euroCup)
					})}
				>
					<Link to={`/${langId}`} onClick={reload}>
						<img
							src={`${bannerImgUrl}/desktop/img/${
								isDateRange(eventPeriods.euroCup)
									? "event/eurocup/goal123-logo"
									: "logo"
							}.png`}
							alt={config.siteName}
						/>
					</Link>
					{/* 歐冠杯期間顯示 */}
					{isDateRange(eventPeriods.euroCup) && (
						<div
							onClick={() =>
								navigate(
									`/${userInfo.langId}/${path.euroCup.root}`
								)
							}
						>
							<img
								src={`${bannerImgUrl}/desktop/img/event/eurocup/euro-logo-gif.webp`}
								alt=""
							/>
						</div>
					)}
				</div>
				<div className="function">
					<Functions />
					{!isLogin && <LanguageDropDown />}
				</div>
				<Menu
					productTpIds={productTpIds}
					allMaintainList={allMaintainList}
				/>
			</div>
		</header>
	);
};
