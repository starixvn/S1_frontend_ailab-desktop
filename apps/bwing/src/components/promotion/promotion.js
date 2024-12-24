import React, { useEffect, useRef, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { api_account_GetCustSpecificBonus } from "../../service/api/account";
import PromotionNavBar from "./promotion.nav";
import PromotionList from "./promotion.list";
import { userInfoContext } from "../common/context";
import usePopBox from "../hook/usePopBox";
import useSpecialPromotion from "./hook/useSpecialPromotion";
import usePrmotion from "./hook/usePromotion";
import staticList from "../../datas/promotionList";
import { isExpiry } from "./promotion.common";
import {
	defPromotionType,
	defWalletType,
	defCategoryId,
	defFilterType
} from "./promotion.def";

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
		}).then(
			({ data: { data, message, errorCode } }) => {
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
							if (data) {
								newPromoList[idx].custRollOver = data.rollover;
								newPromoList[idx].custTurnOver = data.turnover;
							}
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
							if (data) {
								newPromoList[idx].custRollOver = data.rollover;
								newPromoList[idx].custTurnOver = data.turnover;
							}
						}

						setPromoList(newPromoList);
					}
				} else {
					errorPopBox(message || "error", errorCode);
				}
			},
			() => {
				errorPopBox();
			}
		);
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
				key={`static-promotion.list-${p.bonusCode}-${p.categoryId}-${p.tpId}`}
			>
				<img
					src={p.imgUrl?.[userInfo.langId]}
					alt={p.title?.[userInfo.langId] ?? "static promotions"}
				/>
				<div className="txt-blue15">{p.title?.[userInfo.langId]}</div>
				<div className="txt-lightgray">{t("lbl_PromotionsDesc")}</div>
				<div className="txt-txt-lightgray">
					{p.description?.[userInfo.langId]}
				</div>

				<div className="rollover">
					<div>
						<div>{t("lbl_RollOver")?.toUpperCase()}</div>
					</div>
					<div className="txt-yellow">
						<div>0X</div>
					</div>
				</div>
				<div
					onClick={openStaticPromotion.bind(this, {
						url: p.bannerLink?.[userInfo.langId],
						bonusCode: p.bonusCode
					})}
					className="btnGroup"
				>
					<button className="blueBorder">{t("lbl_Details")}</button>
				</div>
			</div>
		);
	});

	const typeFilter = type => {
		if (type === defFilterType.all)
			return p => !isExpiry({ ...p, isLogin: userInfo.isLogin });

		if (type === defFilterType.firstDeposit)
			return p =>
				(p.promotionType === defPromotionType.firstDeposit ||
					p.promotionType === defPromotionType.walletBonus) &&
				!isExpiry({
					...p,
					isLogin: userInfo.isLogin
				});

		if (type === defFilterType.sportsbook)
			return p =>
				(p.categoryId === defCategoryId.SabaSports ||
					p.categoryId === defCategoryId.SBSW) &&
				!isExpiry({
					...p,
					isLogin: userInfo.isLogin
				});

		if (type === defFilterType.liveCasino)
			return p =>
				(p.categoryId === defCategoryId.PtLiveCasino ||
					(p.walletType === defWalletType.Seamless &&
						p.categoryId === defCategoryId.LiveCasino)) &&
				!isExpiry({
					...p,
					isLogin: userInfo.isLogin
				});

		if (type === defFilterType.slots)
			return p =>
				(p.categoryId === defCategoryId.PtSlots ||
					(p.walletType === defWalletType.Seamless &&
						p.categoryId === defCategoryId.Slots)) &&
				!isExpiry({
					...p,
					isLogin: userInfo.isLogin
				});

		if (type === defFilterType.other)
			return p =>
				p.promotionType === defPromotionType.other &&
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
		<>
			<div className="lobby-title">
				<span>{t("lbl_Promotion_list")}</span>
			</div>

			<PromotionNavBar
				t={t}
				userInfo={userInfo}
				selected={filter}
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
		</>
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
