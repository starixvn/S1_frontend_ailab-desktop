import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import useHandleLineLogin, { defType } from "../hook/useHandleLineLogin";
import { defCurrencyList } from "../common/common";
import { useAuth } from "../hook";

export const HeaderLogin = ({
	t,
	showPsw,
	EditField,
	handleLogin,
	userValue,
	langId,
	path,
	currencyId
}) => {
	const { userInfo } = useAuth();
	const { lineLogin } = useHandleLineLogin();

	const clickLineLogin = () => {
		lineLogin({ type: defType.login });
	};

	return (
		<>
			<div className="username">
				<input
					placeholder={t("lbl_Username")}
					onChange={EditField.bind(null, "username")}
					value={userValue.username}
				/>
				<input
					type={`${!showPsw ? "password" : "text"}`}
					placeholder={t("lbl_Password")}
					onChange={EditField.bind(null, "password")}
					value={userValue.password}
					onKeyPress={e => {
						if (e.key === "Enter") {
							handleLogin(e);
						}
					}}
				/>
				{!userInfo.isLogin && (
					<Link
						to={`/${userInfo.langId}/${path.forgetPassword.root}`}
						className="forgot"
					>
						{t("lbl_ForgetPassword")}
					</Link>
				)}
			</div>

			<i className="eye-off" />

			<a className="login" onClick={handleLogin}>
				{t("lbl_Login")}
			</a>
			<Link className="join" to={`/${langId}/${path.join.root}`}>
				{t("lbl_Register")}
			</Link>

			{(langId === "th" || currencyId === defCurrencyList.THB) && (
				<a className="line-login" onClick={clickLineLogin}>
					<img
						src="https://banner.0814media.net/desktop/img/4.0/line-2.png"
						alt="img-line"
					/>
					{t("lbl_Login")}
				</a>
			)}
		</>
	);
};

HeaderLogin.defaultProps = {
	currencyId: null
};

HeaderLogin.propTypes = {
	t: PropTypes.func.isRequired,
	showPsw: PropTypes.bool.isRequired,
	EditField: PropTypes.func.isRequired,
	handleLogin: PropTypes.func.isRequired,
	userValue: PropTypes.objectOf(PropTypes.any).isRequired,
	path: PropTypes.objectOf(PropTypes.any).isRequired,
	langId: PropTypes.string.isRequired,
	currencyId: PropTypes.number
};
