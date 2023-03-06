import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ReactMarquee from "react-fast-marquee";
import { Link } from "gatsby";
import path from "../../router";
import usePrmotion from "../promotion/hook/usePromotion";
import usePopBox from "../hook/usePopBox";
import { useHandlePromotionInfo } from "../promotion/promotionInfo.popbox";

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

	return (
		<div className="promos">
			<div className="moduleTitle">
				{t("lbl_Promotion")}
				<Link to={`/${userInfo.langId}/${path.promotion.root}`}>
					{`${t("lbl_SeeMore").toUpperCase()}`}
				</Link>
			</div>
			{promoList && promoList.length > 0 && (
				<div className="swiper-container promosSwiper">
					{/* <Swiper {...defSwipperConfig}>{Rows}</Swiper> */}
					<ReactMarquee
						speed={80}
						pauseOnHover={true}
						gradientColor={false}
					>
						<div className="swiper-container">
							<div
								className="swiper-wrapper"
								style={{ display: "flex" }}
							>
								{promoList
									.filter(
										p =>
											moment
												.unix(p.displayFrom)
												.utc()
												.diff(moment()) <= 0 &&
											moment
												.unix(p.displayTo)
												.diff(moment()) >= 0
									)
									.map(p => (
										<div
											key={`promotion.list-${p.bonusCode}-${p.categoryId}-${p.tpId}`}
											style={{
												width: "300px",
												margin: "0 15px"
											}}
										>
											<div>
												<img
													src={p.banner}
													alt={p.title}
												/>
											</div>
											<div className="title">
												{p.title}
											</div>
											<div className="btnGroup">
												<button
													className="lightblue"
													onClick={clickPromotion.bind(
														this,
														userInfo.langId,
														p.bonusCode
													)}
												>
													{t(
														"promotion.lbl_promo_more_info"
													)}
												</button>
											</div>
										</div>
									))}
							</div>
						</div>
					</ReactMarquee>
				</div>
			)}
		</div>
	);
};

PromoList.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	t: PropTypes.func.isRequired
};

export default PromoList;
