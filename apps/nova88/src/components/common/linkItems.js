import React, { useContext } from "react";
import { Link, navigate } from "@reach/router";
import {
	GET_OPEN_RULE,
	_ACTION_TYPE,
	OPEN_IN_BLANK
} from "../../service/enterPage";
import defPopBoxType from "./defPopBoxType";
import { popBoxContext } from "./context";
import path from "../../router";

export const getUrl = (preUrl, info) => {
	return `/${preUrl}?tpId=${info.tpId}&gameId=${info.gameId}`;
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

	const rows = Object.keys(defMenuLinks).map(key => {
		const m = defMenuLinks[key];

		let _className = m.className ? m.className : "";

		if (m.isHot) {
			_className = `${_className} hot`;
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
					</button>
				);
			}

			if (isBlank && rule.windowKey && !m.openPopBox) {
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

			if (m.openPopBox) {
				const clickClose = () => {
					setPopBox({ isOpen: false });
				};

				const openNewWindow = () => {
					OPEN_IN_BLANK(rule.entPageUrl, rule.windowKey);
					clickClose();
				};

				const linkToPage = () => {
					currentPage === `/${langId}/${_path}`
						? clickClose()
						: navigate(`/${langId}/${_path}`);
				};

				const showLinkOptionsPopBox = () =>
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.showOneGamingLink,
						clickClose,
						btnBar: (
							<div className="btnGroup">
								<a className="blue" onClick={openNewWindow}>
									{t("lbl_GoToGame")}
								</a>
								<a className="orange" onClick={linkToPage}>
									{t("lbl_GoToDownloadApp")}
								</a>
							</div>
						)
					});

				return (
					<button
						key={key}
						className={_className}
						onClick={showLinkOptionsPopBox}>
						{displayText}
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
					key={key}
					to={_url}
					className={_className}
					onMouseOver={_showSubMenu.bind(this, key)}>
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
			return (
				<Link
					key={key}
					to={`${langId}/${_path}`}
					onMouseOver={_showSubMenu.bind(this, key)}
					className={_className}>
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
				{displayText}
			</button>
		);
	});

	return rows;
};
