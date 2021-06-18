import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ReactMarquee from "react-fast-marquee";
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

	return (
		<div className="promos">
			<div className="moduleTitle icon icon-gift">
				{t("lbl_Promotion")}
				<Link to={`/${userInfo.langId}/${path.promotion.root}`}>
					{`${t("lbl_More")}...`}
				</Link>
			</div>
			{promoList && promoList.length > 0 && (
				<div className="swiper-container promosSwiper">
					{/* <Swiper {...defSwipperConfig}>{Rows}</Swiper> */}
					<ReactMarquee
						speed={60}
						pauseOnHover={true}
						gradientColor={false}>
						<div className="swiper-container">
							<div
								className="swiper-wrapper"
								style={{ display: "flex" }}>
								{promoList.map(p => (
									<div
										key={`promotion.list-${p.bonusCode}-${p.categoryId}-${p.tpId}`}
										style={{
											width: "300px",
											margin: "0 15px"
										}}>
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
