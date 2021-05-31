import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import { getUrlParameter, number_format } from "../../common/common";
import config from "../../../config";

const OnlineBankForm = ({
	t,
	depositType,
	_isConvert,
	onlineBankGroupList,
	getOnlineBankInfoList,
	onlineBankInfoList,
	formInfo,
	onChangeAmount,
	onValidAmount,
	setFormInfo,
	setOnlineBankInfoList,
	onInputboxKeyDown
}) => {
	const parameterPayName = getUrlParameter("pName");
	const parameterPayId = Number(getUrlParameter("pId"));
	const parameterSysId = Number(getUrlParameter("sysId"));

	const [
		payNameForRecordSelectBank,
		setPayNameForRecordSelectBank
	] = useState(parameterPayName);

	const [payIdForRecord, setPayIdForRecord] = useState(parameterPayId);
	const [sysIdForRecord, setSysIdForRecord] = useState(parameterSysId);

	const onChangeBankGroup = async item => {
		window.history.replaceState(
			{},
			"",
			`${window.location.pathname}?type=${depositType}&pName=${item.payName}&pId=${item.payId}`
		);

		setFormInfo(item);
		setSysIdForRecord(null);
		setPayIdForRecord(item.payId);
		setPayNameForRecordSelectBank(item.payName);

		let infoList = [];

		if (item.selBank) {
			infoList = await getOnlineBankInfoList(item.payId);

			if (infoList?.some(infoItem => infoItem.sysId === parameterSysId)) {
				const defaultInfoListIdx = infoList.findIndex(
					infoItem => infoItem.sysId === parameterSysId
				);

				onSetSysIdToInfoData(infoList[defaultInfoListIdx], item.payId);
			} else if (infoList?.length > 0) {
				onSetSysIdToInfoData(infoList[0], item.payId);
			}
		} else {
			await setOnlineBankInfoList([]);
		}
	};

	const onSetSysIdToInfoData = (item, pId) => {
		window.history.replaceState(
			{},
			"",
			`${window.location.pathname}?type=${depositType}&pName=${parameterPayName}&pId=${pId}&sysId=${item.sysId}`
		);

		setSysIdForRecord(item.sysId);

		setFormInfo(prev => {
			return {
				...prev,
				sysId: item.sysId,
				amount: "",
				checked: null,
				tip: ""
			};
		});
	};

	useEffect(() => {
		const getData = async () => {
			if (
				onlineBankGroupList.some(item => item.payId === payIdForRecord)
			) {
				const defaultGroupListIdx = onlineBankGroupList.findIndex(
					item => item.payId === payIdForRecord
				);

				onChangeBankGroup(onlineBankGroupList[defaultGroupListIdx]);
			} else if (onlineBankGroupList.length > 0) {
				onChangeBankGroup(onlineBankGroupList[0]);
			}
		};

		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (onlineBankGroupList.length <= 0) return null;

	const formatMinAmount = number_format(formInfo.minAmount, false, 0);
	const formatMaxAmount = number_format(formInfo.maxAmount, false, 0);

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
					{onlineBankGroupList.map(item => (
						<button
							key={`deposit-onlinePay-group-${item.payName}}`}
							onClick={() => onChangeBankGroup(item)}
							className={
								item.payName === payNameForRecordSelectBank
									? "active"
									: ""
							}>
							<div>
								<img
									alt={item.payName}
									src={`${config.imgUrl}/common/images/Payment/${item.payName}.png`}
								/>
								<i className="icon icon-checkmark" />
							</div>

							<div className="bank">
								<div>{item.payName}</div>

								<div>
									<div>
										{`${t("lbl_Min")}: ${number_format(
											item.minAmount,
											_isConvert,
											0
										)}`}
									</div>
									<div>
										{`${t("lbl_Max")}: ${number_format(
											item.maxAmount,
											_isConvert,
											0
										)}`}
									</div>
								</div>
							</div>
						</button>
					))}
				</div>
			</div>

			{!!onlineBankInfoList.length && (
				<>
					<div className="subModuleTitle">
						<span>
							<i className="txt-blue">*</i>
							{t("lbl_SelectBank")}
						</span>
					</div>
					<div className="subModule">
						<div>
							{onlineBankInfoList.map(item => (
								<button
									key={`deposit-onlinePay-info-${item.bankLogo}}`}
									onClick={() =>
										onSetSysIdToInfoData(
											item,
											payIdForRecord
										)
									}
									className={
										item.sysId === sysIdForRecord
											? "active"
											: ""
									}>
									<div>
										<img
											alt={item.bankLogo}
											src={`${config.imgUrl}/common/images/BankLogo/${item.bankLogo}`}
										/>
										<i className="icon icon-checkmark" />
									</div>

									<div className="bank">
										<div>{item.bankName}</div>
										<div className="" />
									</div>
								</button>
							))}
						</div>
					</div>
				</>
			)}

			{!formInfo.selBank ||
			onlineBankInfoList.some(item => item.sysId === sysIdForRecord) ? (
				<>
					<div className="subModuleTitle">
						<span>
							<i className="txt-blue">*</i>
							{t("lbl_DepositAmount")}
						</span>
					</div>
					<div className="subModule">
						<Inputbox
							// title={t("lbl_Amount")}
							value={formInfo.amount}
							onChange={e => onChangeAmount(e.target.value)}
							onBlur={() => onValidAmount(formInfo.amount)}
							checked={formInfo?.checked}
							tip={formInfo?.tip}
							_isConvert={_isConvert}
							isAmount={true}
							placeholder={`${t(
								"lbl_MinMaxAmount"
							)} ${formatMinAmount} / ${formatMaxAmount}`}
							onKeyDown={onInputboxKeyDown}
						/>
					</div>
				</>
			) : null}
		</>
	);
};

OnlineBankForm.propTypes = {
	t: PropTypes.func.isRequired,
	depositType: PropTypes.string.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	onlineBankGroupList: PropTypes.arrayOf(PropTypes.any).isRequired,
	getOnlineBankInfoList: PropTypes.func.isRequired,
	onlineBankInfoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	setOnlineBankInfoList: PropTypes.func.isRequired,
	onChangeAmount: PropTypes.func.isRequired,
	onValidAmount: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired
};

export default OnlineBankForm;
