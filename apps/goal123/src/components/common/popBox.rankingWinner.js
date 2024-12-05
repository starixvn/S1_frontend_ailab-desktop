import React, { useContext } from "react";
import { Link } from "gatsby";
import { userInfoContext } from "./context";
import usePopBox from "../hook/usePopBox";
import path from "../../router";

// import imgEuroEn from "../../styles/img/EURO-GOAL-EN.jpg";
// import imgEuroVn from "../../styles/img/EURO-GOAL-VN.jpg";

export default function PopBoxRankingWinner() {
	const { userInfo } = useContext(userInfoContext);
	const { closePopBox } = usePopBox();

	// const euroSrc = {
	// 	EN: imgEuroEn,
	// 	VN: imgEuroVn
	// }[String(userInfo.langId).toUpperCase()];

	return (
		<div className="friend active">
			<button className="icon icon-close" onClick={closePopBox} />

			<Link to={`/${userInfo.langId}/${path.leaderBoard.root}`}>
				{/* <img src={euroSrc} alt="img_referral" /> */}
			</Link>
		</div>
	);
}
