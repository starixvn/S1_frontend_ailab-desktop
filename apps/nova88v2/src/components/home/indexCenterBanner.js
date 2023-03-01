import React, { memo, useState, useEffect } from "react";
import QRCode from "qrcode.react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";
import useAppDownLoad from "../appDownload/useAppDownLoad";

const DEFAULT_LANGID = "en";

const BANNER_IMAGE_LIST = {
	en: "indexCenterBanner_en.jpg",
	cs: "indexCenterBanner_cs.jpg",
	id: "indexCenterBanner_id.jpg",
	th: "indexCenterBanner_th.jpg",
	hi: "indexCenterBanner_hi.jpg",
	bd: "indexCenterBanner_bd.jpg",
	my: "indexCenterBanner_my.jpg"
};

const testImg = src =>
	new Promise(resolve => {
		const _img = new Image();

		_img.src = src;
		_img.onload = () => resolve(true);
		_img.onerror = () => resolve(false);
	});

const IndexCenterBanner = ({ langId }) => {
	const [imgUrl, setImgUrl] = useState("");
	const { appLinkDatas } = useAppDownLoad();
	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink;
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink;

	useEffect(() => {
		const checkImage = async () => {
			let success = false;
			const bannerImg = `${bannerImgUrl}/desktop/img/${BANNER_IMAGE_LIST[langId]}`;
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
		<div className="indexCenterBanner">
			<div className="qrGroup">
				{IOSDownloadUrl && (
					<div className="qrCode">
						<QRCode
							value={IOSDownloadUrl}
							renderAs="svg"
							size={152}
							includeMargin={true}
						/>
					</div>
				)}
				{andriodDownLoadUrl && (
					<div className="qrCode">
						<QRCode
							value={andriodDownLoadUrl}
							renderAs="svg"
							size={152}
							includeMargin={true}
						/>
					</div>
				)}
			</div>
			<img src={imgUrl} alt="IndexCenterBanner" />
		</div>
	);
};

IndexCenterBanner.propTypes = {
	langId: PropTypes.string.isRequired
};

export default memo(IndexCenterBanner);
