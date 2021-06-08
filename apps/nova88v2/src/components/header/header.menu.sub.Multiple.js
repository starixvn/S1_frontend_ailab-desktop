import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { defMenuLinks, defMenuType, defImgSourceType } from "./header.menu.def";
// import SubMenuListBGLeftImg from "../../styles/img/subMenu-Wrapper-ListBG-left.png";
// import SubMenuListBGRightImg from "../../styles/img/subMenu-Wrapper-ListBG-right.png";
// import SubMenuListBGCenterImg from "../../styles/img/subMenu-Wrapper-ListBG-center.png";
import config from "../../config";

const SubMenuMultiple = ({
	subMenuItem,
	clickItem,
	userInfo,
	t,
	menuKey,
	maintainList
}) => {
	const displayText = subMenuItem.displayText
		? subMenuItem.displayText
		: t(subMenuItem.displayKey);

	const displayText2 = subMenuItem.displayText2 ?? null;
	const displayText3 = subMenuItem.displayText3 ?? null;

	const isInMaintain = maintainList.some(
		({ tpId }) => tpId === subMenuItem.tpId
	);

	let params = null;

	const SubMenuListBGLeftImg = `${config.bannerImgUrl}/img/subMenu-Wrapper-ListBG-left.png`;
	const SubMenuListBGRightImg = `${config.bannerImgUrl}/img/subMenu-Wrapper-ListBG-right.png`;
	const SubMenuListBGCenterImg = `${config.bannerImgUrl}/img/subMenu-Wrapper-ListBG-center.png`;

	if (subMenuItem.parameter) {
		params = Object.keys(subMenuItem.parameter).map(keys => {
			return `${keys}=${subMenuItem.parameter[keys]}`;
		});
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

	if (subMenuItem.menuType === defMenuType.Link) {
		return (
			<Link
				className={className}
				style={style}
				to={`/${userInfo.langId}/${pathLink}${_urlParams}`}>
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
					imgFromBannerImgUrl={
						subMenuItem.imgSource === defImgSourceType.bannerImgUrl
					}
				/>
				<ImgsBgRender
					className="List-bg"
					listImgUrl={subMenuItem.listBgImgUrl}
					imgFromBannerImgUrl={
						subMenuItem.imgSource === defImgSourceType.bannerImgUrl
					}
				/>
				<span>{displayText}</span>
				<div className="under">{t("lbl_underMaintenance")}</div>
			</Link>
		);
	}

	if (subMenuItem.menuType === defMenuType.DirectUrl) {
		return (
			<a href={pathLink} target="_blank" rel="noreferrer">
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
				needLogin: subMenuItem.needLogin
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
				imgFromBannerImgUrl={
					subMenuItem.imgSource === defImgSourceType.bannerImgUrl
				}
			/>
			<ImgsBgRender
				className="List-bg"
				listImgUrl={subMenuItem.listBgImgUrl}
				imgFromBannerImgUrl={
					subMenuItem.imgSource === defImgSourceType.bannerImgUrl
				}
			/>
			<span>{displayText}</span>
			<div className="under">{t("lbl_underMaintenance")}</div>
		</button>
	);
};

const ImgsNpcRender = ({ listImgUrl, className, imgFromBannerImgUrl }) => {
	if (typeof listImgUrl === "string" || listImgUrl instanceof String)
		return (
			<img
				className={className}
				alt="listImgUrl"
				src={
					imgFromBannerImgUrl
						? `${config.bannerImgUrl}/img/${listImgUrl}`
						: `../../styles/img/${listImgUrl}`
				}
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
				src={require(`../../styles/img/${listImgUrl}`)}
			/>
		);

	if (Array.isArray(listImgUrl) && listImgUrl.length)
		return listImgUrl.map(imgUrl => (
			<img
				key={`imgs-key-${imgUrl}`}
				alt="listImgUrl"
				className={className}
				src={require(`../../styles/img/${imgUrl}`)}
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
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};

ImgsNpcRender.defaultProps = {
	imgFromBannerImgUrl: false
};

ImgsNpcRender.propTypes = {
	listImgUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
		.isRequired,
	className: PropTypes.string.isRequired,
	imgFromBannerImgUrl: PropTypes.bool
};

ImgsBgRender.propTypes = {
	listImgUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
		.isRequired,
	className: PropTypes.string.isRequired
};

export default SubMenuMultiple;
