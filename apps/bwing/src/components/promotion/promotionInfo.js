import React, { useEffect, useRef, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext, popBoxContext } from "../common/context";
import { getUrlParameter, isConvert, number_format } from "../common/common";
import { api_promotion_GetPromotionDetail } from "../../service/api/promotion";
import { api_account_GetCustSpecificBonus } from "../../service/api/account";
import { defPopBoxType } from "../common/defPopBoxType";
import { defPromotionType, defFilterType } from "./promotion.def";
import ProcessBar from "./promotion.processBar";
import { isClaimed } from "./promotion.common";
import Loading from "../common/loading";
import PromotionJoinButton from "./promotion.joinButton";
import PromoRule from "./promotion.promoRule";
import CashBackInfo from "./cashBackInfo";

export default () => {
	const filterType = Number(getUrlParameter("FilterType"));
	const isSpecialType = filterType === defFilterType.specialBonus;

	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [promotionInfo, setPromotionInfo] = useState(null);
	const isMountedRef = useRef(null);
	const [loading, setLoading] = useState(true);

	const _currency = t(`Currency_${userInfo.currencyId}`);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin !== null) {
			const _bonusCode = getUrlParameter("bonusCode");
			getPromotionDetail(userInfo.langId, _bonusCode);
		}
	}, [userInfo.isLogin, userInfo.langId]);

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const openErrorMessagePopBox = (
		message = t("msg_ApiServerError"),
		errorCode = null
	) => {
		setPopBox({
			message,
			errorCode,
			isOpen: true,
			popBoxType: defPopBoxType.ErrorMsg,
			icon: "icon-icon32px_notification",
			btnBar: (
				<div className="btnGroup">
					<button className="btn-cancel" onClick={clickClose}>
						{t("lbl_Close")}
					</button>
				</div>
			)
		});
	};

	const getPromotionDetail = async (langId, _bonusCode) => {
		await api_promotion_GetPromotionDetail({
			langId,
			BonusCode: _bonusCode
		}).then(
			({ data: { data, message, errorCode } }) => {
				if (!isMountedRef.current) return;
				const success = errorCode === 0;
				setLoading(false);
				if (success) {
					return setPromotionInfo(data);
				}
				openErrorMessagePopBox(message || "error", errorCode);
			},
			() => {
				if (isMountedRef.current) {
					openErrorMessagePopBox();
					setLoading(false);
				}
			}
		);
	};

	const RefreshProcessBar = ({ bonusCode, tpId, categoryId }) => {
		api_account_GetCustSpecificBonus({
			BonusCode: bonusCode,
			TpId: tpId,
			PromoCategoryId: categoryId
		}).then(
			res => {
				if (
					isMountedRef.current &&
					res.data.errorCode === 0 &&
					res.data.data
				) {
					setPromotionInfo(prevS => ({
						...prevS,
						custRollOver: res.data.data.rollover,
						custTurnOver: res.data.data.turnover
					}));
				} else if (res.data.errorCode !== 0) {
					openErrorMessagePopBox(
						res.data.message || "error",
						res.data.errorCode
					);
				}
			},
			() => {
				openErrorMessagePopBox();
			}
		);
	};

	let _isClaimed = false;

	if (promotionInfo !== null) {
		_isClaimed = isClaimed(promotionInfo);
	}

	const _isConvert = isConvert(userInfo.currencyId);

	let wrapperClass = "";
	if (promotionInfo?.beenUsed) {
		wrapperClass = " expiredClaimedInfo";
	} else if (_isClaimed) {
		wrapperClass = " claimedInfo";
	}

	const specialBonusWrapperClass =
		isSpecialType && !promotionInfo?.canJoin ? " expiredClaimedInfo" : "";

	if (loading) return <Loading />;

	if (promotionInfo === null) return null;

	return (
		<div className="infoModule">
			<div className="inside-title">
				<span>{t("lbl_Promotion_info")}</span>
			</div>
			<div
				className={`promotionsInfo${wrapperClass}${specialBonusWrapperClass}`}>
				<img
					src={promotionInfo.banner}
					alt={promotionInfo.description}
				/>

				<div className="proData">
					<div className="proDataTitle">
						<div>{promotionInfo.title}</div>
					</div>
					<PromoRule
						promotionInfo={promotionInfo}
						t={t}
						inListPage={false}
						currencyId={userInfo.currencyId}
						langId={userInfo.langId}
					/>

					<div className="proDataTitle">
						<div>{promotionInfo.description}</div>
						<div className="btnGroup">
							<PromotionJoinButton
								promotionInfo={promotionInfo}
								userInfo={userInfo}
								_isClaimed={_isClaimed}
								inListPage={false}
								filter={filterType}
								callBack={() =>
									getPromotionDetail(
										userInfo.langId,
										promotionInfo.bonusCode
									)
								}
							/>
						</div>
					</div>

					<DepositSlip
						promotionInfo={promotionInfo}
						isSpecialType={isSpecialType}
						t={t}
					/>

					<DepositMenu
						cash={number_format({
							number: promotionInfo.depositAmount
						})}
						_currency={_currency}
						promotionInfo={promotionInfo}
						t={t}
					/>

					<ProcessBar
						t={t}
						_isConvert={_isConvert}
						currencyId={userInfo.currencyId}
						{...promotionInfo}
						RefreshProcessBar={RefreshProcessBar.bind(
							this,
							promotionInfo
						)}
					/>

					<CashBackInfo
						cashBackDetails={promotionInfo.cashBackDetails}
						t={t}
					/>

					<div
						className="proDataBody"
						dangerouslySetInnerHTML={{
							__html: `${promotionInfo.details}`
						}}
					/>
				</div>
			</div>
		</div>
	);
};

const DepositSlip = ({ promotionInfo, t, isSpecialType }) => {
	const { promotionType, refList, depositAmount, bonusCode } = promotionInfo;

	if (
		!refList ||
		promotionType !== defPromotionType.redeposit ||
		(isSpecialType && promotionInfo === defPromotionType.firstDeposit)
	)
		return null;

	return (
		<div className="depositSlip">
			<div className="depositSlipList">
				{refList?.map(item => (
					<div
						key={`promo-deposit-record-${bonusCode}-${item.depositId}`}>
						<div>{item.depositId}</div>
						<div>{number_format({ number: item.amount })}</div>
					</div>
				))}
			</div>
			<div className="txt-orange">
				{t("lbl_total")}: {number_format({ number: depositAmount })}
			</div>
		</div>
	);
};

const DepositMenu = ({
	cash,
	_currency,
	promotionInfo: { promotionType, canJoin, isJoin, depositId },
	t
}) => {
	if (
		depositId &&
		canJoin &&
		!isJoin &&
		(promotionType === defPromotionType.firstDeposit ||
			promotionType === defPromotionType.redeposit)
	)
		return (
			<div className="minAmount">
				<div>
					<div>{t("lbl_ID")}</div>
					<div>{depositId}</div>
				</div>
				<div>
					<div>{t("lbl_DepositAmount")}</div>
					<div>{`${_currency} ${cash}`}</div>
				</div>
			</div>
		);

	return null;
};
