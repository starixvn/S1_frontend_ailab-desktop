import React, { useState, useEffect, useContext } from "react";
import PropTypes, { func } from "prop-types";
import { userInfoContext } from "../../common/context";
import Inputbox from "../../common/inputbox";
import ShortcutAmountList from "./shortcutAmountList";
import {
	defCurrencyList,
	getUrlParameter,
	number_format
} from "../../common/common";
import { paymentImgUrl } from "../../../config";
import { useSyncRouteQuery } from "../hooks";

import PromotionSelect from "./promotionSelect";

const AutoDepositForm = ({
	t,
	_isConvert,
	depositType,
	formInfo,
	depositPromoList,
	onChangeAmount,
	onChangePromotion,
	setFormInfo,
	onInputboxKeyDown,
	autoDepositGroupList
}) => {
	const { userInfo } = useContext(userInfoContext);
	const parameterSysId = Number(getUrlParameter("sysId"));

	const [sysIdForRecord, setSysIdForRecord] = useState(parameterSysId);

	const onSetSysIdToInfoData = async item => {
		setSysIdForRecord(item.sysId);

		await setFormInfo(prev => {
			return {
				...prev,
				minAmount: item.minAmount,
				maxAmount: item.maxAmount,
				sysId: item.sysId
			};
		});
	};

	useSyncRouteQuery({
		type: depositType,

		sysId: sysIdForRecord
	});

	useEffect(() => {
		const setDefaultBankInfo = () => {
			const defaultIdx = autoDepositGroupList.findIndex(
				item => item.sysId === parameterSysId
			);

			onSetSysIdToInfoData(
				autoDepositGroupList[defaultIdx !== -1 ? defaultIdx : 0]
			);
		};

		setDefaultBankInfo();
	}, []);

	const placeHolderText = `${t("lbl_MinMaxAmount")} ${
		_isConvert ? formInfo.minAmount / 1000 : formInfo.minAmount
	} ~ ${_isConvert ? formInfo.maxAmount / 1000 : formInfo.maxAmount}`;

	return (
		<>
			<div className="subModuleTitle">
				<i className="txt-blue">*</i>
				{t("lbl_SelectBank")}
				{_isConvert && (
					<div className="info">
						{t("Label_Deposit_AdditionalInfo")}
					</div>
				)}
			</div>

			<div className="subModule selectBank">
				<div>
					{autoDepositGroupList.map(item => {
						const bankLogo = String(item.bankLogo).toLowerCase();

						return (
							<button
								key={`deposit-auto--${item.bankLogo}}`}
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

			{!formInfo.selBank ||
			autoDepositGroupList.some(item => item.sysId === sysIdForRecord) ? (
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
							value={formInfo.amount}
							onChange={e => onChangeAmount(e.target.value)}
							checked={formInfo?.checked}
							tip={formInfo?.tip}
							_isConvert={_isConvert}
							isAmount={true}
							placeholder={placeHolderText}
							onKeyDown={onInputboxKeyDown}
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

AutoDepositForm.propTypes = {
	t: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	depositType: PropTypes.string.isRequired,
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	depositPromoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	onChangeAmount: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired,
	autoDepositGroupList: PropTypes.arrayOf(PropTypes.any).isRequired,
	onChangePromotion: func.isRequired
};

export default AutoDepositForm;
