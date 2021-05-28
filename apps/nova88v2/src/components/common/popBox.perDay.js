import React, { useContext } from "react";
import { userInfoContext } from "./context";
import config from "../../config";

export default ({ onClickClose }) => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<div className="friend active">
			<button className="icon icon-close" onClick={onClickClose} />
			<img
				src={`${config.bannerImgUrl}/img/nonlogin/novapopup-570x150_${userInfo.langId}.jpg`}
				alt="welcome_nova88"
			/>
		</div>
	);
};
