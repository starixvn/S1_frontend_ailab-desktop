import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import Inputbox from "../../common/inputbox";
import { getUrlParameter, number_format } from "../../common/common";
import config from "../../../config";
import PromotionSelect from "./PromotionSelect";

const QuickTransferForm = ({
	quickTransferGroupList,
	depositType,
	_isConvert,
	formInfo,
	depositPromoList,
	isGroupListFetchDone,
	onChangeForm,
	onChangePromotion,
	setFormInfo,
	onInputboxKeyDown
}) => {
	const { t } = useTranslation();
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

	// * 設定默認 payment method, 按照 url payId 或 使用第一個
	useEffect(() => {
		const getData = async () => {
			const defaultGroupListIdx = quickTransferGroupList.findIndex(
				item => item.payId === parameterPayId
			);

			const bankGroupItem =
				quickTransferGroupList[
					defaultGroupListIdx !== -1 ? defaultGroupListIdx : 0
				];

			onChangeBankGroup(bankGroupItem);
		};

		if (isGroupListFetchDone && quickTransferGroupList.length > 0) {
			getData();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isGroupListFetchDone]);

	// * 即時更新 url record
	useEffect(() => {
		const params = new URLSearchParams({
			type: depositType,
			pName: payNameForRecord,
			pId: payIdForRecord,
			sysId: sysIdForRecord
		});
		const url = `${window.location.pathname}?${params.toString()}`;

		window.history.replaceState({}, "", url);
	}, [payNameForRecord, payIdForRecord, sysIdForRecord]);

	const supportBanksByPayId =
		quickTransferGroupList.find(item => item.payId === payIdForRecord)
			?.supportBanks || [];

	if (quickTransferGroupList.length <= 0) return null;

	const formatMinAmount = number_format({
		number: formInfo.minAmount,
		digits: 0
	});
	const formatMaxAmount = number_format({
		number: formInfo.maxAmount,
		digits: 0
	});

	return (
		<>
			<div className="subModuleTitle">
				<span>
					<i className="txt-blue">*</i>
					{t("lbl_PaymentModes")}
				</span>
				{_isConvert && (
					<div className="info">
						{t("Label_Deposit_AdditionalInfo")}
					</div>
				)}
			</div>

			<div className="subModule">
				<div>
					{quickTransferGroupList.map(item => {
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
										src={`${config.cloudImgUrl}/${payName}.png`}
										alt={item.payName}
									/>
									<i className="icon icon-icon32px_check" />
								</div>

								<div className="bank">
									<div>{item.payName}</div>

									<div>{`${number_format({
										number: item.minAmount,
										formatRequired: false,
										digits: 0
									})}~${number_format({
										number: item.maxAmount,
										formatRequired: false,
										digits: 0
									})}`}</div>
								</div>
							</button>
						);
					})}
				</div>
			</div>

			{supportBanksByPayId.length > 0 && (
				<>
					<div className="subModuleTitle">
						<span>
							<i className="txt-blue">*</i>
							{t("lbl_SelectBank")}
						</span>
						{_isConvert && (
							<div className="info">
								{t("Label_Deposit_AdditionalInfo")}
							</div>
						)}
					</div>

					<div className="subModule selectBank">
						<div>
							{supportBanksByPayId.map(item => {
								const bankLogo = String(
									item.bankLogo
								).toLowerCase();
								return (
									<button
										key={item.bankLogo}
										onClick={() =>
											onSetSysIdToInfoData(item)
										}
										className={classNames({
											active:
												item.sysId === sysIdForRecord
										})}>
										<div>
											<img
												alt={item.bankName}
												src={`${config.cloudImgUrl}/${bankLogo}`}
											/>
											<i className="icon icon-icon32px_check" />
										</div>

										<div className="bank">
											<div>{item.bankName}</div>

											<div>{`${number_format({
												number: item.minAmount,
												formatRequired: false,
												digits: 0
											})}~${number_format({
												number: item.maxAmount,
												formatRequired: false,
												digits: 0
											})}`}</div>
										</div>
									</button>
								);
							})}
						</div>
					</div>
				</>
			)}

			<div className="subModuleTitle">
				<span>
					<i className="txt-blue">*</i>
					{t("lbl_DepositAmount")}
					{t("lbl_DepositAmountNote")}
				</span>
			</div>
			<div className="subModule">
				<Inputbox
					// title={t("lbl_Amount")}
					value={formInfo.amount?.val}
					onChange={e => onChangeForm(e.target.value, "amount")}
					onBlur={e => onChangeForm(e.target.value, "amount")}
					checked={formInfo.amount?.checked}
					tip={formInfo.amount?.tip}
					_isConvert={_isConvert}
					isAmount={true}
					placeholder={`${t(
						"lbl_MinMaxAmount"
					)} ${formatMinAmount} / ${formatMaxAmount}`}
					onKeyDown={onInputboxKeyDown}
				/>
			</div>
			{depositPromoList?.length > 0 && (
				<>
					<div className="subModuleTitle">
						<span>
							<i className="txt-blue" />
							{t("lbl_Select_Bonus")}
						</span>
					</div>

					<PromotionSelect
						value={formInfo?.depositPromo ?? {}}
						amount={Number(formInfo.amount)}
						depositPromoList={depositPromoList}
						onSelectItem={onChangePromotion}
					/>
				</>
			)}
		</>
	);
};

QuickTransferForm.propTypes = {
	depositType: PropTypes.string.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired,
	depositPromoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	isGroupListFetchDone: PropTypes.bool.isRequired,
	onChangeForm: PropTypes.func.isRequired,
	onChangePromotion: PropTypes.func.isRequired
};

export default QuickTransferForm;
