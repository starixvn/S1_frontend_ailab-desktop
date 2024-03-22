import React from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config"; // 導入配置文件中的變數

const RewardSection = () => {
	const { t } = useTranslation();

	return (
		<div className="ambassador-reward">
			<div className="title">
				{t("lbl_Ambassador_National_Team_Reward")}
			</div>
			<div className="ambassador-reward-block">
				<div className="ambassador-reward-item">
					<img
						src={`${bannerImgUrl}/desktop/img/ambassador/2002.png`}
						alt="ambassador-2002"
					/>
					<div>
						2002
						<span>{t("lbl_Ambassador_FIFA_World_Cup")}</span>
					</div>
					<img
						src={`${bannerImgUrl}/desktop/img/ambassador/2nd.png`}
						alt="ambassador-2nd"
					/>
				</div>
				<div className="ambassador-reward-item">
					<img
						src={`${bannerImgUrl}/desktop/img/ambassador/2005.png`}
						alt="ambassador-2005"
					/>
					<div>
						2005
						<span>
							{t("lbl_Ambassador_FIFA_Confederations_Cup")}
						</span>
					</div>
					<img
						src={`${bannerImgUrl}/desktop/img/ambassador/3rd.png`}
						alt="ambassador-3rd"
					/>
				</div>
				<div className="ambassador-reward-item">
					<img
						src={`${bannerImgUrl}/desktop/img/ambassador/2006.png`}
						alt="ambassador-2006"
					/>
					<div>
						2006
						<span>{t("lbl_Ambassador_FIFA_World_Cup")}</span>
					</div>
					<img
						src={`${bannerImgUrl}/desktop/img/ambassador/3rd.png`}
						alt="ambassador-3rd"
					/>
				</div>
				<div className="ambassador-reward-item">
					<img
						src={`${bannerImgUrl}/desktop/img/ambassador/2008.png`}
						alt="ambassador-2008"
					/>
					<div>
						2008
						<span>{t("lbl_Ambassador_UEFA_European_Cup")}</span>
					</div>
					<img
						src={`${bannerImgUrl}/desktop/img/ambassador/2nd.png`}
						alt="ambassador-2nd"
					/>
				</div>
			</div>
			<div className="ambassador-reward-block bottom">
				<div className="ambassador-reward-item">
					<div>
						{t("lbl_Ambassador_Total_Appearances")}
						<span>98</span>
					</div>
				</div>
				<div className="ambassador-reward-item">
					<div>
						{t("lbl_Ambassador_Total_Goals")}
						<span>42</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RewardSection;
