import classNames from "classnames";
import { Link, navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import React, { useContext, lazy, Suspense, useState, useEffect } from "react";
import {
	userInfoContext,
	popBoxContext,
	msgCountContext
} from "../common/context";
import path from "../../router";
import { LOGIN } from "../../service/auth";
import { defPopBoxType } from "../common/popBox";
import MsgPopup from "./msgPopup";
import useShieldCheck from "../hook/useShieldCheck";
import { defPageClubImg } from "../vip/vip.def";
import useDepositWithdrawTracker from "../hook/useDepositWithdrawTracker";

export default () => {
	const { userInfo } = useContext(userInfoContext);

	return userInfo.isLogin === true ? <AfterLogin /> : <BeforeLogin />;
};

const BeforeLogin = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const {
		userInfo: { langId },
		setUserInfo
	} = useContext(userInfoContext);
	const { handleNotification } = useDepositWithdrawTracker();

	const { getShieldData, saveShieldData } = useShieldCheck();

	const [userValue, setUserValue] = useState({ username: "", password: "" });

	const clickJoin = () => {
		navigate(`/${langId}/${path.join.root}`);
	};

	const editField = (col, e) => {
		let val = e.target.value;

		if (col === "username") val = val.replace(/[\W_]/g, "");
		setUserValue(prev => ({ ...prev, [col]: val }));
	};

	const checkValue = (col, val) => {
		let checked = true;

		if (val === "") {
			checked = false;

			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ErrorMsg,
				message:
					col === "username"
						? t("msg_UsernameReq")
						: t("msg_PasswordReq"),
				btnBar: (
					<div className="btnGroup">
						<button
							className="btn-cancel"
							onClick={() => setPopBox({ isOpen: false })}
						>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}

		return checked;
	};

	const handleLogin = async e => {
		e.preventDefault();

		const checkAll =
			checkValue("username", userValue.username) &&
			checkValue("password", userValue.password);

		if (checkAll) {
			const { errorCode, message, userData, isLogin } = await LOGIN({
				userName: userValue.username,
				password: userValue.password,
				langId
			});

			if (errorCode === 0) {
				setUserInfo(() => ({
					...userData,
					isLogin
				}));
				setPopBox({ isOpen: false });
				navigate(`/${langId}`);
				saveShieldData();

				// 獲取使用者財務通知設定
				const { financeNotification, soundEffects } = userData ?? {};
				handleNotification(financeNotification, soundEffects);
			} else if (errorCode !== 0 && isLogin === false) {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.ErrorMsg,
					errorCode,
					message,
					btnBar: (
						<div className="btnGroup">
							<button
								className="btn-cancel"
								onClick={() => setPopBox({ isOpen: false })}
							>
								{t("lbl_Close")}
							</button>
						</div>
					)
				});
			}
		}
	};

	useEffect(() => {
		getShieldData();
	}, []);

	return (
		<>
			<div className="username">
				<input
					placeholder={t("lbl_Username")}
					value={userValue.username}
					onChange={e => editField("username", e)}
					onKeyPress={e => {
						if (e.key === "Enter") handleLogin(e);
					}}
				/>
				<input
					type="password"
					placeholder={t("lbl_Password")}
					value={userValue.password}
					onChange={e => editField("password", e)}
					onKeyPress={e => {
						if (e.key === "Enter") handleLogin(e);
					}}
				/>
				<Link
					to={`/${langId}/${path.forgetPassword.root}`}
					className="forgot"
				>
					{t("lbl_ForgetPassword")}
				</Link>
			</div>
			<button className="login" onClick={handleLogin}>
				{t("lbl_Login")}
			</button>
			<button className="join" onClick={clickJoin}>
				{t("lbl_JoinNow")}
			</button>
		</>
	);
};

const Wallet = lazy(() => import("./header.wallet"));
const Profile = lazy(() => import("./header.profile"));

const AfterLogin = () => {
	const { msgCount } = useContext(msgCountContext);
	const {
		userInfo: { langId, userLevel }
	} = useContext(userInfoContext);
	const { t } = useTranslation();

	const {
		img: vipImg,
		alt: vipAlt,
		className: vipClassName
	} = userLevel ? defPageClubImg[userLevel - 1] : {};

	return (
		<>
			<div className={`profile-icon ${vipClassName}`}>
				<Link to={`/${langId}/${path.profile.root}`}>
					<img className={vipClassName} src={vipImg} alt={vipAlt} />
				</Link>
			</div>
			<Suspense fallback={null}>
				<Profile />
			</Suspense>
			<Link
				to={`/${langId}/${path.message.root}`}
				className={classNames("icon-email", { active: msgCount > 0 })}
			>
				<MsgPopup />
			</Link>

			<Suspense fallback={null}>
				<Wallet langId={langId} i18n={t} />
			</Suspense>

			<Link
				to={`/${langId}/${path.deposit.root}`}
				className="home-deposit"
			>
				<i className="icon-header-deposit" />
				{t("lbl_Deposit")}
			</Link>
			<Link
				to={`/${langId}/${path.appDownload.root}`}
				className="appDownload"
			>
				<i className="icon-mobile" />
				APP
			</Link>
		</>
	);
};
