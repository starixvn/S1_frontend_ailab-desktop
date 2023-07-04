import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { userInfoContext, popBoxContext } from "../common/context";
import { getUrlParameter, isConvert, number_format } from "../common/common";
import { api_promotion_GetPromotionDetail } from "../../service/api/promotion";
import { api_account_GetCustSpecificBonus } from "../../service/api/account";
import defPopBoxType from "../common/defPopBoxType";
import { defPromotionType } from "./promotion.def";
import { isClaimed } from "./promotion.common";
import ProcessBar from "./promotion.processBar";
import PromotionJoinButton from "./promotion.joinButton";
import PromoRule from "./promotion.promoRule";
import { defFilterType } from "./promotion.nav";
import CashBackInfo from "./cashBackInfo";
import path from "../../router";

export default () => {
	const filterType = Number(getUrlParameter("FilterType"));
	const isSpecialType = filterType === defFilterType.specialBonus;

	const { t } = useTranslation();
	const isMountedRef = useRef(null);

	const [promotionInfo, setPromotionInfo] = useState(null);

	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const _currency = t(`Currency_${userInfo.currencyId}`);

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
			icon: "icon-bell",
			btnBar: (
				<div className="btnGroup">
					<button className="btn-check" onClick={clickClose}>
						{t("lbl_Close")}
					</button>
				</div>
			)
		});
	};

	const getPromotionDetail = async (langId, bonusCode) => {
		await api_promotion_GetPromotionDetail({
			langId,
			BonusCode: bonusCode,
			currencyId: userInfo.currencyId
		}).then(
			({ data: { data, message, errorCode } }) => {
				if (!isMountedRef.current) return;

				const success = errorCode === 0;

				if (success) {
					setPromotionInfo(data);
				}
				openErrorMessagePopBox(message || "error", errorCode);
			},
			() => {
				if (isMountedRef.current) {
					openErrorMessagePopBox();
				}
			}
		);
	};

	const refreshProcessBar = ({ bonusCode, tpId, categoryId }) => {
		api_account_GetCustSpecificBonus({ bonusCode, tpId, categoryId }).then(
			({ data: { data, message, errorCode } }) => {
				if (!isMountedRef.current) return;

				const success = errorCode === 0;
				if (success) {
					setPromotionInfo(prev => ({
						...prev,
						custRollOver: data.rollover,
						custTurnOver: data.turnover
					}));
				}

				openErrorMessagePopBox(message || "error", errorCode);
			},
			() => {
				if (isMountedRef.current) openErrorMessagePopBox();
			}
		);
	};

	useEffect(() => {
		const bonusCode = getUrlParameter("BonusCode");
		getPromotionDetail(userInfo.langId, bonusCode);
	}, [userInfo.isLogin, userInfo.langId]);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	let _isClaimed = false;

	if (promotionInfo !== null) {
		_isClaimed = isClaimed(promotionInfo);
	}

	let wrapperClass = "";
	if (_isClaimed || promotionInfo?.beenUsed) {
		wrapperClass = " claimedInfo";
	}

	const specialBonusWrapperClass =
		isSpecialType && !promotionInfo?.canJoin ? " expiredClaimedInfo" : "";

	if (promotionInfo === null) return null;

	const clickBack = () => {
		navigate(`/${userInfo.langId}/${path.promotion.root}`);
	};

	return (
		<div className="infoModule">
			<button
				className="btn-check icon icon-arrow-left2"
				onClick={clickBack}>
				{t("lbl_Back")}
			</button>
			<div
				className={`promotionsInfo${wrapperClass}${specialBonusWrapperClass}`}>
				{_isClaimed ? <div className="claimed" /> : null}
				<img
					src={promotionInfo.banner}
					alt="promotionDetailData_banner"
				/>
				<div className="proData">
					<div className="proDataTitle">
						<div className="txt-darkBlue">
							{promotionInfo.title}
							<div>{promotionInfo.description}</div>
						</div>

						<div className="btnGroup">
							{/* <button className="btn-cancel" onClick={clickBack}>
								{t("lbl_Back")}
							</button> */}
							<PromotionJoinButton
								promotionInfo={promotionInfo}
								userInfo={userInfo}
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
						currencyId={userInfo.currencyId}
					/>

					<DepositMenu
						cash={number_format(
							promotionInfo.depositAmount,
							isConvert(userInfo.currencyId)
						)}
						_currency={_currency}
						promotionInfo={promotionInfo}
						t={t}
					/>

					<ProcessBar
						t={t}
						{...promotionInfo}
						refreshProcessBar={() =>
							refreshProcessBar(promotionInfo)
						}
						currencyId={userInfo.currencyId}
					/>

					<PromoRule
						promotionInfo={promotionInfo}
						t={t}
						currencyId={userInfo.currencyId}
						langId={userInfo.langId}
					/>

					<CashBackInfo
						bonusCode={promotionInfo.bonusCode}
						cashBackDetails={promotionInfo.cashBackDetails}
						currencyId={userInfo.currencyId}
						t={t}
					/>

					<div
						className="proDataBody"
						dangerouslySetInnerHTML={{
							__html: promotionInfo.details
						}}
					/>
				</div>
			</div>
		</div>
	);
};

const DepositSlip = ({ promotionInfo, t, isSpecialType, currencyId }) => {
	const { promotionType, refList, depositAmount, bonusCode } = promotionInfo;

	if (
		!refList ||
		promotionType !== defPromotionType.redeposit ||
		(isSpecialType && promotionInfo === defPromotionType.firstDeposit)
	)
		return null;

	return (
		<>
			<div className="colorInfo">
				<div>
					<span />
					{t("lbl_ID")}
				</div>
				<div>
					<span />
					{t("lbl_Amount")}
				</div>
			</div>
			<div className="depositSlip">
				<div className="depositSlipList">
					{refList?.map(item => (
						<div
							key={`promotion-deposit-record-${bonusCode}-${item.depositId}`}>
							<div>{item.depositId}</div>
							<div>
								{number_format(
									item.amount,
									isConvert(currencyId)
								)}
							</div>
						</div>
					))}
				</div>
				<div className="txt-orange">
					{t("lbl_total")}:{" "}
					{number_format(depositAmount, isConvert(currencyId))}
				</div>
			</div>
		</>
	);
};

DepositSlip.defaultProps = {
	isSpecialType: null,
	currencyId: null
};

DepositSlip.propTypes = {
	t: PropTypes.func.isRequired,
	isSpecialType: PropTypes.bool,
	promotionInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	currencyId: PropTypes.number
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

DepositMenu.defaultProps = {
	cash: null,
	_currency: null
};

DepositMenu.propTypes = {
	t: PropTypes.func.isRequired,
	cash: PropTypes.string,
	promotionInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	_currency: PropTypes.string
};
