import React, { useContext } from "react";
import { Link } from "gatsby";
import path from "../../router";
import { userInfoContext } from "./context";
import { cloudImgUrl } from "../../config";
import { isOldLang } from "../../datas/languageData";

export default ({ onClickClose }) => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<div className="friend active">
			<button className="icon icon-close" onClick={onClickClose} />
			<Link
				className=""
				to={`/${userInfo.langId}/${path.leaderBoard.root}`}>
				<img
					src={`${cloudImgUrl}/SiteSkin/img/euro/EURO-RACE-MONTHLY-WINNERS-${
						isOldLang(userInfo.langId)
							? userInfo.langId.toUpperCase()
							: "EN"
					}.jpg`}
					alt="img_ranking"
				/>
			</Link>
		</div>
	);
};
