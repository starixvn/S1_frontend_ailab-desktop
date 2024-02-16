import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import { getUrlParameter, number_format } from "../../common/common";
import config from "../../../config";

import PromotionSelect from "./PromotionSelect";

const OnlineBankForm = ({
	t,
	depositType,
	_isConvert,
	autoChannelBankGroupList,
	formInfo,
	depositPromoList,
	isGroupListFetchDone,
	onChangeForm,
	onChangePromotion,
	setFormInfo,
	onInputboxKeyDown
}) => {
	const parameterSysId = Number(getUrlParameter("sysId"));

	const [sysIdForRecord, setSysIdForRecord] = useState(parameterSysId);

	const onChangeBankGroup = async item => {
		window.history.replaceState(
			{},
			"",
			`${window.location.pathname}?type=${depositType}&sysId=${item.sysId}`
		);

		setFormInfo(prev => {
			return {
				...item,
				sysId: item.sysId,
				depositPromo: prev.depositPromo
			};
		});

		setSysIdForRecord(item.sysId);
	};

	useEffect(() => {
		const getData = async () => {
			const defaultGroupListIdx = autoChannelBankGroupList.findIndex(
				item => item.sysId === sysIdForRecord
			);

			onChangeBankGroup(
				autoChannelBankGroupList[
					defaultGroupListIdx !== -1 ? defaultGroupListIdx : 0
				] ?? {}
			);
		};

		if (isGroupListFetchDone) {
			getData();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isGroupListFetchDone]);

	if (autoChannelBankGroupList.length <= 0) return null;

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
					{t("lbl_SelectBank")}
				</span>
				{_isConvert && (
					<div className="info">
						{t("Label_Deposit_AdditionalInfo")}
					</div>
				)}
			</div>
			<div className="subModule">
				<div>
					{autoChannelBankGroupList.map(item => (
						<button
							key={`deposit-onlinePay-info-${item.bankLogo}}`}
							onClick={() => onChangeBankGroup(item)}
							className={
								item.sysId === sysIdForRecord ? "active" : ""
							}>
							<div>
								<img
									alt={item.bankLogo}
									src={`${
										config.cloudImgUrl
									}/${item.bankLogo?.toLowerCase()}`}
								/>
								<i className="icon icon-checkmark" />
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
					))}
				</div>
			</div>

			{!formInfo.selBank && (
				<>
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
							onChange={e =>
								onChangeForm(e.target.value, "amount")
							}
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
				</>
			)}

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

OnlineBankForm.propTypes = {
	t: PropTypes.func.isRequired,
	depositType: PropTypes.string.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	autoChannelBankGroupList: PropTypes.arrayOf(PropTypes.any).isRequired,
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired,
	depositPromoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	isGroupListFetchDone: PropTypes.bool.isRequired,
	onChangeForm: PropTypes.func.isRequired,
	onChangePromotion: PropTypes.func.isRequired
};

export default OnlineBankForm;
