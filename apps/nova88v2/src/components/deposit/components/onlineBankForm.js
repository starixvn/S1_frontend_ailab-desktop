import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import ShortcutAmountList from "./shortcutAmountList";
import { defCurrencyList, getUrlParameter } from "../../common/common";
import { cloudImgUrl } from "../../../config";
import { useSyncRouteQuery } from "../hooks";

import PromotionSelect from "./promotionSelect";
import { userInfoContext } from "../../common/context";

const OnlineBankForm = ({
	t,
	formatAmount,
	depositType,
	onlineBankGroupList,
	getOnlineBankInfoList,
	onlineBankInfoList,
	formInfo,
	depositPromoList,
	onChangeAmount,
	onChangePromotion,
	setFormInfo,
	setOnlineBankInfoList,
	onInputboxKeyDown,
	isGroupListFetchDone
}) => {
	const { userInfo } = useContext(userInfoContext);
	const parameterPayName = getUrlParameter("pName");
	const parameterPayId = Number(getUrlParameter("pId"));
	const parameterSysId = Number(getUrlParameter("sysId"));

	const [payNameForRecord, setPayNameForRecord] = useState(parameterPayName);
	const [payIdForRecord, setPayIdForRecord] = useState(parameterPayId);
	const [sysIdForRecord, setSysIdForRecord] = useState(parameterSysId);

	const onChangeBankGroup = async item => {
		setSysIdForRecord(null);
		setPayIdForRecord(item.payId);
		setPayNameForRecord(item.payName);

		setFormInfo(prev => ({
			...item,
			amount: formInfo.amount,
			depositPromo: prev.depositPromo
		}));

		let infoList = [];

		if (item.selBank) {
			infoList = await getOnlineBankInfoList(item.payId);

			if (infoList?.some(infoItem => infoItem.sysId === parameterSysId)) {
				const defaultInfoListIdx = infoList.findIndex(
					infoItem => infoItem.sysId === parameterSysId
				);

				onSetSysIdToInfoData(infoList[defaultInfoListIdx]);
			} else if (infoList?.length > 0) {
				onSetSysIdToInfoData(infoList[0]);
			}
		} else {
			await setOnlineBankInfoList([]);
		}
	};

	const onSetSysIdToInfoData = async item => {
		setSysIdForRecord(item.sysId);

		await setFormInfo(prev => ({
			...prev,
			sysId: item.sysId
		}));
	};

	useSyncRouteQuery({
		type: depositType,
		pName: payNameForRecord,
		pId: payIdForRecord,
		sysId: sysIdForRecord
	});

	useEffect(() => {
		const getData = async () => {
			const defaultGroupListIdx = onlineBankGroupList.findIndex(
				item => item.payId === parameterPayId
			);

			const bankGroupItem =
				onlineBankGroupList[
					defaultGroupListIdx !== -1 ? defaultGroupListIdx : 0
				];

			onChangeBankGroup(bankGroupItem);
		};

		if (isGroupListFetchDone && onlineBankGroupList.length > 0) {
			getData();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isGroupListFetchDone]);

	const placeHolderText =
		userInfo.currencyId === defCurrencyList.IDR
			? `${t("lbl_MinMaxAmount")} ${formInfo.minAmount / 1000} ~ ${
					formInfo.maxAmount / 1000
			  }`
			: `${t("lbl_MinMaxAmount")} ${formInfo.minAmount} ~ ${
					formInfo.maxAmount
			  }`;

	if (onlineBankGroupList.length <= 0) return null;

	return (
		<>
			<div className="subModuleTitle">
				<i className="txt-blue">*</i>
				{t("lbl_Payment_Method")}
			</div>

			<div className="subModule">
				<div>
					{onlineBankGroupList.map(item => {
						const payName = String(item.payName).toLowerCase();

						return (
							<button
								key={`deposit-onlinePay-group-${item.payName}}`}
								onClick={() => onChangeBankGroup(item)}
								className={
									item.payName === payNameForRecord
										? "active"
										: ""
								}>
								<div>
									<img
										alt={item.payName}
										src={`${cloudImgUrl}/SiteSkin/img/Payment/${payName}.png`}
									/>
									<i className="icon icon-icon32px_check" />
								</div>

								<div className="bank">
									<div>{item.payName}</div>

									<div>
										<div>
											{`${t("lbl_Min")}: ${formatAmount(
												item.minAmount
											)}`}
										</div>
										<div>
											{`${t("lbl_Max")}: ${formatAmount(
												item.maxAmount
											)}`}
										</div>
									</div>
								</div>
							</button>
						);
					})}
				</div>
			</div>

			{!!onlineBankInfoList.length && (
				<div className="subModule selectBank">
					<div className="subModuleTitle">
						<i className="txt-blue">*</i>
						{t("lbl_SelectBank")}
					</div>
					<div>
						{onlineBankInfoList.map(item => {
							const bankLogo = String(
								item.bankLogo
							).toLowerCase();
							return (
								<button
									key={`deposit-onlinePay-info-${item.bankLogo}}`}
									onClick={() => onSetSysIdToInfoData(item)}
									className={
										item.sysId === sysIdForRecord
											? "active"
											: ""
									}>
									<div>
										<img
											src={`${cloudImgUrl}/SiteSkin/img/BankLogo/${bankLogo}`}
											alt={item.bankName}
										/>
										<i className="icon icon-icon32px_check" />
									</div>

									<div className="bank">
										<div>{item.bankName}</div>
									</div>
								</button>
							);
						})}
					</div>
				</div>
			)}

			{!formInfo.selBank ||
			onlineBankInfoList.some(item => item.sysId === sysIdForRecord) ? (
				<>
					<div className="subModuleTitle">
						<i className="txt-blue">*</i>
						{t("lbl_DepositAmount")}
						{userInfo.currencyId === defCurrencyList.IDR &&
							t("lbl_DepositAmountNote")}
					</div>
					<div className="subModule">
						<Inputbox
							className="inputBox-white"
							// title={t("lbl_Amount")}
							value={formInfo.amount}
							onChange={e => onChangeAmount(e.target.value)}
							checked={formInfo?.checked}
							tip={formInfo?.tip}
							_isConvert={false}
							isAmount={true}
							placeholder={placeHolderText}
							onKeyDown={onInputboxKeyDown}
							format={userInfo.currencyId === defCurrencyList.IDR}
						/>

						<ShortcutAmountList
							amount={formInfo.amount}
							minAmount={formInfo.minAmount}
							maxAmount={formInfo.maxAmount}
							onClick={amount => onChangeAmount(amount)}
						/>
					</div>
				</>
			) : null}

			<PromotionSelect
				value={formInfo?.depositPromo ?? {}}
				amount={Number(formInfo.amount)}
				depositPromoList={depositPromoList}
				onSelectItem={onChangePromotion}
			/>
		</>
	);
};

OnlineBankForm.propTypes = {
	t: PropTypes.func.isRequired,
	formatAmount: PropTypes.func.isRequired,
	depositType: PropTypes.string.isRequired,
	onlineBankGroupList: PropTypes.arrayOf(PropTypes.any).isRequired,
	getOnlineBankInfoList: PropTypes.func.isRequired,
	onlineBankInfoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	depositPromoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	setOnlineBankInfoList: PropTypes.func.isRequired,
	onChangeAmount: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired,
	isGroupListFetchDone: PropTypes.bool.isRequired
};

export default OnlineBankForm;
