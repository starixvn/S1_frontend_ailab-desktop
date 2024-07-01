import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
	lobbyCategoryEnum,
	menuIconTypeEnum,
	products
} from "@ailab-desktop/common";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import defPopBoxType from "../common/defPopBoxType";
import { userInfoContext, popBoxContext } from "../common/context";
import {
	defMainMenuIcon,
	isShowEventIcon,
	defMenuType
} from "./header.menu.newDef";
import path from "../../router";

const mainMenuIcon = Object.freeze({
	[defMainMenuIcon.newTag]: "newicon",
	[defMainMenuIcon.hotTag]: "hoticon"
});

const HeaderMainMenu = ({
	setMenuKey,
	currentMenuKey,
	menuList,
	onClickProductItem
}) => {
	const [hover, setHover] = useState(false);

	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const showLogin = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

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

		// * 目前動態 menu 只支援 New
		const icon =
			(hasNewIcon && switchMainMenuIcon(defMainMenuIcon.newTag)) || "";

		// * 動態特例 Crypto Sport
		const cryptoSportItem = data?.find(
			({ tpGameIdNo }) => tpGameIdNo === products.CryptoSports.tpGameIdNo
		);

		// * 特例 Sport Soccer
		if (lobbyCategoryId === lobbyCategoryEnum.SPORTS) {
			const soccerItem = data?.find(
				sportSubItem =>
					sportSubItem.tpGameIdNo === products.Soccer.tpGameIdNo
			);

			return (
				<>
					{cryptoSportItem && (
						<button
							className={classNames("cryptobtn", {
								active: currentMenuKey === "cryptoSports"
							})}
						/>
					)}
					<button
						className={classNames({ active })}
						key={lobbyCategoryId}
						onClick={
							!userInfo?.isLogin
								? showLogin
								: () =>
										onClickProductItem({
											...soccerItem,
											menuType: defMenuType.entPage
										})
						}
						onMouseOver={() => setMenuKey(lobbyCategoryId)}
						onFocus={() => 0}
					>
						<i className={icon} />
						{t(mainMenuItem?.displayKey).toUpperCase()}
					</button>
				</>
			);
		}

		return (
			<Link
				className={classNames({ active })}
				key={lobbyCategoryId}
				to={`/${userInfo?.langId}/${mainMenuItem?.path}`}
				onMouseOver={() => setMenuKey(lobbyCategoryId)}
			>
				<i className={icon} />
				{t(mainMenuItem?.displayKey).toUpperCase()}
			</Link>
		);
	});

	return (
		<>
			<Link
				className={classNames({
					active: currentMenuKey === "home"
				})}
				to={`/${userInfo.langId}`}
			>
				<i className="icon icon-home" />
			</Link>
			{menus}
			<Link to={`/${userInfo?.langId}/${path.promotion.root}`}>
				<i
					className={classNames({
						[mainMenuIcon.hotTag]: isShowEventIcon(
							"2023-11-01T00:00:00",
							"2030-12-30T00:00:00"
						)
					})}
				/>
				{t("lbl_Promotions").toUpperCase()}
			</Link>
			<div
				className={hover ? "select-menu active" : "select-menu"}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<div className="select-btn">
					<i className="icon-select-btn" />
				</div>
				{hover && (
					<div className="select-dropdown">
						<Link
							to={`/${userInfo?.langId}/${path.vip.root}`}
							onClick={() => setHover(false)} // Optional: Close dropdown on link click
						>
							{t("lbl_Vip").toUpperCase()}
						</Link>
						<Link
							to={`/${userInfo?.langId}/${path.ambassador.root}`}
							onClick={() => setHover(false)} // Optional: Close dropdown on link click
						>
							{t("lbl_Ambassador")}
						</Link>

						<Link
							to={`/${userInfo?.langId}/${path.leaderBoard.root}`}
							onClick={() => setHover(false)} // Optional: Close dropdown on link click
						>
							{t("lbl_LeaderBoard")}
						</Link>
					</div>
				)}
			</div>
		</>
	);
};

HeaderMainMenu.propTypes = {
	menuList: PropTypes.arrayOf(PropTypes.any).isRequired,
	onClickProductItem: PropTypes.func.isRequired,
	currentMenuKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	setMenuKey: PropTypes.any.isRequired
};

export default HeaderMainMenu;
