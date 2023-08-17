import React, { memo, useState, useEffect } from "react";
import QRCode from "qrcode.react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";
import useAppDownLoad from "../appDownload/useAppDownLoad";

const DEFAULT_LANGID = "en";

const BANNER_IMAGE_LIST = {
	en: "NewindexCenterBanner_en.jpg",
	cs: "NewindexCenterBanner_cs.jpg",
	id: "NewindexCenterBanner_id.jpg",
	th: "NewindexCenterBanner_th.jpg",
	hi: "NewindexCenterBanner_hi.jpg",
	bd: "NewindexCenterBanner_bd.jpg",
	my: "NewindexCenterBanner_my.jpg",
	kh: "NewindexCenterBanner_kh.jpg",
	vn: "NewindexCenterBanner_vn.jpg"
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
			const defaultBannerImg = `${bannerImgUrl}/desktop/img/${BANNER_IMAGE_LIST[DEFAULT_LANGID]}`;

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
