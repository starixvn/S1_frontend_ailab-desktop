import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import { getUrlParameter } from "../../common/common";
import ShortcutAmountList from "./shortcutAmountList";
import config from "../../../config";
import { useSyncRouteQuery } from "../hooks";

import PromotionSelect from "./promotionSelect";

const CryptoPayForm = ({
	t,
	depositType,
	formatAmount,
	cryptoPayGroupList,
	formInfo,
	depositPromoList,
	setFormInfo,
	onChangeAmount,
	onValidAmount,
	onInputboxKeyDown,
	isGroupListFetchDone
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

	return (
		<>
			<div className="subModule">
				<div className="subModuleTitle">
					<i className="txt-blue">*</i>
					{t("lbl_Payment_Method")}
				</div>
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
										config.cloudImgUrl
									}/SiteSkin/img/Payment/${item.groupName.toLowerCase()}.png`}
									alt={item.groupName}
								/>
								<i className="icon icon-icon32px_check" />
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

			<div className="subModule">
				<div className="subModuleTitle">
					<i className="txt-blue">*</i>
					{t("lbl_SelectChannel")}
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
									src={`${
										config.cloudImgUrl
									}/SiteSkin/img/CryptoPay/${item.channelName.toLowerCase()}.png`}
									alt={item.channelName}
								/>
								<i className="icon icon-icon32px_check" />
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

			<div className="subModule">
				<div className="subModuleTitle">
					<i className="txt-blue">*</i>
					{t("lbl_DepositAmount")}
				</div>

				<Inputbox
					className="inputBox-white"
					value={formInfo.amount}
					onChange={e => onChangeAmount(e.target.value)}
					onBlur={() => onValidAmount(formInfo.amount)}
					checked={formInfo?.checked}
					tip={formInfo?.tip}
					_isConvert={false}
					isAmount={true}
					placeholder={`${t("lbl_MinMaxAmount")} ${formatAmount(
						formInfo.minAmount
					)} ~ ${formatAmount(formInfo.maxAmount)}`}
					onKeyDown={onInputboxKeyDown}
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
				onSelectItem={(idx, data) =>
					setFormInfo(prev => {
						return {
							...prev,
							depositPromo: {
								idx,
								bonusCode: data.bonusCode,
								requiredAmount: data.requiredAmount
							}
						};
					})
				}
			/>
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
	onChangeAmount: PropTypes.func.isRequired,
	onValidAmount: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired,
	isGroupListFetchDone: PropTypes.bool.isRequired
};
export default CryptoPayForm;
