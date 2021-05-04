import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import FixedAmountList from "./fixedAmountList";
import { getUrlParameter, number_format } from "../../common/common";
import config from "../../../config";

export default function LoadCardForm({
	t,
	_isConvert,
	formInfo,
	depositType,
	setFormInfo,
	loadCardPayGroupList,
	getLoadCardPayInfoList,
	onChangeAmount,
	onValidAmount,
	onInputboxKeyDown
}) {
	const defaultChannelId = Number(getUrlParameter("channelId"));

	const [paymentList, setPaymentList] = useState([]);
	const [infoChannelIdForRecord, setInfoChannelIdForRecord] = useState(
		defaultChannelId
	);

	const onChangePaymentHandler = item => {
		window.history.replaceState(
			{},
			"",
			`${window.location.pathname}?type=${depositType}&channelId=${item.channelId}`
		);
		setInfoChannelIdForRecord(item.channelId);
		setFormInfo(item);
	};

	useEffect(() => {
		const defaultDataCheck = result => {
			const defaultPaymentData = result.find(
				item => item.channelId === defaultChannelId
			);
			if (defaultPaymentData) {
				onChangePaymentHandler(defaultPaymentData);
			} else if (result.length > 0) {
				onChangePaymentHandler(result[0]);
			}
		};

		const getData = async () => {
			const promiseArray = loadCardPayGroupList.map(item =>
				getLoadCardPayInfoList(item.groupId)
			);

			const result = await Promise.all(promiseArray).then(res =>
				res.flat()
			);

			defaultDataCheck(result);
			setPaymentList(result);
		};

		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (paymentList.length <= 0) return null;

	const isSelAmountType = formInfo.amountRule === 3;

	const formatMinAmount = number_format(formInfo.minAmount, false, 0);
	const formatMaxAmount = number_format(formInfo.maxAmount, false, 0);

	return (
		<>
			<div className="subModule">
				<div className="subModuleTitle">
					<span>
						<i className="txt-blue">*</i>
						{t("lbl_PaymentModes")}
					</span>
				</div>
				<div>
					{paymentList.map(item => (
						<button
							key={`deposit-loadCardPay-info-${item.channelId}`}
							onClick={() => onChangePaymentHandler(item)}
							className={
								item.channelId === infoChannelIdForRecord
									? "active"
									: ""
							}>
							<div>
								<img
									alt={item.payName}
									src={`${config.imgUrl}/common/images/LoadCardPay/${item.payName}.png`}
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

			{infoChannelIdForRecord ? (
				<div className="subModule">
					<div className="subModuleTitle">
						<span>
							<i className="txt-blue">*</i>
							{t("lbl_DepositAmount")}
						</span>
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
							readOnly={isSelAmountType}
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
				</div>
			) : null}
		</>
	);
}

LoadCardForm.propTypes = {
	t: PropTypes.func.isRequired,
	depositType: PropTypes.string.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	loadCardPayGroupList: PropTypes.arrayOf(PropTypes.any).isRequired,
	getLoadCardPayInfoList: PropTypes.func.isRequired,
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	onChangeAmount: PropTypes.func.isRequired,
	onValidAmount: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired
};
