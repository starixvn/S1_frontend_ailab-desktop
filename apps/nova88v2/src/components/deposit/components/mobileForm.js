import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import {
	getUrlParameter,
	number_format,
	defCurrencyList
} from "../../common/common";
import ShortcutAmountList from "./shortcutAmountList";
import { paymentImgUrl } from "../../../config";
import { useSyncRouteQuery } from "../hooks";
import PromotionSelect from "./promotionSelect";

const defInputCol = {
	payAccount: "payAccount"
};

const MobileForm = ({
	t,
	_isConvert,
	depositType,
	mobilePayGourpList,
	getMobilePayInfoList,
	mobilePayInfoList,
	isGroupListFetchDone,
	formInfo,
	depositPromoList,
	setFormInfo,
	onChangePromotion,
	onChangeAmount,
	onInputboxKeyDown,
	userInfo
}) => {
	const defaultGroupId = Number(getUrlParameter("gId"));
	const defaultChannelId = Number(getUrlParameter("channelId"));

	const [groupIdForRecord, setGroupIdForRecord] = useState(defaultGroupId);
	const [infoChannelIdForRecord, setInfoChannelIdForRecord] =
		useState(defaultChannelId);

	const onGetMobileInfoList = async gId => {
		setGroupIdForRecord(gId);
		setInfoChannelIdForRecord(null);

		const infoList = await getMobilePayInfoList(gId);

		if (infoList.some(item => item.channelId === infoChannelIdForRecord)) {
			const defaultInfoListIdx = infoList.findIndex(
				item => item.channelId === infoChannelIdForRecord
			);

			onSetInfoData(infoList[defaultInfoListIdx]);
		} else if (infoList.length > 0) {
			onSetInfoData(infoList[0]);
		}
	};

	const onSetInfoData = item => {
		setInfoChannelIdForRecord(item.channelId);
		setFormInfo(prev => ({ ...prev, ...item }));
	};

	const onChangeInput = ({ val, col }) => {
		if (col === defInputCol.payAccount) {
			setFormInfo(prev => ({
				...prev,
				[col]: { value: val, tip: "", checked: true }
			}));
		} else {
			setFormInfo(prev => ({ ...prev, [col]: val }));
		}
	};

	useSyncRouteQuery({
		type: depositType,
		gId: groupIdForRecord,
		channelId: infoChannelIdForRecord
	});

	useEffect(() => {
		const getData = async () => {
			if (
				mobilePayGourpList.some(item => item.groupId === defaultGroupId)
			) {
				await onGetMobileInfoList(defaultGroupId);
			} else if (mobilePayGourpList.length > 0) {
				await onGetMobileInfoList(mobilePayGourpList[0].groupId);
			}
		};

		if (isGroupListFetchDone) {
			getData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isGroupListFetchDone]);

	const isSelAmountType = formInfo.amountRule === 3;

	const placeHolderText = `${t("lbl_MinMaxAmount")} ${
		_isConvert ? formInfo.minAmount / 1000 : formInfo.minAmount
	} ~ ${_isConvert ? formInfo.maxAmount / 1000 : formInfo.maxAmount}`;

	if (mobilePayGourpList.length <= 0) return null;

	const notShowingPayGroupList =
		userInfo.currencyId === defCurrencyList.BDT &&
		mobilePayGourpList.length === 1;

	return (
		<>
			{notShowingPayGroupList ? null : (
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
							{mobilePayGourpList.map(item => {
								const groupName = String(
									item.groupName
								).toLowerCase();
								return (
									<button
										key={`deposit-mobilePay-group-${item.groupName}}`}
										onClick={() =>
											onGetMobileInfoList(item.groupId)
										}
										className={
											item.groupId === groupIdForRecord
												? "active"
												: ""
										}>
										<div>
											<img
												alt={item.groupName}
												src={`${paymentImgUrl}/${groupName}.png`}
											/>

											<i className="icon icon-icon32px_check" />
										</div>
										<div className="bank">
											<div>{item.groupName}</div>
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
				</>
			)}

			{mobilePayInfoList.length > 1 && (
				<>
					<div className="subModuleTitle">
						<i className="txt-blue">*</i>
						{t("lbl_SelectChannel")}
						{_isConvert && (
							<div className="info">
								{t("Label_Deposit_AdditionalInfo")}
							</div>
						)}
					</div>

					<div className="subModule">
						<div>
							{mobilePayInfoList.map(item => {
								const imgParam = item.channelName;

								const imgName = String(imgParam).toLowerCase();

								return (
									<button
										key={`deposit-mobilePay-info-${item.groupName}-${item.channelId}}`}
										onClick={() => onSetInfoData(item)}
										className={
											item.channelId ===
											infoChannelIdForRecord
												? "active"
												: ""
										}>
										<div>
											<img
												alt={item.groupName}
												src={`${paymentImgUrl}/${imgName}.png`}
											/>
											<i className="icon icon-icon32px_check" />
										</div>

										<div className="bank">
											<div>{item.channelName}</div>
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
				</>
			)}

			{userInfo.currencyId === defCurrencyList.INR &&
				formInfo?.payName === "TenPay" && (
					<>
						<div className="subModuleTitle">
							<i className="txt-blue">*</i>
							{formInfo?.groupName}
						</div>
						<div className="subModule">
							<Inputbox
								className={`inputBox-white${
									formInfo?.payAccount?.tip ? " error" : ""
								}`}
								value={formInfo?.payAccount?.value}
								onChange={e =>
									onChangeInput({
										val: e.target.value,
										col: defInputCol.payAccount
									})
								}
								checked={formInfo?.payAccount?.checked}
								tip={formInfo?.payAccount?.tip}
								placeholder={t("lbl_EnterYourUPI")}
								onKeyDown={onInputboxKeyDown}
							/>
						</div>
					</>
				)}

			{infoChannelIdForRecord ? (
				<>
					<div className="subModuleTitle">
						<i className="txt-blue">*</i>
						{t("lbl_DepositAmount")}
						{userInfo.currencyId === defCurrencyList.IDR &&
							t("lbl_DepositAmountNote")}
					</div>

					<div className="subModule">
						<div className="column">
							{isSelAmountType && (
								<FixedAmountList
									minAmount={formInfo.minAmount}
									maxAmount={formInfo.maxAmount}
									amountList={formInfo.amountList}
									amount={formInfo.amount}
									_isConvert={_isConvert}
									onChangeAmount={onChangeAmount}
								/>
							)}
						</div>
						<Inputbox
							className="inputBox-white"
							readOnly={isSelAmountType}
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

						{!isSelAmountType && (
							<ShortcutAmountList
								amount={formInfo.amount}
								minAmount={formInfo.minAmount}
								maxAmount={formInfo.maxAmount}
								onClick={amount => onChangeAmount(amount)}
							/>
						)}
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

const FixedAmountList = ({
	minAmount,
	maxAmount,
	amountList,
	amount,
	_isConvert,
	onChangeAmount
}) => {
	const rows = amountList
		?.filter(a => a >= minAmount && a <= maxAmount)
		.map(a => {
			const _afterConvertAmount = _isConvert ? a / 1000 : a;
			const isSelected = Number(amount) === _afterConvertAmount;

			return (
				<button
					onClick={() => onChangeAmount(_afterConvertAmount)}
					className={`blue${isSelected ? " active" : ""}`}
					key={`deposit-mobile-${a}`}>
					{number_format(a, _isConvert)}
					<i className="icon icon-checkmark" />
				</button>
			);
		});
	return <div className="btnGroup buttonBox">{rows}</div>;
};

FixedAmountList.defaultProps = {
	amount: ""
};

FixedAmountList.propTypes = {
	amount: PropTypes.string,
	amountList: PropTypes.arrayOf(PropTypes.number).isRequired,
	maxAmount: PropTypes.number.isRequired,
	minAmount: PropTypes.number.isRequired,
	onChangeAmount: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired
};

MobileForm.defaultProps = {
	onChangePromotion: () => null
};

MobileForm.propTypes = {
	t: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	depositType: PropTypes.string.isRequired,
	mobilePayGourpList: PropTypes.arrayOf(PropTypes.any).isRequired,
	getMobilePayInfoList: PropTypes.func.isRequired,
	mobilePayInfoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	depositPromoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	onChangeAmount: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired,
	isGroupListFetchDone: PropTypes.bool.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	onChangePromotion: PropTypes.func
};

export default MobileForm;
