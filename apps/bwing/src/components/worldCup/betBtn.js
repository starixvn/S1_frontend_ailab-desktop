import React, { useContext, useState } from "react";
import { Link } from "gatsby";
import { userInfoContext } from "../common/context";
import { bannerImgUrl } from "../../config";
import path from "../../router";

const BetBtn = () => {
	const { userInfo } = useContext(userInfoContext);
	const [isOpen, setOpen] = useState(true);

	const closeBtn = () => {
		setOpen(false);
	};

	return (
		isOpen && (
			<div className="worldCup-pop">
				<div className="close" onClick={closeBtn} />
				<Link
					to={`/${userInfo.langId}/${path.sports.root}?tpId=1&gameId=2002`}>
					<img
						className="logo"
						src={`${bannerImgUrl}/desktop/img/worldcup/fifa-logo.png`}
						alt=""
					/>
					<img
						className="ball"
						src={`${bannerImgUrl}/img/worldcup/fifa-ball.png`}
						alt=""
					/>
				</Link>
			</div>
		)
	);
};

export default BetBtn;
