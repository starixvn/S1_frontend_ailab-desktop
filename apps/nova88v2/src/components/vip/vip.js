import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { getCurrencyCode } from "../common/common";
import { AutoPlayWithBtn } from "../common/swipperBanner";
import { InfoEN, InfoTH, InfoID, InfoCS } from "./vip.info";
import VipPage from "./vip.page";
import { defbanner, defPageClubImg, allowCurrencies } from "./vip.def";
import { cloudImgUrl } from "../../config";
import { isOldLang } from "../../datas/languageData";
import { useHandleAllowCurrencies } from "../hook/useHandleAllowCurrencies";

const Vip = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

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

	const rows = defbanner(userInfo.langId).map(item => (
		<div className="swiper-slide" key={item.alt}>
			<img
				src={item.url}
				className="banner"
				alt={item.alt ?? "vip level"}
			/>
		</div>
	));

	const vipInfo = {
		en: <InfoEN />,
		th: <InfoTH />,
		id: <InfoID />,
		cs: <InfoCS />
	}[userInfo.langId];

	const bottomImg = `${cloudImgUrl}/VIP/img/${
		isOldLang(userInfo.langId) ? userInfo.langId : "en"
	}/vip_program_${isOldLang(userInfo.langId) ? userInfo.langId : "en"}.jpg`;

	return (
		<main className="vip">
			<AutoPlayWithBtn Rows={rows} />

			{vipInfo}

			<VipPage
				pageClubImg={defPageClubImg}
				t={t}
				currencyId={currencyId}
				langId={userInfo.langId}
				bottomImg={bottomImg}
				isLogin={userInfo.isLogin}
			/>
		</main>
	);
};
export default Vip;
