import React, { useContext } from "react";
import { Link } from "@reach/router";
import path from "../../router";
import { userInfoContext } from "./context";
import config from "../../config";

export default ({ onClickClose }) => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<div className="friend active">
			<button className="icon icon-close" onClick={onClickClose} />
			<Link
				className=""
				to={`/${userInfo.langId}/${path.leaderBoard.root}`}>
				<img
					src={`${
						config.cloudImgUrl
					}/SiteSkin/img/euro/EURO-RACE-MONTHLY-WINNERS-${userInfo.langId?.toUpperCase()}.jpg`}
					alt="img_ranking"
				/>
			</Link>
		</div>
	);
};
