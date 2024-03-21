import React from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";

const AppSection = () => {
	const { t } = useTranslation();
	return (
		<div className="ambassador-app">
			<div className="ambassador-app-cover">
				<div className="subtitle">
					<img
						src={`${bannerImgUrl}/desktop/img/ambassador/appicon.png`}
						alt=""
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
					alt=""
				/>
			</div>
			<div className="ambassador-app-info">
				<div className="ambassador-app-info-item">
					<img
						src={`${bannerImgUrl}/desktop/img/ambassador/icon-vip.png`}
						alt=""
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
						alt=""
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
						alt=""
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
						alt=""
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
					<div className="qr">
						<svg
							shapeRendering="crispEdges"
							height="135"
							width="135"
							viewBox="0 0 37 37">
							<path fill="#FFFFFF" d="M0,0 h37v37H0z" />
							<path fill="#000000" />
						</svg>
					</div>
					<div className="qr-button">
						<img
							src={`${bannerImgUrl}/desktop/img/ambassador/android.png`}
							alt=""
						/>
						{t("lbl_Ambassador_Android")}
					</div>
					<a href="appdownload.html">
						{t("lbl_Ambassador_Instructions")}
					</a>
				</div>
				<div className="ambassador-app-qrcode-item">
					<div className="qr">
						<svg
							shapeRendering="crispEdges"
							height="135"
							width="135"
							viewBox="0 0 37 37">
							<path fill="#FFFFFF" d="M0,0 h37v37H0z" />
							<path fill="#000000" />
						</svg>
					</div>
					<div className="qr-button">
						<img
							src={`${bannerImgUrl}/desktop/img/ambassador/apple.png`}
							alt=""
						/>
						{t("lbl_Ambassador_Android")}
					</div>
					<a href="appdownload.html">
						{t("lbl_Ambassador_Instructions")}{" "}
					</a>
				</div>
			</div>
		</div>
	);
};

export default AppSection;
