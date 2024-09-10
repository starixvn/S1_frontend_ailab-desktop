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
import { eventPeriods } from "../../datas/eventDef";

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

	// TODO: 因應中秋節更換ＬＯＧＯ（期間：2024.9.12~9.18）(之後若有其他活動也可以在此調整)
	const logoUrl = isDateRange(eventPeriods.midAutumn)
		? `${bannerImgUrl}/desktop/img/logo-mid.png`
		: `${bannerImgUrl}/desktop/img/logo.png`;
	return (
		<header>
			<div className="header">
				<div className="top">
					<div className="logo">
						<div onClick={reload} style={{ cursor: "pointer " }}>
							<img src={logoUrl} alt={config.siteName} />
							<span>{t("Label_Header_HarvestWealth")}</span>
						</div>
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
