import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import { getUrlParameter, number_format } from "../../common/common";
import FixedAmountList from "./fixedAmountList";
import config from "../../../config";
import { useSyncRouteQuery } from "../hook/useSyncRouteQuery";

import PromotionSelect from "./PromotionSelect";

const CryptoPayForm = ({
	t,
	depositType,
	_isConvert,
	cryptoPayGroupList,
	formInfo,
	depositPromoList,
	setFormInfo,
	onChangeForm,
	onInputboxKeyDown,
	isGroupListFetchDone,
	onChangePromotion
}) => {
	const defaultGroupId = Number(getUrlParameter("gId"));
	const defaultChannelId = Number(getUrlParameter("channelId"));
	const [groupIdForRecord, setGroupIdForRecord] = useState(defaultGroupId);
	const [infoChannelIdForRecord, setInfoChannelIdForRecord] =
		useState(defaultChannelId);

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

	const formatMinAmount = number_format({
		number: formInfo.minAmount,
		digits: 0
	});
	const formatMaxAmount = number_format({
		number: formInfo.maxAmount,
		digits: 0
	});

	return (
		<>
			<div className="subModuleTitle">
				<span>{t("lbl_PaymentModes")}</span>
				{_isConvert && (
					<div className="info">
						{t("Label_Deposit_AdditionalInfo")}
					</div>
				)}
			</div>
			<div className="subModule">
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
									src={`${
										config.cloudImgUrl
									}/${item.groupName?.toLowerCase()}.png`}
									alt={item.groupName}
								/>
								<i className="icon icon-checkmark" />
							</div>
							<div className="bank">
								<div>{item.groupName}</div>

								<div>{`${number_format({
									number: displayMinMax(item.groupId, "min"),
									formatRequired: false,
									digits: 0
								})}~${number_format({
									number: displayMinMax(item.groupId, "max"),
									formatRequired: false,
									digits: 0
								})}`}</div>
							</div>
						</button>
					))}
				</div>
			</div>
			<div className="subModuleTitle">
				<span>{t("lbl_SelectChannel")}</span>
				{_isConvert && (
					<div className="info">
						{t("Label_Deposit_AdditionalInfo")}
					</div>
				)}
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
										config.cloudImgUrl
									}/${item.channelName?.toLowerCase()}.png`}
									alt={item.channelName}
								/>

								<i className="icon icon-checkmark" />
							</div>
							<div className="bank">
								<div>{item.channelName}</div>

								<div>{`${number_format({
									number: item.minAmount,
									formatRequired: false,
									digits: 0
								})}~${number_format({
									number: item.maxAmount,
									formatRequired: false,
									digits: 0
								})}`}</div>
							</div>
						</button>
					))}
				</div>
			</div>

			<div className="subModuleTitle">
				<span>
					{t("lbl_DepositAmount")}
					{t("lbl_DepositAmountNote")}
				</span>
			</div>
			<div className="subModule">
				<Inputbox
					readOnly={isSelAmountType}
					value={formInfo.amount?.val}
					onChange={e => onChangeForm(e.target.value, "amount")}
					onBlur={() => onChangeForm(formInfo.amount?.val, "amount")}
					checked={formInfo?.amount?.checked}
					tip={formInfo?.amount?.tip}
					_isConvert={_isConvert}
					isAmount={true}
					placeholder={`${t(
						"lbl_MinMaxAmount"
					)} ${formatMinAmount} / ${formatMaxAmount}`}
					onKeyDown={onInputboxKeyDown}
				/>

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
			</div>

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
		</>
	);
};

CryptoPayForm.propTypes = {
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	depositPromoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	depositType: PropTypes.string.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	t: PropTypes.func.isRequired,
	cryptoPayGroupList: PropTypes.arrayOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	onChangeForm: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired,
	onChangePromotion: PropTypes.func.isRequired,
	isGroupListFetchDone: PropTypes.bool.isRequired
};
export default CryptoPayForm;
