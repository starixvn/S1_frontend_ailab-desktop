import React from "react";
import { useTranslation } from "react-i18next";
import { defSportsBetting } from "./footer.def";

const FooterBetting = () => {
	const { t } = useTranslation();

	return (
		<div>
			<span className="title">{t("lbl_SportsBetting")}</span>

			<div>
				{defSportsBetting?.map(prodictItem => {
					const { footerDisplayKey, tpGameIdNo } = prodictItem || {};

					return (
						footerDisplayKey && (
							<button key={tpGameIdNo}>
								{t(footerDisplayKey)}
							</button>
						)
					);
				})}
			</div>
		</div>
	);
};
export default FooterBetting;
