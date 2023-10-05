import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const LotteryBanner = ({ t }) => {
	return (
		<div className="mainBanner">
			<img
				src={`${bannerImgUrl}/desktop/img/lottery/lottery_mainbanner_bg.jpg`}
				alt="lottery-mainbanner-bg"
			/>
			<div className="bannerInfo">
				<div className="text">
					<div>{t("lbl_Lottery_BannerSubTitle")}</div>
					<div>{t("lbl_Lottery_BannerTitle1")}</div>
					<div>{t("lbl_Lottery_BannerTitle2")}</div>
				</div>

				<div className="animation">
					<img
						className="ball"
						src={`${bannerImgUrl}/desktop/img/lottery/animation_img/ball_nova.png`}
						alt="banner-ball"
					/>
					<img
						className="ball1 img_g"
						src={`${bannerImgUrl}/desktop/img/lottery/animation_img/ball_g.png`}
						alt="banner-ball"
					/>
					<img
						className="ball2 img_i"
						src={`${bannerImgUrl}/desktop/img/lottery/animation_img/ball_i.png`}
						alt="banner-ball2"
					/>
				</div>
			</div>
		</div>
	);
};

export default LotteryBanner;

LotteryBanner.propTypes = {
	t: PropTypes.func.isRequired
};
