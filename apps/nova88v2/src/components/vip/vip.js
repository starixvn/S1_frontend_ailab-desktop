import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import defPopBoxType from "../common/defPopBoxType";
import { userInfoContext, popBoxContext } from "../common/context";
import { getCurrencyCode } from "../common/common";
import { AutoPlayWithBtn } from "../common/swipperBanner";
import { InfoEn, InfoTh, InfoId, InfoCs } from "./vip.info";
import VipPage from "./vip.page";
import { defbanner, defPageClubImg } from "./vip.def";
import { cloudImgUrl } from "../../config";
import { isOldLang } from "../../datas/languageData";

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
				showJoinPopBox={showJoinPopBox}
				bottomImg={bottomImg}
			/>
		</main>
	);
};
export default Vip;
