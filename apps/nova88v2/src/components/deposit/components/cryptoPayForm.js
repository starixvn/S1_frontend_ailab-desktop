import React, { useState, useEffect, useContext } from "react";
import PropTypes, { bool, func } from "prop-types";
import Inputbox from "../../common/inputbox";
import {
	defCurrencyList,
	getUrlParameter,
	number_format
} from "../../common/common";
import ShortcutAmountList from "./shortcutAmountList";
import { paymentImgUrl } from "../../../config";
import { useSyncRouteQuery } from "../hooks";

import PromotionSelect from "./promotionSelect";
import { userInfoContext } from "../../common/context";

const CryptoPayForm = ({
	t,
	_isConvert,
	depositType,
	isPending,
	cryptoPayGroupList,
	formInfo,
	depositPromoList,
	onChangePromotion,
	setFormInfo,
	onChangeAmount,
	onValidAmount,
	onInputboxKeyDown,
	isGroupListFetchDone,
	onSubmit
}) => {
	const { userInfo } = useContext(userInfoContext);
	const defaultGroupId = Number(getUrlParameter("gId"));
	const defaultChannelId = Number(getUrlParameter("channelId"));
	const [groupIdForRecord, setGroupIdForRecord] = useState(defaultGroupId);
	const [infoChannelIdForRecord, setInfoChannelIdForRecord] =
		useState(defaultChannelId);

	const onGetCryptoPayList = async gId => {
		setGroupIdForRecord(gId);
	};

	const onSetInfoData = item => {
		setInfoChannelIdForRecord(item.channelId);

		setFormInfo(prev => ({
			...item,
			amount: null,
			depositPromo: prev.depositPromo
		}));
	};

	// * crypto 的默認 channel 需監聽 groupIdForRecord ，當 groupIdForRecord 有異動才接著做
	// * 因 channelList 是透過 groupIdForRecord 異動去計算而來，因此不能放在同個程式居段
	useEffect(() => {
		if (channelList[0]) {
			onSetInfoData(channelList[0]);
		}
	}, [groupIdForRecord]);

	useSyncRouteQuery({
		type: depositType,
		gId: groupIdForRecord,
		channelId: infoChannelIdForRecord
	});

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

	const groupList = new Map(
		cryptoPayGroupList.map(_ch => [_ch.groupId, _ch])
	).values();

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

	const buttonAble =
		groupIdForRecord && infoChannelIdForRecord && formInfo?.amount;

	const placeHolderText = `${t("lbl_MinMaxAmount")} ${
		_isConvert ? formInfo.minAmount / 1000 : formInfo.minAmount
	} ~ ${_isConvert ? formInfo.maxAmount / 1000 : formInfo.maxAmount}`;

	return (
		<>
			<div className="subModule">
				<div className="subModuleTitle">
					<i className="txt-blue">*</i>
					{t("lbl_Payment_Method")}
					{_isConvert && (
						<div className="info">
							{t("Label_Deposit_AdditionalInfo")}
						</div>
					)}
				</div>
				<div>
					{Array.from(groupList).map(item => (
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
									src={`${paymentImgUrl}/${item?.groupName?.toLowerCase()}.png`}
									alt={item.groupName}
								/>
								<i className="icon icon-icon32px_check" />
							</div>
							<div className="bank">
								<div>{item.groupName}</div>
								<div>
									{`${number_format(
										displayMinMax(item.groupId, "min"),
										_isConvert,
										0,
										false
									)} ~ ${number_format(
										displayMinMax(item.groupId, "max"),
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

			<div className="subModule">
				<div className="subModuleTitle">
					<i className="txt-blue">*</i>
					{t("lbl_SelectChannel")}
					{_isConvert && (
						<div className="info">
							{t("Label_Deposit_AdditionalInfo")}
						</div>
					)}
				</div>
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
									src={`${paymentImgUrl}/${item.channelName.toLowerCase()}.png`}
									alt={item.channelName}
								/>
								<i className="icon icon-icon32px_check" />
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

			<div className="subModule">
				<div className="subModuleTitle">
					<i className="txt-blue">*</i>
					{t("lbl_DepositAmount")}
					{userInfo.currencyId === defCurrencyList.IDR &&
						t("lbl_DepositAmountNote")}
				</div>

				<Inputbox
					className="inputBox-white"
					value={formInfo.amount}
					onChange={e => onChangeAmount(e.target.value)}
					onBlur={() => onValidAmount(formInfo.amount)}
					checked={formInfo?.checked}
					tip={formInfo?.tip}
					_isConvert={_isConvert}
					isAmount={true}
					placeholder={placeHolderText}
					onKeyDown={event => buttonAble && onInputboxKeyDown(event)}
					format={userInfo.currencyId === defCurrencyList.IDR}
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

			<PromotionSelect
				value={formInfo?.depositPromo ?? {}}
				amount={Number(formInfo.amount)}
				depositPromoList={depositPromoList}
				onSelectItem={onChangePromotion}
			/>

			<div className="btnGroup">
				<button
					className={buttonAble ? "btn-check" : "darkGray"}
					onClick={() => buttonAble && onSubmit()}>
					{t("lbl_Submit")}
				</button>
			</div>
		</>
	);
};

CryptoPayForm.defaultProps = {
	onChangePromotion: () => null
};

CryptoPayForm.propTypes = {
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	depositPromoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	depositType: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	cryptoPayGroupList: PropTypes.arrayOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	onChangeAmount: PropTypes.func.isRequired,
	onValidAmount: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired,
	isGroupListFetchDone: PropTypes.bool.isRequired,
	onSubmit: func.isRequired,
	isPending: bool.isRequired,
	onChangePromotion: PropTypes.func
};
export default CryptoPayForm;
