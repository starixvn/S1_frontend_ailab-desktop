import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
	userInfoContext,
	productTpIdsContext,
	maintainListContext
} from "../common/context";
import Bettings from "./footer.bettings";
import OurPolicies from "./footer.ourPolicies";
import HelpSupport from "./footer.helpSupport";
import Promotions from "./footer.promotions";
import About from "./footer.about";
import PlatformSection from "./footer.platform";
import { bannerImgUrl } from "../../config";
import useGetSocialChannel, {
	defDisplayPage,
	channelIcon
} from "../hook/useGetSocialChannel";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);

	const { socialChannel } = useGetSocialChannel({
		langId: userInfo.langId,
		displayPage: defDisplayPage.Footer
	});

	const snsArr = socialChannel.map(el => (
		<a
			key={`channel-${el.channelName}`}
			href={el.link}
			className={channelIcon[el.channelName]}
			target="_blank"
			rel="noreferrer">
			{el.channelName}
		</a>
	));

	return (
		<footer>
			<div className="bankarea">
				<img
					src={`${bannerImgUrl}/desktop/img/bank/acbbank.png`}
					alt="acbbankImgImg"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/bank/agribank.png`}
					alt="agribankImg"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/bank/mbbank.png`}
					alt="mbbankImg"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/bank/sacombank.png`}
					alt="sacombankImg"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/bank/vibbank.png`}
					alt="vibbankImg"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/bank/vietcombank.png`}
					alt="vietcombankImg"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/bank/vietinbank.png`}
					alt="vietinbankImg"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/bank/vpbank.png`}
					alt="vpbankImg"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/bank/momo.png`}
					alt="momoImg"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/bank/circlebank.png`}
					alt="circlebankImg"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/bank/hpbank.png`}
					alt="hpbankImg"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/bank/oneclickpay.png`}
					alt="oneclickpayImg"
				/>
			</div>

			<div className="webmap">
				<Bettings
					t={t}
					langId={userInfo.langId}
					isLogin={userInfo.isLogin}
					productTpIds={productTpIds}
				/>
				<OurPolicies langId={userInfo.langId} t={t} />
				<div>
					<HelpSupport langId={userInfo.langId} t={t} />
					<Promotions langId={userInfo.langId} t={t} />
				</div>
				<About langId={userInfo.langId} t={t} />

				{socialChannel.length > 0 && (
					<div>
						<span className="title">{t("lbl_SocialMedia")}</span>
						<div>
							{snsArr}
							{/* <a
								href="https://www.tiktok.com/@bwingpro"
								className="icon icon-tiktok"
								target="_blank"
								rel="noreferrer">
								{t("lbl_TikTok")}
							</a> */}
						</div>
					</div>
				)}
			</div>
			<div>
				<PlatformSection
					t={t}
					langId={userInfo.langId}
					isLogin={userInfo.isLogin}
					productTpIds={productTpIds}
					maintainList={allMaintainList}
				/>
				<div className="powered">
					<div>{t("lbl_PoweredBy")}</div>
					<img
						src={`${bannerImgUrl}/desktop/img/bong88.png`}
						alt="Bong88"
					/>
				</div>
			</div>
			<div className="copyright">
				{`© Copyright ${new Date().getFullYear()}. Bwing. All Rights Reserved.`}
			</div>
		</footer>
	);
};
