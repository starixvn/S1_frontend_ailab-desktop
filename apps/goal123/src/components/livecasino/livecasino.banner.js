import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const LiveCasinoBanner = ({ langId }) => {
	const imgUrl =
		{
			en: `${bannerImgUrl}/desktop/img/livecasinolist/banner_en.jpg`,
			vn: `${bannerImgUrl}/desktop/img/livecasinolist/banner_vn.jpg`
		}[langId] || `${bannerImgUrl}/desktop/img/livecasinolist/banner_en.jpg`;

	return (
		<div className="aniBanner">
			<img src={imgUrl} alt="livecasino" />
			<div className="items">
				<img
					src={`${bannerImgUrl}/desktop/img/livecasinolist/chip1.png`}
					alt="chip1Img"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/livecasinolist/chip2.png`}
					alt="chip2Img"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/livecasinolist/dice.png`}
					alt="diceImg"
				/>
			</div>
		</div>
	);
};

export default LiveCasinoBanner;

LiveCasinoBanner.propTypes = {
	langId: PropTypes.string.isRequired
};
