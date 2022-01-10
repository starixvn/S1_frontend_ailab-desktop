import React from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";

export default props => {
	const { t } = useTranslation();
	return (
		<div className="subModuleList kycHeight">
			<div className="subModule">
				<div className="subModuleBody column align-items-center">
					<img
						src={`${bannerImgUrl}/desktop/img/gear.png`}
						alt="KYC Waiting"
					/>

					<div className="txt-lightgray">
						{/* <div className="icon icon-icon32px_worker"></div> */}
						<div className="title txt-org">{t("lbl_WaitKYC")}</div>
						<div className="txt-lightgray">
							{t("lbl_WaitKYCHint")}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
