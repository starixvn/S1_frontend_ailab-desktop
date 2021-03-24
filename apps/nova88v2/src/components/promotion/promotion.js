import React, { useState, useRef, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { api_account_GetCustSpecificBonus } from "../../service/api/account";
import PromotionNavBar, { defFilterType } from "./promotion.nav";
import PromotionList from "./promotion.list";
import { userInfoContext, loadingContext } from "../common/context";
import usePopBox from "../hook/usePopBox";
import useSpecialPromotion from "./hook/useSpecialPrmotion";
import usePrmotion from "./hook/usePromotion";
import staticList from "../../datas/promotionList";
import { isExpiry } from "./promotion.common";
import { defPromotionType } from "./promotion.def";

export default () => {
	const { t } = useTranslation();

	const isMountedRef = useRef(null);

	const [filter, setFilter] = useState(defFilterType.all);

	const { userInfo } = useContext(userInfoContext);
	const { loading, setLoading } = useContext(loadingContext);

	const { errorPopBox } = usePopBox();

	const { promoList, setPromoList, getPromotionListV2 } = usePrmotion({
		userInfo,
		isMountedRef,
		errorPopBox
	});

	const {
		specialCode,
		setSpecialCode,
		specialPromotionList,
		setSpecialPromotionList,
		onSetSpecialCodeSubmit,
		getSpecialPromotionList
	} = useSpecialPromotion({
		userInfo,
		setLoading,
		isMountedRef,
		errorPopBox
	});

	const onSetPromotionType = type => {
		if (type === defFilterType.specialBonus && userInfo.isLogin) {
			getSpecialPromotionList();
		}

		setFilter(type);
	};

	const refreshProcessBar = ({ bonusCode, tpId, categoryId }) => {
		api_account_GetCustSpecificBonus({
			BonusCode: bonusCode,
			TpId: tpId,
			PromoCategoryId: categoryId
		}).then(({ data: { data, message, errorCode } }) => {
			if (!isMountedRef.current) return;

			const success = errorCode === 0;
			if (success) {
				let idx = null;
				let newPromoList = [];
				if (filter === defFilterType.specialBonus) {
					idx = specialPromotionList.findIndex(
						x =>
							x.bonusCode === bonusCode &&
							x.tpId === tpId &&
							x.categoryId === categoryId
					);
					if (idx !== -1) {
						newPromoList = [...specialPromotionList];
						newPromoList[idx].custRollOver = data.rollover;
						newPromoList[idx].custTurnOver = data.turnover;
					}

					setSpecialPromotionList(newPromoList);
				} else {
					idx = promoList.findIndex(
						x =>
							x.bonusCode === bonusCode &&
							x.tpId === tpId &&
							x.categoryId === categoryId
					);
					if (idx !== -1) {
						newPromoList = [...promoList];
						newPromoList[idx].custRollOver = data.rollover;
						newPromoList[idx].custTurnOver = data.turnover;
					}

					setPromoList(newPromoList);
				}
			} else {
				errorPopBox(message || "error", errorCode);
			}
		});
	};

	useEffect(() => {
		if (userInfo.isLogin === null) return;

		if (!userInfo.isLogin && filter === defFilterType.specialBonus) {
			onSetPromotionType(defFilterType.all);
		}

		async function getData() {
			setLoading(true);
			await getPromotionListV2();
			setLoading(false);
		}
		getData();
	}, [userInfo.isLogin, userInfo.langId]);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const promotionStaticRows = staticList.map(p => {
		return (
			<div
				key={`static-promotion.list-${p.bonusCode}-${p.categoryId}-${p.tpId}`}>
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

	const typeFilter = type => {
		if (type === defFilterType.all)
			return p =>
				!isExpiry({
					...p,
					isLogin: userInfo.isLogin
				});

		if (type === defFilterType.expiry)
			return p => isExpiry({ ...p, isLogin: userInfo.isLogin });

		if (type === defFilterType.firstDeposit)
			return p =>
				(p.promotionType === type ||
					p.promotionType === defPromotionType.walletBonus) &&
				!isExpiry({
					...p,
					isLogin: userInfo.isLogin
				});

		if (type === defFilterType.Rebate_and_cashback)
			return p =>
				(p.promotionType === defPromotionType.rebate ||
					p.promotionType === defPromotionType.cashback) &&
				!isExpiry({
					...p,
					isLogin: userInfo.isLogin
				});

		return p =>
			p.promotionType === type &&
			!isExpiry({ ...p, isLogin: userInfo.isLogin });
	};

	const afterFilterPromotionList = promoList.filter(typeFilter(filter));

	return (
		!loading && (
			<div className="infoModule">
				<div className="inside-title icon icon-gift">
					<span>{t("lbl_Promotions")}</span>
				</div>

				<PromotionNavBar
					t={t}
					userInfo={userInfo}
					selected={filter}
					userInfo={userInfo}
					specialCode={specialCode}
					setSpecialCode={setSpecialCode}
					onSetSpecialCodeSubmit={onSetSpecialCodeSubmit}
					onClick={onSetPromotionType}
				/>

				{filter === defFilterType.specialBonus ? (
					<PromotionList
						t={t}
						filter={filter}
						userInfo={userInfo}
						promoList={specialPromotionList}
						refreshProcessBar={refreshProcessBar}
						afterJoinCallBack={getSpecialPromotionList}
					/>
				) : (
					<PromotionList
						t={t}
						filter={filter}
						userInfo={userInfo}
						promoList={afterFilterPromotionList}
						staticPromotions={promotionStaticRows}
						refreshProcessBar={refreshProcessBar}
						afterJoinCallBack={getPromotionListV2}
					/>
				)}
			</div>
		)
	);
};

const openStaticPromotion = ({ url, bonusCode }) => {
	const windowKey = `static-promotion-${bonusCode}`;
	window.open(
		url,
		windowKey,
		"toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0"
	);
};
