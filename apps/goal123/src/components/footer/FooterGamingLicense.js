import React from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";

const FooterGamingLicense = () => {
	const { t } = useTranslation();
	return (
		<>
			<div className="title">{t("lbl_GamingLicense")}</div>
			<div className="game-license">
				<img
					src={`${bannerImgUrl}/desktop/img/home-page/gaming-license/curacao.png`}
					alt="GamingLicenseImg"
				/>
			</div>
		</>
	);
};

export default FooterGamingLicense;
