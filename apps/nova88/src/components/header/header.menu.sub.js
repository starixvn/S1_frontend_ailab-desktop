import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, navigate } from "@reach/router";
import { defMenuType } from "./header.menu.def";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import { SET_ENTER_PAGE } from "../../service/enterPage";

export default ({ listClassName, subItems, menuKey, mainUrl }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);

	const ClickItem = ({ tpId, gameId, needLogin, path }) => {
		const handleCallBack = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (path) {
			return needLogin && !userInfo.isLogin
				? handleCallBack()
				: navigate(`/${userInfo.langId}/${path}`);
		}
		return SET_ENTER_PAGE({
			isLogin: userInfo.isLogin,
			langId: userInfo.langId,
			tpId,
			gameId,
			loginCallback: handleCallBack
		});
	};

	const rows = subItems
		.filter(
			s =>
				userInfo.isLogin !== true ||
				!s.allowCurrency ||
				s.allowCurrency.includes(userInfo.currencyId)
		)
		.map(s => {
			const displayText = s.displayText ? s.displayText : t(s.displayKey);
			const key = `${menuKey}-${userInfo.isLogin}-${s.tpId}-${s.gameId}`;

			let params = null;
			if (s.parameter) {
				params = Object.keys(s.parameter).map(_key => {
					return `${_key}=${s.parameter[_key]}`;
				});
			}

			const _urlParams = params !== null ? `?${params.join("&")}` : "";
			if (s.menuType === defMenuType.Link) {
				const url = s.path || mainUrl;
				return (
					<Link
						key={key}
						className={s.className}
						to={`/${userInfo.langId}/${url}${_urlParams}`}>
						<span className={s.icon}>{displayText}</span>
					</Link>
				);
			}
			return (
				<button
					key={key}
					className={s.className}
					onClick={ClickItem.bind(this, {
						tpId: s.tpId,
						gameId: s.gameId,
						needLogin: s.needLogin,
						path: s.path
					})}>
					<span className={s.icon}>{displayText}</span>
				</button>
			);
		});

	return <div className={`${listClassName} active`}>{rows}</div>;
};
