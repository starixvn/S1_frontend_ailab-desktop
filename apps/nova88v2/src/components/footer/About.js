import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";
import { defCurrencyList, getCombineLangId } from "../common/common";
import { userInfoContext } from "../common/context";
import allowedCurrencyList from "../../datas/allowedCurrencyList";
import { channelNameToImg } from "./def";

export const getAffCurrencyLink = (targetCurrencyId, langId) => {
	if (targetCurrencyId === defCurrencyList.MYR) {
		return ` https://aff.nova88mas102.com/?lang=${langId}`;
	}
	if (targetCurrencyId === defCurrencyList.INR) {
		return `https://aff.nova88india.com/?lang=${langId}`;
	}
	return `https://aff.nova88bkk.com/?lang=${langId}`;
};

const About = ({ socialChannel }) => {
	const { t } = useTranslation();
	const {
		userInfo: { langId, currencyId }
	} = useContext(userInfoContext);
	return (
		<div className="footer-top">
			<div>
				<a
					href={`${bannerImgUrl}/Static/${getCombineLangId(
						langId,
						currencyId
					)}/AboutUs.html`}
					target="_blank"
					rel="noreferrer"
				>
					{t("lbl_AboutUs")}
				</a>
				<a
					href={`${bannerImgUrl}/Static/${getCombineLangId(
						langId,
						currencyId
					)}/Terms.html`}
					target="_blank"
					rel="noreferrer"
				>
					{t("lbl_TermsConditions")}
				</a>

				<a
					href={getAffCurrencyLink(currencyId, langId)}
					style={
						allowedCurrencyList.affiliate.includes(currencyId)
							? {}
							: { pointerEvents: "none" }
					}
					target="_blank"
					rel="noreferrer"
				>
					{t("lbl_Affiliate_Program")}
				</a>

				<a
					href={`${bannerImgUrl}/Static/${getCombineLangId(
						langId,
						currencyId
					)}/ContactUs.html`}
					target="_blank"
					rel="noreferrer"
				>
					{t("lbl_ContactUs")}
				</a>
			</div>
			<div className="social-media">
				{socialChannel?.map(item => (
					<a
						key={`channel-${item.channelName}`}
						href={item.link}
						target="_blank"
						rel="noreferrer"
					>
						<img
							src={`${bannerImgUrl}/desktop/img/4.0/${
								channelNameToImg[item.channelName]
							}.png`}
							alt={item.channelName}
						/>
					</a>
				))}
			</div>
		</div>
	);
};

About.defaultProps = {
	socialChannel: []
};
About.propTypes = {
	socialChannel: PropTypes.arrayOf(PropTypes.any)
};

export default About;
