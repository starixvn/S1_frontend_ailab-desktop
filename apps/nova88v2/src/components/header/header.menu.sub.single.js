import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, navigate } from "@reach/router";
import QRCode from "qrcode.react";
import defPopBoxType from "../common/defPopBoxType";
import { popBoxContext } from "../common/context";
import { GET_OPEN_RULE, OPEN_IN_BLANK } from "../../service/enterPage";
import productList, { defTpGameType } from "../../datas/productList";
import path from "../../router";
import { defMenuLinks } from "./header.menu.def";
import { cloudImgUrl } from "../../config";
import useAppDownLoad from "../appDownload/useAppDownLoad";

const SubMenuSingle = ({
	subClassName,
	menuKey,
	userInfo,
	t,
	maintainList
}) => {
	const { setPopBox } = useContext(popBoxContext);
	const { appLinkDatas } = useAppDownLoad();
	const pathLink = defMenuLinks[menuKey].path;

	const showLoginPopBox = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	if (menuKey === "poker") {
		const rule = GET_OPEN_RULE(
			userInfo.langId,
			productList.poker.tpId,
			null
		);
		const linkToPokerWeb = () => {
			userInfo.isLogin
				? OPEN_IN_BLANK(rule.entPageUrl, rule.windowKey)
				: showLoginPopBox();
		};

		const linkToPokerRoot = () => {
			userInfo.isLogin
				? navigate(`/${userInfo.langId}/${path.oneGame.root}`)
				: showLoginPopBox();
		};

		const isPokerMaintain = maintainList?.some(
			mt =>
				mt.tpId === productList.poker.tpId &&
				(mt.tpGameType === productList.poker.tpGameType ||
					mt.tpGameType === defTpGameType.All)
		);

		return (
			<div className={`${subClassName}${isPokerMaintain ? " um" : ""}`}>
				<div>
					<div>{t("lbl_BLUFF_RAISE_OR_CALL")}</div>
					<div>{t("lbl_KEEP_CALM_GO_ALL_IN")}</div>
					{isPokerMaintain ? (
						<div className="under">{t("lbl_underMaintenance")}</div>
					) : null}
					<div className="btnGroup">
						<button className="lightblue" onClick={linkToPokerWeb}>
							{t("lbl_POKER_NOW")}
						</button>
						<button className="lightblue" onClick={linkToPokerRoot}>
							{t("lbl_DOWNLOAD_APP_NOW")}
						</button>
					</div>
				</div>
			</div>
		);
	}
	if (menuKey === "vip") {
		return (
			<div className={subClassName}>
				<div>
					<div>{t("lbl_VIP_CLUB")}</div>
					<div>
						<span className="txt-orange">
							{t("lbl_EARN_EXCLUSIVE_VIP_BENEFIT")}
						</span>
					</div>
					<div className="btnGroup">
						<Link
							className="lightblue"
							to={
								userInfo.isLogin
									? `/${userInfo.langId}/${pathLink}`
									: `/${userInfo.langId}/${path.join.root}`
							}>
							{t("lbl_JOIN_US_NOW")}
						</Link>
					</div>
				</div>
			</div>
		);
	}
	if (menuKey === "ranking") {
		return (
			<div className={subClassName}>
				<div>
					<div>{t("lbl_THE_WORLD_CLASS_LEADERBOARD")}</div>
					<div>{t("lbl_Bring_you_the_best_experience")}</div>
				</div>
			</div>
		);
	}
	if (menuKey === "appDownload") {
		const andriodDownloadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";
		const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";

		return (
			<Link
				className={subClassName}
				to={`/${userInfo.langId}/${path.appDownload.root}`}>
				<div>
					<div className="txt-orange">NOVA88</div>
					<div>{t("lbl_AppBannerText")}</div>
					<div className="appListQrcode">
						{IOSDownloadUrl && (
							<div>
								<QRCode
									value={IOSDownloadUrl}
									renderAs="svg"
									size={112}
									includeMargin={true}
								/>
								<img
									src={`${cloudImgUrl}/SiteSkin/img/appdownload_ios.jpg`}
									alt="IOS Download"
								/>
							</div>
						)}
						{andriodDownloadUrl && (
							<div>
								<QRCode
									value={andriodDownloadUrl}
									renderAs="svg"
									size={112}
									includeMargin={true}
								/>
								<img
									src={`${cloudImgUrl}/SiteSkin/img/appdownload_and.jpg`}
									alt="Andriod Download"
								/>
							</div>
						)}
					</div>
				</div>
			</Link>
		);
	}

	if (menuKey === "promotion") {
		return (
			<div className={subClassName}>
				<div>
					<div className="txt-orange">
						{t("lbl_Promos_wording_title")}
					</div>
					<div>{t("lbl_Promos_wording_desc")}</div>
					<div className="btnGroup">
						<Link
							to={`/${userInfo.langId}/${path.promotion.root}`}
							className="lightblue">
							{t("lbl_ClaimNow")}
						</Link>
					</div>
				</div>
			</div>
		);
	}
	return <div />;
};

SubMenuSingle.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	t: PropTypes.func.isRequired,
	menuKey: PropTypes.string.isRequired,
	subClassName: PropTypes.string.isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default SubMenuSingle;
