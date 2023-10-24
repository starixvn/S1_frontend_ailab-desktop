import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
	popBoxContext,
	worldCupPopBox,
	userInfoContext
} from "../common/context";
import { langAndCurrMapping, getUrlParameter } from "../common/common";
import { siteDefLangId } from "../../service/language";
import PromoRule from "../promotion/promotion.promoRule";
import PromotionJoinButton from "../promotion/promotion.joinButton";
import { useHandlePromotionInfo } from "../promotion/promotionInfo.popbox";
import { defPromotionType } from "../promotion/promotion.def";

export default () => {
	const { popBox } = useContext(popBoxContext);
	const { worldCupBox, setWorldCupBox } = useContext(worldCupPopBox);

	const { isOpen: openPromoPopBox } = worldCupBox;

	const closePopBox = () => {
		setWorldCupBox({ isOpen: false });
	};

	return (
		<div
			onClick={closePopBox}
			className={`popup promotionpop ${
				popBox.isOpen || !openPromoPopBox ? "" : "active"
			}`}
		>
			{worldCupBox.content}
		</div>
	);
};

export const PromoPopBox = ({ data, closePopBox, t }) => {
	const { userInfo } = useContext(userInfoContext);
	const { getPromotionDetail } = useHandlePromotionInfo({
		showAllPromosBtn: false
	});

	const _currencyId =
		userInfo?.currencyId ?? langAndCurrMapping[userInfo?.langId];

	const openLiveChat = () => {
		window.LiveChatWidget.call("maximize");
	};

	return (
		<div className="promotionpop-inner">
			<div className="promotionpop-title"> </div>
			<div className="icon-close-primary" onClick={closePopBox} />
			<div className="promotionpop-list">
				<div className="promotionpop-banner">
					<img src={data?.banner} alt="banner" />
				</div>
				<div className="promotionpop-caption">
					<div className="promotionpop-caption-item">
						<div className="title">{data?.title}</div>
						<div className="subtitle">{data?.description}</div>
					</div>
					<div className="btn-group">
						{data?.promotionType === defPromotionType.other ? (
							<button
								className="btn-primary"
								onClick={openLiveChat}
							>
								{t("promotion.lbl_promo_apply_now")}
							</button>
						) : (
							<PromotionJoinButton
								promotionInfo={data}
								userInfo={userInfo}
								filter={Number(getUrlParameter("FilterType"))}
								callBack={() =>
									getPromotionDetail(
										userInfo.langId,
										data?.bonusCode
									)
								}
							/>
						)}
					</div>
				</div>
			</div>
			<PromoRule
				promotionInfo={data}
				t={t}
				currencyId={_currencyId}
				langId={userInfo?.langId ?? siteDefLangId}
			/>
			<div
				className="proDataBody"
				dangerouslySetInnerHTML={{
					__html: data?.details
				}}
			/>
		</div>
	);
};

PromoPopBox.propTypes = {
	data: PropTypes.objectOf(PropTypes.any).isRequired,
	closePopBox: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired
};
