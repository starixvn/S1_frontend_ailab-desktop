import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import Dropdown from "../../common/dropdown";
import { getUrlParameter } from "../../common/common";
// import ShortcutAmountList from "./shortcutAmountList";
import config from "../../../config";
// import { useSyncRouteQuery } from "../hooks";

const CryptoPayForm = ({
	t,
	depositType,
	formatAmount,
	cryptoPayGroupList,
	formInfo,
	depositPromoList,
	setFormInfo,
	onChangeForm,
	onInputboxKeyDown,
	isGroupListFetchDone,
	depositPromoMsg,
	changeDeposotPromoHandlar
}) => {
	const defaultGroupId = Number(getUrlParameter("gId"));
	const defaultChannelId = Number(getUrlParameter("channelId"));
	const [groupIdForRecord, setGroupIdForRecord] = useState(defaultGroupId);
	const [infoChannelIdForRecord, setInfoChannelIdForRecord] = useState(
		defaultChannelId
	);

	const onGetCryptoPayList = async gId => {
		setGroupIdForRecord(gId);
		setInfoChannelIdForRecord(null);

		const infoList = cryptoPayGroupList;

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
			return {
				...item,
				amount: null,
				depositPromo: prev.depositPromo
			};
		});
	};

	// useSyncRouteQuery({
	// 	type: depositType,
	// 	gId: groupIdForRecord,
	// 	channelId: infoChannelIdForRecord
	// });

	useEffect(() => {
		const getData = async () => {
			if (
				cryptoPayGroupList.some(item => item.groupId === defaultGroupId)
			) {
				await onGetCryptoPayList(defaultGroupId);
			} else if (cryptoPayGroupList.length > 0) {
				await onGetCryptoPayList(cryptoPayGroupList[0].groupId);
			}
		};
		if (isGroupListFetchDone) {
			getData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isGroupListFetchDone]);

	const isSelAmountType = formInfo.amountRule === 3;

	if (cryptoPayGroupList.length <= 0) return null;

	const groupList = [
		...new Map(cryptoPayGroupList.map(_ch => [_ch.groupId, _ch])).values()
	];

	const channelList = cryptoPayGroupList.filter(
		_ch => _ch.groupId === groupIdForRecord
	);

	const displayMinMax = (_gId, _minOrMax) => {
		const arr = cryptoPayGroupList.filter(_ch => _ch.groupId === _gId);

		const result =
			_minOrMax === "min"
				? Math.min.apply(
						null,
						arr.map(item => item.minAmount)
				  )
				: Math.max.apply(
						null,
						arr.map(item => item.maxAmount)
				  );
		return result;
	};

	const depositPromoMsgClass = ["tip", depositPromoMsg && "active"]
		.filter(Boolean)
		.join(" ");
	return (
		<>
			<div className="subModuleTitle">
				<span>{t("lbl_Payment_Method")}</span>
			</div>
			<div className="subModule">
				<div>
					{groupList.map(item => (
						<button
							key={`deposit-crypto-channel-${item.groupId}}`}
							onClick={() => onGetCryptoPayList(item.groupId)}
							className={
								item.groupId === groupIdForRecord
									? "active"
									: ""
							}>
							<div>
								<img
									src={`${
										config.imgUrl
									}/SiteSkin/img/Payment/${item.groupName.toLowerCase()}.png`}
									alt={item.groupName}
								/>
								<i className="icon icon-checkmark" />
							</div>
							<div className="bank">
								<div>{item.groupName}</div>
								<div>
									<div>
										{`${t("lbl_Min")}: ${formatAmount(
											displayMinMax(item.groupId, "min")
										)}`}
									</div>
									<div>
										{`${t("lbl_Max")}: ${formatAmount(
											displayMinMax(item.groupId, "max")
										)}`}
									</div>
								</div>
							</div>
						</button>
					))}
				</div>
			</div>
			<div className="subModuleTitle">
				<span>{t("lbl_SelectChannel")}</span>
			</div>
			<div className="subModule">
				<div>
					{channelList.map(item => (
						<button
							key={`deposit-crypto-channel-${item.channelName}}`}
							onClick={() => onSetInfoData(item)}
							className={
								item.channelId === infoChannelIdForRecord
									? "active"
									: ""
							}>
							<div>
								<img
									src={`${
										config.imgUrl
									}/SiteSkin/img/CryptoPay/${item.channelName.toLowerCase()}.png`}
									alt={item.channelName}
								/>
								<i className="icon icon-checkmark" />
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
					))}
				</div>
			</div>

			<div className="subModuleTitle">
				<span>{t("lbl_DepositAmount")}</span>
			</div>
			<div className="subModule">
				<Inputbox
					className="inputBox-white"
					value={formInfo.amount?.val}
					onChange={e => onChangeForm(e.target.value, "amount")}
					onBlur={() => onChangeForm(formInfo.amount?.val, "amount")}
					checked={formInfo?.amount?.checked}
					tip={formInfo?.amount?.tip}
					_isConvert={false}
					isAmount={true}
					placeholder={`${t("lbl_MinMaxAmount")} ${formatAmount(
						formInfo.minAmount
					)} ~ ${formatAmount(formInfo.maxAmount)}`}
					onKeyDown={onInputboxKeyDown}
				/>
				{/* {!isSelAmountType && (
					<ShortcutAmountList
						amount={formInfo.amount}
						minAmount={formInfo.minAmount}
						maxAmount={formInfo.maxAmount}
						onClick={amount => onChangeAmount(amount)}
					/>
				)} */}
			</div>

			{depositPromoList?.length > 0 && (
				<>
					<div className="subModuleTitle">
						<span>
							<i className="txt-blue" />
							{t("lbl_Select_Bonus")}
						</span>
					</div>
					<div className="subModule">
						<div className="inputBox-blue">
							<Dropdown
								showDropDownIcon={true}
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

CryptoPayForm.propTypes = {
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	depositPromoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	depositType: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
	formatAmount: PropTypes.func.isRequired,
	cryptoPayGroupList: PropTypes.arrayOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	onChangeForm: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired,
	isGroupListFetchDone: PropTypes.bool.isRequired
};
export default CryptoPayForm;
