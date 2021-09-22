import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link, navigate } from "@reach/router";
import { defMenuType } from "./header.menu.def";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { useGotoGame } from "../hook/useGotoGame";
import productList from "../../datas/productList";

const SubMenu = ({
	listClassName,
	subDivClass1,
	subDivClass2,
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

	const ClickItem = (
		tpId,
		gameId,
		menuType,
		_subPath,
		isInMaintain,
		tpGameType
	) => {
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
				gameId,
				tpGameType
			});
		} else if (_subPath) {
			navigate(`/${userInfo.langId}/${_subPath}`);
		} else {
			SET_ENTER_PAGE({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				loginCallback,
				tpGameType
			});
		}
	};

	const rows = subItems?.map(s => {
		const displayText = s.displayText ? s.displayText : t(s.displayKey);
		const key = `${menuKey}-${userInfo.isLogin}-${displayText}`;
		let _className = s.className ? s.className : "";

		const isInMaintain = maintainList?.some(
			item => item.tpId === s.tpId && item.tpGameType === s.tpGameType
		);

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

		let showIcon = null;
		if (_iconClassName.length > 0) {
			if (_iconClassName === "icon-newicon") {
				showIcon = <div className="newimg" />;
			} else {
				showIcon = <i className={`${_iconClassName}`} />;
			}
		}

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
					{showIcon}
					<div className="img">
						{subDivClass1 ? <div className="subDivClass1" /> : null}
						{subDivClass2 ? <div className="subDivClass1" /> : null}
					</div>
					<span>{displayText}</span>
					{isInMaintain ? (
						<div className="underBtn">
							{t("lbl_underMaintenance")}
						</div>
					) : null}
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
					s.menuType,
					_subPath,
					isInMaintain,
					s.tpGameType
				)}>
				{showIcon}
				<div className="img">
					{subDivClass1 ? <div className="subDivClass1" /> : null}
					{subDivClass2 ? <div className="subDivClass1" /> : null}
				</div>
				<span>{displayText}</span>
				{isInMaintain ? (
					<div className="underBtn">{t("lbl_underMaintenance")}</div>
				) : null}
			</button>
		);
	});

	return <div className={`${listClassName ?? ""} active`}>{rows}</div>;
};

export default SubMenu;

SubMenu.defaultProps = {
	mainUrl: undefined
};

SubMenu.propTypes = {
	listClassName: PropTypes.string.isRequired,
	subDivClass1: PropTypes.string.isRequired,
	subDivClass2: PropTypes.string.isRequired,
	subItems: PropTypes.arrayOf(PropTypes.any).isRequired,
	menuKey: PropTypes.string.isRequired,
	mainUrl: PropTypes.string,
	maintainList: PropTypes.PropTypes.arrayOf(PropTypes.any).isRequired
};
