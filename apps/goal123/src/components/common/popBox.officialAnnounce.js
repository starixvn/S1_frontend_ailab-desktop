import React, { useContext } from "react";
import { navigate } from "gatsby";
import { userInfoContext } from "./context";
import config from "../../config";
import path from "../../router";

export default ({ onClickClose }) => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<div className="friend active">
			<button className="icon icon-close" onClick={onClickClose} />
			<img
				src={`${config.bannerImgUrl}/desktop/img/nonlogin/768x280_goal_${userInfo.langId}.jpg`}
				alt="Official Announce"
				onClick={() =>
					navigate(`/${userInfo.langId}/${path.appDownload.root}`)
				}
			/>
		</div>
	);
};
