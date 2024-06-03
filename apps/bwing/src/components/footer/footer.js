import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import { defTpGameType } from "@ailab-desktop/common";
import {
	userInfoContext,
	popBoxContext,
	maintainListContext
} from "../common/context";
import FooterBetting from "./footer.bettings";
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
import path from "../../router";
import TandC from "../../service/t_and_c";
import useMenu from "../hook/useMenu";
import { defPopBoxType } from "../common/defPopBoxType";

export default () => {
	const { t } = useTranslation();
	const { allMaintainList } = useContext(maintainListContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { menuList = [], onClickProductItem } = useMenu();

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

	const handleClickFooterProduct = product => {
		// * 為靜態遊戲檢查的 isInMaintain
		const isInMaintain = allMaintainList?.some(
			mt =>
				mt.tpId === product?.tpId &&
				(mt.tpGameType === product?.tpGameType ||
					mt.tpGameType === defTpGameType.All)
		);

		if (isInMaintain || product?.isInMaintain) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.UnderMaintain,
				clickClose: () => setPopBox({ isOpen: false }),
				content: t("lbl_underMaintenance"),
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button
							className="btn-gray"
							onClick={() => {
								setPopBox({ isOpen: false });
							}}>
							OK
						</button>
					</div>
				)
			});
		} else {
			onClickProductItem(product);
		}
	};

	return (
		<footer>
			<div className="footer-content">
				<div className="footer-information">
					<div>
						<Link
							className="footer-information-item"
							to={`${bannerImgUrl}/Static/images/How_To_Deposit.mp4`}
							target="_blank">
							<img
								src={`${bannerImgUrl}/desktop/img/4.0/footer/how-deposit.png`}
								alt=""
							/>
							{t("lbl_HowToDepoist")}
						</Link>
						<Link
							className="footer-information-item"
							to={`/${userInfo.langId}/${path.howToWithdraw.root}`}>
							<img
								src={`${bannerImgUrl}/desktop/img/4.0/footer/how-withdraw.png`}
								alt=""
							/>
							{t("lbl_HowToWithdraw")}
						</Link>
						<Link
							className="footer-information-item"
							to={`/${userInfo.langId}/${path.howToPlay.root}`}>
							<img
								src={`${bannerImgUrl}/desktop/img/4.0/footer/how-play.png`}
								alt=""
							/>
							{t("lbl_HowToPlay")}
						</Link>
						<a
							href={TandC(userInfo.langId).FAQ}
							target="_blank"
							rel="noreferrer"
							className="footer-information-item">
							<img
								src={`${bannerImgUrl}/desktop/img/4.0/footer/how-faqs.png`}
								alt=""
							/>
							{t("lbl_FAQ")}
						</a>
					</div>
				</div>

				<div className="footer-banklist">
					<div>
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
				</div>

				<div className="footer-sitemap">
					<div>
						<FooterBetting
							onClickFooterProduct={handleClickFooterProduct}
						/>
						<OurPolicies langId={userInfo.langId} t={t} />
						<div className="footer-sitemap-item">
							<HelpSupport langId={userInfo.langId} t={t} />
							<Promotions langId={userInfo.langId} t={t} />
						</div>
						<About langId={userInfo.langId} t={t} />
						{socialChannel.length > 0 && (
							<div className="footer-sitemap-item">
								<span className="title">
									{t("lbl_SocialMedia")}
								</span>
								<div>{snsArr}</div>
							</div>
						)}
					</div>
				</div>

				<div className="footer-venderlogo">
					<PlatformSection
						menuList={menuList}
						onClickFooterProduct={handleClickFooterProduct}
					/>
				</div>
				<div className="footer-copyright">
					{`© Copyright ${new Date().getFullYear()}. Bwing. All Rights Reserved.`}
				</div>
			</div>
		</footer>
	);
};
