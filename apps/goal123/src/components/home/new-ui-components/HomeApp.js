import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import path from "../../../router";
import { userInfoContext } from "../../common/context";
import { bannerImgUrl } from "../../../config";

const HomeApp = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	return (
		<div>
			<div className="home-app">
				<div className="app-content">
					<div className="app-title">
						<img
							className="app-title-icon"
							src={`${bannerImgUrl}/desktop/img/home-page/goal123-appicon.png`}
							alt=""
						/>
						<div className="app-title-text">
							<div className="text">
								<span>{t("lbl_Home_GreatGames")}</span>
								<span>{t("lbl_Home_OnAllDevices")}</span>
							</div>
							<div className="text">
								<span>{t("lbl_Home_New")}</span>
								<img
									className="brand"
									src={`${bannerImgUrl}/desktop/img/home-page/goal123-brand.png`}
									alt=""
								/>
								<span>{t("lbl_Home_App")}</span>
							</div>
						</div>
					</div>
					<span>{t("lbl_Home_SignupPromotion")}</span>
					<div className="app-qrcode">
						<div className="app-item">
							<div className="qr">
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/QR_code_of_Chinese_Wikipedia_main_page_20131019.svg/1200px-QR_code_of_Chinese_Wikipedia_main_page_20131019.svg.png"
									alt=""
								/>
							</div>
							<button
								className="btn-app"
								style={{ cursor: "default" }}>
								<i className="icon-android" />
								{t("lbl_Home_Android")}
							</button>
							<a
								className="instructions"
								href={`/${userInfo.langId}/${path.appDownload.root}`}>
								{t("lbl_Home_Instructions")}
							</a>
						</div>
						<div className="app-item">
							<div className="qr">
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/QR_code_of_Chinese_Wikipedia_main_page_20131019.svg/1200px-QR_code_of_Chinese_Wikipedia_main_page_20131019.svg.png"
									alt=""
								/>
							</div>
							<button
								className="btn-app"
								style={{ cursor: "default" }}>
								<i className="icon-apple" />
								{t("lbl_Home_AppleIos")}
							</button>
							<a
								className="instructions"
								href={`/${userInfo.langId}/${path.appDownload.root}`}>
								{t("lbl_Instructions")}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeApp;
