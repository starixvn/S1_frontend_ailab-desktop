import React, { useContext } from "react";
import QRCode from "qrcode.react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";
import path from "../../router";
import { useAppDownLoad } from "../appDownload/useAppDownLoad";
import { userInfoContext } from "../common/context";

const AppDownloadSection = () => {
	const { t } = useTranslation();
	const { appLinkDatas } = useAppDownLoad();
	const { userInfo } = useContext(userInfoContext);
	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";
	const iOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";
	if (Object.keys(appLinkDatas).length === 0) return null;

	return (
		<div className="ambassador-app">
			<div className="ambassador-app-cover">
				<div className="subtitle">
					<img
						src={`${bannerImgUrl}/desktop/img/ambassador/appicon.png`}
						alt="ambassador-appicon"
					/>
					<div>
						{t("lbl_DownloadApp")}
						<div>
							<span>{`${t("lbl_Ambassador_Great_Games")} `}</span>
							{t("lbl_Ambassador_On_All_Devices")}
						</div>
					</div>
				</div>
				<img
					src={`${bannerImgUrl}/desktop/img/ambassador/app.png`}
					alt="ambassador.app"
				/>
			</div>
			<div className="ambassador-app-info">
				<div className="ambassador-app-info-item">
					<img
						src={`${bannerImgUrl}/desktop/img/ambassador/icon-vip.png`}
						alt="ambassador-vip"
					/>
					<div>
						{t("lbl_Ambassador_Exclusives_VIP")}
						<span>
							{t("lbl_Ambassador_VIP_Lounge_With_Exclusives")}
						</span>
					</div>
				</div>
				<div className="ambassador-app-info-item">
					<img
						src={`${bannerImgUrl}/desktop/img/ambassador/icon-speedy.png`}
						alt="ambassador-speedy"
					/>
					<div>
						{t("lbl_Ambassador_Speedy_Transactions")}
						<span>
							{t(
								"lbl_Ambassador_Enjoy_Faster_And_More_Convenient_Transaction_Payments"
							)}
						</span>
					</div>
				</div>
				<div className="ambassador-app-info-item">
					<img
						src={`${bannerImgUrl}/desktop/img/ambassador/icon-bouns.png`}
						alt="ambassador-bouns"
					/>
					<div>
						{t("lbl_Ambassador_Attractive_Bonus")}
						<span>
							{t(
								"lbl_Ambassador_Welcome_Bonus_Daily_Reload_Unlimited_Rebate"
							)}
						</span>
					</div>
				</div>
				<div className="ambassador-app-info-item">
					<img
						src={`${bannerImgUrl}/desktop/img/ambassador/icon-referral.png`}
						alt="ambassador-referral"
					/>
					<div>
						{t("lbl_Ambassador_Referral_Made_Easy")}
						<span>
							{t(
								"lbl_Ambassador_Share_Your_Referral_Link_And_Earn_Money"
							)}
						</span>
					</div>
				</div>
			</div>
			<div className="ambassador-app-qrcode">
				<div className="ambassador-app-qrcode-item">
					<QRCode
						className="qr"
						value={andriodDownLoadUrl}
						includeMargin={true}
					/>
					<div className="qr-button">
						<img
							src={`${bannerImgUrl}/desktop/img/ambassador/android.png`}
							alt="android"
						/>
						{t("lbl_Ambassador_Android")}
					</div>
					<a href={`/${userInfo.langId}/${path.appDownload.root}`}>
						{t("lbl_Ambassador_Instructions")}
					</a>
				</div>
				<div className="ambassador-app-qrcode-item">
					<QRCode
						className="qr"
						value={iOSDownloadUrl}
						includeMargin={true}
					/>
					<div className="qr-button">
						<img
							src={`${bannerImgUrl}/desktop/img/ambassador/apple.png`}
							alt="apple"
						/>
						{t("lbl_Ambassador_IOS")}
					</div>
					<a href={`/${userInfo.langId}/${path.appDownload.root}`}>
						{t("lbl_Ambassador_Instructions")}
					</a>
				</div>
			</div>
		</div>
	);
};

export default AppDownloadSection;
