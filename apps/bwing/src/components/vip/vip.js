import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { AutoPlayWithBtn } from "../common/swipperBanner";
import { InfoEn, InfoVn } from "./vip.info";
import VipPage from "./vip.page";
import { defbanner, defPageClubImg } from "./vip.def";
import { currencyCode } from "../../datas/countryCode";
import { api_account_GetVipBanner } from "../../service/api/site";
import { bannerImgUrl } from "../../config";

const Vip = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const [vipBanner, setVipBanner] = useState([]);
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

	const showTopVipBanner = () => {
		if (userInfo.langId === "vn") {
			return (
				<img
					src={`${bannerImgUrl}/desktop/img/4.0/vip/vip-banner-vn-v1.jpg`}
					alt="top-vn-banner"
				/>
			);
		}
		return (
			<img
				src={`${bannerImgUrl}/desktop/img/4.0/vip/vip-banner-en-v1.png`}
				alt="top-en-banner"
			/>
		);
	};

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
			<div className="fullbanner">{showTopVipBanner()}</div>
			<div className="wrapper">
				<div className="col-12">{vipInfo}</div>
			</div>

			<div className="wrapper wrapper-banner">
				<div className="col-12">
					<div className="vip-banner">
						<AutoPlayWithBtn Rows={rows} />
					</div>
				</div>
			</div>

			<div className="wrapper">
				<div className="col-12">
					<VipPage
						pageClubImg={defPageClubImg}
						t={t}
						currencyId={_currencyId}
						langId={userInfo.langId}
						vipBanner={vipBanner}
					/>
				</div>
			</div>
		</main>
	);
};
export default Vip;
