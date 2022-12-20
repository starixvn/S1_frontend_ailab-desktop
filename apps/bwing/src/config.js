const siteName = "Bwing";

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

export const bannerImgUrl = "https://banner.bw88.io";

export const cloudImgUrl = "https://payment.bw88.io";

export const errorPageUrl = langId =>
	`https://error.bw88.io/404/index_${langId}.html`;

export const siteInfo = ({ langId }) => {
	return {
		affiliateLink: getAffiliate({ langId })
	};
};

export const langCookie = "bwingLangId";

export default process.env.NODE_ENV === "production"
	? {
			siteName,
			apiURL: "",
			openURL: "",
			imgUrl: "",
			t_and_cURL: "https://image.0814media.net",
			bannerImgUrl,
			cloudImgUrl
	  }
	: {
			siteName,
			appURL: "http://localhost:8000",
			// apiURL: "http://localhost:60930",
			// imgUrl: "http://localhost:60930",
			// t_and_cURL: "http://localhost:60930",

			apiURL: "",
			imgUrl: "http://stag.Bwing.com",
			cloudImgUrl,
			bannerImgUrl,
			t_and_cURL: "https://image.0814media.net",
			openURL: "http://stag.Bwing.com"
	  };
