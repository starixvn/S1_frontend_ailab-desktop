import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const FishingBanner = ({ langId }) => {
	const imgUrl =
		{
			en: `${bannerImgUrl}/desktop/img/fishing/banner_en.jpg`,
			vn: `${bannerImgUrl}/desktop/img/fishing/banner_vn.jpg`
		}[langId] || `${bannerImgUrl}/desktop/img/fishing/banner_en.jpg`;

	return (
		<div className="aniBanner">
			<img src={imgUrl} alt="fishing" />
			<div className="items">
				<img
					src={`${bannerImgUrl}/desktop/img/fishing/shark.png`}
					alt="sharkImg"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/fishing/bubble1.png`}
					alt="bubble1Img"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/fishing/bubble1.png`}
					alt="bubble1Img"
				/>
			</div>
		</div>
	);
};

export default FishingBanner;

FishingBanner.propTypes = {
	langId: PropTypes.string.isRequired
};
