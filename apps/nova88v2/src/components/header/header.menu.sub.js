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
import {
	SET_ENTER_PAGE,
	GET_OPEN_RULE,
	OPEN_IN_BLANK
} from "../../service/enterPage";

import SubMenuListBGLeftImg from "../../styles/img/subMenu-Wrapper-ListBG-left.png";
import SubMenuListBGRightImg from "../../styles/img/subMenu-Wrapper-ListBG-right.png";
import SubMenuListBGCenterImg from "../../styles/img/subMenu-Wrapper-ListBG-center.png";
import productList from "../../datas/productList";
import path from "../../router";

export default ({ currentMenuKey, productTpIds }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);

	const clickItem = ({ tpId, gameId, needLogin, _path }) => {
		const handleCallBack = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (_path)
			return needLogin && !userInfo.isLogin
				? handleCallBack()
				: navigate(`/${userInfo.langId}/${_path}`);

		return SET_ENTER_PAGE({
			isLogin: userInfo.isLogin,
			langId: userInfo.langId,
			tpId,
			gameId,
			loginCallback: handleCallBack
		});
	};

	return Object.keys(defMenuLinks).map(menuKey => {
		if (!defSubListClassName[menuKey]) return;

		const subClassName = `${defSubListClassName[menuKey] || ""}${
			menuKey === currentMenuKey ? " active" : ""
		}`;
		let subMenu = [];

		const isSubWithManyItems = !(
			typeof defMenuLinks[menuKey]?.subMenu == "undefined"
		);

		if (isSubWithManyItems) {
			subMenu = defMenuLinks[menuKey]?.subMenu;
			if (
				subMenu &&
				productTpIds?.length > 0 &&
				defMenuLinks[menuKey].filterByAuth
			) {
				subMenu = subMenu.filter(
					s => s.alwaysShow || productTpIds.includes(s.tpId)
				);
			}

			subMenu = subMenu?.filter(
				s =>
					userInfo.isLogin !== true ||
					!s.allowCurrency ||
					s.allowCurrency.includes(userInfo.currencyId)
			);
		}

		return isSubWithManyItems ? (
			<div className={subClassName} key={`main-key-${menuKey}`}>
				{subMenu?.map(subMenuItem => (
					<SubMenuItems
						key={`${subMenuItem.displayKey}-${subMenuItem.tpId}-${subMenuItem.gameId}`}
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
		) : (
			<div className={subClassName} key={`main-key-${menuKey}`}>
				<SubSingleContent menuKey={menuKey} userInfo={userInfo} t={t} />
			</div>
		);
	});
};

const SubMenuItems = ({ subMenuItem, clickItem, userInfo, t, menuKey }) => {
	const displayText = subMenuItem.displayText
		? subMenuItem.displayText
		: t(subMenuItem.displayKey);

	let params = null;

	if (subMenuItem.parameter) {
		params = Object.keys(subMenuItem.parameter).map(keys => {
			return `${keys}=${subMenuItem.parameter[keys]}`;
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

	const pathLink = subMenuItem.path || defMenuLinks[menuKey].path;

	if (subMenuItem.menuType === defMenuType.Link) {
		return (
			<Link
				className={className}
				to={`/${userInfo.langId}/${pathLink}${_urlParams}`}>
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

	if (subMenuItem.menuType === defMenuType.DirectUrl) {
		return (
			<a href={pathLink} target="_blank">
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
			</a>
		);
	}

	if (subMenuItem.menuType === defMenuType.LinkNoImg) {
		return (
			<Link className={className} to={`/${userInfo.langId}/${pathLink}`}>
				<div>{displayText}</div>
				<div>100%</div>
				<div>WELCOME BONUS</div>
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

SubMenuItems.propTypes = {
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired,
	clickItem: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	t: PropTypes.func.isRequired,
	menuKey: PropTypes.string.isRequired
};

const SubSingleContent = ({ menuKey, userInfo, t }) => {
	const { setPopBox } = useContext(popBoxContext);
	const pathLink = defMenuLinks[menuKey].path;

	const showLoginPopBox = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	if (menuKey === "poker") {
		const rule = GET_OPEN_RULE(
			userInfo.langId,
			productList.poker.tpId,
			null
		);
		const linkToPokerWeb = () => {
			userInfo.isLogin
				? OPEN_IN_BLANK(rule.entPageUrl, rule.windowKey)
				: showLoginPopBox();
		};

		const linkToPokerRoot = () => {
			userInfo.isLogin
				? navigate(`/${userInfo.langId}/${path.oneGame.root}`)
				: showLoginPopBox();
		};

		return (
			<div>
				<div>MULTI TABLE</div>
				<div>FUNCTION</div>
				<div className="btnGroup">
					<button className="lightblue" onClick={linkToPokerWeb}>
						{t("lbl_GoToGame")}
					</button>
					<button className="lightblue" onClick={linkToPokerRoot}>
						{t("lbl_Download")}
					</button>
				</div>
				<div>1G Poker available now!</div>
			</div>
		);
	}
	if (menuKey === "vip") {
		return (
			<div>
				<div>{t("lbl_VIP_CLUB")}</div>
				<div>
					<span className="txt-orange">
						{t("lbl_EARN_EXCLUSIVE_VIP_BENEFIT")}
					</span>
				</div>
				<div className="btnGroup">
					<Link
						className="lightblue"
						to={`/${userInfo.langId}/${pathLink}`}>
						{t("lbl_JOIN_US_NOW")}
					</Link>
				</div>
			</div>
		);
	}
	if (menuKey === "ranking") {
		return (
			<div>
				<div>{t("lbl_THE_WORLD_CLASS_LEADERBOARD")}</div>
				<div>{t("lbl_Bring_you_the_best_experience")}</div>
			</div>
		);
	}
	return <div />;
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
