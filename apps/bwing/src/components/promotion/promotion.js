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

	const [filter, setFilter] = useState(defFilterType.all);

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
		return () => (isMountedRef.current = false);
	});

	const typeFilter = type => {
		if (type === defFilterType.all)
			return p => !isExpiry({ ...p, isLogin: userInfo.isLogin });

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

	return loading ? (
		<Loading />
	) : (
		<div className="infoModule">
			<div className="inside-title">
				<span>{t("lbl_Promotion_list")}</span>
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
					refreshProcessBar={refreshProcessBar}
					afterJoinCallBack={getPromotionListV2}
				/>
			)}
		</div>
	);
};
