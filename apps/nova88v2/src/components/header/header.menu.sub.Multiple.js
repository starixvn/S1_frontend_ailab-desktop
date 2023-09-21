/* eslint-disable consistent-return */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { defMenuLinks, defMenuType } from "./header.menu.def";
import { bannerImgUrl } from "../../config";
import { defTpGameType } from "../../datas/productList";
import { popBoxContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import { defEventIcon } from "../common/eventIcon";

const SubMenuMultiple = ({
	menuKey,
	subMenuItem,
	clickItem,
	userInfo,
	t,
	maintainList,
	showLoginPopBox
}) => {
	const { setPopBox } = useContext(popBoxContext);
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

	const SubMenuListBGLeftImg = `${bannerImgUrl}/desktop/img/subMenu-Wrapper-ListBG-left.png`;
	const SubMenuListBGRightImg = `${bannerImgUrl}/desktop/img/subMenu-Wrapper-ListBG-right.png`;
	const SubMenuListBGCenterImg = `${bannerImgUrl}/desktop/img/subMenu-Wrapper-ListBG-center.png`;

	if (subMenuItem.parameter) {
		params = Object.keys(subMenuItem.parameter).map(
			keys => `${keys}=${subMenuItem.parameter[keys]}`
		);
	}
	const _urlParams = params !== null ? `?${params.join("&")}` : "";

	let className = subMenuItem.className || "";
	let style = {};

	if (isInMaintain) {
		className += ` active`;
		style = { pointerEvents: "none" };
	}

	const pathLink = subMenuItem.path || defMenuLinks[menuKey].path;

	// * 4.0 單一圖片來源
	const npmImg = `${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/${
		menuKey === "home" ? "" : "dropdown/"
	}${menuKey === "home" ? "" : `${menuKey}/`}${subMenuItem?.listNpcImgUrl}`;

	const content = (
		<>
			{/* // * nova88 3.0 的多圖層渲染元件，註解留存 */}
			{/* <img
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
			/> */}

			{subMenuItem?.eventIcons?.includes(defEventIcon.new) && (
				<div className="new-icon">NEW</div>
			)}

			{subMenuItem?.listNpcImgUrl && (
				<img className="List-npc" src={npmImg} alt="" />
			)}
			<span>{displayText}</span>
			<div className="under">{t("lbl_underMaintenance")}</div>
		</>
	);

	if (subMenuItem?.noShow) return;

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
		if (subMenuItem?.noPlay) {
			return (
				<a
					className={className}
					style={style}
					onClick={() => {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.Success,
							icon: "icon icon-bell",
							description: (
								<div style={{ color: "red" }}>
									{t("lbl_InaccessibleWithoutPermission")}
								</div>
							),
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={() => {
											setPopBox({ isOpen: false });
										}}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}}>
					{content}
				</a>
			);
		}
		return (
			<a
				className={className}
				style={style}
				href={`/${userInfo.langId}/${pathLink}${_urlParams}`}>
				{content}
			</a>
		);
	}

	if (subMenuItem.menuType === defMenuType.DirectUrl) {
		if (subMenuItem?.noPlay) {
			return (
				<a
					onClick={() => {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.Success,
							icon: "icon icon-bell",
							description: (
								<div style={{ color: "red" }}>
									{t("lbl_InaccessibleWithoutPermission")}
								</div>
							),
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={() => {
											setPopBox({ isOpen: false });
										}}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}}>
					{content}
				</a>
			);
		}
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
			onClick={
				subMenuItem.noPlay
					? () => {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.Success,
								icon: "icon icon-bell",
								description: (
									<div style={{ color: "red" }}>
										{t("lbl_InaccessibleWithoutPermission")}
									</div>
								),
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
											onClick={() => {
												setPopBox({ isOpen: false });
											}}>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
					  }
					: clickItem.bind(this, {
							tpId: subMenuItem.tpId,
							gameId: subMenuItem.gameId,
							path: subMenuItem.path,
							needLogin: subMenuItem.needLogin,
							menuType: subMenuItem.menuType,
							tpGameType: subMenuItem.tpGameType,
							betType: subMenuItem?.betType
					  })
			}>
			{/* // nova88 4.0 改為 單圖渲染方式  */}
			{content}
		</button>
	);
};

const ImgsNpcRender = ({ listImgUrl, className }) => {
	if (typeof listImgUrl === "string" || listImgUrl instanceof String)
		return (
			<img
				className={className}
				alt="listImgUrl"
				src={`${bannerImgUrl}/desktop/img/${listImgUrl}`}
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
				src={`${bannerImgUrl}/desktop/img/${listImgUrl}`}
			/>
		);

	if (Array.isArray(listImgUrl) && listImgUrl.length)
		return listImgUrl.map(imgUrl => (
			<img
				key={`imgs-key-${imgUrl}`}
				alt="listImgUrl"
				className={className}
				src={`${bannerImgUrl}/desktop/img/${imgUrl}`}
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
