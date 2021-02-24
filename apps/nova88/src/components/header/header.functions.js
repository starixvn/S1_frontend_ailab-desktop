import React, { useContext } from "react";
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

export default () => {
	const { userInfo } = useContext(userInfoContext);

	return userInfo.isLogin === true ? (
		<AfterLogin />
	) : (
		<BeforeLogin langId={userInfo.langId} />
	);
};

const BeforeLogin = ({ langId }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);

	const clickJoin = () => {
		navigate(`/${langId}/${path.join.root}`);
	};

	const clickLogin = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	return (
		<>
			<button className="join" onClick={clickJoin}>
				{t("lbl_JoinNow")}
			</button>
			<button className="login" onClick={clickLogin}>
				{t("lbl_Login")}
			</button>
		</>
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

const AfterLogin = () => {
	const { msgCount } = useContext(msgCountContext);
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();

	const navMenu = defCashierLinks.map(item => (
		<Link key={item.displayKey} to={`/${userInfo.langId}/${item.href}`}>
			<span>{t(item.displayKey)}</span>
		</Link>
	));

	// &&&&&&&&&&&&&&&&&&& need to update currencyId ↓↓
	const isCryptoCurrency = userInfo.currencyId === 2;

	const defSettingLinks = [
		{
			displayKey: "lbl_Profile",
			href: path.profile.root
		},
		{
			displayKey: isCryptoCurrency ? "lbl_Crypto_Wallet" : "lbl_BankInfo",
			href: isCryptoCurrency ? path.cryptoWallet.root : path.bankInfo.root
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
