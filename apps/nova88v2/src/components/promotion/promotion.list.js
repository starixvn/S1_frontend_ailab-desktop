import React, { useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ProcessBar from "./promotion.processBar";
import { defFilterType } from "./promotion.nav";
import { isNew, isClaimed, isArrayNotEmpty } from "./promotion.common";
import PromotionJoinButton from "./promotion.joinButton";
import { getExpiryTime } from "./promotion.promoRule";
import { defPromotionType } from "./promotion.def";
import { useHandlePromotionInfo } from "./promotionInfo.popbox";
import { getUrlParameter } from "../common/common";

const defPromoDisplayStyle = {
	default: "new",
	new: "new active",
	expired: "expired",
	claimed: "claimed"
};

const PromotionList = ({
	promoList,
	t,
	userInfo,
	filter,
	refreshProcessBar,
	staticPromotions = [],
	afterJoinCallBack
}) => {
	const { getPromotionDetail } = useHandlePromotionInfo({});
	const urlBonusCode = getUrlParameter("BonusCode");

	const clickMoreInfo = (langId, bonusCode) => {
		getPromotionDetail(langId, bonusCode);
	};

	const { isLogin, currencyId } = userInfo;

	useEffect(() => {
		if (urlBonusCode) {
			clickMoreInfo(userInfo.langId, urlBonusCode);
		}
	}, []);

	const rows = promoList?.map(p => {
		const _isClaimed = isClaimed(p);
		const _isNew = _isClaimed ? false : isNew(p);
		const timezone = moment().format("Z");
		const isDisplay =
			moment.unix(p.displayFrom).subtract(timezone).diff(moment()) <= 0 &&
			moment.unix(p.displayTo).subtract(timezone).diff(moment()) >= 0;

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
			isDisplay && (
				<div
					className={_isClaimed ? "active" : ""}
					key={`promotion.list-${p.bonusCode}-${p.categoryId}-${p.tpId}`}>
					<div className={promoDisplayStyle} />
					<div className="promoImg">
						<img src={p.banner} alt={p.title} />
					</div>

					<div className="promoInfo">
						<div className="txt-darkBlue">{p.title}</div>
						<div className="txt-gray">{p.description}</div>

						<ProcessBar
							{...p}
							t={t}
							currencyId={currencyId}
							refreshProcessBar={() => refreshProcessBar(p)}
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
									{t("lbl_Promotion_MoreInfo")}
								</a>
							) : (
								<button
									className="btn-check"
									onClick={clickMoreInfo.bind(
										this,
										userInfo.langId,
										p.bonusCode
									)}>
									{t("lbl_Promotion_MoreInfo")}
								</button>
							)}
						</div>
					</div>
					<div className="remain">
						<div className="icon icon-icon32px_time">
							{t("lbl_RemainingTime")}
							<div>{getExpiryTime(t, p)}</div>
						</div>
					</div>
				</div>
			)
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

	return (
		<div className="nodata icon icon-nodata">
			<div>{t("lbl_NoData")}</div>
		</div>
	);
};

PromotionList.defaultProps = {
	promoList: null,
	userInfo: null,
	filter: null,
	refreshProcessBar: () => null,
	staticPromotions: null,
	afterJoinCallBack: () => null
};

PromotionList.propTypes = {
	t: PropTypes.func.isRequired,
	promoList: PropTypes.arrayOf(PropTypes.any),
	userInfo: PropTypes.objectOf(PropTypes.any),
	filter: PropTypes.string,
	refreshProcessBar: PropTypes.func,
	staticPromotions: PropTypes.arrayOf(PropTypes.any),
	afterJoinCallBack: PropTypes.func
};

export default PromotionList;
