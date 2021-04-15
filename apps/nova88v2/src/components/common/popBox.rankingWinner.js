import React, { useContext } from "react";
import { Link } from "@reach/router";
import path from "../../router";
import { userInfoContext } from "./context";
import config from "../../config";

export default ({ onClickClose }) => {
	const { userInfo } = useContext(userInfoContext);

	const src =
		userInfo.langId === "cs"
			? `${config.bannerImgUrl}/img/EURO-RACE-MONTHLY-WINNERS-CH.jpg`
			: `${config.bannerImgUrl}/img/EURO-RACE-MONTHLY-WINNERS-EN.jpg`;

	return (
		<div className="friend active">
			<button className="icon icon-close" onClick={onClickClose} />
			<Link
				className=""
				to={`/${userInfo.langId}/${path.leaderBoard.root}`}>
				<img src={src} alt="img_referral" />
			</Link>
		</div>
	);
};
