import React, { useContext } from "react";
import { userInfoContext } from "./context";
import config from "../../config";

export default ({ onClickClose }) => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<div className="pop">
			<div className="friend active">
				<button className="icon icon-close" onClick={onClickClose} />
				<img
					src={`${config.bannerImgUrl}/img/nonlogin/750x350_bwing_${userInfo.langId}.jpg`}
					alt="Official Announce"
				/>
			</div>
		</div>
	);
};
