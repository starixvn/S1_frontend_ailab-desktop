import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import {
	getCurrencyCode,
	capitalizeFirstLetter,
	currencyIdToCurrency
} from "../common/common";
import { AutoPlayWithBtn } from "../common/swipperBanner";
import { defbanner, defPageClubImg, allowCurrencies } from "./vip.def";
import { bannerImgUrl } from "../../config";
import { useHandleAllowCurrencies } from "../hook/useHandleAllowCurrencies";
import { api_account_GetVipBanner } from "../../service/api/account";
import usePopBox from "../hook/usePopBox";
import VipBottom from "./vip.bottom";
import VipTable from "./vip.table";

const Vip = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { errorPopBox } = usePopBox();
	const [vipBanner, setVipBanner] = useState([]);
	const currencyId = userInfo.currencyId
		? userInfo.currencyId
		: getCurrencyCode(userInfo.langId);

	useHandleAllowCurrencies({
		allowCurrencies,
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		currencyId: userInfo.currencyId,
		redirectPath: `/${userInfo.langId}`,
		t
	});
	const currencyName = currencyIdToCurrency[userInfo?.currencyId];

	const rows = defbanner(
		["en", "cs"].includes(userInfo.langId) ? userInfo.langId : "en"
	).map(item => {
		const upBonus = vipBanner?.vipBannerData?.find(
			vip => vip.level === item.level
		)?.upBonus;
		const upDeposit = vipBanner?.vipBannerData?.find(
			vip => vip.level === item.level
		)?.upDeposit;
		const rankingValidityMembershipRenewal = vipBanner?.vipBannerData?.find(
			vip => vip.level === item.level
		)?.rankingValidityMembershipRenewal;
		const referralBonus = vipBanner?.vipBannerData?.find(
			vip => vip.level === item.level
		)?.referralBonus;
		const rebateCategoryList = vipBanner?.vipBannerData?.find(
			vip => vip.level === item.level
		)?.rebateCategory;

		return (
			<div className={`swiper-slide ${item.levelText}`} key={item.level}>
				<div className="vipinfo">
					{t("lbl_Vip_Monthly_Minimum_Deposit")}
					<span>
						{/* vintage Club 與 Nova Club 在後台是不能編輯的且是文字或null 故這裡不顯示 currency */}
						{item.level === 1 || item.level === 6
							? null
							: currencyName}{" "}
						{upDeposit
							? upDeposit.split(".")[0]
							: t("lbl_Vip_NoRestrictions")}
					</span>
					{upBonus && (
						<div className="rewardinfo">
							{t("lbl_Vip_Tier_UpGrade_Bonus")}
							<span>
								{/* vintage Club 與 Nova Club 在後台是不能編輯的且是文字或null 故這裡不顯示 currency */}
								{item.level === 1 || item.level === 6
									? null
									: currencyName}{" "}
								{upBonus ? upBonus.split(".")[0] : null}
							</span>
						</div>
					)}
				</div>
				<img className="vipbg" src={item.url} alt="" />
				<div className="viprule">
					<div className="viprule-item">
						<span>
							{capitalizeFirstLetter(
								t("lbl_Vip_Ranking_Validity_Membership_renewal")
							)}
						</span>
						<span>{rankingValidityMembershipRenewal}</span>
					</div>
					<div className="viprule-item">
						<span>
							{capitalizeFirstLetter(
								t("lbl_Vip_Referral_bonus_Program")
							)}
						</span>
						<span>{referralBonus ? "Yes" : "No"}</span>
					</div>
					<div className="viprule-item">
						<span>
							{capitalizeFirstLetter(
								t("lbl_Vip_Special_Rebate_UP_TO")
							)}
						</span>
						<span>
							{rebateCategoryList &&
								Math.max(
									...rebateCategoryList?.map(
										({ percentage }) => percentage
									)
								)}
							%
						</span>
					</div>
				</div>
			</div>
		);
	});

	const vipInfo = {
		en: <img src={`${bannerImgUrl}/desktop/img/vipinfo.png`} alt="" />,
		th: <img src={`${bannerImgUrl}/desktop/img/vipinfo-th.png`} alt="" />,
		id: <img src={`${bannerImgUrl}/desktop/img/vipinfo-id.png`} alt="" />,
		cs: <img src={`${bannerImgUrl}/desktop/img/vipinfo-cs.png`} alt="" />,
		my: <img src={`${bannerImgUrl}/desktop/img/vipinfo-my.png`} alt="" />,
		vn: <img src={`${bannerImgUrl}/desktop/img/vipinfo-vn.png`} alt="" />
	}[userInfo.langId];

	useEffect(() => {
		const getVipBanner = async () => {
			await api_account_GetVipBanner({ CurrencyId: currencyId }).then(
				res => {
					if (res.data.errorCode === 0) {
						setVipBanner(res.data.data || []);
					} else if (res.data.errorCode !== 0) {
						errorPopBox();
					}
				},
				() => {
					if (isMountedRef.current) {
						errorPopBox();
					}
				}
			);
		};
		getVipBanner();
	}, []);

	return (
		<main className="vip">
			<AutoPlayWithBtn Rows={rows} />
			<div className="newvipinfo">{vipInfo}</div>
			<VipTable
				t={t}
				pageClubImg={defPageClubImg}
				currencyId={currencyId}
				langId={userInfo.langId}
				userInfo={userInfo}
				vipBanner={vipBanner}
			/>

			<VipBottom langId={userInfo.langId} isLogin={userInfo.isLogin} />
		</main>
	);
};
export default Vip;
