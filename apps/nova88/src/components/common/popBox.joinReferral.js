import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import path from "../../router";
import { popBoxContext, userInfoContext } from "../common/context";
import imgReferral from "../../styles/img/friend.jpg";

export default () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	return (
		<>
			<div className="friend active">
				<button
					className="icon icon-close"
					onClick={clickClose}></button>
				<img src={imgReferral} alt="img_referral" />
				<div className="checkbox">
					<input type="checkbox" id="c1" />
					<label
						for="c1"
						className="icon icon-checkbox-checked"></label>
					Don't show me again
				</div>
			</div>
		</>
	);
};
