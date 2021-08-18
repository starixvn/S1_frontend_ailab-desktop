import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const DEFAULT_LANGID = "en";

const BANNER_IMAGE_LIST = {
	en: "indexCenterBanner_en.jpg",
	cs: "indexCenterBanner_cs.jpg",
	id: "indexCenterBanner_id.jpg",
	th: "indexCenterBanner_th.jpg",
	hi: "indexCenterBanner_hi.jpg"
};

const testImg = src => {
	return new Promise(resolve => {
		const _img = new Image();

		_img.src = src;
		_img.onload = () => resolve(true);
		_img.onerror = () => resolve(false);
	});
};

const IndexCenterBanner = ({ langId }) => {
	const [imgUrl, setImgUrl] = useState("");

	useEffect(() => {
		const checkImage = async () => {
			let success = false;
			const bannerImg = `${bannerImgUrl}/img/${BANNER_IMAGE_LIST[langId]}`;
			const defaultBannerImg = `${bannerImgUrl}/img/${BANNER_IMAGE_LIST[DEFAULT_LANGID]}`;

			success = await testImg(bannerImg);

			if (success) return bannerImg;

			success = await testImg(defaultBannerImg);

			if (success) return defaultBannerImg;

			return "";
		};

		const getImgUrl = async () => {
			const _imgUrl = await checkImage();

			setImgUrl(_imgUrl);
		};

		getImgUrl();
	});
	return (
		<img
			src={imgUrl}
			className="indexCenterBanner"
			alt="IndexCenterBanner"
		/>
	);
};

IndexCenterBanner.propTypes = {
	langId: PropTypes.string.isRequired
};

export default memo(IndexCenterBanner);
