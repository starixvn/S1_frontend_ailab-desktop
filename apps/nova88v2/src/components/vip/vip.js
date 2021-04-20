import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import defPopBoxType from "../common/defPopBoxType";
import { userInfoContext, popBoxContext } from "../common/context";
import { getCurrencyCode } from "../common/common";
import { AutoPlayWithBtn } from "../common/swipperBanner";
import { InfoEn, InfoTh, InfoId, InfoCs } from "./vip.info";
import VipPage from "./vip.page";
import { defbanner, defPageClubImg } from "./vip.def";
import config from "../../config";

const Vip = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const currencyId = userInfo.currencyId
		? userInfo.currencyId
		: getCurrencyCode(userInfo.langId);

	const showJoinPopBox = () => {
		if (!userInfo.isLogin)
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Join
			});
	};

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

	const bottomImg = `${config.cloudImgUrl}/VIP/img/${userInfo.langId}/vip_program_${userInfo.langId}.jpg`;

	return (
		<main className="vip">
			<AutoPlayWithBtn Rows={rows} />

			{vipInfo}

			<VipPage
				pageClubImg={defPageClubImg}
				t={t}
				currencyId={currencyId}
				langId={userInfo.langId}
				showJoinPopBox={showJoinPopBox}
				bottomImg={bottomImg}
			/>
		</main>
	);
};
export default Vip;
