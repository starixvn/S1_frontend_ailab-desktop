import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import { getUrlParameter, number_format } from "../../common/common";
import config from "../../../config";

const CryptoPayForm = ({
	t,
	depositType,
	_isConvert,
	cryptoPayGroupList,
	formInfo,
	setFormInfo,
	onChangeAmount,
	onValidAmount,
	onInputboxKeyDown
}) => {
	const defaultGroupId = Number(getUrlParameter("gId"));
	const defaultChannelId = Number(getUrlParameter("channelId"));

	const [groupIdForRecord, setGroupIdForRecord] = useState(defaultGroupId);
	const [infoChannelIdForRecord, setInfoChannelIdForRecord] = useState(
		defaultChannelId
	);

	const onGetCryptoPayList = async gId => {
		window.history.replaceState(
			{},
			"",
			`${window.location.pathname}?type=${depositType}&gId=${gId}`
		);

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
		window.history.replaceState(
			{},
			"",
			`${window.location.pathname}?type=${depositType}&gId=${groupIdForRecord}&channelId=${item.channelId}`
		);
		setInfoChannelIdForRecord(item.channelId);
		setFormInfo(item);
	};

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
		getData();
	}, []);

	if (cryptoPayGroupList.length <= 0) return null;
	const formatMinAmount = number_format(formInfo.minAmount, _isConvert);
	const formatMaxAmount = number_format(formInfo.maxAmount, _isConvert);

	return (
		<>
			<div className="subModule">
				<div className="subModuleTitle">
					<i className="txt-blue">*</i>
					{t("lbl_Payment_Method")}
				</div>
				<div>
					{cryptoPayGroupList.map(item => (
						<button
							key={`deposit-crypto-channel-${item.sysId}}`}
							onClick={() => onGetCryptoPayList(item.groupId)}
							className={
								item.groupId === groupIdForRecord
									? "active"
									: ""
							}>
							<div>
								<img
									// src={`${config.imgUrl}/common/images/BankLogo/${item.bankLogo}`}
									src={`${config.cloudImgUrl}/SiteSkin/img/Payment/${item.groupName}.png`}
									alt={item.payName}
								/>
								<i className="icon icon-icon32px_check" />
							</div>

							<div className="bank">
								<div>{item.payName}</div>

								<div>
									<div>
										{`${t("lbl_Min")}: ${number_format(
											item.minAmount,
											_isConvert
										)}`}
									</div>
									<div>
										{`${t("lbl_Max")}: ${number_format(
											item.maxAmount,
											_isConvert
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
					)} ${formatMinAmount} ~ ${formatMaxAmount}`}
					onKeyDown={onInputboxKeyDown}
				/>
			</div>
		</>
	);
};

CryptoPayForm.propTypes = {
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	depositType: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	cryptoPayGroupList: PropTypes.arrayOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	onChangeAmount: PropTypes.func.isRequired,
	onValidAmount: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired
};
export default CryptoPayForm;
