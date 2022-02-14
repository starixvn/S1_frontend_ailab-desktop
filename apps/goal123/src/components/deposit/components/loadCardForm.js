import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import FixedAmountList from "./fixedAmountList";
import { getUrlParameter, number_format } from "../../common/common";
import config, { bannerImgUrl } from "../../../config";

import PromotionSelect from "./PromotionSelect";

export default function LoadCardForm({
	t,
	_isConvert,
	formInfo,
	depositType,
	cardCodeInfoIconActive,
	setFormInfo,
	depositPromoList,
	isGroupListFetchDone,
	loadCardPayGroupList,
	getLoadCardPayInfoList,
	onChangeForm,
	onChangePromotion,
	setCardCodeInfoIconActive
}) {
	const defaultChannelId = Number(getUrlParameter("channelId"));

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
		setFormInfo(prev => {
			return {
				...item,
				depositPromo: prev.depositPromo
			};
		});
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

	const tipImgClass = ["tipImg", cardCodeInfoIconActive && "active"]
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
									src={`${
										config.imgUrl
									}/common/images/LoadCardPay/${item.groupName?.toLowerCase()}.png`}
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
								value={formInfo.cardCode?.val}
								onChange={e =>
									onChangeForm(e.target.value, "cardCode")
								}
								onBlur={e =>
									onChangeForm(e.target.value, "cardCode")
								}
								checked={formInfo.cardCode?.checked ?? null}
								tip={formInfo.cardCode?.tip}
								clickInfo={() =>
									setCardCodeInfoIconActive(prev => !prev)
								}
								placeholder={t("lbl_DepositCardCode")}
							/>

							<Inputbox
								value={formInfo.cardSerial?.val}
								onChange={e =>
									onChangeForm(e.target.value, "cardSerial")
								}
								onBlur={e =>
									onChangeForm(e.target.value, "cardSerial")
								}
								checked={formInfo.cardSerial?.checked}
								tip={formInfo.cardSerial?.tip}
								placeholder={t("lbl_DepositCardSerial")}
							/>

							<Inputbox
								readOnly={isSelAmountType}
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
								placeholder={t("lbl_DepositCardValue")}
							/>

							<div className={tipImgClass}>
								<img
									src={`${bannerImgUrl}/desktop/img/cardinfo.png`}
									alt="cardinfoImg"
								/>
							</div>
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

			<div className="note">
				<ol>
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
	onChangeForm: PropTypes.func.isRequired,
	onChangePromotion: PropTypes.func.isRequired,
	depositPromoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	isGroupListFetchDone: PropTypes.bool.isRequired,
	cardCodeInfoIconActive: PropTypes.bool.isRequired,
	setCardCodeInfoIconActive: PropTypes.func.isRequired
};
