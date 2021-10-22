import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import FixedAmountList from "./fixedAmountList";
import { getUrlParameter, number_format } from "../../common/common";
import Dropdown from "../../common/dropdown";
import config from "../../../config";

const MobileForm = ({
	t,
	depositType,
	_isConvert,
	mobilePayGourpList,
	getMobilePayInfoList,
	mobilePayInfoList,
	formInfo,
	depositPromoMsg,
	depositPromoList,
	isGroupListFetchDone,
	setFormInfo,
	onInputboxKeyDown,
	changeDeposotPromoHandlar,
	onChangeForm
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
		setFormInfo(prev => {
			return {
				...item,
				depositPromo: prev.depositPromo
			};
		});
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

		if (isGroupListFetchDone) {
			getData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isGroupListFetchDone]);

	const isSelAmountType = formInfo.amountRule === 3;

	if (mobilePayGourpList.length <= 0) return null;

	const formatMinAmount = number_format({
		number: formInfo.minAmount,
		digits: 0
	});
	const formatMaxAmount = number_format({
		number: formInfo.maxAmount,
		digits: 0
	});

	const depositPromoMsgClass = ["tip", depositPromoMsg && "active"]
		.filter(Boolean)
		.join(" ");

	return (
		<>
			<div className="subModuleTitle">
				<span>
					<i className="txt-blue">*</i>
					{t("lbl_PaymentModes")}
				</span>
			</div>
			<div className="subModule">
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
									src={`${config.imgUrl}/common/images/MobilePay/${item.groupName}.png`}
								/>
								<i className="icon icon-checkmark" />
							</div>

							<div className="bank">
								<div>{item.channelName}</div>

								<div>
									<div>
										{`${t("lbl_Min")}: ${number_format({
											number: item.minAmount,
											formatRequired: _isConvert,
											digits: 0
										})}`}
									</div>
									<div>
										{`${t("lbl_Max")}: ${number_format({
											number: item.maxAmount,
											formatRequired: _isConvert,
											digits: 0
										})}`}
									</div>
								</div>
							</div>
						</button>
					))}
				</div>
			</div>

			{mobilePayInfoList.length > 1 && (
				<>
					<div className="subModuleTitle">
						<span>
							<i className="txt-blue">*</i>
							{t("lbl_SelectChannel")}
						</span>
					</div>

					<div className="subModule">
						<div>
							{mobilePayInfoList.map(item => (
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
											src={`${config.imgUrl}/common/images/MobilePay/${item.groupName}.png`}
										/>
										<i className="icon icon-checkmark" />
									</div>

									<div className="bank">
										<div>{item.channelName}</div>

										<div>
											<div>
												{`${t(
													"lbl_Min"
												)}: ${number_format({
													number: item.minAmount,
													formatRequired: _isConvert,
													digits: 0
												})}`}
											</div>
											<div>
												{`${t(
													"lbl_Max"
												)}: ${number_format({
													number: item.maxAmount,
													formatRequired: _isConvert,
													digits: 0
												})}`}
											</div>
										</div>
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
					<div className="subModule">
						<div className="inputBox">
							<Dropdown
								mainkey="bonus-provider"
								options={depositPromoList}
								onSelectItem={(idx, data) =>
									changeDeposotPromoHandlar({
										idx,
										bonusCode: data.bonusCode
									})
								}
								selectedIdx={formInfo?.depositPromo?.idx}
								i18n={t}
							/>
						</div>
						<div className={depositPromoMsgClass}>
							{depositPromoMsg}
						</div>
					</div>
				</>
			)}
		</>
	);
};

MobileForm.propTypes = {
	t: PropTypes.func.isRequired,
	depositType: PropTypes.string.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	mobilePayGourpList: PropTypes.arrayOf(PropTypes.any).isRequired,
	getMobilePayInfoList: PropTypes.func.isRequired,
	mobilePayInfoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	depositPromoMsg: PropTypes.string.isRequired,
	setFormInfo: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired,
	depositPromoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	isGroupListFetchDone: PropTypes.bool.isRequired,
	changeDeposotPromoHandlar: PropTypes.func.isRequired,
	onChangeForm: PropTypes.func.isRequired
};

export default MobileForm;
