import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import config from "../../config";

const DEFAULT_LANGID = "en";

const BANNER_IMAGE_LIST = {
	en: "appdownload_en.jpg",
	cs: "appdownload_cs.jpg",
	id: "appdownload_id.jpg",
	th: "appdownload_th.jpg",
	hi: "appdownload_hi.jpg"
};

const testImg = src => {
	return new Promise(resolve => {
		const _img = new Image();

		_img.src = src;
		_img.onload = () => resolve(true);
		_img.onerror = () => resolve(false);
	});
};

const AppDonloadBannerImage = ({ langId }) => {
	const [bannerImgUrl, setBannerImgUrl] = useState("");

	useEffect(() => {
		const checkBannerImage = async () => {
			let success = false;
			const bannerImg = `${config.cloudImgUrl}/SiteSkin/img/${BANNER_IMAGE_LIST[langId]}`;
			const defaultBannerImg = `${config.cloudImgUrl}/SiteSkin/img/${BANNER_IMAGE_LIST[DEFAULT_LANGID]}`;

			success = await testImg(bannerImg);

			if (success) return bannerImg;

			success = await testImg(defaultBannerImg);

			if (success) return defaultBannerImg;

			return "";
		};

		const getImgUrl = async () => {
			const _bannerImgUrl = await checkBannerImage();

			setBannerImgUrl(_bannerImgUrl);
		};

		getImgUrl();
	}, [langId]);

	return <img alt="app_download" src={bannerImgUrl} />;
};

AppDonloadBannerImage.propTypes = {
	langId: PropTypes.string.isRequired
};

export default memo(AppDonloadBannerImage);
