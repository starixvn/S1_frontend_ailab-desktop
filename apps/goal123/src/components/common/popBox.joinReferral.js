import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import path from "../../router";
import { userInfoContext } from "./context";
import { setCookie, deleteCookie } from "./common";

export default ({ onClickClose }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const [selectDontShow, setSelectDontShow] = useState(false);
	const refeCookieName = `referral_${userInfo.userName}`;

	const onChangeDontShow = () => {
		setSelectDontShow(prev => {
			const check = !prev;
			if (check) {
				setCookie(refeCookieName, "1", 7);
			} else {
				deleteCookie(refeCookieName);
			}
			return check;
		});
	};

	let src = null;
	try {
		src = `${bannerImgUrl}/desktop/img/img_referral_${userInfo.langId}.jpg`;
	} catch (error) {}

	return (
		<div className="friend active">
			<button className="icon icon-close" onClick={onClickClose} />
			<Link className="" to={`/${userInfo.langId}/${path.referral.root}`}>
				<img src={src} alt="img_referral" />
			</Link>
			<div className="checkbox">
				<input
					type="checkbox"
					id="home-popbox-joinReferral"
					onChange={onChangeDontShow}
					checked={selectDontShow}
				/>
				<label
					htmlFor="home-popbox-joinReferral"
					className="icon icon-checkbox-checked"
				/>
				{t("lbl_Dont_show_me_again")}
			</div>
		</div>
	);
};
