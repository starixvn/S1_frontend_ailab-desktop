import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import { getUrlParameter, number_format } from "../../common/common";
import ShortcutAmountList from "./shortcutAmountList";
import { cloudImgUrl } from "../../../config";
import { useSyncRouteQuery } from "../hooks";

import PromotionSelect from "./promotionSelect";

const MobileForm = ({
	t,
	_isConvert,
	formatAmount,
	depositType,
	mobilePayGourpList,
	getMobilePayInfoList,
	mobilePayInfoList,
	isGroupListFetchDone,
	formInfo,
	depositPromoList,
	setFormInfo,
	onChangeAmount,
	onInputboxKeyDown
}) => {
	const defaultGroupId = Number(getUrlParameter("gId"));
	const defaultChannelId = Number(getUrlParameter("channelId"));

	const [groupIdForRecord, setGroupIdForRecord] = useState(defaultGroupId);
	const [infoChannelIdForRecord, setInfoChannelIdForRecord] = useState(
		defaultChannelId
	);

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
		setFormInfo(prev => {
			return { ...prev, ...item };
		});
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

	if (mobilePayGourpList.length <= 0) return null;

	return (
		<>
			<div className="subModuleTitle">
				<i className="txt-blue">*</i>
				{t("lbl_Payment_Method")}
			</div>

			<div className="subModule">
				<div>
					{mobilePayGourpList.map(item => {
						const groupName = String(item.groupName).toLowerCase();
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
										src={`${cloudImgUrl}/SiteSkin/img/MobilePay/${groupName}.png`}
									/>

									<i className="icon icon-icon32px_check" />
								</div>
								<div className="bank">
									<div>{item.channelName}</div>

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

			{mobilePayInfoList.length > 1 && (
				<>
					<div className="subModuleTitle">
						<i className="txt-blue">*</i>
						{t("lbl_SelectChannel")}
					</div>

					<div className="subModule">
						<div>
							{mobilePayInfoList.map(item => {
								const groupName = String(
									item.groupName
								).toLowerCase();

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
												src={`${cloudImgUrl}/SiteSkin/img/MobilePay/${groupName}.png`}
											/>
											<i className="icon icon-icon32px_check" />
										</div>

										<div className="bank">
											<div>{item.channelName}</div>

											<div>
												<div>
													{`${t(
														"lbl_Min"
													)}: ${formatAmount(
														item.minAmount
													)}`}
												</div>
												<div>
													{`${t(
														"lbl_Max"
													)}: ${formatAmount(
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
				</>
			)}

			{infoChannelIdForRecord ? (
				<>
					<div className="subModuleTitle">
						<i className="txt-blue">*</i>
						{t("lbl_DepositAmount")}
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
							_isConvert={false}
							isAmount={true}
							placeholder={`${t(
								"lbl_MinMaxAmount"
							)} ${formatAmount(
								formInfo.minAmount
							)} ~ ${formatAmount(formInfo.maxAmount)}`}
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
				</>
			) : null}

			<PromotionSelect
				value={formInfo?.depositPromo ?? {}}
				amount={Number(formInfo.amount)}
				depositPromoList={depositPromoList}
				onSelectItem={(idx, data) =>
					setFormInfo(prev => {
						return {
							...prev,
							depositPromo: {
								idx,
								bonusCode: data.bonusCode,
								requiredAmount: data.requiredAmount
							}
						};
					})
				}
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

MobileForm.propTypes = {
	t: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	formatAmount: PropTypes.func.isRequired,
	depositType: PropTypes.string.isRequired,
	mobilePayGourpList: PropTypes.arrayOf(PropTypes.any).isRequired,
	getMobilePayInfoList: PropTypes.func.isRequired,
	mobilePayInfoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	depositPromoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	onChangeAmount: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired,
	isGroupListFetchDone: PropTypes.bool.isRequired
};

export default MobileForm;
