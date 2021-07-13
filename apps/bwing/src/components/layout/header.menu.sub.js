import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, navigate } from "@reach/router";
import { defMenuType } from "./header.menu.def";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { useGotoGame } from "../hook/useGotoGame";
import productList from "../../datas/productList";
// import path from "../../router";

export default ({
	listClassName,
	subItems,
	menuKey,
	mainUrl,
	maintainList
}) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const { isLogin, langId } = userInfo;

	const ClickItem = (tpId, gameId, menuType, _subPath, isInMaintain) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};
		if (isInMaintain) {
			return;
		}
		if (menuType === defMenuType.useGoToGame) {
			handleGoToGame({
				isLogin,
				langId,
				tpId,
				gameId
			});
		} else if (_subPath) {
			navigate(`/${userInfo.langId}/${_subPath}`);
		} else {
			SET_ENTER_PAGE({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				loginCallback
			});
		}
	};

	const rows = subItems?.map(s => {
		const displayText = s.displayText ? s.displayText : t(s.displayKey);
		const key = `${menuKey}-${userInfo.isLogin}-${displayText}`;
		const isInMaintain = maintainList.some(item => item.tpId === s.tpId);

		let _className = s.className ? s.className : "";

		if (isInMaintain) {
			_className += ` under`;
		}

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

		let _subPath;
		if (s.subPath) {
			if (
				s.gameId === productList.sportSaba.gameId &&
				s.tpId === productList.sportSaba.tpId
			) {
				_subPath = `${s.subPath}?game=${s.parameter?.name}`;
			}
			if (s.tpId === productList.sportBti.tpId) {
				_subPath = `${s.subPath}`;
			}
		}

		if (s.menuType === defMenuType.Link) {
			return (
				<Link
					key={key}
					className={_className}
					to={`/${userInfo.langId}/${mainUrl}${_urlParams}`}>
					{isInMaintain ? (
						<div className="underBtn">
							{t("lbl_underMaintenance")}
						</div>
					) : null}
					{showIcon}
					<span className={s.icon}>{displayText}</span>
				</Link>
			);
		}
		return (
			<button
				key={key}
				className={_className}
				onClick={ClickItem.bind(
					this,
					s.tpId,
					s.gameId,
					// userInfo,
					s.menuType,
					_subPath,
					isInMaintain
				)}>
				{isInMaintain ? (
					<div className="underBtn">{t("lbl_underMaintenance")}</div>
				) : null}
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

	return <div className={`${listClassName ?? ""} active`}>{rows}</div>;
};
