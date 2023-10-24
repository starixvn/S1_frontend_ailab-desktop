import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { defMenuType } from "./header.menu.def";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { useGotoGame } from "../hook/useGotoGame";
import productList, { defTpGameType } from "../../datas/productList";
import { bannerImgUrl } from "../../config";

const SubMenu = ({
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

	const ClickItem = (
		tpId,
		gameId,
		menuType,
		_subPath,
		isInMaintain,
		tpGameType,
		afterLogin
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
			if (afterLogin && !isLogin) {
				loginCallback();
			} else {
				navigate(`/${userInfo.langId}/${_subPath}`);
			}
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

		const isInMaintain = maintainList?.some(
			item =>
				item.tpId === s.tpId &&
				(item.tpGameType === s.tpGameType ||
					item.tpGameType === defTpGameType.All)
		);

		let params = null;
		if (s.parameter) {
			params = Object.keys(s.parameter).map(
				_key => `${_key}=${s.parameter[_key]}`
			);
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
			if (_iconClassName === "tag-new") {
				showIcon = "tag-new-pop";
			} else {
				showIcon = _iconClassName;
			}
		}

		let _subPath;
		if (s.subPath) {
			if (s.tpId === productList.sportSaba.tpId) {
				_subPath = `${s.subPath}?game=${s.parameter?.name}`;
			} else {
				_subPath = `${s.subPath}`;
			}
		}

		if (s.menuType === defMenuType.Link) {
			return (
				<a
					key={key}
					className={isInMaintain ? "maintain" : ""}
					href={`/${userInfo.langId}/${
						menuKey === "casino" ? menuKey : mainUrl
					}${_urlParams}`}>
					<div className={showIcon ?? ""} />
					<img
						src={`${bannerImgUrl}/desktop/img/4.0/dropdown/${s.img}`}
						alt=""
					/>

					<div className="title">{displayText}</div>
					{isInMaintain ? (
						<div className="tag-maintain">
							{t("lbl_underMaintenance")}
						</div>
					) : null}
				</a>
			);
		}
		return (
			<a
				key={key}
				onClick={ClickItem.bind(
					this,
					s.tpId,
					s.gameId,
					s.menuType,
					_subPath,
					isInMaintain,
					s.tpGameType,
					s?.afterLogin
				)}
				className={isInMaintain ? "maintain" : ""}>
				<div className={showIcon ?? ""} />

				<img
					src={`${bannerImgUrl}/desktop/img/4.0/dropdown/${s.img}`}
					alt=""
				/>

				<div className="title">{displayText}</div>
				{isInMaintain ? (
					<div className="tag-maintain">
						{t("lbl_underMaintenance")}
					</div>
				) : null}
			</a>
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
	subItems: PropTypes.arrayOf(PropTypes.any).isRequired,
	menuKey: PropTypes.string.isRequired,
	mainUrl: PropTypes.string,
	maintainList: PropTypes.PropTypes.arrayOf(PropTypes.any).isRequired
};
