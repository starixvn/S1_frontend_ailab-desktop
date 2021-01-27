import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import { defMenuType } from "./header.menu.def";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import { SET_ENTER_PAGE } from "../../service/enterPage";

export default ({ listClassName, subItems, menuKey, mainUrl }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);

	const ClickItem = (tpId, gameId) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		SET_ENTER_PAGE({
			isLogin: userInfo.isLogin,
			langId: userInfo.langId,
			tpId,
			gameId,
			loginCallback
		});
	};

	const rows = subItems.map(s => {
		const displayText = s.displayText ? s.displayText : t(s.displayKey);
		const key = `${menuKey}-${userInfo.isLogin}-${displayText}`;

		let params = null;
		if (s.parameter) {
			params = Object.keys(s.parameter).map(_key => {
				return `${_key}=${s.parameter[_key]}`;
			});
		}

		const _urlParams = params !== null ? `?${params.join("&")}` : "";

		let _iconClassName = "";
		if (s.eventIcons) {
			let iconStrings = "";
			for (let i = 0; i < s.eventIcons.length; i++) {
				if (s.eventIcons[i] !== "") {
					iconStrings += `${s.eventIcons[i]}`;
				}
			}
			_iconClassName = `${iconStrings}`;
		}

		const showIcon =
			_iconClassName === "" ? null : (
				<i className={`icon ${_iconClassName}`} />
			);

		// const _urlParams = params !== null ? `?${params.join("&")}` : "";
		// const newIcon = s.isNew ? <i className="icon icon-newicon" /> : null;
		if (s.menuType === defMenuType.Link) {
			return (
				<Link
					key={key}
					className={s.className}
					to={`/${userInfo.langId}/${mainUrl}${_urlParams}`}>
					{showIcon}
					<span className={s.icon}>{displayText}</span>
				</Link>
			);
		}
		return (
			<button
				key={key}
				className={s.className}
				onClick={ClickItem.bind(this, s.tpId, s.gameId, userInfo)}>
				{showIcon}
				<span className={s.icon}>{displayText}</span>
			</button>
		);

		// return (
		// 	<button
		// 		key={key}
		// 		className={s.className}
		// 		onClick={ClickItem.bind(this, s.tpId, s.gameId, userInfo)}>
		// 		{newIcon}
		// 		<span className={s.icon}>{displayText}</span>
		// 	</button>
		// );
	});

	return <div className={`${listClassName} active`}>{rows}</div>;
};
