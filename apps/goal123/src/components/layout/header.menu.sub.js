import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { defMenuType } from "./header.menu.def";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { useGotoGame } from "../hook/useGotoGame";
import productList, { defTpGameType } from "../../datas/productList";

const Menu = ({
	listClassName,
	subItems,
	menuKey,
	mainUrl,
	allMaintainList
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

	const imgRender = ({ bgImgUrl, npcImgUrl, iconImgUrl }) => (
		<>
			{bgImgUrl && (
				<img className="item-bg" src={bgImgUrl} alt={bgImgUrl} />
			)}

			{npcImgUrl && (
				<img className="item-img" src={npcImgUrl} alt={npcImgUrl} />
			)}

			{iconImgUrl && (
				<img className="item-icon" src={iconImgUrl} alt={iconImgUrl} />
			)}
		</>
	);

	const rows = subItems?.map(s => {
		const { bgImgUrl, npcImgUrl, iconImgUrl } = s;
		const displayText = s.displayText ? s.displayText : t(s.displayKey);
		const key = `${menuKey}-${userInfo.isLogin}-${displayText}`;

		const isInMaintain = allMaintainList?.some(
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
		let _iconClassName = s.className ? s.className : "";
		if (s.eventIcons) {
			let iconStrings = "";
			for (let i = 0; i < s.eventIcons.length; i++) {
				if (s.eventIcons[i] !== "") {
					iconStrings += ` ${s.eventIcons[i]}`;
				}
			}
			_iconClassName += ` icon${iconStrings}`;
		}

		if (isInMaintain) {
			_iconClassName += ` active`;
		}

		const _urlParams = params !== null ? `?${params.join("&")}` : "";
		if (s.menuType === defMenuType.Link) {
			return (
				<a
					key={key}
					className={_iconClassName}
					href={`/${userInfo.langId}/${mainUrl}${_urlParams}`}
				>
					{imgRender({ bgImgUrl, npcImgUrl, iconImgUrl })}

					<span>
						<p>{displayText}</p>
					</span>

					{isInMaintain ? (
						<div className="maintenance">
							{t("lbl_underMaintenance")}
						</div>
					) : null}
				</a>
			);
		}

		let _subPath;
		if (s.subPath) {
			if (s.tpId === productList.sportSaba.tpId) {
				_subPath = `${s.subPath}?game=${s.parameter?.name}`;
			} else {
				_subPath = `${s.subPath}`;
			}
		}

		return (
			<button
				key={key}
				className={_iconClassName}
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
			>
				{imgRender({ bgImgUrl, npcImgUrl, iconImgUrl })}
				<span>
					<p>{displayText}</p>
				</span>
				{isInMaintain ? (
					<div className="maintenance">
						{t("lbl_underMaintenance")}
					</div>
				) : null}
			</button>
		);
	});

	return <div className={`${listClassName ?? ""} active`}>{rows}</div>;
};

Menu.defaultProps = {
	listClassName: "",
	mainUrl: null,
	allMaintainList: null
};

Menu.propTypes = {
	listClassName: PropTypes.string,
	subItems: PropTypes.arrayOf(PropTypes.any).isRequired,
	menuKey: PropTypes.string.isRequired,
	mainUrl: PropTypes.string,
	allMaintainList: PropTypes.arrayOf(PropTypes.object)
};

export default Menu;
