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
import Wallet from "./header.wallet";
import { LOGIN } from "../../service/auth";
import { setCookie } from "../common/common";
import { SiteInfo } from "../../config";
import { HeaderLogin } from "./header.login";
import usePopBox from "../hook/usePopBox";
import { HEADER_VIP_CLUB_IMG_URL_LIST } from "../vip/vip.def";
import ProfileInfo from "./profile-info";
import MsgPopup from "./msgPopup";

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
			val = val.replace(/[\W_]/g, "");
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

const AfterLogin = ({ t, userInfo, msgCount }) => {
	const vipClubImgUrl = HEADER_VIP_CLUB_IMG_URL_LIST[userInfo.userLevel - 1];
	return (
		<>
			{/* // * 幣別開放且擁有路徑 */}
			{vipClubImgUrl && (
				<Link
					className="memberinfo"
					to={`/${userInfo.langId}/${path.profile.root}`}
				>
					<img src={vipClubImgUrl} alt="img-vip" />
				</Link>
			)}

			<ProfileInfo />

			<div className="message active">
				<Link to={`/${userInfo.langId}/${path.message.root}`}>
					<img
						src="https://banner.0814media.net/desktop/img/4.0/message.png"
						alt=""
					/>
				</Link>
				{msgCount > 0 && <div className="message-text" />}

				<MsgPopup userInfo={userInfo} />
			</div>

			<div className="line" />

			<Wallet i18n={t} />

			<Link
				to={`/${userInfo.langId}/${path.deposit.root}`}
				className="deposit-btn"
			>
				{t("lbl_Deposit")}
			</Link>
		</>
	);
};

AfterLogin.propTypes = {
	t: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	msgCount: PropTypes.number.isRequired
};
