import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { AutoPlayWithBtn } from "../common/swipperBanner";
import { InfoEn, InfoVn } from "./vip.info";
import VipPage from "./vip.page";
import { defbanner, defPageClubImg } from "./vip.def";
import { currencyCode } from "../../datas/countryCode";

const Vip = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const _currencyId = currencyCode.VN;

	const rows = defbanner[userInfo.langId].map(item => (
		<div className="swiper-slide" key={item.alt}>
			<img
				src={item.img}
				className="banner"
				alt={item.alt ?? "vip level"}
			/>
		</div>
	));

	const vipInfo = {
		en: <InfoEn />,
		vn: <InfoVn />
	}[userInfo.langId];

	return (
		<main className="vip">
			<AutoPlayWithBtn Rows={rows} />

			{vipInfo}

			<VipPage
				pageClubImg={defPageClubImg}
				t={t}
				currencyId={_currencyId}
				langId={userInfo.langId}
			/>
		</main>
	);
};
export default Vip;
