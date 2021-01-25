import React, { useContext } from "react";
import { Link } from "@reach/router";
import {
	GET_OPEN_RULE,
	_ACTION_TYPE,
	OPEN_IN_BLANK
} from "../../service/enterPage";
import { defPopBoxType } from "./defPopBoxType";
import { popBoxContext, userInfoContext } from "./context";
import path from "../../router";

import { siteInfo } from "../../config";

const getUrl = (preUrl, info) => {
	return `/${preUrl}?game=${info.name}`;
};

export const getCurrentPage = () => {
	return typeof window !== undefined
		? `${window.location.pathname}${window.location.search}`
		: "";
};

export default ({
	defMenuLinks,
	t,
	showSubMenu,
	langId,
	isLogin,
	checkMatchPage,
	toUpperCase = false,
	mainKey = ""
}) => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const showLogin = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	const _showSubMenu = key => {
		if (showSubMenu) {
			showSubMenu(key);
		}
	};

	const currentPage = checkMatchPage ? getCurrentPage() : "";

	const rows = Object.keys(defMenuLinks).map(key => {
		const m = defMenuLinks[key];
		const elemKey = `${mainKey}${key}`;

		const arrowIcon =
			m.subMenu && m.subMenu.length > 0 ? (
				<i className="icon icon-arrow_drop_down" />
			) : null;

		let _className = m.className ? m.className : "";

		if (m.isHot) {
			_className = `${_className} hot`;
		}

		if (m.subMenu) {
			let iconList = [];
			let iconList_unique = [];
			m.subMenu.forEach(sub => {
				if (sub.eventIcons) {
					for (let i = 0; i < sub.eventIcons.length; i++) {
						iconList.push(sub.eventIcons[i]);
					}
				}
				iconList_unique = [...new Set(iconList)];
			});
			let iconStrings = "";
			for (let i = 0; i < iconList_unique.length; i++) {
				iconStrings += ` ${iconList_unique[i]}`;
			}
			_className = `${_className}${iconStrings}`;
		}

		let displayText = toUpperCase
			? t(m.displayKey)?.toUpperCase()
			: t(m.displayKey);

		let _path = m.path;

		if (m.affiliate) {
			return (
				<a
					key={elemKey}
					href={siteInfo({ langId: userInfo.langId }).affiliateLink}
					target="_blank">
					{t("lbl_Affiliates")?.toUpperCase()}
				</a>
			);
		}

		if (m.productInfo) {
			const rule = GET_OPEN_RULE(
				langId,
				m.productInfo.tpId,
				m.productInfo.gameId
			);

			if (m.tpId === 1 && rule.actionType === _ACTION_TYPE.redirect) {
				_path = path.sports.root;
			}

			const isBlank = rule.actionType === _ACTION_TYPE.blank;
			if (rule.needLogin && isLogin === false) {
				return (
					<button
						key={elemKey}
						onClick={showLogin}
						className={_className}
						onMouseOver={_showSubMenu.bind(this, key)}
						onFocus={() => 0}>
						{displayText}
						{arrowIcon}
					</button>
				);
			}
			if (isBlank) {
				return (
					<a
						key={elemKey}
						className={_className}
						onMouseOver={_showSubMenu.bind(this, key)}
						onClick={OPEN_IN_BLANK.bind(
							this,
							rule.entPageUrl,
							rule.windowKey
						)}
						onFocus={() => 0}>
						{displayText}
						{arrowIcon}
					</a>
				);
			}
			if (!_path) {
				return (
					<button
						key={elemKey}
						className={_className}
						onMouseOver={_showSubMenu.bind(this, key)}
						onFocus={() => 0}>
						{displayText}
						{arrowIcon}
					</button>
				);
			}
			const _url = getUrl(`${langId}/${_path}`, m.productInfo);

			_className =
				checkMatchPage && _url === currentPage
					? _className
						? `${_className} active`
						: "active"
					: _className;
			return (
				<Link
					key={elemKey}
					to={_url}
					className={_className}
					onMouseOver={_showSubMenu.bind(this, key)}>
					{displayText}
					{arrowIcon}
				</Link>
			);
		}
		if (_path) {
			_className =
				checkMatchPage && `${langId}/${_path}` === currentPage
					? _className
						? `${_className} active`
						: "active"
					: _className;
			return (
				<Link
					key={elemKey}
					to={`${langId}/${_path}`}
					onMouseOver={_showSubMenu.bind(this, key)}
					className={_className}>
					{displayText}
					{arrowIcon}
				</Link>
			);
		}
		return (
			<button
				key={elemKey}
				onMouseOver={_showSubMenu.bind(this, key)}
				className={_className}
				onFocus={() => 0}>
				{displayText}
				{arrowIcon}
			</button>
		);
	});

	return rows;
};
