import config from "../config";

export default langId => {
	return {
		terms: `${config.bannerImgUrl}/Static/${langId}/TermsConditions.html`,
		rule: `${config.bannerImgUrl}/Static/${langId}/RulesandRegulations.html`,
		ResposibleGaming: `${config.bannerImgUrl}/Static/${langId}/ResposibleGaming.html`,
		PrivacyPolicy: `${config.bannerImgUrl}/Static/${langId}/PrivacyPolicy.html`,
		CookiePolicy: `${config.bannerImgUrl}/Static/${langId}/CookiePolicy.html`,
		RuleRegulations: `${config.bannerImgUrl}/Static/${langId}/RulesandRegulations.html`,
		AccountTerms: `${config.bannerImgUrl}/Static/${langId}/AccountTerms.html`,
		FAQ: `${config.bannerImgUrl}/Static/${langId}/FAQ.html`,
		AboutUs: `${config.t_and_cURL}/Static/${langId}/AboutUs.html`,
		Terms: `${config.t_and_cURL}/Static/${langId}/Terms.html`,
		ContactUs: `${config.t_and_cURL}/Static/${langId}/ContactUs.html`,
		Deposit: `${config.bannerImgUrl}/Static/${langId}/HowToDeposit.html`,
		Withdraw: `${config.bannerImgUrl}/Static/${langId}/HowToWithdraw.html`,
		HowToPlay: `${config.bannerImgUrl}/Static/${langId}/HowToBet.html`
	};
};
