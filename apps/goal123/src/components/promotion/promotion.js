import React, { useEffect, useRef, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { api_account_GetCustSpecificBonus } from "../../service/api/account";
import PromotionNavBar, { defFilterType } from "./promotion.nav";
import PromotionList from "./promotion.list";
import { userInfoContext } from "../common/context";
import usePopBox from "../hook/usePopBox";
import useSpecialPromotion from "./hook/useSpecialPromotion";
import usePrmotion from "./hook/usePromotion";
import { isExpiry } from "./promotion.common";
import { defPromotionType } from "./promotion.def";

import Loading from "../common/loading";

export default () => {
	const { t } = useTranslation();
	const isMountedRef = useRef(null);

	const [promotionType, setPromotionType] = useState(defFilterType.all);

	const { userInfo } = useContext(userInfoContext);
	const [loading, setLoading] = useState(true);
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
		if (type === defFilterType.special_bonus && userInfo.isLogin) {
			getSpecialPromotionList();
		}

		setPromotionType(type);
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
				if (promotionType === defFilterType.special_bonus) {
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

		if (
			!userInfo.isLogin &&
			promotionType === defFilterType.special_bonus
		) {
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
		return () => (isMountedRef.current = false);
	});

	const typeFilter = promotionType => {
		if (promotionType === defFilterType.all)
			return p => !isExpiry({ ...p, isLogin: userInfo.isLogin });

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

	return loading ? (
		<Loading />
	) : (
		<div className="infoModule">
			<div className="inside-title icon icon-gift">
				<span>{t("lbl_Promotions")}</span>
			</div>

			<PromotionNavBar
				t={t}
				userInfo={userInfo}
				selected={promotionType}
				userInfo={userInfo}
				specialCode={specialCode}
				setSpecialCode={setSpecialCode}
				onSetSpecialCodeSubmit={onSetSpecialCodeSubmit}
				onClick={onSetPromotionType}
			/>

			{promotionType === defFilterType.special_bonus ? (
				<PromotionList
					t={t}
					promotionType={promotionType}
					userInfo={userInfo}
					promoList={specialPromotionList}
					refreshProcessBar={refreshProcessBar}
					afterJoinCallBack={getSpecialPromotionList}
				/>
			) : (
				<PromotionList
					t={t}
					promotionType={promotionType}
					userInfo={userInfo}
					promoList={afterFilterPromotionList}
					refreshProcessBar={refreshProcessBar}
					afterJoinCallBack={getPromotionListV2}
				/>
			)}
		</div>
	);
};
