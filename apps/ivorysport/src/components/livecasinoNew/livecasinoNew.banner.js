import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const LivecasinoNewBanner = ({ t, langId }) => (
	<div className="mainBanner">
		<img
			src={`${bannerImgUrl}/desktop/img/livecasino/banner-${langId}.jpg`}
			alt="main-banner-img"
		/>
		<div className="bannerInfo">
			<div className="animation">
				<img
					className="dice3"
					src={`${bannerImgUrl}/desktop/img/livecasino/animation_img/dice01.png`}
					alt="animation-img-chip2"
				/>
				<img
					className="dice4"
					src={`${bannerImgUrl}/desktop/img/livecasino/animation_img/dice02.png`}
					alt="animation-img-chip3"
				/>
			</div>
		</div>
	</div>
);

LivecasinoNewBanner.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired
};

export default LivecasinoNewBanner;
