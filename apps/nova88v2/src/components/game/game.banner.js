import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const GameBanner = ({ t }) => {
	return (
		<div className="mainBanner">
			<img
				src={`${bannerImgUrl}/desktop/img/game/games_mainbanner_bg.jpg`}
				alt="games-mainbanner-bg"
			/>
			<div className="bannerInfo">
				<div className="text">
					<div>{t("lbl_Games_BannerSubTitle")}</div>
					<div>{t("lbl_Games_BannerTitle1")}</div>
					<div>{t("lbl_Games_BannerTitle2")}</div>
				</div>

				<div className="animation">
					<img
						className="card"
						src={`${bannerImgUrl}/desktop/img/game/animation_img/card.png`}
						alt="banner-card"
					/>
					<img
						className="dice2"
						src={`${bannerImgUrl}/desktop/img/game/animation_img/dice2.png`}
						alt="banner-dice2"
					/>
					<img
						className="dice1"
						src={`${bannerImgUrl}/desktop/img/game/animation_img/dice1.png`}
						alt="banner-dice1"
					/>
				</div>
			</div>
		</div>
	);
};

export default GameBanner;

GameBanner.propTypes = {
	t: PropTypes.func.isRequired
};
