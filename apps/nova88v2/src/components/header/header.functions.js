import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, navigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import {
	userInfoContext,
	popBoxContext,
	msgCountContext
} from "../common/context";
import path from "../../router";
import DropdownHeader from "../common/dropdown.headerLink";
import Wallet from "./header.wallet";
// import { defPopBoxType } from "../common/popBox";
import {
	defEventIcon,
	defEventPeriod,
	showEventIcon
} from "../common/eventIcon";
import defPopBoxType from "../common/defPopBoxType";
import { LOGIN } from "../../service/auth";
import { setCookie } from "../common/common";
import { SiteInfo } from "../../config";
import { HeaderLogin } from "./header.login";
import usePopBox from "../hook/usePopBox";

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

const initTip = {
	username: { checked: null, msg: "" },
	password: { checked: null, msg: "" }
};

const BeforeLogin = ({ t }) => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const [userValue, setUserValue] = useState(initValue);
	// const { popBox, setPopBox } = useContext(popBoxContext);
	const [tip, setTip] = useState(initTip);
	const [showPsw, setShowPsw] = useState(false);
	const isMountedRef = useRef(null);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox, closePopBox } = usePopBox();

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

		setUserValue(prev => {
			return { ...prev, [col]: val };
		});
	};

	const checkValue = (col, e) => {
		const val = e.target.value;

		let checked = true;
		let msg = "";

		if (val === "") {
			msg =
				col === "username"
					? t("msg_UsernameReq")
					: t("msg_PasswordReq");
			checked = false;
		}

		setTip(prev => {
			return {
				...prev,
				[col]: {
					checked,
					msg
				}
			};
		});
	};

	const handleLogin = async e => {
		e.preventDefault();

		const checked = userValue.username && userValue.password;
		if (checked) {
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
					navigate(`/${userInfo.langId}/${path.deposit.root}`);
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
		} else {
			const usernameMsg =
				userValue.username === "" ? "msg_UsernameReq" : null;
			const passwordMsg =
				userValue.password === "" ? "msg_PasswordReq" : null;
			if (usernameMsg !== null || passwordMsg !== null) {
				errorPopBox(t(usernameMsg ?? passwordMsg));
			}
		}
	};

	return (
		<HeaderLogin
			showPswHandler={showPswHandler}
			showPsw={showPsw}
			EditField={EditField}
			checkValue={checkValue}
			handleLogin={handleLogin}
			userValue={userValue}
			langId={userInfo.langId}
			path={path}
			t={t}
		/>
	);
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
		displayKey: "lbl_TransferHistory",
		href: path.transferHistory.root
	},
	{
		displayKey: "lbl_Financial",
		href: path.financial.root
	},
	{
		displayKey: "lbl_Deposit",
		href: path.deposit.root
	}
];

const defSettingLinks = [
	{
		displayKey: "lbl_Profile",
		href: path.profile.root
	},
	{
		displayKey: "lbl_BankInfo",
		href: path.bankInfo.root
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

const AfterLogin = ({ t, userInfo, msgCount }) => {
	const navMenu = defCashierLinks.map(item => (
		<Link key={item.displayKey} to={`/${userInfo.langId}/${item.href}`}>
			<span>{t(item.displayKey)}</span>
		</Link>
	));

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
				options={defSettingLinks}
				placeholder={userInfo.userName}
			/>
			<Link
				className={`icon icon-email${msgCount > 0 ? " active" : ""}`}
				to={`/${userInfo.langId}/${path.message.root}`}
			/>
		</>
	);
};
