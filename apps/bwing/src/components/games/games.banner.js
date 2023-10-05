import React from "react";
import { bannerImgUrl } from "../../config";

const GamesBanner = () => {
	return (
		<div className="lobby-banner">
			<img
				src={`${bannerImgUrl}/desktop/img/4.0/lobby-banner-games.jpg`}
				alt="games-banner-img"
			/>
		</div>
	);
};

export default GamesBanner;
