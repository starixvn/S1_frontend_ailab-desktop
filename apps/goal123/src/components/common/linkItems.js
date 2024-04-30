import React, { useContext } from "react";
import { Link } from "gatsby";
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
	toUpperCase = false,
	productTpIds
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

	const fullMenuLinks = Object.keys(defMenus);

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

		let _className = m.className ? m.className : "";

		const _target = m.target ? m.target : "";

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
			iconStrings = ` ${Array.from(new Set(iconList)).join(" ")}`;
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
						{iconList.length > 0 && <i className={iconStrings} />}
						{displayText}
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
						{iconList.length > 0 && <i className={iconStrings} />}
						{displayText}
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
					</button>
				);
			}
			const _url = getUrl(`${langId}/${_path}`, m.productInfo);

			_className =
				checkMatchPage && _url === currentPage
					? m.className
						? `${m.className} active`
						: "active"
					: m.className;

			return m.isFullPath || _target === "_blank" ? (
				<a
					href={_path}
					target={_target}
					key={key}
					onMouseOver={_showSubMenu.bind(this, key)}
					className={_className}
					onFocus={() => 0}>
					{iconList.length > 0 && <i className={iconStrings} />}
					{displayText}
				</a>
			) : (
				<Link
					key={key}
					to={_url}
					className={_className}
					onMouseOver={_showSubMenu.bind(this, key)}>
					{iconList.length > 0 && <i className={iconStrings} />}
					{displayText}
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

			const providerLink = `?provider=${m.provider}`;

			return m.isFullPath || _target === "_blank" ? (
				<a
					href={_path}
					target={_target}
					key={key}
					onMouseOver={_showSubMenu.bind(this, key)}
					className={_className}
					onFocus={() => 0}>
					{iconList.length > 0 && <i className={iconStrings} />}
					{displayText}
				</a>
			) : (
				<Link
					key={key}
					to={`/${langId}/${_path}${m.provider ? providerLink : ""}`}
					onMouseOver={_showSubMenu.bind(this, key)}
					className={_className}>
					{iconList.length > 0 && <i className={iconStrings} />}
					{displayText}
				</Link>
			);
		}
		return (
			<button
				key={key}
				onMouseOver={_showSubMenu.bind(this, key)}
				className={_className}
				onFocus={() => 0}>
				{iconList.length > 0 && <i className={iconStrings} />}
				{displayText}
			</button>
		);
	});

	return <>{rows}</>;
};
