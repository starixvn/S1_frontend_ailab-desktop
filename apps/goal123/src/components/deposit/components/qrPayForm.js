import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import FixedAmountList from "./fixedAmountList";
import { getUrlParameter, number_format } from "../../common/common";
import config from "../../../config";

import PromotionSelect from "./PromotionSelect";

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
	onChangeForm
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
				depositPromo: prev.depositPromo
			};
		});
	};

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
									src={`${
										config.cloudImgUrl
									}/${item.groupName?.toLowerCase()}.png`}
								/>
								<i className="icon icon-checkmark" />
							</div>

							<div className="bank">
								<div>{item.channelName}</div>

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

			{QRPayInfoList.length > 1 && (
				<>
					<div className="subModuleTitle">
						<span>
							<i className="txt-blue">*</i>
							{t("lbl_SelectChannel")}
						</span>
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
									key={`deposit-mobilePay-info-${item.channelName}-${item.channelId}}`}
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
											alt={item.channelName}
											src={`${
												config.cloudImgUrl
											}/${item.channelName?.toLowerCase()}.png`}
										/>
										<i className="icon icon-checkmark" />
									</div>

									<div className="bank">
										<div>{item.displayChannelName}</div>
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
				</>
			)}

			{infoChannelIdForRecord ? (
				<>
					<div className="subModuleTitle">
						<span>
							<i className="txt-blue">*</i>
							{t("lbl_DepositAmount")}
							{t("lbl_DepositAmountNote")}
						</span>
					</div>

					<div className="subModule">
						<div className="column">
							{isSelAmountType ? (
								<FixedAmountList
									minAmount={formInfo.minAmount}
									maxAmount={formInfo.maxAmount}
									amountList={formInfo.amountList}
									amount={formInfo.amount?.val}
									_isConvert={_isConvert}
									onChangeForm={onChangeForm}
								/>
							) : null}
							<Inputbox
								readOnly={isSelAmountType}
								// title={t("lbl_Amount")}
								value={formInfo.amount?.val}
								onChange={e =>
									onChangeForm(e.target.value, "amount")
								}
								onBlur={e =>
									onChangeForm(e.target.value, "amount")
								}
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
					</div>
				</>
			) : null}

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
	onChangeForm: PropTypes.func.isRequired
};

export default QRPayForm;
