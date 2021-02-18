import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { getCurrencyCode } from "../common/common";
import { AutoPlayWithBtn } from "../common/swipperBanner";
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
			<img src={item.url} className="banner" alt={item.alt ?? ""} />
		</div>
	));

	return (
		<main className="vip">
			<AutoPlayWithBtn Rows={rows} />

			<VipPage
				pageClubImg={defPageClubImg}
				t={t}
				currencyId={currencyId}
			/>
		</main>
	);
};
export default Vip;
