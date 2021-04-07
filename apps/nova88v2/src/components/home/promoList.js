import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import { Link } from "@reach/router";
import path from "../../router";
import usePrmotion from "../promotion/hook/usePromotion";
import usePopBox from "../hook/usePopBox";

const PromoList = ({ t, userInfo }) => {
	const isMountedRef = useRef(null);
	const { errorPopBox } = usePopBox();
	const { promoList } = usePrmotion({
		userInfo,
		isMountedRef,
		errorPopBox,
		filterExpiry: true,
		autoGetData: true
	});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const defSwipperConfig = {
		slidesPerView: 5,
		spaceBetween: 15,
		centeredSlides: true,
		loopFillGroupWithBlank: false,
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false
		}
	};

	const Rows = promoList.map(p => {
		return (
			<div
				className="swiper-slide"
				key={`promotion.list-${p.bonusCode}-${p.categoryId}-${p.tpId}`}>
				<div>
					<img src={p.banner} alt={p.title} />
				</div>
				<div className="title">{p.title}</div>
				<div className="btnGroup">
					<Link
						className="lightblue"
						to={`/${userInfo.langId}/${path.promotion.root}/${path.promotion.sub.promotionInfo.root}?BonusCode=${p.bonusCode}`}>
						{t("lbl_Details")}
					</Link>
				</div>
			</div>
		);
	});

	return (
		Rows &&
		Rows.length > 0 && (
			<>
				<div className="moduleTitle icon icon-gift">
					{t("lbl_Promotion")}
					<Link to={`/${userInfo.langId}/${path.promotion.root}`}>
						{`${t("lbl_More")}...`}
					</Link>
				</div>
				<div className="promos">
					<div className="swiper-container promosSwiper">
						<Swiper {...defSwipperConfig}>{Rows}</Swiper>
					</div>
				</div>
			</>
		)
	);
};

PromoList.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	t: PropTypes.func.isRequired
};

export default PromoList;
