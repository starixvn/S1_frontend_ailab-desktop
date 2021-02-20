import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { getCurrencyCode } from "../common/common";
import { AutoPlayWithBtn } from "../common/swipperBanner";
import { InfoEn, InfoTh, InfoId, InfoCs } from "./vip.info";
import VipPage from "./vip.page";
import { defbanner, defPageClubImg } from "./vip.def";

const Vip = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const currencyId = userInfo.currencyId
		? userInfo.currencyId
		: getCurrencyCode(userInfo.langId);

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
		en: <InfoEn />,
		th: <InfoTh />,
		id: <InfoId />,
		cs: <InfoCs />
	}[userInfo.langId];

	return (
		<main className="vip">
			<AutoPlayWithBtn Rows={rows} />

			{vipInfo}

			<VipPage
				pageClubImg={defPageClubImg}
				t={t}
				currencyId={currencyId}
				langId={userInfo.langId}
			/>
		</main>
	);
};
export default Vip;
