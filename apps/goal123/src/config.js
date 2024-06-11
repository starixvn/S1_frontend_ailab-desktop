const siteName = "Goal123";
export const siteId = 2;

const getAffiliate = ({ langId }) => {
	if (typeof window === `undefined`) return "";

	const fullPath = window.location.hostname;
	const arr = fullPath.split(".");

	return arr.length === 3
		? `https://aff.${arr
				.filter((p, idx) => idx !== 0)
				.join(".")}/?lang=${langId}`
		: `https://aff.${arr.join(".")}/?lang=${langId}`;
};
export const bannerImgUrl = "https://banner.goal123.org";
export const sportsImgUrl = "https://sportsimgs.goal123.org";
export const cloudImgUrl = "https://payment.goal123.org";
export const paymentImgUrl = "https://payment.0814media.net";

export const errorPageUrl = langId =>
	`https://error.goal123.org/404/index_${langId}.html`;

export const siteInfo = ({ langId }) => {
	return {
		affiliateLink: getAffiliate({ langId }),
		langCookie: "goal123LangId"
	};
};

export const langCookie = "goal123LangId";

export default process.env.NODE_ENV === "production"
	? {
			siteName,
			siteId,
			apiURL: "",
			openURL: "",
			imgUrl: "",
			t_and_cURL: "https://banner.goal123.org",
			bannerImgUrl,
			sportsImgUrl,
			cloudImgUrl,
			paymentImgUrl
	  }
	: {
			siteName,
			siteId,
			appURL: "http://localhost:8000",
			// apiURL: "http://localhost:60930",
			// imgUrl: "http://localhost:60930",
			// t_and_cURL: "http://localhost:60930",

			apiURL: "",
			imgUrl: "http://stag.goal123.com",
			t_and_cURL: "https://banner.goal123.org",
			openURL: "http://stag.goal123.com",
			bannerImgUrl,
			sportsImgUrl,
			cloudImgUrl,
			paymentImgUrl
	  };
