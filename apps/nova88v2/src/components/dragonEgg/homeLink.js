import React, { useContext, useState } from "react";
import { Link } from "gatsby";
import { userInfoContext } from "../common/context";
import { bannerImgUrl } from "../../config";
import path from "../../router";

const DragonEggPop = () => {
	const {
		userInfo: { langId }
	} = useContext(userInfoContext);
	const [isShow, setIsShow] = useState(true);

	return (
		isShow && (
			<div className="eventLink dragonegg-float">
				<button
					className="icon icon-close"
					onClick={() => {
						setIsShow(prev => !prev);
					}}
				/>
				<Link
					to={path.dragonEgg.root}
					className="wheelModule dragonegg-egg"
				>
					<img
						className="dragonegg-egg-img"
						src={`${bannerImgUrl}/desktop/img/event/dragonegg/entrance-${langId}.png`}
						alt="entrance"
					/>
				</Link>
			</div>
		)
	);
};

export default DragonEggPop;
