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

	// 改動設計那邊的樣式 因為目前設計那邊的選單在hover時雖然可以看到dropdown 但滑鼠移開時會消失，主要是他們有在dropdown下了一個top元素希望他是能在header的下緣才展開 導致div之間有空隙
	// 先在上層設定relative+寬高 讓div範圍可以包含整個header
	// 子層設定 position: absolute 並且 top: 100% （absolute的top是相對於最近的有定位的父層）
	// 已經把這段給設計，請他們之後補上這些參數  補完後下面這段就能移除

	const menuStyle = {
		position: "relative",
		display: "flex",
		marginLeft: "16px",
		width: "100px",
		height: "60px",
		// border: "1px solid red", 可註解取消測試
		alignItems: "center"
	};

	const dropdownStyle = {
		display: hover ? "flex" : "none",
		position: "absolute",
		top: "100%",
		left: 0,
		background: "white",
		boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
		zIndex: 1
	};

	const btnStyle = {
		cursor: "pointer"
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
				style={menuStyle}
				className={hover ? "select-menu active" : "select-menu"}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<div className="select-btn" style={btnStyle}>
					<i className="icon-select-btn" />
				</div>
				<div className="select-dropdown" style={dropdownStyle}>
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
