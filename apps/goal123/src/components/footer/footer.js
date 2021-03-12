import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
// import SocialMedia1 from "../../styles/img/te.png";
// import SocialMedia2 from "../../styles/img/tw.png";
// import SocialMedia3 from "../../styles/img/fb.png";
// import SocialMedia4 from "../../styles/img/yb.png";
// import SocialMedia5 from "../../styles/img/ig.png";
import Bettings from "./footer.bettings";
import OurPolicies from "./footer.ourPolicies";
import HelpSupport from "./footer.helpSupport";
import Promotions from "./footer.promotions";
import About from "./footer.about";
import imgTelegram from "../../styles/img/te_1.png";
import imgSkype from "../../styles/img/sk_1.png";
import imgZalo from "../../styles/img/zalo_1.png";

export default ({ productTpIds }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	return (
		<footer>
			<div className="webmap">
				<Bettings
					t={t}
					langId={userInfo.langId}
					isLogin={userInfo.isLogin}
					productTpIds={productTpIds}
				/>
				<OurPolicies langId={userInfo.langId} t={t} />
				<HelpSupport langId={userInfo.langId} t={t} />
				<Promotions langId={userInfo.langId} t={t} />
				<About langId={userInfo.langId} t={t} />

				<div>
					<span className="title">{t("lbl_ContactUs")}</span>
					<div>{t("lbl_ConatctUsHint")}</div>
					<div className="socialMedia">
						<a href="https://t.me/Goal123csd" target="_blank">
							<img src={imgTelegram} alt="img_Telegram" />
						</a>
						<a href="skype:live:.cid.d357533c71e50fb5?chat">
							<img src={imgSkype} alt="img_Skype" />
						</a>
						<a href="https://zalo.me/Goal123csd" target="_blank">
							<img src={imgZalo} alt="img_Zalo" />
						</a>
					</div>
				</div>
			</div>
			<div className="copyright">
				{`© Copyright ${new Date().getFullYear()}. Goal123. All Rights Reserved.`}
			</div>
		</footer>
	);
};
