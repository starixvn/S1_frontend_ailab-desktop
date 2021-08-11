import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext, productTpIdsContext } from "../common/context";
import PlatformSection from "./footer.platform";
import Bettings from "./footer.bettings";
import OurPolicies from "./footer.ourPolicies";
import HelpSupport from "./footer.helpSupport";
import Promotions from "./footer.promotions";
import About from "./footer.about";
import specialImg1 from "../../styles/img/slots777.png";
import specialImg2 from "../../styles/img/service.png";
import specialImg3 from "../../styles/img/bank.png";
import specialImg4 from "../../styles/img/speed.png";
import bong88Img from "../../styles/img/bong88.png";
import acbImg from "../../styles/img/payment/acb.png";
import vietinImg from "../../styles/img/payment/vietin.png";
import vietcomImg from "../../styles/img/payment/vietcom.png";
import mbImg from "../../styles/img/payment/mb.png";
import techcomImg from "../../styles/img/payment/techcom.png";
import dongaImg from "../../styles/img/payment/donga.png";
import vpImg from "../../styles/img/payment/vp.png";
import sacomImg from "../../styles/img/payment/sacom.png";
import momoImg from "../../styles/img/payment/momo.png";
import circlepayImg from "../../styles/img/payment/circlepay.png";
import eeziepayImg from "../../styles/img/payment/eeziepay.png";
import oneclickpayImg from "../../styles/img/payment/oneclickpay.png";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { productTpIds } = useContext(productTpIdsContext);

	return (
		<footer>
			<div className="information">
				<div>
					<div>
						<img src={specialImg1} alt="specialImg1" />
						<ul>
							<li className="title">{t("lbl_ExtensiveGames")}</li>
							<li>{t("lbl_ExtensiveGamesDesc")}</li>
						</ul>
					</div>

					<div>
						<img src={specialImg2} alt="specialImg2" />
						<ul>
							<li className="title">
								{t("lbl_ExcellentCustomerCare")}
							</li>
							<li>{t("lbl_ExcellentCustomerCareDesc")}</li>
						</ul>
					</div>

					<div>
						<img src={specialImg3} alt="specialImg3" />
						<ul>
							<li className="title">{t("lbl_PaymentMethods")}</li>
							<li>{t("lbl_PaymentMethodsDesc")}</li>
						</ul>
					</div>

					<div>
						<img src={specialImg4} alt="specialImg4" />
						<ul>
							<li className="title">
								{t("lbl_TransactionSpeed")}
							</li>
							<li>{t("lbl_TransactionSpeedDesc")}</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="payment">
				<div>
					<div className="title">{t("lbl_PaymentMethods")}</div>
					<img src={acbImg} alt="acbImg" />
					<img src={vietinImg} alt="vietinImg" />
					<img src={vietcomImg} alt="vietcomImg" />
					<img src={mbImg} alt="mbImg" />
					<img src={techcomImg} alt="techcomImg" />
					<img src={dongaImg} alt="dongaImg" />
					<img src={vpImg} alt="vpImg" />
					<img src={sacomImg} alt="sacomImg" />
					<img src={momoImg} alt="momoImg" />
					<img src={circlepayImg} alt="circlepayImg" />
					<img src={eeziepayImg} alt="eeziepayImg" />
					<img src={oneclickpayImg} alt="oneclickpayImg" />
				</div>
			</div>

			<div className="powered">
				<div>{t("lbl_PoweredBy")}</div>
				<img src={bong88Img} alt="bong88Img" />
			</div>
			<PlatformSection
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
				productTpIds={productTpIds}
			/>
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
				</div>
			</div>
			<div className="copyright">
				{`© Copyright ${new Date().getFullYear()}. Goal123. All Rights Reserved.`}
			</div>
		</footer>
	);
};
