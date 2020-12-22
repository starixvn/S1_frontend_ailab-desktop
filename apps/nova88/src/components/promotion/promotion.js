import React, { useState, useRef, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { api_account_GetCustSpecificBonus } from "../../service/api/account";
import PromotionNavBar, { defFilterType } from "./promotion.nav";
import PromotionList from "./promotion.list";
import { userInfoContext, loadingContext } from "../common/context";
import usePopBox from "../hook/usePopBox";
import useSpecialPromotion from "./hook/useSpecialPrmotion";
import usePrmotion from "./hook/usePromotion";

export default () => {
	const { t } = useTranslation();

	const isMountedRef = useRef(null);

	const [promotionType, setPromotionType] = useState(defFilterType.all);

	const { userInfo } = useContext(userInfoContext);
	const { loading, setLoading } = useContext(loadingContext);

	const { errorPopBox } = usePopBox();

	const {
		promoList,
		setPromoList,
		promotionStaticRows,
		afterFilterPromotionList,
		getPromotionListV2
	} = usePrmotion({
		t,
		promotionType,
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

	return (
		!loading && (
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
						staticPromotions={promotionStaticRows}
						refreshProcessBar={refreshProcessBar}
						afterJoinCallBack={getPromotionListV2}
					/>
				)}
			</div>
		)
	);
};
