import React, { useContext } from "react";
import { userInfoContext } from "./context";
import config from "../../config";
import { isOldLang } from "../../datas/languageData";

export default ({ onClickClose }) => {
	const { userInfo } = useContext(userInfoContext);

	const imgSrc = `${config.bannerImgUrl}/img/nonlogin/novapopup-570x150_${
		isOldLang(userInfo.langId) ? userInfo.langId : "en"
	}.jpg`;

	return (
		<div className="friend active">
			<button className="icon icon-close" onClick={onClickClose} />
			<img src={imgSrc} alt="welcome_nova88" />
		</div>
	);
};
