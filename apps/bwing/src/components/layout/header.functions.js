import React, { useContext, lazy, Suspense, useState } from "react";
import { Link, navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { yuriTrack } from "@ailab-desktop/common";
import {
	userInfoContext,
	popBoxContext,
	msgCountContext
} from "../common/context";
import path from "../../router";
import { LOGOUT } from "../../service/auth";
import { defPopBoxType } from "../common/defPopBoxType";

import MsgPopup from "./msgPopup";
import useShieldCheck from "../hook/useShieldCheck";
import LanguageDropDown from "./header.langDropdown";
import { defPageClubImg } from "../vip/vip.def";
import useClickOutside from "../hook/useClickOutSide";

export default () => {
	const { userInfo } = useContext(userInfoContext);

	return userInfo.isLogin === true ? (
		<AfterLogin />
	) : (
		<BeforeLogin langId={userInfo.langId} />
	);
};

const BeforeLogin = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);

	const clickJoin = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Join,
			langId: userInfo?.langId
		});
	};

	const clickLogin = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	return (
		<>
			<a
				target="_blank"
				rel="noopener noreferrer"
				className="downloadbtn "
				href={`/${userInfo.langId}/${path.appDownload.root}`}>
				{t("lbl_APP_DOWNLOAD")}
			</a>
			<LanguageDropDown />
			<div className="btnGroup">
				<button className="blue btn-round login" onClick={clickLogin}>
					{t("lbl_Login")?.toUpperCase()}
				</button>
				<button className="orange btn-round join" onClick={clickJoin}>
					{t("lbl_JoinNow")?.toUpperCase()}
				</button>
				<Link
					to={`/${userInfo.langId}/${path.forgetPassword.root}`}
					className="forgetbtn">
					{t("lbl_ForgetPsw")}？
				</Link>
			</div>
		</>
	);
};

const Wallet = lazy(() => import("./header.wallet"));
const AfterLogin = () => {
	const { msgCount } = useContext(msgCountContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { t } = useTranslation();
	const { deleteShieldData } = useShieldCheck();
	const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);
	const ref = useClickOutside(() => setIsOpenSideMenu(false));

	const handleLogout = () => {
		LOGOUT(() => {
			const ClickClose = () => {
				if (
					window.location.pathname.includes(
						`/${userInfo.langId}/${path.resetPassword.root}`
					)
				) {
					navigate(`/${userInfo.langId}`);
				}

				setPopBox({ isOpen: false });
				setUserInfo(prevState => ({
					isLogin: false,
					langId: prevState.langId,
					kickout: true,
					willLogout: true
				}));
				deleteShieldData();
			};

			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.LogoutHint,
				content: t("msg_loggedout"),
				btnBar: (
					<div className="btnGroup">
						<button className="btn-cancel" onClick={ClickClose}>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		});
	};

	const handleDepositClick = () => {
		yuriTrack("AddToCart");
		navigate(`/${userInfo.langId}/${path.deposit.root}`);
	};

	const userLevelImgInfo = userInfo.userLevel
		? defPageClubImg[userInfo.userLevel - 1]
		: null;

	return (
		<>
			<div className="btnGroup">
				{/* <Link
					to={`/${userInfo.langId}/${path.transferFunds.root}`}
					className="blue">
					{t("lbl_TransferFunds").toUpperCase()}
				</Link> */}
				<button
					onClick={handleDepositClick}
					className="orange btn-retangle">
					{t("lbl_Deposit").toUpperCase()}
				</button>
			</div>
			<div
				className="memberbtn"
				onClick={() =>
					navigate(`/${userInfo.langId}/${path.profile.root}`)
				}>
				<img src={userLevelImgInfo?.img} alt={userLevelImgInfo?.alt} />
				<button>{userInfo.userName}</button>
			</div>
			<Suspense fallback={<></>}>
				<Wallet langId={userInfo.langId} i18n={t} />
			</Suspense>

			<Link
				className={`messagebtn icon-message ${
					msgCount > 0 ? "active" : ""
				}`}
				to={`/${userInfo.langId}/${path.message.root}`}>
				{msgCount > 0 && <div className="number">{msgCount}</div>}
				<MsgPopup userInfo={userInfo} />
			</Link>
			<div
				className={`sidemenubtn icon-menu ${classNames({
					active: msgCount > 0 && !isOpenSideMenu
				})}`}
				onClick={() => setIsOpenSideMenu(!isOpenSideMenu)}>
				{isOpenSideMenu && (
					<div className="sidemenu-content" ref={ref}>
						<div
							className="sidemenu-item"
							onClick={() =>
								navigate(
									`/${userInfo.langId}/${path.profile.root}`
								)
							}>
							{t("lbl_Profile")}
						</div>
						<div
							className="sidemenu-item"
							onClick={() =>
								navigate(
									`/${userInfo.langId}/${path.deposit.root}`
								)
							}>
							{t("lbl_Deposit")}
						</div>
						<div
							className="sidemenu-item"
							onClick={() =>
								navigate(
									`/${userInfo.langId}/${path.withdrawal.root}`
								)
							}>
							{t("lbl_Withdrawal")}
						</div>
						<div
							className="sidemenu-item"
							onClick={() =>
								navigate(
									`/${userInfo.langId}/${path.depositHistory.root}`
								)
							}>
							{t("lbl_History")}
						</div>
						<div
							className={`sidemenu-item ${classNames({
								active: msgCount > 0
							})}`}
							onClick={() =>
								navigate(
									`/${userInfo.langId}/${path.message.root}`
								)
							}>
							{t("lbl_Message")}
						</div>
						<div className="sidemenu-item" onClick={handleLogout}>
							{t("lbl_Logout")}
						</div>
						<div className="sidemenu-item">
							<LanguageDropDown />
						</div>
					</div>
				)}
			</div>
		</>
	);
};
