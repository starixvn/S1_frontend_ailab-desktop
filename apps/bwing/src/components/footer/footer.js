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

import acbbankImgImg from "../../styles/img/bank/acbbank.png";
import agribankImg from "../../styles/img/bank/agribank.png";
import mbbankImg from "../../styles/img/bank/mbbank.png";
import sacombankImg from "../../styles/img/bank/sacombank.png";
import vibbankImg from "../../styles/img/bank/vibbank.png";
import vietcombankImg from "../../styles/img/bank/vietcombank.png";
import vietinbankImg from "../../styles/img/bank/vietinbank.png";
import vpbankImg from "../../styles/img/bank/vpbank.png";
import momoImg from "../../styles/img/bank/momo.png";
import circlebankImg from "../../styles/img/bank/circlebank.png";
import hpbankImg from "../../styles/img/bank/hpbank.png";
import oneclickpayImg from "../../styles/img/bank/oneclickpay.png";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);

	return (
		<footer>
			<div className="bankarea">
				<img src={acbbankImgImg} alt="acbbankImgImg" />
				<img src={agribankImg} alt="agribankImg" />
				<img src={mbbankImg} alt="mbbankImg" />
				<img src={sacombankImg} alt="sacombankImg" />
				<img src={vibbankImg} alt="vibbankImg" />
				<img src={vietcombankImg} alt="vietcombankImg" />
				<img src={vietinbankImg} alt="vietinbankImg" />
				<img src={vpbankImg} alt="vpbankImg" />
				<img src={momoImg} alt="momoImg" />
				<img src={circlebankImg} alt="circlebankImg" />
				<img src={hpbankImg} alt="hpbankImg" />
				<img src={oneclickpayImg} alt="oneclickpayImg" />
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

				<div>
					<span className="title">{t("lbl_SocialMedia")}</span>
					<div>
						<a
							href="https://www.facebook.com/Bwingtttt "
							className="icon icon-facebook"
							target="_blank">
							{t("lbl_Facebook")}
						</a>
						<a
							href="https://www.youtube.com/channel/UCDvFS9eTrOEYuVjb3BNQ3bg/featured"
							className="icon icon-youtube"
							target="_blank">
							{t("lbl_YouTube")}
						</a>
						<a
							href="https://twitter.com/bwingofficial"
							className="icon icon-twitter"
							target="_blank">
							{t("lbl_Twitter")}
						</a>
						<a
							href="https://www.tiktok.com/@bwingpro"
							className="icon icon-tiktok"
							target="_blank">
							{t("lbl_TikTok")}
						</a>
					</div>
				</div>
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
						src={require("../../styles/img/bong88.png")}
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
