import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
	userInfoContext,
	productTpIdsContext,
	maintainListContext
} from "../common/context";
import PlatformSection from "./footer.platform";
import Bettings from "./footer.bettings";
import OurPolicies from "./footer.ourPolicies";
import HelpSupport from "./footer.helpSupport";
import Promotions from "./footer.promotions";
import About from "./footer.about";
import { bannerImgUrl } from "../../config";
import { isDateRange } from "../common/common";
import { defEventPeriod } from "../common/eventIcon";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);
	const isEvent = isDateRange(
		defEventPeriod.newYear.start,
		defEventPeriod.newYear.end
	);

	return (
		<footer className={isEvent ? "newyear" : ""}>
			<div className="information">
				<div>
					<div>
						<img
							src={`${bannerImgUrl}/desktop/img/slots777.png`}
							alt="specialImg1"
						/>
						<ul>
							<li className="title">{t("lbl_ExtensiveGames")}</li>
							<li>{t("lbl_ExtensiveGamesDesc")}</li>
						</ul>
					</div>

					<div>
						<img
							src={`${bannerImgUrl}/desktop/img/service.png`}
							alt="specialImg2"
						/>
						<ul>
							<li className="title">
								{t("lbl_ExcellentCustomerCare")}
							</li>
							<li>{t("lbl_ExcellentCustomerCareDesc")}</li>
						</ul>
					</div>

					<div>
						<img
							src={`${bannerImgUrl}/desktop/img/bank.png`}
							alt="specialImg3"
						/>
						<ul>
							<li className="title">{t("lbl_PaymentMethods")}</li>
							<li>{t("lbl_PaymentMethodsDesc")}</li>
						</ul>
					</div>

					<div>
						<img
							src={`${bannerImgUrl}/desktop/img/speed.png`}
							alt="specialImg4"
						/>
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
					<img
						src={`${bannerImgUrl}/desktop/img/payment/acb.png`}
						alt="acbImg"
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/payment/vietin.png`}
						alt="vietinImg"
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/payment/vietcom.png`}
						alt="vietcomImg"
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/payment/mb.png`}
						alt="mbImg"
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/payment/techcom.png`}
						alt="techcomImg"
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/payment/donga.png`}
						alt="dongaImg"
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/payment/vp.png`}
						alt="vpImg"
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/payment/sacom.png`}
						alt="sacomImg"
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/payment/momo.png`}
						alt="momoImg"
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/payment/circlepay.png`}
						alt="circlepayImg"
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/payment/eeziepay.png`}
						alt="eeziepayImg"
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/payment/oneclickpay.png`}
						alt="oneclickpayImg"
					/>
				</div>
			</div>

			<div className="powered">
				<div>{t("lbl_PoweredBy")}</div>
				<img
					src={`${bannerImgUrl}/desktop/img/bong88.png`}
					alt="bong88Img"
				/>
			</div>
			<PlatformSection
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
				productTpIds={productTpIds}
				maintainList={allMaintainList}
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
