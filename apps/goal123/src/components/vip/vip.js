import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { defPopBoxType } from "../common/popBox";
import { userInfoContext, popBoxContext } from "../common/context";
import CustomSwipper from "../common/customSwipper";
import { InfoEn, InfoVn } from "./vip.info";
import VipPage from "./vip.page";
import { defbanner, defPageClubImg } from "./vip.def";
import { currencyCode } from "../../datas/countryCode";

const Vip = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const _currencyId = currencyCode.VN;

	const showJoinPopBox = () => {
		if (!userInfo.isLogin)
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Join
			});
	};

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
			<CustomSwipper withBtn={true} withPagination={false}>
				{rows}
			</CustomSwipper>

			{vipInfo}

			<VipPage
				pageClubImg={defPageClubImg}
				t={t}
				currencyId={_currencyId}
				langId={userInfo.langId}
				showJoinPopBox={showJoinPopBox}
			/>
		</main>
	);
};
export default Vip;
