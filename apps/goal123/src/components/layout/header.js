import React, { useContext } from "react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { isDateRange } from "@ailab-desktop/common";
import useMenu from "../hook/useMenu";
import { userInfoContext, isRootContext } from "../common/context";
import HeaderNewMenu from "./header.menu";
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
	const { isRoot } = useContext(isRootContext);
	const { t } = useTranslation();
	const { menuList = [], onClickProductItem } = useMenu();

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
				<div className="top">
					<div className="logo">
						<div onClick={reload} style={{ cursor: "pointer " }}>
							<img
								src={`${bannerImgUrl}/desktop/img/logo.png`}
								alt={config.siteName}
							/>
							<span>{t("Label_Header_HarvestWealth")}</span>
						</div>

						{/* 調整結構，日後有活動logo改下面這段即可 */}
						{/* TODO: 歐洲盃期間LOGO => 結束後可刪 */}
						{isDateRange(eventPeriods.euroCup) && (
							<div
								className="logo-eurocup"
								style={{ cursor: "pointer" }}
								onClick={() =>
									navigate(`/${langId}/${path.euroCup.root}`)
								}>
								<img
									src={`${bannerImgUrl}/desktop/img/logo.png`}
									alt={config.siteName}
								/>
								<span>{t("Label_Header_HarvestWealth")}</span>
							</div>
						)}

						{/* 巴黎奧運期間顯示 */}
						{isDateRange(eventPeriods.olympic) && (
							<div className="logo-olympic">
								<img
									src={`${bannerImgUrl}/desktop/img/event/olympic/logo-goal123-desktop.webp`}
									alt="olympic-logo"
								/>
							</div>
						)}
					</div>
					<div className="function">
						<Functions />
						{!isLogin && <LanguageDropDown />}
					</div>
				</div>
				<HeaderNewMenu
					menuList={menuList}
					onClickProductItem={onClickProductItem}
				/>
			</div>
		</header>
	);
};
