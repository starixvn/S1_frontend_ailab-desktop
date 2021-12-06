import React from "react";
import ProcessBar from "./promotion.processBar";
import { isArrayNotEmpty, getStampStyle } from "./promotion.common";
import PromotionJoinButton from "./promotion.joinButton";
import { defPromotionType, defFilterType } from "./promotion.def";
import { useHandlePromotionInfo } from "./promotionInfo.popbox";
import { getExpiryTime } from "./promotion.promoRule";

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
		const promoDisplayStyle = getStampStyle(filter, p);

		return (
			<div
				key={`promotion.list-${p.bonusCode}-${p.categoryId}-${p.tpId}`}
				className={promoDisplayStyle}>
				<div className="promoImg">
					<img src={p.banner} alt={p.title} />
				</div>

				<div className="promoInfo">
					<div className="txt-blue15">{p.title}</div>
					<div>{p.description}</div>

					{/* <PromoRule
						t={t}
						promotionInfo={p}
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
							inListPage={true}
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
								{t(
									"promotion.lbl_promo_more_info"
								).toUpperCase()}
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
			<div className="proListnew">
				{rows}
				{filter === defFilterType.all ? staticPromotions : null}
			</div>
		);

	return <div className="nodata">{t("msg_NoData")}</div>;
};
