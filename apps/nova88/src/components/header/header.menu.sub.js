import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link, navigate } from "@reach/router";
import {
	defMenuLinks,
	defMenuType,
	defSubListClassName
} from "./header.menu.def";
import { popBoxContext, userInfoContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import { SET_ENTER_PAGE } from "../../service/enterPage";

import SubMenuListBGLeftImg from "../../styles/img/subMenu-Wrapper-ListBG-left.png";
import SubMenuListBGRightImg from "../../styles/img/subMenu-Wrapper-ListBG-right.png";
import SubMenuListBGCenterImg from "../../styles/img/subMenu-Wrapper-ListBG-center.png";

export default ({ currentMenuKey, casinoTpIds }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);

	const clickItem = ({ tpId, gameId, needLogin, path }) => {
		const handleCallBack = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (path)
			return needLogin && !userInfo.isLogin
				? handleCallBack()
				: navigate(`/${userInfo.langId}/${path}`);

		return SET_ENTER_PAGE({
			isLogin: userInfo.isLogin,
			langId: userInfo.langId,
			tpId,
			gameId,
			loginCallback: handleCallBack
		});
	};

	return Object.keys(defMenuLinks).map(menuKey => {
		const subClassName = `${defSubListClassName[menuKey] || ""}${
			menuKey === currentMenuKey ? " active" : ""
		}`;
		let subMenu = [];

		if (!(typeof defMenuLinks[menuKey]?.subMenu == "undefined")) {
			subMenu = defMenuLinks[menuKey]?.subMenu;

			if (
				currentMenuKey === "casino" &&
				subMenu &&
				casinoTpIds?.length > 0
			) {
				subMenu = subMenu.filter(
					s => s.alwaysShow || casinoTpIds.includes(s.tpId)
				);
			}

			subMenu = subMenu?.filter(
				s =>
					userInfo.isLogin !== true ||
					!s.allowCurrency ||
					s.allowCurrency.includes(userInfo.currencyId)
			);
		}

		return (
			<div className={subClassName} key={`main-key-${menuKey}`}>
				{subMenu?.map(subMenuItem => (
					<SubMenuItem
						key={`${subMenuItem.tpId}-${subMenuItem.gameId}`}
						subMenuItem={subMenuItem}
						clickItem={clickItem}
						userInfo={userInfo}
						t={t}
						menuKey={menuKey}
						className={subMenuItem.className}
						displayText={subMenuItem.displayText}
						displayKey={subMenuItem.displayKey}
						parameter={subMenuItem.parameter}
					/>
				))}
			</div>
		);
	});
};

const SubMenuItem = ({ subMenuItem, clickItem, userInfo, t, menuKey }) => {
	const displayText = subMenuItem.displayText
		? subMenuItem.displayText
		: t(subMenuItem.displayKey);

	let params = null;

	if (subMenuItem.parameter) {
		params = Object.keys(subMenuItem.parameter).map(key => {
			return `${key}=${subMenuItem.parameter[key]}`;
		});
	}
	const _urlParams = params !== null ? `?${params.join("&")}` : "";

	let className = subMenuItem.className || "";

	if (subMenuItem.eventIcons) {
		let iconStrings = "";
		for (let i = 0; i < subMenuItem.eventIcons.length; i++) {
			if (subMenuItem.eventIcons[i] !== "") {
				iconStrings += ` ${subMenuItem.eventIcons[i]}`;
			}
		}
		className += ` icon${iconStrings}`;
	}

	if (subMenuItem.menuType === defMenuType.Link) {
		const url = subMenuItem.path || defMenuLinks[menuKey].path;

		return (
			<Link
				className={className}
				to={`/${userInfo.langId}/${url}${_urlParams}`}>
				<img
					className="ListBG-left"
					alt="ListBG-left"
					src={SubMenuListBGLeftImg}
				/>
				<img
					className="ListBG-right"
					alt="ListBG-right"
					src={SubMenuListBGRightImg}
				/>
				<img
					className="ListBG-center"
					alt="ListBG-center"
					src={SubMenuListBGCenterImg}
				/>
				<ImgsRender
					className="List-npc"
					listImgUrl={subMenuItem.listNpcImgUrl}
				/>
				<ImgsRender
					className="List-bg"
					listImgUrl={subMenuItem.listBgImgUrl}
				/>
				<span>{displayText}</span>
			</Link>
		);
	}

	return (
		<button
			className={className}
			onClick={clickItem.bind(this, {
				tpId: subMenuItem.tpId,
				gameId: subMenuItem.gameId,
				needLogin: subMenuItem.needLogin,
				path: subMenuItem.path
			})}>
			<img
				className="ListBG-left"
				alt="ListBG-left"
				src={SubMenuListBGLeftImg}
			/>
			<img
				className="ListBG-right"
				alt="ListBG-right"
				src={SubMenuListBGRightImg}
			/>
			<img
				className="ListBG-center"
				alt="ListBG-center"
				src={SubMenuListBGCenterImg}
			/>
			<ImgsRender
				className="List-npc"
				listImgUrl={subMenuItem.listNpcImgUrl}
			/>
			<ImgsRender
				className="List-bg"
				listImgUrl={subMenuItem.listBgImgUrl}
			/>
			<span>{displayText}</span>
		</button>
	);
};

SubMenuItem.propTypes = {
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired,
	clickItem: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	t: PropTypes.func.isRequired,
	menuKey: PropTypes.string.isRequired
};

const ImgsRender = ({ listImgUrl, className }) => {
	if (typeof listImgUrl === "string" || listImgUrl instanceof String)
		return (
			<img
				className={className}
				alt="listImgUrl"
				src={require(`../../styles/img/${listImgUrl}`)}
			/>
		);

	if (Array.isArray(listImgUrl) && listImgUrl.length)
		return listImgUrl.map(imgUrl => (
			<img
				key={`imgs-key-${imgUrl}`}
				alt="listImgUrl"
				className={className}
				src={require(`../../styles/img/${imgUrl}`)}
			/>
		));

	return null;
};

ImgsRender.propTypes = {
	listImgUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
		.isRequired,
	className: PropTypes.string.isRequired
};
