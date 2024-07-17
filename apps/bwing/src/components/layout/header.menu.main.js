import { Link } from "gatsby";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { menuIconTypeEnum } from "@ailab-desktop/common";
import { userInfoContext } from "../common/context";
import { defMainMenuIcon, isShowEventIcon } from "./header.menu.newDef";
import path from "../../router";
import { siteInfo } from "../../config";

const mainMenuIcon = Object.freeze({
	[defMainMenuIcon.newTag]: "tag-new",
	[defMainMenuIcon.hotTag]: "tag-hot"
});

const HeaderMainMenu = ({ setMenuKey, currentMenuKey, menuList }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const switchMainMenuIcon = iconType => {
		return mainMenuIcon[iconType] || null;
	};

	// * 動態的 menus
	const menus = menuList.map(mainMenuItem => {
		const { lobbyCategoryId, data } = mainMenuItem;
		const active = currentMenuKey === String(lobbyCategoryId);

		// * 查看 subMenu 是否有在顯示範圍的 New Icon
		const hasNewIcon = data.some(subMenuItem => {
			const { iconType, iconStartTime, iconEndTime } = subMenuItem || {};

			return (
				isShowEventIcon(iconStartTime, iconEndTime) &&
				iconType === menuIconTypeEnum.New
			);
		});

		const icon =
			(hasNewIcon && switchMainMenuIcon(defMainMenuIcon.newTag)) || "";

		return (
			<Link
				className={classNames({ active })}
				key={lobbyCategoryId}
				to={`/${userInfo?.langId}/${mainMenuItem?.path}`}
				onMouseOver={() => setMenuKey(lobbyCategoryId)}
			>
				<i className={icon} />
				{t(mainMenuItem?.displayKey).toUpperCase()}
				{data?.length > 0 && (
					<i className="icon icon-dropdown-arrow-white" />
				)}
			</Link>
		);
	});

	return (
		<>
			<Link
				className={classNames({ active: currentMenuKey === "home" })}
				to={`/${userInfo.langId}`}
			>
				<i className="icon-home-white" />
			</Link>
			{menus}
			<Link to={`/${userInfo?.langId}/${path.vip.root}`}>
				{t("lbl_Vip").toUpperCase()}
			</Link>
			<Link to={`/${userInfo?.langId}/${path.promotion.root}`}>
				<i
					className={
						isShowEventIcon(
							"2023-11-01T00:00:00",
							"2030-12-30T00:00:00"
						) && mainMenuIcon?.hotTag
					}
				/>

				{t("lbl_Promotions").toUpperCase()}
			</Link>
			<Link
				href={siteInfo({ langId: userInfo.langId }).affiliateLink}
				target="_blank"
				rel="noreferrer"
			>
				{t("lbl_Affiliates")?.toUpperCase()}
			</Link>
			<Link to={`/${userInfo?.langId}/${path.leaderboard.root}`}>
				{t("lbl_leaderBoard")?.toUpperCase()}
			</Link>
		</>
	);
};

HeaderMainMenu.propTypes = {
	menuList: PropTypes.arrayOf(PropTypes.any).isRequired,
	currentMenuKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	setMenuKey: PropTypes.any.isRequired
};

export default HeaderMainMenu;
