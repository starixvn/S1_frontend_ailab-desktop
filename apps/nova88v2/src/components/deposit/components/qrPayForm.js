import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import { getUrlParameter, number_format } from "../../common/common";
import { paymentImgUrl } from "../../../config";
import PromotionSelect from "./promotionSelect";
import ShortcutAmountList from "./shortcutAmountList";

const QRPayForm = ({
	t,
	depositType,
	_isConvert,
	QRPayGroupList,
	getQRPayInfoList,
	QRPayInfoList,
	formInfo,
	depositPromoList,
	isGroupListFetchDone,
	setFormInfo,
	onChangePromotion,
	onInputboxKeyDown,
	onChangeAmount,
	onValidAmount
}) => {
	const defaultGroupId = Number(getUrlParameter("gId"));
	const defaultChannelId = Number(getUrlParameter("channelId"));

	const [groupIdForRecord, setGroupIdForRecord] = useState(defaultGroupId);
	const [infoChannelIdForRecord, setInfoChannelIdForRecord] =
		useState(defaultChannelId);

	const onGetQRPayInfoList = async gId => {
		window.history.replaceState(
			{},
			"",
			`${window.location.pathname}?type=${depositType}&gId=${gId}`
		);

		setGroupIdForRecord(gId);
		setInfoChannelIdForRecord(null);

		const infoList = await getQRPayInfoList(gId);

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
		window.history.replaceState(
			{},
			"",
			`${window.location.pathname}?type=${depositType}&gId=${groupIdForRecord}&channelId=${item.channelId}`
		);

		setInfoChannelIdForRecord(item.channelId);
		setFormInfo(prev => {
			return {
				...item,
				amount: null,
				depositPromo: prev.depositPromo
			};
		});
	};

	const placeHolderText = `${t("lbl_MinMaxAmount")} ${
		_isConvert ? formInfo.minAmount / 1000 : formInfo.minAmount
	} ~ ${_isConvert ? formInfo.maxAmount / 1000 : formInfo.maxAmount}`;

	useEffect(() => {
		const getData = async () => {
			if (QRPayGroupList.some(item => item.groupId === defaultGroupId)) {
				await onGetQRPayInfoList(defaultGroupId);
			} else if (QRPayGroupList.length > 0) {
				await onGetQRPayInfoList(QRPayGroupList[0].groupId);
			}
		};

		if (isGroupListFetchDone) {
			getData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isGroupListFetchDone]);

	const isSelAmountType = formInfo.amountRule === 3;

	if (QRPayGroupList.length <= 0) return null;

	return (
		<>
			<div className="subModuleTitle">
				<i className="txt-blue">*</i>
				{t("lbl_PaymentModes")}
				{_isConvert && (
					<div className="info">
						{t("Label_Deposit_AdditionalInfo")}
					</div>
				)}
			</div>
			<div className="subModule">
				<div>
					{QRPayGroupList.map(item => (
						<button
							key={`deposit-QRPay-group-${item.groupName}}`}
							onClick={() => onGetQRPayInfoList(item.groupId)}
							className={
								item.groupId === groupIdForRecord
									? "active"
									: ""
							}
						>
							<div>
								<img
									alt={item.groupName}
									src={`${paymentImgUrl}/${item.groupName?.toLowerCase()}.png`}
								/>
								<i className="icon icon-checkmark" />
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
					))}
				</div>
			</div>

			{QRPayInfoList.length > 1 && (
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
							{QRPayInfoList.map(item => (
								<button
									key={`deposit-mobilePay-info-${item.groupName}-${item.channelId}}`}
									onClick={() => onSetInfoData(item)}
									className={
										item.channelId ===
										infoChannelIdForRecord
											? "active"
											: ""
									}
								>
									<div>
										<img
											alt={item.groupName}
											src={`${paymentImgUrl}/${item.groupName?.toLowerCase()}.png`}
										/>
										<i className="icon icon-checkmark" />
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
							))}
						</div>
					</div>
				</>
			)}

			<div className="subModuleTitle">
				<i className="txt-blue">*</i>
				{t("lbl_DepositAmount")}
			</div>
			<div className="subModule">
				<Inputbox
					className="inputBox-white"
					value={formInfo.amount}
					onChange={e => onChangeAmount(e.target.value)}
					onBlur={() => onValidAmount(formInfo.amount)}
					checked={formInfo?.checked}
					tip={formInfo?.tip}
					_isConvert={_isConvert}
					isAmount={true}
					placeholder={placeHolderText}
					onKeyDown={onInputboxKeyDown}
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

			<PromotionSelect
				value={formInfo?.depositPromo ?? {}}
				amount={Number(formInfo.amount)}
				depositPromoList={depositPromoList}
				onSelectItem={onChangePromotion}
			/>
		</>
	);
};

QRPayForm.propTypes = {
	t: PropTypes.func.isRequired,
	depositType: PropTypes.string.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	QRPayGroupList: PropTypes.arrayOf(PropTypes.any).isRequired,
	getQRPayInfoList: PropTypes.func.isRequired,
	QRPayInfoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	onChangePromotion: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired,
	depositPromoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	isGroupListFetchDone: PropTypes.bool.isRequired,
	onChangeAmount: PropTypes.func.isRequired,
	onValidAmount: PropTypes.func.isRequired
};

export default QRPayForm;
