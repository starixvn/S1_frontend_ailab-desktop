import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, navigate } from "gatsby";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
	userInfoContext,
	popBoxContext,
	msgCountContext
} from "../common/context";
import path from "../../router";
import DropdownHeader from "../common/dropdown.headerLink";
import Wallet from "./header.wallet";
import {
	defEventIcon,
	defEventPeriod,
	showEventIcon
} from "../common/eventIcon";
import { LOGIN } from "../../service/auth";
import { setCookie } from "../common/common";
import { SiteInfo } from "../../config";
import { HeaderLogin } from "./header.login";
import usePopBox from "../hook/usePopBox";
import MsgPopup from "./msgPopup";
import allowedCurrencyList from "../../datas/allowedCurrencyList";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const { msgCount } = useContext(msgCountContext);
	const { t } = useTranslation();

	return userInfo.isLogin === true ? (
		<AfterLogin t={t} userInfo={userInfo} msgCount={msgCount} />
	) : (
		<BeforeLogin t={t} />
	);
};

const initValue = {
	username: "",
	password: ""
};

const BeforeLogin = ({ t }) => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const [userValue, setUserValue] = useState(initValue);
	const [showPsw, setShowPsw] = useState(false);
	const isMountedRef = useRef(null);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const showPswHandler = () => {
		setShowPsw(!showPsw);
	};

	const EditField = (col, e) => {
		let val = e.target.value;

		if (col === "username") {
			val = val.replace(/[\W]/g, "");
		}

		setUserValue(prev => ({ ...prev, [col]: val }));
	};

	const checkValue = (col, val) => {
		let checked = true;
		let msg = "";

		if (val === "") {
			msg =
				col === "username"
					? t("msg_UsernameReq")
					: t("msg_PasswordReq");
			checked = false;
		} else if (col === "username" && (val.length < 6 || val.length > 18)) {
			msg = `${t("lbl_Username")} ${t("msg_UsernameLength")}`;
			checked = false;
		}

		if (!checked) {
			errorPopBox(msg);
		}

		return checked;
	};

	const handleLogin = async e => {
		e.preventDefault();

		const checkAll =
			checkValue("username", userValue.username) &&
			checkValue("password", userValue.password);

		if (checkAll) {
			await LOGIN({
				userName: userValue.username,
				password: userValue.password,
				langId: userInfo.langId
			}).then(res => {
				if (res.errorCode === 0) {
					setCookie(SiteInfo.langCookie, res.userData.langId);
					setUserInfo(() => ({
						...res.userData,
						isLogin: res.isLogin
					}));
					setPopBox({ isOpen: false });
					navigate(`/${userInfo.langId}`);
				} else if (
					res.errorCode === 1101 ||
					res.errorCode === 1102 ||
					res.errorCode === 9000
				) {
					if (isMountedRef.current) {
						errorPopBox(res.message, res.errorCode);
					}
				} else if (res.errorCode === 1001) {
					errorPopBox(res.message, res.errorCode);
				}
			});
		}
	};

	return (
		<HeaderLogin
			showPswHandler={showPswHandler}
			showPsw={showPsw}
			EditField={EditField}
			handleLogin={handleLogin}
			userValue={userValue}
			langId={userInfo.langId}
			currencyId={userInfo?.currencyId}
			path={path}
			t={t}
		/>
	);
};

BeforeLogin.propTypes = {
	t: PropTypes.func.isRequired
};

const defCashierLinks = [
	{
		displayKey: "lbl_TransferFunds",
		href: path.transferFunds.root
	},
	{
		displayKey: "lbl_Withdrawal",
		href: path.withdrawal.root
	},
	{
		displayKey: "lbl_History",
		href: path.history.root
	},
	{
		displayKey: "lbl_Deposit",
		href: path.deposit.root
	}
];

const AfterLogin = ({ t, userInfo, msgCount }) => {
	const defSettingLinks = [
		{
			displayKey: "lbl_Profile",
			href: path.profile.root
		},
		{
			displayKey: "lbl_BankInfo",
			href: path.bankInfo.root,
			allowCurrencies: allowedCurrencyList.bankCard
		},
		{
			displayKey: "lbl_CryptoWallet",
			href: path.cryptoWallet.root
		},
		{
			displayKey: "lbl_ReferFriends",
			href: path.referral.root,
			eventIcons: [
				showEventIcon({
					icon: defEventIcon.new,
					period: defEventPeriod.referral
				})
			]
		},
		{
			displayKey: "lbl_ChangePassword",
			href: path.changePassword.root
		}
	];

	const navMenu = defCashierLinks.map(item => (
		<Link key={item.displayKey} to={`/${userInfo.langId}/${item.href}`}>
			<span>{t(item.displayKey)}</span>
		</Link>
	));

	const filteredSettingLinks = defSettingLinks.filter(
		el =>
			!el?.allowCurrencies ||
			el?.allowCurrencies.includes(userInfo.currencyId)
	);

	return (
		<>
			{navMenu}
			<Wallet i18n={t} />
			<DropdownHeader
				mainKey="header-settingLink"
				langId={userInfo.langId}
				userLevel={userInfo.userLevel}
				className={`memberfile${
					userInfo.userLevel ? "" : " icon icon-member"
				}`}
				subClassName="submenu"
				i18n={t}
				options={filteredSettingLinks}
				placeholder={userInfo.userName}
			/>
			<Link
				className={`icon icon-email${msgCount > 0 ? " active" : ""}`}
				to={`/${userInfo.langId}/${path.message.root}`}
			>
				<MsgPopup userInfo={userInfo} />
			</Link>
		</>
	);
};

AfterLogin.propTypes = {
	t: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	msgCount: PropTypes.number.isRequired
};
