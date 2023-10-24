import React, { useContext } from "react";
import { Link } from "gatsby";
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
	mainKey = "",
	productTpIds
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

	const fullMenuLinks = Object.keys(defMenuLinks);
	const filterMenuLinks = fullMenuLinks.filter(key => {
		if (defMenuLinks[key].subMenu?.length > 0) {
			const subItems = defMenuLinks[key].subMenu.filter(s =>
				productTpIds?.includes(s.tpId)
			);
			return subItems.length > 0;
		}
		const subProduct = defMenuLinks[key].productInfo;
		if (subProduct) {
			const hasAuthSubProduct = productTpIds?.includes(subProduct?.tpId);
			return hasAuthSubProduct;
		}
		return true;
	});
	const showRows = isLogin ? filterMenuLinks : fullMenuLinks;

	const rows = showRows.map(key => {
		const m = defMenuLinks[key];
		const elemKey = `${mainKey}${key}`;

		const arrowIcon =
			m.subMenu && m.subMenu.length > 0 ? (
				<i className="icon icon-dropdown-arrow-white" />
			) : null;

		let _className = m.className ? m.className : "";

		if (m.isHot) {
			_className = `${_className} hot`;
		}

		const iconList = m.eventIcons?.length > 0 ? [...m.eventIcons] : [];

		if (m.subMenu) {
			m.subMenu
				.filter(
					s => productTpIds === null || productTpIds.includes(s.tpId)
				)
				.forEach(sub => {
					if (sub.eventIcons) {
						for (let i = 0; i < sub.eventIcons.length; i++) {
							if (sub.eventIcons[i] !== "") {
								iconList.push(sub.eventIcons[i]);
							}
						}
					}
				});
		}

		let iconStrings = "";

		if (iconList.length > 0) {
			iconStrings = ` icon ${Array.from(new Set(iconList)).join(" ")}`;
		}

		_className = `${_className}${iconStrings}`;

		const displayText = toUpperCase
			? t(m.displayKey)?.toUpperCase()
			: t(m.displayKey);

		let _path = m.path;

		if (m.affiliate) {
			return (
				<a
					key={elemKey}
					href={siteInfo({ langId: userInfo.langId }).affiliateLink}
					target="_blank" rel="noreferrer">
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
						onMouseOver={_showSubMenu.bind(this, key)}
						onClick={OPEN_IN_BLANK.bind(
							this,
							rule.entPageUrl,
							rule.windowKey
						)}
						onFocus={() => 0}>
						<i className={_className} />
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
					to={`/${langId}/${_path}`}
					onMouseOver={_showSubMenu.bind(this, key)}>
					<i className={_className} />
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
