import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link, navigate } from "gatsby";
import { userInfoContext, popBoxContext, promoPopBox } from "../common/context";
import { getUrlParameter, isConvert, number_format } from "../common/common";
import { api_promotion_GetPromotionDetail } from "../../service/api/promotion";
import { api_account_GetCustSpecificBonus } from "../../service/api/account";
import { defPopBoxType } from "../common/popBox";
import { defPromotionType } from "./promotion.def";
import ProcessBar from "./promotion.processBar";
import PromotionJoinButton from "./promotion.joinButton";
import PromoRule from "./promotion.promoRule";
import { defFilterType } from "./promotion.nav";
import CashBackInfo from "./cashBackInfo";
import path from "../../router";
import PromoMission from "./promotion.mission";

export const useHandlePromotionInfo = ({ showAllPromosBtn = false }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setPromoBox } = useContext(promoPopBox);

	const urlBonusCode = getUrlParameter("BonusCode");

	useEffect(() => {
		if (
			window.location.pathname.includes(
				`${path.promotion.root}/${path.promotion.sub.promotionInfo.root}`
			)
		) {
			getPromotionDetail(userInfo.langId, urlBonusCode);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [urlBonusCode]);

	const closePromoPopBox = () => {
		setPromoBox(prev => ({ ...prev, isOpen: false }));
		window.history.replaceState({}, "", `${window.location.pathname}`);
	};

	const openErrorMessagePopBox = (
		message = t("msg_ApiServerError"),
		errorCode = null
	) => {
		const clickClose = () => {
			setPopBox({ isOpen: false });
		};

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
			BonusCode: bonusCode
		}).then(
			({ data: { data, message, errorCode } }) => {
				const success = errorCode === 0;

				if (success && data) {
					setPromoBox({
						isOpen: true,
						content: (
							<PromotionInfo
								promotionInfo={data}
								getPromotionDetail={getPromotionDetail}
								refreshProcessBar={refreshProcessBar}
								closePromoPopBox={closePromoPopBox}
								showAllPromosBtn={showAllPromosBtn}
							/>
						),
						processBarInfo: null
					});
				} else {
					if (!success) {
						openErrorMessagePopBox(message || "error", errorCode);
					}
					navigate(
						`${window.location.origin}${window.location.pathname}`
					);
				}
			},
			() => {
				openErrorMessagePopBox();
				navigate(
					`${window.location.origin}${window.location.pathname}`
				);
			}
		);
	};

	const refreshProcessBar = ({ bonusCode, tpId, categoryId }) => {
		api_account_GetCustSpecificBonus({
			BonusCode: bonusCode,
			TpId: tpId,
			CategoryId: categoryId
		}).then(
			({ data: { data, message, errorCode } }) => {
				const success = errorCode === 0;
				if (success)
					setPromoBox(prev => ({
						...prev,
						processBarInfo: data && {
							custRollOver: data.rollover,
							custTurnOver: data.turnover
						}
					}));
				else {
					openErrorMessagePopBox(message || "error", errorCode);
				}
			},
			() => {
				openErrorMessagePopBox();
			}
		);
	};

	return {
		getPromotionDetail,
		closePromoPopBox
	};
};

