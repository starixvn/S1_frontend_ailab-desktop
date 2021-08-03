import React from "react";
import PropTypes from "prop-types";
import config from "../../config";

const LivecasinoNewBanner = ({ t }) => {
	return (
		<div className="mainBanner">
			<img
				src={`${config.bannerImgUrl}/img/livecasino/livecasino_mainbanner_bg.jpg`}
				alt="main-banner-img"
			/>
			<div className="bannerInfo">
				<div className="text">
					<div>{t("livecasino.lbl_welcome_to")}</div>
					<div>{t("livecasino.lbl_world_class")}</div>
					<div>{t("livecasino.lbl_casino_world")}</div>
				</div>

				<div className="signature">
					<div>{t("livecasino.lbl_amber_na")}</div>
					<div>{t("livecasino.lbl_spokesperson_2122")}</div>
				</div>
				<div className="animation">
					<img
						className="chip1"
						src={`${config.bannerImgUrl}/img/livecasino/animation_img/chip1.png`}
						alt="animation-img-chip1"
					/>
					<img
						className="chip2"
						src={`${config.bannerImgUrl}/img/livecasino/animation_img/chip2.png`}
						alt="animation-img-chip2"
					/>
					<img
						className="chip3"
						src={`${config.bannerImgUrl}/img/livecasino/animation_img/chip3.png`}
						alt="animation-img-chip3"
					/>
				</div>
			</div>
		</div>
	);
};

LivecasinoNewBanner.propTypes = {
	t: PropTypes.func.isRequired
};

export default LivecasinoNewBanner;
