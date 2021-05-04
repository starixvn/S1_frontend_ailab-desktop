import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

export const HeaderLogin = ({
	t,
	showPsw,
	EditField,
	handleLogin,
	userValue,
	langId,
	path
}) => {
	return (
		<>
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
			<i className="eye-off" />

			<a className="login" onClick={handleLogin}>
				{t("lbl_Login")}
			</a>
			<Link className="join" to={`/${langId}/${path.join.root}`}>
				{t("lbl_JoinNow")}
			</Link>
		</>
	);
};

HeaderLogin.propTypes = {
	t: PropTypes.func.isRequired,
	showPsw: PropTypes.bool.isRequired,
	EditField: PropTypes.func.isRequired,
	handleLogin: PropTypes.func.isRequired,
	userValue: PropTypes.objectOf(PropTypes.any).isRequired,
	path: PropTypes.objectOf(PropTypes.any).isRequired,
	langId: PropTypes.string.isRequired
};
