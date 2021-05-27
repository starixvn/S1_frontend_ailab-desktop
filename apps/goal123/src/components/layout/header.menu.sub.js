import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, navigate } from "@reach/router";
import { defMenuType } from "./header.menu.def";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import productList from "../../datas/productList";
import path from "../../router";

export default ({ listClassName, subItems, menuKey, mainUrl }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);

	const imgRender = ({ bgImgUrl, npcImgUrl, iconImgUrl }) => {
		return (
			<>
				{bgImgUrl && (
					<img className="item-bg" src={bgImgUrl} alt={bgImgUrl} />
				)}

				{npcImgUrl && (
					<img className="item-img" src={npcImgUrl} alt={npcImgUrl} />
				)}

				{iconImgUrl && (
					<img
						className="item-icon"
						src={iconImgUrl}
						alt={iconImgUrl}
					/>
				)}
			</>
		);
	};

	const ClickItem = (tpId, gameId, _subPath) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};
		if (_subPath) {
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
		const { bgImgUrl, npcImgUrl, iconImgUrl } = s;
		const displayText = s.displayText ? s.displayText : t(s.displayKey);
		const key = `${menuKey}-${userInfo.isLogin}-${displayText}`;

		let params = null;
		if (s.parameter) {
			params = Object.keys(s.parameter).map(_key => {
				return `${_key}=${s.parameter[_key]}`;
			});
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

		const _urlParams = params !== null ? `?${params.join("&")}` : "";
		if (s.menuType === defMenuType.Link) {
			return (
				<Link
					key={key}
					className={_iconClassName}
					to={`/${userInfo.langId}/${mainUrl}${_urlParams}`}>
					{imgRender({ bgImgUrl, npcImgUrl, iconImgUrl })}

					<span>
						<p>{displayText}</p>
					</span>
				</Link>
			);
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

		return (
			<button
				key={key}
				className={_iconClassName}
				onClick={ClickItem.bind(
					this,
					s.tpId,
					s.gameId,
					// userInfo,
					_subPath
				)}>
				{imgRender({ bgImgUrl, npcImgUrl, iconImgUrl })}
				<span>
					<p>{displayText}</p>
				</span>
			</button>
		);
	});

	return <div className={`${listClassName ?? ""} active`}>{rows}</div>;
};
