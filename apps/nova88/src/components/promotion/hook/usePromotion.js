import React, { useState } from "react";
import { api_promotion_GetPromotionListV2 } from "../../../service/api/promotion";
import { defPromotionType } from "../promotion.def";
import { defFilterType } from "../promotion.nav";
import { isExpiry } from "../promotion.common";
import staticList from "../../../datas/promotionList";

export default ({ t, promotionType, userInfo, isMountedRef, errorPopBox }) => {
	const [promoList, setPromoList] = useState([]);

	const getPromotionListV2 = async () => {
		await api_promotion_GetPromotionListV2({
			langId: userInfo.langId
		}).then(
			({ data: { data, message, errorCode } }) => {
				if (!isMountedRef.current) return;

				const success = errorCode === 0;
				if (success) {
					let result = data.sort((a, b) => {
						return a.periodFrom > b.periodFrom ? -1 : 1;
					});

					setPromoList(result);
				} else errorPopBox(message || "error", errorCode);
			},
			() => {
				if (!isMountedRef.current) return;
				errorPopBox();
			}
		);
	};

	const openStaticPromotion = ({ url, bonusCode }) => {
		let windowKey = `static-promotion-${bonusCode}`;
		window.open(
			url,
			windowKey,
			"toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0"
		);
	};

	let promotionStaticRows = staticList.map(p => {
		return (
			<div
				key={`static-promotion.list-${p.bonusCode}-${p.categoryId}-${p.tpId}`}
				className={""}>
				<div className=""></div>
				<img
					src={p.imgUrl?.[userInfo.langId]}
					alt={p.title?.[userInfo.langId]}
				/>
				<div className="txt-darkBlue">{p.title?.[userInfo.langId]}</div>
				<div className="txt-dark">{t("lbl_PromotionsDesc")}</div>
				<div className="txt-gray">
					{p.description?.[userInfo.langId]}
				</div>

				<div className="rollover">
					<div>
						<div className="icon icon-icon32px_">
							{t("lbl_RollOver")}
						</div>
					</div>
					<div className="txt-orange">
						<div>1X</div>
					</div>
				</div>
				<div
					onClick={openStaticPromotion.bind(this, {
						url: p.bannerLink?.[userInfo.langId],
						bonusCode: p.bonusCode
					})}
					className="btnGroup">
					<button className="blue">{t("lbl_Details")}</button>
				</div>
			</div>
		);
	});

	const typeFilter = promotionType => {
		if (promotionType === defFilterType.all)
			return p =>
				!isExpiry({
					...p,
					isLogin: userInfo.isLogin
				});

		if (promotionType === defFilterType.expiry)
			return p => isExpiry({ ...p, isLogin: userInfo.isLogin });

		if (promotionType === defFilterType.firstDeposit)
			return p =>
				(p.promotionType === promotionType ||
					p.promotionType === defPromotionType.walletBonus) &&
				!isExpiry({
					...p,
					isLogin: userInfo.isLogin
				});

		if (promotionType === defFilterType.Rebate_and_cashback)
			return p =>
				(p.promotionType === defPromotionType.rebate ||
					p.promotionType === defPromotionType.cashback) &&
				!isExpiry({
					...p,
					isLogin: userInfo.isLogin
				});

		return p =>
			p.promotionType === promotionType &&
			!isExpiry({ ...p, isLogin: userInfo.isLogin });
	};

	const afterFilterPromotionList = promoList.filter(
		typeFilter(promotionType)
	);

	return {
		promoList,
		setPromoList,
		promotionStaticRows,
		afterFilterPromotionList,
		setPromoList,
		getPromotionListV2
	};
};
