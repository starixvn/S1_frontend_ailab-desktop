import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hook";

const OfficialPartner = () => {
	const { t } = useTranslation();
	const { userInfo } = useAuth();

	return (
		<div>
			<div className="partner-title">
				{t("Label_Home_OurOfficialPartnerOf")}
			</div>
			<div className="officialpartner">
				{/* // * 第三張圖確認只有 en，上面兩張有做多語系 */}
				<img
					src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/sevilla-fc-${userInfo.langId}.png`}
					alt="img-sevilla-fc"
				/>
				<a
					href="https://www.inter.it/en/news/inter-nova88-official-regional-partner-asia"
					target="_blank"
					rel="noreferrer"
				>
					<img
						src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/inter-milan-${userInfo.langId}.png`}
						alt="img-inter-milan"
					/>
				</a>

				<img
					src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/joe-cole.png`}
					alt="img-joe-cole"
				/>
			</div>
		</div>
	);
};

export default OfficialPartner;
