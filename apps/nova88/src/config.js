const siteName = "Nova88";

const getAffiliate = () => {
	if (typeof window === `undefined`) return "";

	const fullPath = window.location.hostname;
	const arr = fullPath.split(".");

	return arr.length === 3
		? `https://aff.${arr.filter((p, idx) => idx !== 0).join(".")}`
		: `https://aff.${arr.join(".")}`;
};

export const SiteInfo = {
	siteName,
	logo: "https://image.n88media.com/SiteSkin/img/logo_evt.png",
	affiliateLink: getAffiliate(),
	langCookie: "nova88LangId",
	socialMedia: {
		fb: {
			link: "https://www.facebook.com/nova88official/",
			displayKey: "lbl_Facebook"
		},
		twitter: {
			link: "https://twitter.com/nova88official",
			displayKey: "lbl_Twitter"
		},
		ig: {
			link: "https://www.instagram.com/nova88.net_official",
			displayKey: "lbl_Instagram"
		}
	},
	staticPromotions:
		"https://image.n88media.com/NovaPromotion/promotionList.json"
};

const cloudImgUrl = "https://image.n88media.com";

export default process.env.NODE_ENV === "production"
	? {
			siteName,
			apiURL: "",
			openURL: "",
			imgUrl: "",
			t_and_cURL: "",
			cloudImgUrl: "https://image.n88media.com"
	  }
	: {
			siteName,
			cloudImgUrl,
			appURL: "http://localhost:4201",

			// apiURL: "http://localhost:60930",
			// imgUrl: "http://localhost:60930",
			// t_and_cURL: "http://localhost:60930"

			apiURL: "http://www.n88dev.com",
			imgUrl: "http://www.n88dev.com",
			t_and_cURL: "http://www.n88dev.com",
			openURL: "http://www.n88dev.com"
	  };
