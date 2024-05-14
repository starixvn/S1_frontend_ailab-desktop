import React from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";

const TopContent = () => {
	const { t } = useTranslation();
	return (
		<div className="top-wrapper">
			<div className="top-content">
				<img
					className="euro-logo"
					src={`${bannerImgUrl}/desktop/img/event/eurocup/euro-logo.png`}
					alt="euro-logo"
				/>
				<div className="top-title">
					{t("lbl_CupEvent_MissionToTheGoldenCup")}
				</div>
				<div className="top-subtitle">
					<img
						src={`${bannerImgUrl}/desktop/img/event/eurocup/text-round.png`}
						alt="text-round"
					/>
					<span>{t("lbl_CupEvent_Participate")}</span>
					<img
						src={`${bannerImgUrl}/desktop/img/event/eurocup/text-round.png`}
						alt="text-round"
					/>
				</div>
				<div className="top-step">
					<div>
						<span>{t("lbl_CupEvent_Step")} 1</span>
						<span>{t("lbl_CupEvent_Step_Desc1")}</span>
					</div>
					<div>
						<span>{t("lbl_CupEvent_Step")} 2</span>
						<span>{t("lbl_CupEvent_Step_Desc2")}</span>
					</div>
					<div>
						<span>{t("lbl_CupEvent_Step")} 3</span>
						<span>{t("lbl_CupEvent_Step_Desc3")}</span>
					</div>
					<div>
						<span>{t("lbl_CupEvent_Step")} 4</span>
						<span>{t("lbl_CupEvent_Step_Desc4")}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopContent;
