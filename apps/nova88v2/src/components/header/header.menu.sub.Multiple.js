import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { defMenuLinks, defMenuType } from "./header.menu.def";
import { bannerImgUrl } from "../../config";
import { defTpGameType } from "../../datas/productList";

const SubMenuMultiple = ({
	menuKey,
	subMenuItem,
	clickItem,
	userInfo,
	t,
	maintainList,
	showLoginPopBox
}) => {
	const displayText = subMenuItem.displayText
		? subMenuItem.displayText
		: t(subMenuItem.displayKey);
	const displayText2 = subMenuItem.displayText2 ?? null;
	const displayText3 = subMenuItem.displayText3 ?? null;

	let isInMaintain = false;
	if (subMenuItem.tpGameType) {
		isInMaintain = maintainList?.some(
			mt =>
				mt.tpId === subMenuItem.tpId &&
				(mt.tpGameType === subMenuItem.tpGameType ||
					mt.tpGameType === defTpGameType.All)
		);
	}

	let params = null;

	const SubMenuListBGLeftImg = `${bannerImgUrl}/img/subMenu-Wrapper-ListBG-left.png`;
	const SubMenuListBGRightImg = `${bannerImgUrl}/img/subMenu-Wrapper-ListBG-right.png`;
	const SubMenuListBGCenterImg = `${bannerImgUrl}/img/subMenu-Wrapper-ListBG-center.png`;

	if (subMenuItem.parameter) {
		params = Object.keys(subMenuItem.parameter).map(
			keys => `${keys}=${subMenuItem.parameter[keys]}`
		);
	}
	const _urlParams = params !== null ? `?${params.join("&")}` : "";

	let className = subMenuItem.className || "";
	let style = {};

	if (subMenuItem.eventIcons) {
		let iconStrings = "";
		for (let i = 0; i < subMenuItem.eventIcons.length; i++) {
			if (subMenuItem.eventIcons[i] !== "") {
				iconStrings += ` ${subMenuItem.eventIcons[i]}`;
			}
		}
		className += ` icon${iconStrings}`;
	}

	if (isInMaintain) {
		className += ` active`;
		style = { pointerEvents: "none" };
	}

	const pathLink = subMenuItem.path || defMenuLinks[menuKey].path;

	const content = (
		<>
			<img
				className="ListBG-left"
				alt="ListBG-left"
				src={SubMenuListBGLeftImg}
			/>
			<img
				className="ListBG-right"
				alt="ListBG-right"
				src={SubMenuListBGRightImg}
			/>
			<img
				className="ListBG-center"
				alt="ListBG-center"
				src={SubMenuListBGCenterImg}
			/>
			<ImgsNpcRender
				className="List-npc"
				listImgUrl={subMenuItem.listNpcImgUrl}
			/>
			<ImgsBgRender
				className="List-bg"
				listImgUrl={subMenuItem.listBgImgUrl}
			/>
			<span>{displayText}</span>
			<div className="under">{t("lbl_underMaintenance")}</div>
		</>
	);

	if (subMenuItem.needLogin && userInfo.isLogin === false) {
		return (
			<button
				className={className}
				style={style}
				onClick={showLoginPopBox}>
				{content}
			</button>
		);
	}

	if (subMenuItem.menuType === defMenuType.Link) {
		return (
			<Link
				className={className}
				style={style}
				to={`/${userInfo.langId}/${pathLink}${_urlParams}`}>
				{content}
			</Link>
		);
	}

	if (subMenuItem.menuType === defMenuType.DirectUrl) {
		return (
			<a href={pathLink} target="_blank" rel="noreferrer">
				{content}
			</a>
		);
	}

	if (subMenuItem.menuType === defMenuType.LinkNoImg) {
		return (
			<Link
				className={className}
				style={style}
				to={`/${userInfo.langId}/${pathLink}`}>
				<div>{displayText}</div>
				<div>{displayText2}</div>
				<div>{displayText3}</div>
				<div className="txt-orange">
					<div>{t("lbl_JoinNow")}</div>
				</div>
				<div className="under">{t("lbl_underMaintenance")}</div>
			</Link>
		);
	}

	return (
		<button
			className={className}
			style={style}
			onClick={clickItem.bind(this, {
				tpId: subMenuItem.tpId,
				gameId: subMenuItem.gameId,
				path: subMenuItem.path,
				needLogin: subMenuItem.needLogin,
				menuType: subMenuItem.menuType,
				tpGameType: subMenuItem.tpGameType,
				betType: subMenuItem?.betType
			})}>
			<img
				className="ListBG-left"
				alt="ListBG-left"
				src={SubMenuListBGLeftImg}
			/>
			<img
				className="ListBG-right"
				alt="ListBG-right"
				src={SubMenuListBGRightImg}
			/>
			<img
				className="ListBG-center"
				alt="ListBG-center"
				src={SubMenuListBGCenterImg}
			/>
			<ImgsNpcRender
				className="List-npc"
				listImgUrl={subMenuItem.listNpcImgUrl}
			/>
			<ImgsBgRender
				className="List-bg"
				listImgUrl={subMenuItem.listBgImgUrl}
			/>
			<span>{displayText}</span>
			<div className="under">{t("lbl_underMaintenance")}</div>
		</button>
	);
};

const ImgsNpcRender = ({ listImgUrl, className }) => {
	if (typeof listImgUrl === "string" || listImgUrl instanceof String)
		return (
			<img
				className={className}
				alt="listImgUrl"
				src={`${bannerImgUrl}/img/${listImgUrl}`}
			/>
		);

	return null;
};

const ImgsBgRender = ({ listImgUrl, className }) => {
	if (typeof listImgUrl === "string" || listImgUrl instanceof String)
		return (
			<img
				className={className}
				alt="listImgUrl"
				src={`${bannerImgUrl}/img/${listImgUrl}`}
			/>
		);

	if (Array.isArray(listImgUrl) && listImgUrl.length)
		return listImgUrl.map(imgUrl => (
			<img
				key={`imgs-key-${imgUrl}`}
				alt="listImgUrl"
				className={className}
				src={`${bannerImgUrl}/img/${imgUrl}`}
			/>
		));

	return null;
};

SubMenuMultiple.propTypes = {
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired,
	clickItem: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	t: PropTypes.func.isRequired,
	menuKey: PropTypes.string.isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired,
	showLoginPopBox: PropTypes.func.isRequired
};

ImgsNpcRender.propTypes = {
	listImgUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
		.isRequired,
	className: PropTypes.string.isRequired
};

ImgsBgRender.propTypes = {
	listImgUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
		.isRequired,
	className: PropTypes.string.isRequired
};

export default SubMenuMultiple;
