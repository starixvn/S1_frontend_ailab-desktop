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
import { defPopBoxType } from "../common/popBox";
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
			tpId: tpId,
			gameId: gameId,
			loginCallback: handleCallBack
		});
	};

	return Object.keys(defMenuLinks).map(menuKey => {
		let subClassName = `${defSubListClassName[menuKey] || ""}${
			menuKey === currentMenuKey ? " active" : ""
		}`;
		let subMenu = [];

		if (typeof defMenuLinks[menuKey]?.subMenu !== undefined) {
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
					<SunMenuItem
						key={`${subMenuItem.tpId}-${subMenuItem.gameId}`}
						subMenuItem={subMenuItem}
						clickItem={clickItem}
						userInfo={userInfo}
						t={t}
						menuKey={menuKey}
					/>
				))}
			</div>
		);
	});
};

const SunMenuItem = ({ subMenuItem, clickItem, userInfo, t, menuKey }) => {
	let displayText = subMenuItem.displayText
		? subMenuItem.displayText
		: t(subMenuItem.displayKey);

	let params = null;

	if (subMenuItem.parameter) {
		params = Object.keys(subMenuItem.parameter).map(key => {
			return `${key}=${subMenuItem.parameter[key]}`;
		});
	}
	let _urlParams = params !== null ? `?${params.join("&")}` : "";
	if (subMenuItem.menuType === defMenuType.Link) {
		let url = subMenuItem.path || defMenuLinks[menuKey].path;
		return (
			<Link
				className={subMenuItem.className}
				to={`/${userInfo.langId}/${url}${_urlParams}`}>
				<img className="ListBG-left" src={SubMenuListBGLeftImg} />
				<img className="ListBG-right" src={SubMenuListBGRightImg} />
				<img className="ListBG-center" src={SubMenuListBGCenterImg} />
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
	} else {
		return (
			<button
				className={subMenuItem.className}
				onClick={clickItem.bind(this, {
					tpId: subMenuItem.tpId,
					gameId: subMenuItem.gameId,
					needLogin: subMenuItem.needLogin,
					path: subMenuItem.path
				})}>
				<img className="ListBG-left" src={SubMenuListBGLeftImg} />
				<img className="ListBG-right" src={SubMenuListBGRightImg} />
				<img className="ListBG-center" src={SubMenuListBGCenterImg} />
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
	}
};

const ImgsRender = ({ listImgUrl, className }) => {
	if (typeof listImgUrl === "string" || listImgUrl instanceof String)
		return (
			<img
				className={className}
				src={require(`../../styles/img/${listImgUrl}`)}
			/>
		);

	if (Array.isArray(listImgUrl) && listImgUrl.length)
		return listImgUrl.map(imgUrl => (
			<img
				key={`imgs-key-${imgUrl}`}
				className={className}
				src={require(`../../styles/img/${imgUrl}`)}
			/>
		));

	return null;
};

ImgsRender.propTypes = {
	listImgUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	className: PropTypes.string
};
