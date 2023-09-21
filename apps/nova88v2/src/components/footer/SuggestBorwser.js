import React from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";

const SuggestBrowser = () => {
	const { t } = useTranslation();

	return (
		<div className="footer-center-item">
			<div className="footer-center-title">
				{t("lbl_Suggested_Browser")}
			</div>
			<div className="footer-icon">
				<img src={`${bannerImgUrl}/desktop/img/4.0/edge.png`} alt="" />
				<img
					src={`${bannerImgUrl}/desktop/img/4.0/chrome.png`}
					alt=""
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/4.0/safari.png`}
					alt=""
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/4.0/firefox.png`}
					alt=""
				/>
			</div>
		</div>
	);
};

export default SuggestBrowser;
