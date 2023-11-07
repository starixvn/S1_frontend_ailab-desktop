import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import Swiper from "react-id-swiper";
import PropTypes from "prop-types";
import { useHandlePromotionInfo } from "../promotion/promotionInfo.popbox";
import { userInfoContext } from "../common/context";

const HotPromotion = ({ promotionList }) => {
	const { t } = useTranslation();
	const { getPromotionDetail } = useHandlePromotionInfo({});
	const { userInfo } = useContext(userInfoContext);

	const swiperParams = {
		slidesPerView: 3.1,
		spaceBetween: 15,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	};

	return (
		<div className="col-12">
			<div className="home-title">
				<i className="icon-promo" />
				{t("lbl_HotPromotions")}
			</div>
			<div className="home-promo mb-6">
				<Swiper {...swiperParams}>
					{promotionList.map(({ banner, title, bonusCode }) => {
						return (
							<a
								key={`${bonusCode}_${title}`}
								onClick={() =>
									getPromotionDetail(
										userInfo.langId,
										bonusCode
									)
								}>
								<img src={banner} alt={title} />
							</a>
						);
					})}
				</Swiper>
			</div>
		</div>
	);
};
HotPromotion.defaultProps = {
	promotionList: []
};

HotPromotion.propTypes = {
	promotionList: PropTypes.arrayOf(PropTypes.any)
};

export default HotPromotion;
