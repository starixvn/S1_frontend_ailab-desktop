const siteName = "Ivorysport";
const siteId = 5;

const getAffiliate = () => {
	if (typeof window === `undefined`) return "";

	const fullPath = window.location.hostname;
	const arr = fullPath.split(".");

	return arr.length === 3
		? `https://aff.${arr.filter((p, idx) => idx !== 0).join(".")}`
		: `https://aff.${arr.join(".")}`;
};

export const errorPageUrl = langId =>
	`https://error.0814media.net/404/index_${langId}.html`;

export const SiteInfo = {
	siteName,
	logo: "https://image.0814media.net/SiteSkin/img/logo_evt.png",
	ageVerificationCookie: `${siteName}-age-verification`,
	affiliateLink: getAffiliate(),
	langCookie: "IvorysportLangId",
	currencyCookie: "IvorysportCurrencyId",
	staticPromotions:
		"https://image.0814media.net/NovaPromotion/promotionList.json"
};

export const cloudImgUrl = "https://image.0814media.net";
export const paymentImgUrl = "http://payment.0814media.net";
export const bannerImgUrl = "https://banner.ivorysport.com";
export const sportImgUrl = "https://sportsimgs.0814media.net";

export default process.env.NODE_ENV === "production"
	? {
			siteName,
			siteId,
			apiURL: "",
			openURL: "",
			imgUrl: "",
			t_and_cURL: "https://banner.ivorysport.com",
			cloudImgUrl,
			bannerImgUrl
	  }
	: {
			siteName,
			siteId,
			cloudImgUrl,
			bannerImgUrl,
			appURL: "http://localhost:4203",

			// apiURL: "http://localhost:60930",
			// imgUrl: "http://localhost:60930",
			// t_and_cURL: "http://localhost:60930"

			apiURL: "",
			imgUrl: "http://www.n88dev.com",
			t_and_cURL: "https://banner.ivorysport.com",
			openURL: "https://www.n88dev.com"
	  };
