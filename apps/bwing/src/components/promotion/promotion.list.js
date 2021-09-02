import React from "react";
import { Link } from "@reach/router";
import path from "../../router";
import ProcessBar from "./promotion.processBar";
import { defFilterType } from "./promotion.nav";
import { isNew, isClaimed, isArrayNotEmpty } from "./promotion.common";
import PromotionJoinButton from "./promotion.joinButton";
import PromoRule from "./promotion.promoRule";
import { defPromotionType } from "./promotion.def";

export default ({
	t,
	userInfo,
	filter,
	promoList,
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
				{filter === defFilterType.expiry ? (
					<div className="expiredIcon">{t("lbl_Expired")}</div>
				) : (
					_isNew && p.canJoin && <div className="new" />
				)}
				<img src={p.banner} alt={p.title} />
				<div className="txt-blue15">{p.title}</div>
				<div className="txt-lightgray">{t("lbl_PromotionsDesc")}</div>
				<div className="txt-txt-lightgray">
					<ul>
						<li>{p.description}</li>
					</ul>
				</div>
				<PromoRule
					t={t}
					promotionInfo={p}
					inListPage={true}
					currencyId={currencyId}
					langId={langId}
				/>

				{filter === defFilterType.specialBonus && p.isJoin ? (
					<ProcessBar
						{...p}
						t={t}
						currencyId={currencyId}
						RefreshProcessBar={refreshProcessBar.bind(this, p)}
					/>
				) : null}

				<div className="btnGroup">
					{p.promotionType === defPromotionType.other &&
					!p.promotionAction ? (
						<a
							href={p.promotionLink}
							target="_blank"
							rel="noreferrer"
							className="blueBorder">
							{t("lbl_Details").toUpperCase()}
						</a>
					) : (
						<Link
							type="button"
							className="blueBorder"
							to={`/${langId}/${path.promotion.root}/${
								path.promotion.sub.promotionInfo.root
							}?BonusCode=${p.bonusCode}${
								filter === defFilterType.specialBonus
									? `&FilterType=${defFilterType.specialBonus}`
									: ""
							}`}>
							{t("lbl_Details").toUpperCase()}
						</Link>
					)}

					<PromotionJoinButton
						promotionInfo={p}
						userInfo={userInfo}
						inListPage={true}
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
			<div
				className={`proList${
					filter === defFilterType.expiry ? " expired" : ""
				}`}>
				{rows}
				{filter === defFilterType.all ? staticPromotions : null}
			</div>
		);

	return <div className="nodata">{t("msg_NoData")}</div>;
};
