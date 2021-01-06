import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import path from "../../router";
import { userInfoContext } from "../common/context";
import { setCookie } from "../common/common";

export default ({ onClickClose }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const [selectDontShow, setSelectDontShow] = useState(false);
	const refeCookieName = `referral_${userInfo.userName}`;

	const onChangeDontShow = () => {
		let check = !selectDontShow;
		setSelectDontShow(check);
		if (check) {
			setCookie(refeCookieName, "1", 1);
		} else {
			setCookie(refeCookieName, null, 0);
		}
	};

	return (
		<>
			<div className="friend active">
				<button
					className="icon icon-close"
					onClick={onClickClose}></button>
				<img
					src={require(`../../styles/img/friend-${userInfo.langId}.jpg`)}
					alt="img_referral"
				/>
				<div className="checkbox">
					<input
						type="checkbox"
						id="c1"
						onChange={onChangeDontShow}
						checked={selectDontShow}
					/>
					<label
						for="c1"
						className="icon icon-checkbox-checked"></label>
					{t("lbl_Dont_show_me_again")}
				</div>
			</div>
		</>
	);
};
