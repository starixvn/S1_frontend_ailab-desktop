import React from "react";
import PropTypes from "prop-types";
import config from "../../config";

const GameBanner = ({ t }) => {
	return (
		<div className="mainBanner">
			<img
				src={`${config.bannerImgUrl}/img/game/games_mainbanner_bg.jpg`}
				alt="games-mainbanner-bg"
			/>
			<div className="bannerInfo">
				<div className="text">
					<div>{t("games.lbl_bannerSubTitle")}</div>
					<div>{t("games.lbl_bannerTitle1")}</div>
					<div>{t("games.lbl_bannerTitle2")}</div>
				</div>

				<div className="animation">
					<img
						className="card"
						src={`${config.bannerImgUrl}/img/game/animation_img/card.png`}
						alt="banner-card"
					/>
					<img
						className="dice2"
						src={`${config.bannerImgUrl}/img/game/animation_img/dice2.png`}
						alt="banner-dice2"
					/>
					<img
						className="dice1"
						src={`${config.bannerImgUrl}/img/game/animation_img/dice1.png`}
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
