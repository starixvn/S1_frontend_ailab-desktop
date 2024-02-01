import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { useGetCustVIPProgressQuery } from "@ailab-desktop/service";
import { CurrenciesEnum } from "@ailab-desktop/common";
import { popBoxContext } from "../../common/context";
import ProfileInfoLangList from "./ProfileInfoLangList";
import path from "../../../router";
import defPopBoxType from "../../common/defPopBoxType";
import allowedCurrencyList from "../../../datas/allowedCurrencyList";
import { LOGOUT } from "../../../service/auth";
import { HEADER_VIP_LEVEL_INFO_LIST } from "../../vip/vip.def";
import {
	useAuth,
	useGetWithdrawalBlockSetting,
	WITHDRAWAL_BLOCK_SETTING_TYPE
} from "../../hook";
import VipLevel from "./VipLevel";

const defSettingLinks = [
	{
		displayKey: "lbl_Profile",
		href: path.profile.root,
		img: "https://banner.0814media.net/desktop/img/4.0/profile.png"
	},
	{
		displayKey: "lbl_BankInfo",
		href: path.bankInfo.root,
		allowCurrencies: allowedCurrencyList.bankCard,
		img: "https://banner.0814media.net/desktop/img/4.0/bankinfo.png",
		withdrawalSettingType: WITHDRAWAL_BLOCK_SETTING_TYPE.BankCard
	},
	{
		displayKey: "lbl_CryptoWallet",
		href: path.cryptoWallet.root,
		img: "https://banner.0814media.net/desktop/img/4.0/cryptowallet.png",
		withdrawalSettingType: WITHDRAWAL_BLOCK_SETTING_TYPE.Crypto
	},
	{
		displayKey: "lbl_ReferFriends",
		href: path.referral.root,
		img: "https://banner.0814media.net/desktop/img/4.0/referfriends.png"
	},
	{
		displayKey: "lbl_ChangePassword",
		href: path.changePassword.root,
		img: "https://banner.0814media.net/desktop/img/4.0/changepassword.png"
	}
];

const ProfileInfo = () => {
	const ref = useRef();
	const { userInfo, setUserInfo } = useAuth();
	const { setPopBox } = useContext(popBoxContext);
	const { t } = useTranslation();
	const [isActive, setIsActive] = useState();

	const { displayBankCard, displayCrypto } = useGetWithdrawalBlockSetting();

	const { data: { data: custVIPProgress } = {} } =
		useGetCustVIPProgressQuery(null);

	const toggle = () => {
		setIsActive(prev => !prev);
	};

	const handleLogout = () => {
		LOGOUT(() => {
			const clickClose = () => {
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
					willLogout: true,
					defaultLang: prevState.defaultLang,
					currencyId: CurrenciesEnum.MY
				}));
			};

			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.LogoutHint,
				content: t("msg_loggedout"),
				btnBar: (
					<div className="btnGroup">
						<button className="btn-check" onClick={clickClose}>
							OK
						</button>
					</div>
				)
			});
		});
	};

	const filteredSettingLinks = defSettingLinks.filter(
		({ allowCurrencies, withdrawalSettingType }) => {
			let isShowItem = allowCurrencies
				? allowCurrencies.includes(userInfo.currencyId)
				: true;

			if (withdrawalSettingType)
				isShowItem =
					withdrawalSettingType ===
					WITHDRAWAL_BLOCK_SETTING_TYPE.BankCard
						? displayBankCard
						: displayCrypto;

			return isShowItem;
		}
	);

	const vipLevelInfo = HEADER_VIP_LEVEL_INFO_LIST.find(
		item => item.level === userInfo?.userLevel
	);

	const onClickOutside = () => {
		setIsActive(false);
	};

	useEffect(() => {
		const handleClickOutside = event => {
			if (ref.current && !ref.current.contains(event.target)) {
				onClickOutside && onClickOutside();
			}
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [onClickOutside]);

	// * upDeposit = null 代表該會員已經是最高等級
	const isVipLevelHighest = custVIPProgress?.upDeposit === null;

	return (
		<div
			ref={ref}
			className={classNames("grade", vipLevelInfo?.dotClassName, {
				active: isActive
			})}
			onClick={toggle}
		>
			<a className="grade-text">{`${t("Label_General_Hello")},  ${
				userInfo.userName
			}`}</a>
			<div className="grade-color">
				<div className="dots" />
				<div className="gradecolor-text">
					{t(vipLevelInfo?.displayKey)}
				</div>
			</div>

			<div
				className={classNames("home-profile", {
					highest: isVipLevelHighest
				})}
			>
				{allowedCurrencyList.VIP.includes(userInfo.currencyId) && (
					<div className="home-profile-top">
						<VipLevel isVipLevelHighest={isVipLevelHighest} />
					</div>
				)}

				<div className="home-profile-bottom">
					{filteredSettingLinks.map(item => (
						<Link href={`/${userInfo.langId}/${item.href}`}>
							<img src={item.img} alt="" />

							{t(item.displayKey)}
						</Link>
					))}

					<ProfileInfoLangList />

					<button className="logout-btn" onClick={handleLogout}>
						<img
							src="https://banner.0814media.net/desktop/img/4.0/logout.png"
							alt=""
						/>
						{t("lbl_Logout")}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProfileInfo;
