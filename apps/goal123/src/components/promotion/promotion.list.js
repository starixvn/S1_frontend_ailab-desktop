import React from "react";
import ProcessBar from "./promotion.processBar";
import { defFilterType } from "./promotion.nav";
import { isNew, isClaimed, isArrayNotEmpty } from "./promotion.common";
import PromotionJoinButton from "./promotion.joinButton";
import { defPromotionType } from "./promotion.def";
import { useHandlePromotionInfo } from "./promotionInfo.popbox";
import { getExpiryTime } from "./promotion.promoRule";

const defPromoDisplayStyle = {
	default: "new",
	new: "new active",
	expired: "expired",
	claimed: "claimed"
};

export default ({
	t,
	userInfo,
	filter,
	promoList,
	refreshProcessBar,
	staticPromotions = [],
	afterJoinCallBack
}) => {
	const { getPromotionDetail } = useHandlePromotionInfo({});

	const clickMoreInfo = (langId, bonusCode) => {
		getPromotionDetail(langId, bonusCode);
	};

	const { isLogin, currencyId } = userInfo;

	const rows = promoList?.map(p => {
		const _isClaimed = isClaimed(p);
		const _isNew = _isClaimed ? false : isNew(p);

		let promoDisplayStyle = defPromoDisplayStyle.default;

		if (_isClaimed) {
			promoDisplayStyle = defPromoDisplayStyle.claimed;
		} else if (
			(filter === defFilterType.specialBonus && !p.canJoin) ||
			p.beenUsed
		) {
			promoDisplayStyle = defPromoDisplayStyle.expired;
		} else if (_isNew && p.canJoin) {
			promoDisplayStyle = defPromoDisplayStyle.new;
		}

		return (
			<div
				key={`promotionList-${p.bonusCode}-${p.categoryId}-${p.tpId}`}
				className={_isClaimed ? "active" : ""}>
				<div className={promoDisplayStyle} />

				<div className="promoImg">
					<img src={p.banner} alt={p.title} />
				</div>

				<div className="promoInfo">
					<div className="txt-darkBlue">{p.title}</div>
					<div className="txt-gray">{p.description}</div>

					{/* <PromoRule
						t={t}
						promotionInfo={p}
						ruleType={RULE_TYPE.info}
						currencyId={currencyId}
						langId={userInfo.langId}
					/> */}

					<ProcessBar
						{...p}
						t={t}
						currencyId={currencyId}
						RefreshProcessBar={refreshProcessBar.bind(this, p)}
					/>

					<div className="btnGroup">
						<PromotionJoinButton
							promotionInfo={p}
							userInfo={userInfo}
							filter={filter}
							callBack={afterJoinCallBack}
						/>

						{p.promotionType === defPromotionType.other &&
						!p.promotionAction ? (
							<a
								href={p.promotionLink}
								target="_blank"
								rel="noreferrer"
								className="btn-check">
								{t("promotion.lbl_promo_more_info")}
							</a>
						) : (
							<button
								className="btn-check"
								onClick={clickMoreInfo.bind(
									this,
									userInfo.langId,
									p.bonusCode
								)}>
								{t("promotion.lbl_promo_more_info")}
							</button>
						)}
					</div>
				</div>

				<div className="remain">
					<div className="icon icon-icon32px_time">
						{t("lbl_RemainingTime")}
						<div>{getExpiryTime(t, p)}</div>
					</div>
					{/* <PromoRule
						promotionInfo={p}
						t={t}
						currencyId={currencyId}
						ruleType={RULE_TYPE.info}
						langId={userInfo.langId}
					/> */}
				</div>
			</div>
		);
	});

	if (isLogin === null) return null;

	if (
		isArrayNotEmpty(promoList) ||
		(isArrayNotEmpty(staticPromotions) && filter === defFilterType.all)
	)
		return (
			<div className="proListNew">
				{rows}
				{filter === defFilterType.all ? staticPromotions : null}
			</div>
		);

	return <div className="nodata icon icon-nodata">{t("lbl_NoData")}</div>;
};
