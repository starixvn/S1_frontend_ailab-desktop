import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import { getUrlParameter, number_format } from "../../common/common";
import config from "../../../config";

const MobileForm = ({
	t,
	_isConvert,
	depositType,
	mobilePayGourpList,
	getMobilePayInfoList,
	mobilePayInfoList,
	formInfo,
	setFormInfo,
	onChangeAmount,
	onValidAmount,
	onInputboxKeyDown
}) => {
	const defaultGroupId = Number(getUrlParameter("gId"));
	const defaultChannelId = Number(getUrlParameter("channelId"));

	const [groupIdForRecord, setGroupIdForRecord] = useState(defaultGroupId);
	const [infoChannelIdForRecord, setInfoChannelIdForRecord] = useState(
		defaultChannelId
	);

	const onGetMobileInfoList = async gId => {
		window.history.replaceState(
			{},
			"",
			`${window.location.pathname}?type=${depositType}&gId=${gId}`
		);

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
		window.history.replaceState(
			{},
			"",
			`${window.location.pathname}?type=${depositType}&gId=${groupIdForRecord}&channelId=${item.channelId}`
		);

		setInfoChannelIdForRecord(item.channelId);
		setFormInfo(item);
	};

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

		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const isSelAmountType = formInfo.amountRule === 3;

	if (mobilePayGourpList.length <= 0) return null;

	const formatMinAmount = number_format(formInfo.minAmount,_isConvert);
	const formatMaxAmount = number_format(formInfo.maxAmount,_isConvert);

	return (
		<>
			<div className="subModule">
				<div className="subModuleTitle">{t("lbl_PaymentModes")}</div>
				<div>
					{mobilePayGourpList.map(item => (
						<button
							key={`deposit-mobilePay-group-${item.groupName}}`}
							onClick={() => onGetMobileInfoList(item.groupId)}
							className={
								item.groupId === groupIdForRecord
									? "active"
									: ""
							}>
							<div>
								<img
									alt={item.groupName}
									src={`${config.cloudImgUrl}/SiteSkin/img/Payment/${item.groupName}.png`}
								/>
								<i className="icon icon-icon32px_check" />
							</div>
							<div className="bank">
								<div>{item.groupName}</div>
								<div className="" />
							</div>
						</button>
					))}
				</div>
			</div>

			{!!mobilePayInfoList.length && (
				<div className="subModule">
					<div className="subModuleTitle">
						{t("lbl_SelectChannel")}
					</div>
					<div>
						{mobilePayInfoList.map(item => (
							<button
								key={`deposit-mobilePay-info-${item.groupName}-${item.channelId}}`}
								onClick={() => onSetInfoData(item)}
								className={
									item.channelId === infoChannelIdForRecord
										? "active"
										: ""
								}>
								<div>
									<img
										alt={item.groupName}
										src={`${config.cloudImgUrl}/SiteSkin/img/Payment/${item.groupName}.png`}
									/>
									<i className="icon icon-icon32px_check" />
								</div>

								<div className="bank">
									<div>{item.channelName}</div>

									<div>
										<div>
											{`${t("lbl_Min")}: ${number_format(
												item.minAmount,
												_isConvert
											)}`}
										</div>
										<div>
											{`${t("lbl_Max")}: ${number_format(
												item.maxAmount,
												_isConvert
											)}`}
										</div>
									</div>
								</div>
							</button>
						))}
					</div>
				</div>
			)}

			{infoChannelIdForRecord ? (
				<div className="subModule">
					<div className="subModuleTitle">
						{t("lbl_DepositAmount")}
					</div>
					<div className="column">
						{isSelAmountType ? (
							<FixedAmountList
								minAmount={formInfo.minAmount}
								maxAmount={formInfo.maxAmount}
								amountList={formInfo.amountList}
								amount={formInfo.amount}
								_isConvert={_isConvert}
								onChangeAmount={onChangeAmount}
							/>
						) : null}
						<Inputbox
							className="inputBox-white"
							readOnly={isSelAmountType}
							title={t("lbl_Amount")}
							value={formInfo.amount}
							onChange={e => onChangeAmount(e.target.value)}
							onBlur={() => onValidAmount(formInfo.amount)}
							checked={formInfo?.checked}
							tip={formInfo?.tip}
							_isConvert={_isConvert}
							isAmount={true}
							placeholder={`${t(
								"lbl_MinMaxAmount"
							)} ${formatMinAmount} ~ ${formatMaxAmount}`}
							onKeyDown={onInputboxKeyDown}
						/>
					</div>
				</div>
			) : null}
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
	depositType: PropTypes.string.isRequired,
	mobilePayGourpList: PropTypes.arrayOf(PropTypes.any).isRequired,
	getMobilePayInfoList: PropTypes.func.isRequired,
	mobilePayInfoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	onChangeAmount: PropTypes.func.isRequired,
	onValidAmount: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired
};

export default MobileForm;
