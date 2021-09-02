import React from "react";
import { Link } from "@reach/router";
import path from "../../router";
import ProcessBar from "./promotion.processBar";
import { defFilterType } from "./promotion.nav";
import {
	isNew,
	isClaimed,
	isArrayNotEmpty,
	RULE_TYPE
} from "./promotion.common";
import PromotionJoinButton from "./promotion.joinButton";
import PromoRule from "./promotion.promoRule";
import { defPromotionType } from "./promotion.def";

export default ({
	promoList,
	t,
	userInfo,
	filter,
	refreshProcessBar,
	staticPromotions = [],
	afterJoinCallBack
}) => {
	const { langId, isLogin, currencyId } = userInfo;

	const rows = promoList?.map(p => {
		const _isClaimed = isClaimed(p);
		const _isNew = _isClaimed ? false : isNew(p);

		return (
			<div
				key={`promotion.list-${p.bonusCode}-${p.categoryId}-${p.tpId}`}
				className={`${_isClaimed ? "active" : ""}${
					(filter === defFilterType.specialBonus && !p.canJoin) ||
					p.beenUsed
						? " expired"
						: ""
				}`}>
				{_isClaimed ? <div className="claimed" /> : null}

				<div className={_isNew && p.canJoin ? "new" : ""} />

				<img src={p.banner} alt={p.title} />
				<div className="txt-darkBlue">{p.title}</div>
				<div className="txt-dark">{t("lbl_PromotionsDesc")}</div>
				<div className="txt-gray">{p.description}</div>

				<PromoRule
					promotionInfo={p}
					t={t}
					currencyId={currencyId}
					ruleType={RULE_TYPE.info}
					langId={langId}
				/>

				{filter === defFilterType.specialBonus && p.isJoin ? (
					<ProcessBar
						{...p}
						t={t}
						currencyId={currencyId}
						refreshProcessBar={() => refreshProcessBar(p)}
					/>
				) : null}
				<div className="btnGroup">
					{p.promotionType === defPromotionType.other &&
					!p.promotionAction ? (
						<a
							href={p.promotionLink}
							target="_blank"
							rel="noreferrer"
							className="blue">
							{t("lbl_Details")}
						</a>
					) : (
						<Link
							type="button"
							className="blue"
							to={`/${langId}/${path.promotion.root}/${
								path.promotion.sub.promotionInfo.root
							}?BonusCode=${p.bonusCode}${
								filter === defFilterType.specialBonus
									? `&FilterType=${defFilterType.specialBonus}`
									: ""
							}`}>
							{t("lbl_Details")}
						</Link>
					)}

					<PromotionJoinButton
						promotionInfo={p}
						userInfo={userInfo}
						filter={filter}
						callBack={afterJoinCallBack}
					/>
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
			<div className="proList">
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
