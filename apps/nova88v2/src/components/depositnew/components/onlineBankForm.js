import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import ShortcutAmountList from "./shortcutAmountList";
import { getUrlParameter } from "../../common/common";
import config from "../../../config";

const OnlineBankForm = ({
	t,
	formatAmount,
	depositType,
	onlineBankGroupList,
	getOnlineBankInfoList,
	onlineBankInfoList,
	formInfo,
	onChangeAmount,

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

		setFormInfo({ ...item, amount: formInfo.amount });
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

	const onSetSysIdToInfoData = async (item, pId) => {
		window.history.replaceState(
			{},
			"",
			`${window.location.pathname}?type=${depositType}&pName=${parameterPayName}&pId=${pId}&sysId=${item.sysId}`
		);

		setSysIdForRecord(item.sysId);

		await setFormInfo(prev => {
			return {
				...prev,
				sysId: item.sysId
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
	return (
		<>
			<div className="subModuleTitle">
				<i className="txt-blue">*</i>
				{t("lbl_Payment_Method")}
			</div>

			<div className="subModule">
				<div>
					{onlineBankGroupList.map(item => {
						const payName = String(item.payName).toLowerCase();

						return (
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
										src={`${config.cloudImgUrl}/SiteSkin/img/Payment/${payName}.png`}
									/>
									<i className="icon icon-icon32px_check" />
								</div>

								<div className="bank">
									<div>{item.payName}</div>

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

			{!!onlineBankInfoList.length && (
				<div className="subModule selectBank">
					<div className="subModuleTitle">
						<i className="txt-blue">*</i>
						{t("lbl_SelectBank")}
					</div>
					<div>
						{onlineBankInfoList.map(item => {
							const bankLogo = String(
								item.bankLogo
							).toLowerCase();
							return (
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
											src={`${config.cloudImgUrl}/SiteSkin/img/BankLogo/${bankLogo}`}
											alt={item.bankName}
										/>
										<i className="icon icon-icon32px_check" />
									</div>

									<div className="bank">
										<div>{item.bankName}</div>
									</div>
								</button>
							);
						})}
					</div>
				</div>
			)}

			{!formInfo.selBank ||
			onlineBankInfoList.some(item => item.sysId === sysIdForRecord) ? (
				<div className="subModule">
					<div className="subModuleTitle">
						<i className="txt-blue">*</i>
						{t("lbl_DepositAmount")}
					</div>

					<Inputbox
						className="inputBox-white"
						// title={t("lbl_Amount")}
						value={formInfo.amount}
						onChange={e => onChangeAmount(e.target.value)}
						checked={formInfo?.checked}
						tip={formInfo?.tip}
						_isConvert={false}
						isAmount={true}
						placeholder={`${t("lbl_MinMaxAmount")} ${formatAmount(
							formInfo.minAmount
						)} ~ ${formatAmount(formInfo.maxAmount)}`}
						onKeyDown={onInputboxKeyDown}
					/>

					<ShortcutAmountList
						amount={formInfo.amount}
						minAmount={formInfo.minAmount}
						maxAmount={formInfo.maxAmount}
						onClick={amount => onChangeAmount(amount)}
					/>
				</div>
			) : null}
		</>
	);
};

OnlineBankForm.propTypes = {
	t: PropTypes.func.isRequired,
	formatAmount: PropTypes.func.isRequired,
	depositType: PropTypes.string.isRequired,
	onlineBankGroupList: PropTypes.arrayOf(PropTypes.any).isRequired,
	getOnlineBankInfoList: PropTypes.func.isRequired,
	onlineBankInfoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	setOnlineBankInfoList: PropTypes.func.isRequired,
	onChangeAmount: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired
};

export default OnlineBankForm;
