import config, { SiteInfo } from "../config";

export default langId => {
	return {
		terms: `${config.t_and_cURL}/Static/${SiteInfo.siteName}/${langId}/TermsConditions.html`,
		rule: `${config.t_and_cURL}/Static/${SiteInfo.siteName}/${langId}/RulesandRegulations.html`,
		OurPolicies: `${config.t_and_cURL}/Static/${SiteInfo.siteName}/${langId}/ResposibleGaming.html`,
		PrivacyPolicy: `${config.t_and_cURL}/Static/${SiteInfo.siteName}/${langId}/PrivacyPolicy.html`,
		CookiePolicy: `${config.t_and_cURL}/Static/${SiteInfo.siteName}/${langId}/CookiePolicy.html`,
		RuleRegulations: `${config.t_and_cURL}/Static/${SiteInfo.siteName}/${langId}/RulesandRegulations.html`,
		AccountTerms: `${config.t_and_cURL}/Static/${SiteInfo.siteName}/${langId}/AccountTerms.html`,
		FAQ: `${config.t_and_cURL}/Static/${SiteInfo.siteName}/${langId}/FAQ.html`,
		AboutUs: `${config.t_and_cURL}/Static/${SiteInfo.siteName}/${langId}/AboutUs.html`,
		Terms: `${config.t_and_cURL}/Static/${SiteInfo.siteName}/${langId}/Terms.html`,
		ContactUs: `${config.t_and_cURL}/Static/${SiteInfo.siteName}/${langId}/ContactUs.html`,
		ResposibleGaming: `${config.t_and_cURL}/Static/${SiteInfo.siteName}/${langId}/ResposibleGaming.html`
	};
};
