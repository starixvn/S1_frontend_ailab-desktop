import React, { useContext, useEffect, useState } from "react";
import { arrayOf, bool, number, shape, string } from "prop-types";
import { useTranslation } from "react-i18next";
import { paymentImgUrl } from "../../../config";
import { userInfoContext } from "../../common/context";
import {
	defCurrencyList,
	getUrlParameter,
	isConvert,
	number_format
} from "../../common/common";
import { useSyncRouteQuery } from "../hooks";
import InputBox from "../../common/inputbox";
import ShortcutAmountList from "./shortcutAmountList";
import PromotionSelect from "./promotionSelect";

const ChatTransferForm = ({
	formInfo,
	depositType,
	isGroupListFetchDone,
	chatTransferGroupList = [],
	depositPromoList = [],
	setFormInfo,
	onChangePromotion,
	onChangeAmount,
	onInputboxKeyDown
}) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const _isConvert = isConvert(userInfo.currencyId);

	const parameterPayName = getUrlParameter("pName");
	const parameterPayId = Number(getUrlParameter("pId"));
	const parameterSysId = Number(getUrlParameter("sysId"));

	const [payNameForRecord, setPayNameForRecord] = useState(parameterPayName);
	const [payIdForRecord, setPayIdForRecord] = useState(parameterPayId);
	const [sysIdForRecord, setSysIdForRecord] = useState(parameterSysId);

	const onChangeBankGroup = ({ selectBank, ...item }) => {
		setSysIdForRecord(null);
		setPayIdForRecord(item.payId);
		setPayNameForRecord(item.payName);

		setFormInfo(prev => ({
			...item,
			selBank: selectBank,
			amount: formInfo.amount,
			depositPromo: prev.depositPromo
		}));

		if (selectBank) {
			const { supportBanks } = item;

			if (
				supportBanks?.some(
					infoItem => infoItem.sysId === parameterSysId
				)
			) {
				const defaultInfoListIdx = supportBanks.findIndex(
					infoItem => infoItem.sysId === parameterSysId
				);

				onSetSysIdToInfoData(supportBanks[defaultInfoListIdx]);
			} else if (supportBanks?.length > 0) {
				onSetSysIdToInfoData(supportBanks[0]);
			}
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

	// * 設定默認 payment method, 按照 url payId 或 使用第一個
	useEffect(() => {
		const getData = async () => {
			const defaultGroupListIdx = chatTransferGroupList.findIndex(
				item => item.payId === parameterPayId
			);

			const bankGroupItem =
				chatTransferGroupList[
					defaultGroupListIdx !== -1 ? defaultGroupListIdx : 0
				];

			onChangeBankGroup(bankGroupItem);
		};

		if (isGroupListFetchDone && chatTransferGroupList.length > 0) {
			getData();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isGroupListFetchDone]);

	const supportBanksByPayId =
		chatTransferGroupList.find(item => item.payId === payIdForRecord)
			?.supportBanks || [];

	const placeHolderText = `${t("lbl_MinMaxAmount")} ${
		_isConvert ? formInfo.minAmount / 1000 : formInfo.minAmount
	} ~ ${_isConvert ? formInfo.maxAmount / 1000 : formInfo.maxAmount}`;

	return (
		<>
			<div className="subModuleTitle">
				<i className="txt-blue">*</i>
				{t("lbl_Payment_Method")}
				{_isConvert && (
					<div className="info">
						{t("Label_Deposit_AdditionalInfo")}
					</div>
				)}
			</div>
			<div className="subModule">
				<div>
					{chatTransferGroupList.map(item => {
						const payName = String(item.payName).toLowerCase();

						return (
							<button
								key={item.payName}
								onClick={() => onChangeBankGroup(item)}
								className={
									item.payName === payNameForRecord
										? "active"
										: ""
								}>
								<div>
									<img
										alt={item.payName}
										src={`${paymentImgUrl}/${payName}.png`}
									/>
									<i className="icon icon-icon32px_check" />
								</div>

								<div className="bank">
									<div>{item.payName}</div>
									<div>
										{`${number_format(
											item.minAmount,
											_isConvert,
											0,
											false
										)} ~ ${number_format(
											item.maxAmount,
											_isConvert,
											0,
											false
										)}`}
									</div>
								</div>
							</button>
						);
					})}
				</div>
			</div>
			{supportBanksByPayId.length > 0 && (
				<div className="subModule selectBank">
					<div className="subModuleTitle">
						<i className="txt-blue">*</i>
						{t("lbl_SelectBank")}
						{_isConvert && (
							<div className="info">
								{t("Label_Deposit_AdditionalInfo")}
							</div>
						)}
					</div>
					<div>
						{supportBanksByPayId.map(item => {
							const bankLogo = String(
								item.bankLogo
							).toLowerCase();
							return (
								<button
									key={item.bankLogo}
									onClick={() => onSetSysIdToInfoData(item)}
									className={
										item.sysId === sysIdForRecord
											? "active"
											: ""
									}>
									<div>
										<img
											src={`${paymentImgUrl}/square/${bankLogo}`}
											alt={item.bankName}
										/>
										<i className="icon icon-icon32px_check" />
									</div>

									<div className="bank">
										<div>{item.bankName}</div>
										<div>
											{`${number_format(
												item.minAmount,
												_isConvert,
												0,
												false
											)} ~ ${number_format(
												item.maxAmount,
												_isConvert,
												0,
												false
											)}`}
										</div>
									</div>
								</button>
							);
						})}
					</div>
				</div>
			)}
			<div className="subModuleTitle">
				<i className="txt-blue">*</i>
				{t("lbl_DepositAmount")}
			</div>
			<div className="subModule">
				<InputBox
					className="inputBox-white"
					// title={t("lbl_Amount")}
					value={formInfo.amount}
					onChange={e => onChangeAmount(e.target.value)}
					checked={formInfo?.checked}
					tip={formInfo?.tip}
					_isConvert={_isConvert}
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

			<PromotionSelect
				value={formInfo?.depositPromo ?? {}}
				amount={Number(formInfo.amount)}
				depositPromoList={depositPromoList}
				onSelectItem={onChangePromotion}
			/>
		</>
	);
};

ChatTransferForm.propTypes = {
	depositType: string.isRequired,
	chatTransferGroupList: arrayOf(
		shape({
			selectBank: bool.isRequired,
			supportBanks: arrayOf(
				shape({
					sysId: number.isRequired,
					bankName: string.isRequired,
					bankCode: string.isRequired,
					bankLogo: string.isRequired,
					minAmount: number.isRequired,
					maxAmount: number.isRequired
				})
			).isRequired,
			payId: number.isRequired,
			payName: string.isRequired,
			groupId: number.isRequired,
			groupName: string,
			channelId: number.isRequired,
			channelName: string.isRequired,
			mode: number.isRequired,
			minAmount: number.isRequired,
			maxAmount: number.isRequired,
			amountRule: number.isRequired,
			amountList: arrayOf(number).isRequired,
			depositType: number.isRequired
		})
	).isRequired
};

export default ChatTransferForm;
