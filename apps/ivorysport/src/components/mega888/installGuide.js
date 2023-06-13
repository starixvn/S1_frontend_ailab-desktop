import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const Guide = ({ t }) => (
	<div className="guides">
		<div className="title">{t("mega888.download_app")}</div>
		<div className="step">
			<div className="content">
				{t("mega888.step", { step: 1 })}
				<span>{t("mega888.step1_desc")}</span>
			</div>
			<img src={`${bannerImgUrl}/desktop/img/mega1.jpg`} alt="Guide1" />
		</div>
		<div className="step">
			<div className="content">
				{t("mega888.step", { step: 2 })}
				<span>{t("mega888.step2_desc")}</span>
			</div>

			<img src={`${bannerImgUrl}/desktop/img/mega2.png`} alt="Guide2" />
		</div>
		<div className="step">
			<div className="content">
				{t("mega888.step", { step: 3 })}
				<span>{t("mega888.step3_desc")}</span>
			</div>
			<img src={`${bannerImgUrl}/desktop/img/mega3.png`} alt="Guide3" />
		</div>
		<div className="step">
			<div className="content">
				{t("mega888.step", { step: 4 })}
				<span>{t("mega888.step4_desc")}</span>
			</div>
			<img src={`${bannerImgUrl}/desktop/img/mega4.png`} alt="Guide4" />
		</div>
		<div className="step">
			<div className="content">
				{t("mega888.step", { step: 5 })}
				<span>{t("mega888.step5_desc")}</span>
			</div>
			<img src={`${bannerImgUrl}/desktop/img/mega5.png`} alt="Guide5" />
		</div>
		<div className="step">
			<div className="content">
				{t("mega888.step", { step: 6 })}
				<span>{t("mega888.step6_desc")}</span>
			</div>
			<img src={`${bannerImgUrl}/desktop/img/mega6.png`} alt="Guide6" />
		</div>
		<div className="step">
			<div className="content">
				{t("mega888.step", { step: 7 })}
				<span>{t("mega888.step7_desc")}</span>
			</div>
			<img src={`${bannerImgUrl}/desktop/img/mega7.png`} alt="Guide7" />
		</div>
		<div className="step">
			<div className="content">
				{t("mega888.step", { step: 8 })}
				<span>{t("mega888.step8_desc")}</span>
			</div>
			<img src={`${bannerImgUrl}/desktop/img/mega8.png`} alt="Guide8" />
		</div>
	</div>
);

Guide.propTypes = {
	t: PropTypes.func.isRequired
};

export default Guide;