const PromotionInfo = ({
	promotionInfo,
	getPromotionDetail,
	refreshProcessBar,
	showAllPromosBtn = false,
	closePromoPopBox
}) => {
	const { promoBox } = useContext(promoPopBox);
	const filterType = Number(getUrlParameter("FilterType"));
	const isSpecialType = filterType === defFilterType.specialBonus;

	const { t } = useTranslation();

	const { userInfo } = useContext(userInfoContext);

	const _currency = t(`Currency_${userInfo.currencyId}`);

	const openLiveChat = () => {
		window.LiveChatWidget.call("maximize");
	};

	if (promotionInfo === null) return null;

	return (
		<div className="promotionsInfo">
			<div className="icon icon-close" onClick={closePromoPopBox} />
			<img src={promotionInfo.banner} alt="promotionDetailData_banner" />
			<div className="proData">
				<div className="proDataTitle">
					<div className="txt-blue2">
						{promotionInfo.title}
						<div className="txt-blue4">
							{promotionInfo.description}
						</div>
					</div>
					<div className="btnGroup">
						{!promotionInfo.canJoin &&
						promotionInfo.promotionType ===
							defPromotionType.other ? (
							<button className="red" onClick={openLiveChat}>
								{t("lbl_Promotion_ApplyNow")}
							</button>
						) : (
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
						)}

						{showAllPromosBtn && (
							<Link
								className="btn-check"
								to={`/${userInfo.langId}/${path.promotion.root}`}
							>
								{t("lbl_Promotion_AllPromos")}
							</Link>
						)}
					</div>
				</div>
				<CashBackInfo
					bonusCode={promotionInfo.bonusCode}
					cashBackDetails={promotionInfo.cashBackDetails}
					currencyId={userInfo.currencyId}
					t={t}
				/>

				<DepositSlip
					promotionInfo={promotionInfo}
					isSpecialType={isSpecialType}
					t={t}
					currencyId={userInfo.currencyId}
				/>

				<DepositMenu
					cash={number_format({
						number: promotionInfo.depositAmount,
						formatRequired: isConvert(userInfo.currencyId)
					})}
					_currency={_currency}
					promotionInfo={promotionInfo}
					t={t}
				/>

				<ProcessBar
					{...promotionInfo}
					t={t}
					custRollOver={
						promoBox.processBarInfo?.custRollOver ??
						promotionInfo.custRollOver
					}
					custTurnOver={
						promoBox.processBarInfo?.custTurnOver ??
						promotionInfo.custTurnOver
					}
					RefreshProcessBar={refreshProcessBar.bind(
						this,
						promotionInfo
					)}
					currencyId={userInfo.currencyId}
				/>
				{promotionInfo.promotionType ===
					defPromotionType.missionBonus &&
					!promotionInfo.isJoin && (
						<PromoMission promotionInfo={promotionInfo} />
					)}
				{promotionInfo.promotionType !==
					defPromotionType.missionBonus && (
					<PromoRule
						promotionInfo={promotionInfo}
						t={t}
						currencyId={userInfo.currencyId}
						langId={userInfo.langId}
					/>
				)}
				<div
					className="proDataBody"
					dangerouslySetInnerHTML={{
						__html: promotionInfo.details
					}}
				/>
			</div>
		</div>
	);
};

PromotionInfo.defaultProps = {
	getPromotionDetail: () => null,
	refreshProcessBar: () => null,
	showAllPromosBtn: null,
	closePromoPopBox: () => null
};

PromotionInfo.propTypes = {
	promotionInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	getPromotionDetail: PropTypes.func,
	refreshProcessBar: PropTypes.func,
	showAllPromosBtn: PropTypes.bool,
	closePromoPopBox: PropTypes.func
};

export default () => {
	const { promoBox, setPromoBox } = useContext(promoPopBox);
	const { popBox } = useContext(popBoxContext);

	if (promoBox.promotionInfo === null) return null;

	const { isOpen: openPromoPopBox } = promoBox;

	const closePromoPopBox = () => {
		setPromoBox(prev => ({ ...prev, isOpen: false }));
		window.history.replaceState({}, "", `${window.location.pathname}`);
	};

	return (
		<div className={`promoInfoPop${openPromoPopBox ? " active" : ""}`}>
			<div
				onClick={closePromoPopBox}
				className={`promoInfoPopMask${
					popBox.isOpen || !openPromoPopBox ? "" : " active"
				}`}
			/>
			{promoBox.content}
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
							key={`promotion-deposit-record-${bonusCode}-${item.depositId}`}
						>
							<div>{item.depositId}</div>
							<div>
								{number_format({
									number: item.amount,
									formatRequired: isConvert(currencyId)
								})}
							</div>
						</div>
					))}
				</div>
				<div className="txt-orange">
					{t("lbl_total")}:{" "}
					{number_format({
						number: depositAmount,
						formatRequired: isConvert(currencyId)
					})}
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
