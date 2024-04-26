import classNames from "classnames";
import { Link, navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import React, { useState, useContext } from "react";
import {
	useSetLanguageMutation,
	useGetCustVIPProgressQuery
} from "@ailab-desktop/service";
import path from "../../router";
import { bannerImgUrl, langCookie } from "../../config";
import { LOGOUT } from "../../service/auth";
import { getNewLanguagePath } from "../../service/language";
import usePopBox from "../hook/usePopBox";
import useClickOutSide from "../hook/useClickOutSide";
import useShieldCheck from "../hook/useShieldCheck";
import { userInfoContext, popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import { setCookie, number_format } from "../common/common";
import { defPageClubImg } from "../vip/vip.def";

const Profile = () => {
	const { t } = useTranslation();

	const {
		userInfo: { langId, userName },
		setUserInfo
	} = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const { errorPopBox } = usePopBox();
	const { deleteShieldData } = useShieldCheck();

	const [isActive, setIsActive] = useState(false);

	const { data: { data: custVIPProgress } = {} } = useGetCustVIPProgressQuery(
		null,
		{ refetchOnMountOrArgChange: true }
	);

	const [setUserLanguage] = useSetLanguageMutation();

	const ref = useClickOutSide(() => setIsActive(false));

	const setLanguage = async ({ newLangId }) => {
		if (langId === newLangId) return;

		try {
			const { errorCode, message } = await setUserLanguage({
				langId: newLangId
			}).unwrap();

			if (errorCode === 0) {
				const newPath = getNewLanguagePath(newLangId);

				navigate(newPath);
				setCookie(langCookie, newLangId);
			} else {
				errorPopBox(message || "error", errorCode);
			}
		} catch (error) {
			errorPopBox(error);
		}
	};

	const handleLogout = () => {
		LOGOUT(() => {
			const ClickClose = () => {
				if (
					window.location.pathname.includes(
						`/${langId}/${path.resetPassword.root}`
					)
				)
					navigate(`/${langId}`);

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

	// 這邊指的是upDeposit是否＝＝null 因為鑽石還有goal123級別都是null 所以這邊要注意

	const isVipLevelHighest = custVIPProgress?.upDeposit === null;

	// 鑽石等級 另外寫出來

	const isVipDiamondLevel = custVIPProgress?.currentVipLevel === 5;

	// goal123等級

	const isVipGoal123Level = custVIPProgress?.currentVipLevel === 6;

	const {
		displayKey: currentVipDisplayKey,
		className: currentVipClassName,
		img: currentVipImg,
		alt: currentVipAlt
	} = custVIPProgress
		? defPageClubImg[custVIPProgress?.currentVipLevel - 1]
		: {};

	const {
		displayKey: nextVipDisplayKey,
		className: nextVipClassName,
		img: nextVipImg,
		alt: nextVipAlt
	} = custVIPProgress && !isVipLevelHighest
		? defPageClubImg[custVIPProgress?.currentVipLevel]
		: {};

	const vipProgress = Math.floor(
		(custVIPProgress?.actualDeposit / custVIPProgress?.upDeposit) * 100
	);

	return (
		<div
			ref={ref}
			className={classNames("memberfile", { active: isActive })}
			onClick={() => setIsActive(prev => !prev)}
		>
			<span>Hey,</span>
			<button className="user-id">{userName}</button>
			<div className={classNames("home-profile", { active: isActive })}>
				{custVIPProgress && (
					<div className="home-profile-top">
						<div className={`user-current ${currentVipClassName}`}>
							{t("lbl_Current")}:
							<span>{t(currentVipDisplayKey)}</span>
						</div>
						{isVipLevelHighest ? (
							<>
								<div className="profile-extra">
									{isVipDiamondLevel && (
										<img
											src={`${bannerImgUrl}/desktop/img/vip/vip5.png`}
											alt="vip05"
										/>
									)}
									{isVipGoal123Level && (
										<img
											src={`${bannerImgUrl}/desktop/img/vip/vip6.png`}
											alt="vip06"
										/>
									)}
									{isVipDiamondLevel && (
										<p>{t("lbl_WaitForInvitation")}</p>
									)}
									{isVipGoal123Level && (
										<p>{t("Label_Vip_HighestMsg")}</p>
									)}
								</div>
								<Link
									to={`/${langId}/${path.vip.root}`}
									className="milestone goal123"
								>
									{t("lbl_MilestoneInfo")}
									<i className="icon-dropdown" />
								</Link>
							</>
						) : (
							<>
								<div className="user-next">
									{t("lbl_Next")}:
									<span>{t(nextVipDisplayKey)}</span>
								</div>
								<div className="profile-vip">
									<img
										className={currentVipClassName}
										src={currentVipImg}
										alt={currentVipAlt}
									/>
									<div className="progress">
										<div
											className="progress-bar"
											style={{
												width: `${Math.min(
													vipProgress,
													100
												)}%`
											}}
										/>
									</div>
									<img
										className={nextVipClassName}
										src={nextVipImg}
										alt={nextVipAlt}
									/>
								</div>
								<div className="progress-number">
									<span>
										{number_format({
											number: custVIPProgress?.actualDeposit,
											formatRequired: true,
											digits: 0
										})}
									</span>
									/
									{number_format({
										number: custVIPProgress?.upDeposit,
										formatRequired: true,
										digits: 0
									})}
								</div>
								<Link
									to={`/${langId}/${path.vip.root}`}
									className="milestone"
								>
									{t("lbl_MilestoneInfo")}
									<i className="icon-dropdown" />
								</Link>
							</>
						)}
					</div>
				)}
				<div className="home-profile-bottom">
					<Link to={`/${langId}/${path.profile.root}`}>
						<i className="icon-profile" />
						{t("lbl_Profile")}
					</Link>
					<Link to={`/${langId}/${path.bankInfo.root}`}>
						<i className="icon-bank" />
						{t("lbl_BankInfo")}
					</Link>
					<Link to={`/${langId}/${path.cryptoWallet.root}`}>
						<i className="icon-crypto" />
						{t("lbl_CryptoWallet")}
					</Link>
					<Link to={`/${langId}/${path.referral.root}`}>
						<i className="icon-referral" />
						{t("lbl_ReferFriends")}
					</Link>
					<Link to={`/${langId}/${path.changePassword.root}`}>
						<i className="icon-change-pwd" />
						{t("lbl_ChangePassword")}
					</Link>
					<div className="countryList">
						<button
							className="flag en"
							onClick={() => setLanguage({ newLangId: "en" })}
						>
							English
						</button>
						<button
							className="flag vn"
							onClick={() => setLanguage({ newLangId: "vn" })}
						>
							Tiếng Việt
						</button>
					</div>
					<button onClick={handleLogout}>
						<i className="icon-logout" />
						{t("lbl_Logout")}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
