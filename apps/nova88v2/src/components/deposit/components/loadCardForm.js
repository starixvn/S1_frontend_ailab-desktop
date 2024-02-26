import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import { getUrlParameter, number_format } from "../../common/common";
import { bannerImgUrl, paymentImgUrl } from "../../../config";
import PromotionSelect from "./promotionSelect";

export default function LoadCardForm({
	t,
	_isConvert,
	formInfo,
	depositType,
	setFormInfo,
	depositPromoList,
	isGroupListFetchDone,
	loadCardPayGroupList,
	getLoadCardPayInfoList,
	onChangeCardInfo,
	onChangePromotion,
	onChangeAmount
}) {
	const defaultChannelId = Number(getUrlParameter("channelId"));
	const [cardCodeInfoIconActive, setCardCodeInfoIconActive] = useState(false);
	const [paymentList, setPaymentList] = useState([]);
	const [infoChannelIdForRecord, setInfoChannelIdForRecord] =
		useState(defaultChannelId);
	const onChangePaymentHandler = item => {
		window.history.replaceState(
			{},
			"",
			`${window.location.pathname}?type=${depositType}&channelId=${item.channelId}`
		);
		setInfoChannelIdForRecord(item.channelId);
		setFormInfo(prev => ({
			...item,
			depositPromo: prev.depositPromo
		}));
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

		if (isGroupListFetchDone) {
			getData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isGroupListFetchDone]);

	if (paymentList.length <= 0) return null;

	const isSelAmountType = formInfo.amountRule === 3;

	const amountList = formInfo.amountList.map(amount => (
		<button
			className={amount === Number(formInfo.amount) ? "active" : ""}
			onClick={() => onChangeAmount(amount)}>
			{number_format(amount, _isConvert, 0)}
		</button>
	));

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

			{infoChannelIdForRecord ? (
				<>
					<div className="subModuleTitle">
						<i className="txt-blue">*</i>
						{t("lbl_DepositAmount")}
					</div>

					<div className="subModule">
						<div className="input-column">
							<div>
								<div className="inputBox-white">
									<Inputbox
										value={formInfo.cardCode?.val}
										onChange={e => {
											onChangeCardInfo(
												e.target.value,
												"cardCode"
											);
										}}
										onBlur={e =>
											onChangeCardInfo(
												e.target.value,
												"cardCode"
											)
										}
										checked={
											formInfo.cardCode?.checked ?? null
										}
										tip={formInfo.cardCode?.tip}
										clickInfo={() =>
											setCardCodeInfoIconActive(
												prev => !prev
											)
										}
										placeholder={t("lbl_DepositCardCode")}
										isShowPaste={true}
										handlePaste={onChangeCardInfo}
										pasteCol="cardCode"
									/>
								</div>
								<button
									className="icon icon-files-empty"
									onClick={() => {
										navigator.clipboard
											.readText()
											.then(result =>
												onChangeCardInfo(
													result,
													"cardCode"
												)
											);
									}}
								/>
							</div>
							<div className="tip active">
								{t("lbl_DepositProvideBankSlip")}
							</div>

							<div>
								<div className="inputBox-white">
									<Inputbox
										value={formInfo.cardSerial?.val}
										onChange={e => {
											onChangeCardInfo(
												e.target.value,
												"cardSerial"
											);
										}}
										onBlur={e =>
											onChangeCardInfo(
												e.target.value,
												"cardSerial"
											)
										}
										checked={
											formInfo.cardSerial?.checked ?? null
										}
										tip={formInfo.cardSerial?.tip}
										clickInfo={() =>
											setCardCodeInfoIconActive(
												prev => !prev
											)
										}
										placeholder={t("lbl_DepositCardSerial")}
										isShowPaste={true}
										handlePaste={onChangeCardInfo}
										pasteCol="cardSerial"
									/>
								</div>
								<button
									className="icon icon-files-empty"
									onClick={() => {
										navigator.clipboard
											.readText()
											.then(result =>
												onChangeCardInfo(
													result,
													"cardSerial"
												)
											);
									}}
								/>
							</div>
							<div className="tip active">
								{t("lbl_DepositProvideBankSlip")}
							</div>
						</div>
						<div
							className={`tipImg ${
								cardCodeInfoIconActive ? "active" : ""
							}`}>
							<img
								src={`${bannerImgUrl}/desktop/img/cardinfo.png`}
								alt="cardinfoImg"
							/>
						</div>
						{isSelAmountType && (
							<div className="btnGroup shortcut">
								{amountList}
							</div>
						)}
					</div>
				</>
			) : null}
			{depositPromoList?.length > 0 && (
				<PromotionSelect
					value={formInfo?.depositPromo ?? {}}
					amount={Number(formInfo.amount)}
					depositPromoList={depositPromoList}
					onSelectItem={onChangePromotion}
				/>
			)}
			<div className="note">
				<ol>
					<li className="title">
						<span className="icon icon-warning" />
						{t("lbl_ImportantNotes")}
					</li>
					<li>{t("lbl_DepositLoadCardNoticeContent1")}</li>
					<li>{t("lbl_DepositLoadCardNoticeContent2")}</li>
				</ol>
			</div>
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
	onChangeCardInfo: PropTypes.func.isRequired,
	onChangePromotion: PropTypes.func.isRequired,
	onChangeAmount: PropTypes.func.isRequired,
	depositPromoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	isGroupListFetchDone: PropTypes.bool.isRequired
};
