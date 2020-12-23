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

	const [promotionType, setPromotionType] = useState(defFilterType.all);

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

const openStaticPromotion = ({ url, bonusCode }) => {
	let windowKey = `static-promotion-${bonusCode}`;
	window.open(
		url,
		windowKey,
		"toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0"
	);
};
