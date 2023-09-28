import { Link } from "gatsby";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Swiper from "react-id-swiper";
import SwiperCore, { Navigation } from "swiper";
import { useTranslation } from "react-i18next";
import path from "../../router";
import usePrmotion from "../promotion/hook/usePromotion";
import usePopBox from "../hook/usePopBox";
import { useHandlePromotionInfo } from "../promotion/promotionInfo.popbox";

SwiperCore.use([Navigation]);
const PromoList = ({ userInfo }) => {
	const isMountedRef = useRef(null);
	const [showNavigation, setShowNavigation] = useState(false);
	// 為了精準控制 rebuild 的時機，僅有在需要 refetch data 時才打開
	const [rebuildOnUpdate, setRebuildOnUpdate] = useState(false);
	const { t } = useTranslation();
	const { errorPopBox } = usePopBox();
	const { promoList, getPromotionListV2 } = usePrmotion({
		userInfo,
		isMountedRef,
		errorPopBox,
		filterExpiry: true,
		autoGetData: false
	});

	const { getPromotionDetail } = useHandlePromotionInfo({
		showAllPromosBtn: true
	});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const clickPromotion = (langId, bonusCode) => {
		getPromotionDetail(langId, bonusCode);
	};

	const timezone = moment().format("Z");

	const swipperConfig = {
		slidesPerView: 3,
		spaceBetween: 25,
		centeredSlides: true,
		loop: true,
		rebuildOnUpdate,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		renderPrevButton: () => (
			<div
				style={{ opacity: showNavigation ? 1 : 0.2 }}
				className="swiper-button-prev"
			/>
		),
		renderNextButton: () => (
			<div
				style={{ opacity: showNavigation ? 1 : 0.2 }}
				className="swiper-button-next"
			/>
		)
	};

	useEffect(() => {
		setRebuildOnUpdate(true);
		getPromotionListV2();
		setTimeout(() => setRebuildOnUpdate(false), 3000);
	}, [userInfo.currencyId]);

	return (
		<>
			<div className="maintitle">
				{t("lbl_Promotion")}
				<Link to={`/${userInfo.langId}/${path.promotion.root}`}>
					{`${t("lbl_More").toUpperCase()}`}
				</Link>
			</div>
			{promoList && promoList.length > 0 && (
				<div
					className="promosswiper"
					onMouseOver={() => setShowNavigation(true)}
					onMouseOut={() => setShowNavigation(false)}
					onFocus={() => 0}
					onBlur={() => 0}>
					<Swiper {...swipperConfig}>
						{promoList
							.filter(
								p =>
									moment
										.unix(p.displayFrom)
										.subtract(timezone)
										.diff(moment()) <= 0 &&
									moment
										.unix(p.displayTo)
										.subtract(timezone)
										.diff(moment()) >= 0
							)
							.map(p => (
								<div
									key={`promotion.list-${p.bonusCode}-${p.categoryId}-${p.tpId}`}
									className="promos-item"
									onClick={clickPromotion.bind(
										this,
										userInfo.langId,
										p.bonusCode
									)}>
									<img src={p.banner} alt={p.title} />
								</div>
							))}
					</Swiper>
				</div>
			)}
		</>
	);
};

PromoList.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default PromoList;
