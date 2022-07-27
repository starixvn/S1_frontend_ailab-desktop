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
import { RULE_TYPE } from "../promotion/promotion.common";
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
		<div className={`promoInfoPop${openPromoPopBox ? " active" : ""}`}>
			<div
				onClick={closePopBox}
				className={`promoInfoPopMask${
					popBox.isOpen || !openPromoPopBox ? "" : " active"
				}`}
			/>
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
		<div className="promotionsInfo">
			<div className="icon icon-close" onClick={closePopBox} />
			<img src={data?.banner} alt="banner" />
			<div className="proData">
				<div className="proDataTitle">
					<div className="txt-darkBlue">
						{data.title}
						<div className="txt-gray">{data?.description}</div>
					</div>
					<div className="btnGroup">
						{data.promotionType === defPromotionType.other ? (
							<button className="red" onClick={openLiveChat}>
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
										data.bonusCode
									)
								}
							/>
						)}
					</div>
				</div>
				<PromoRule
					promotionInfo={data}
					t={t}
					currencyId={_currencyId}
					ruleType={RULE_TYPE.list}
					langId={userInfo?.langId ?? siteDefLangId}
				/>
				<div
					className="proDataBody"
					dangerouslySetInnerHTML={{
						__html: data.details
					}}
				/>
			</div>
		</div>
	);
};

PromoPopBox.propTypes = {
	data: PropTypes.objectOf(PropTypes.any).isRequired,
	closePopBox: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired
};
