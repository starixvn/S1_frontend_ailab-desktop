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
			<div className="eventLink worldcup">
				<button className="icon icon-close" onClick={closeBtn} />
				<Link
					to={`/${userInfo.langId}/${path.sports.root}?tpId=1&gameId=2002`}
				>
					<img
						src={`${bannerImgUrl}/desktop/img/event/worldcup/betnow-btn.gif`}
						alt=""
					/>
				</Link>
			</div>
		)
	);
};

export default BetBtn;
