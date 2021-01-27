import React, { useContext } from "react";
import { Link } from "@reach/router";
import {
	GET_OPEN_RULE,
	_ACTION_TYPE,
	OPEN_IN_BLANK
} from "../../service/enterPage";
import { defPopBoxType } from "./popBox";
import { popBoxContext } from "./context";
import path from "../../router";

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
	toUpperCase = false
}) => {
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
	const defMenus =
		typeof defMenuLinks === "function"
			? defMenuLinks(langId)
			: defMenuLinks;
	const rows = Object.keys(defMenus).map(key => {
		const m = defMenus[key];
		const arrowIcon =
			m.subMenu && m.subMenu.length > 0 ? (
				<i className="icon icon-keyboard_arrow_right" />
			) : null;

		let _className = m.className ? m.className : "";

		const _target = m.target ? m.target : "";

		if (m.isHot) {
			_className = `${_className} hot`;
		}

		if (m.subMenu) {
			const iconList = [];
			let iconStrings = "";
			m.subMenu.forEach(sub => {
				if (sub.eventIcons) {
					for (let i = 0; i < sub.eventIcons.length; i++) {
						if (sub.eventIcons[i] !== "") {
							iconList.push(sub.eventIcons[i]);
						}
					}
					if (iconList.length > 0) {
						iconStrings = ` icon ${[...new Set(iconList)].join(
							" "
						)}`;
					}
				}
			});
			_className += iconStrings;
		}

		const displayText = toUpperCase
			? t(m.displayKey)?.toUpperCase()
			: t(m.displayKey);

		let _path = m.path;

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
						key={key}
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
						key={key}
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
						key={key}
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
			return m.isFullPath || _target === "_blank" ? (
				<a
					href={_path}
					target={_target}
					key={key}
					onMouseOver={_showSubMenu.bind(this, key)}
					className={_className}
					onFocus={() => 0}>
					{displayText}
					{arrowIcon}
				</a>
			) : (
				<Link
					key={key}
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

			return m.isFullPath || _target === "_blank" ? (
				<a
					href={_path}
					target={_target}
					key={key}
					onMouseOver={_showSubMenu.bind(this, key)}
					className={_className}
					onFocus={() => 0}>
					{displayText}
					{arrowIcon}
				</a>
			) : (
				<Link
					key={key}
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
				key={key}
				onMouseOver={_showSubMenu.bind(this, key)}
				className={_className}
				onFocus={() => 0}>
				{displayText}
				{arrowIcon}
			</button>
		);
	});

	return <>{rows}</>;
};
