import React, { useContext } from "react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { isDateRange } from "@ailab-desktop/common";
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
	const { t } = useTranslation();

	const reload = () => {
		if (isRoot) {
			window.location.reload();
		} else {
			navigate(`/${langId}`);
		}
	};

	return (
		<header>
			<div className="header">
				<div className="logo">
					<div onClick={reload} style={{ cursor: "pointer " }}>
						<img
							src={`${bannerImgUrl}/desktop/img/logo.png`}
							alt={config.siteName}
						/>
						<span>{t("Label_Header_HarvestWealth")}</span>
					</div>
					{/* 調整結構，日後有活動logo改下面這段即可 */}
					{isDateRange(eventPeriods.euroCup) && (
						<div
							className="logo-eurocup"
							style={{ cursor: "pointer" }}
							onClick={() =>
								navigate(`/${langId}/${path.euroCup.root}`)
							}>
							<img
								src={`${bannerImgUrl}/desktop/img/event/eurocup/euro-logo-gif.webp`}
								alt="eurocup-logo"
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
