import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { userInfoContext } from "../common/context";
import CustomSwipper from "../common/customSwipper";
import { InfoEn, InfoVn } from "./vip.info";
import VipPage from "./vip.page";
import { defbanner, defPageClubImg } from "./vip.def";
import { currencyCode } from "../../datas/countryCode";
import path from "../../router";
import usePopBox from "../hook/usePopBox";
import { api_account_GetVipBanner } from "../../service/api/site";

const Vip = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const [vipBanner, setVipBanner] = useState([]);
	const { errorPopBox } = usePopBox();

	const _currencyId = currencyCode.VN;

	const showJoinPopBox = () => {
		if (!userInfo.isLogin)
			navigate(`/${userInfo.langId}/${path.join.root}`);
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

	useEffect(() => {
		const getVipBanner = async () => {
			await api_account_GetVipBanner({ CurrencyId: _currencyId }).then(
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
				vipBanner={vipBanner}
			/>
		</main>
	);
};
export default Vip;
