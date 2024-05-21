import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { defSportsBetting } from "./footer.def";

const FooterBetting = ({ onClickFooterProduct }) => {
	const { t } = useTranslation();

	return (
		<div className="footer-sitemap-item">
			<span className="title">{t("lbl_SportsBetting")}</span>
			<div>
				{defSportsBetting?.map(prodictItem => {
					const { footerDisplayKey, tpGameIdNo, gameId } =
						prodictItem || {};

					return (
						footerDisplayKey && (
							<button
								// 多綁個 gameId，因為有些遊戲在後端沒有定義就會沒有 tpGameIdNo
								key={`${tpGameIdNo}-${gameId}`}
								onClick={() =>
									onClickFooterProduct(prodictItem)
								}>
								{t(footerDisplayKey)}
							</button>
						)
					);
				})}
			</div>
		</div>
	);
};

FooterBetting.propTypes = {
	onClickFooterProduct: PropTypes.func.isRequired
};

export default FooterBetting;
