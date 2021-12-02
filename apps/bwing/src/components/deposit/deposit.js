import React, { useContext, useEffect, useRef, useState } from "react";
import { navigate } from "@reach/router";
import moment from "moment";
import { useTranslation } from "react-i18next";
import {
	loadingContext,
	userInfoContext,
	popBoxContext
} from "../common/context";
import { api_site_GetSupportDomainList } from "../../service/api/site";
import { defDepositType, defDepositOptions } from "./deposit.def";
import { defPopBoxType } from "../common/defPopBoxType";
import {
	checkAmount,
	isConvert,
	getUrlParameter,
	readCookie
} from "../common/common";

import useDeposit from "./hook/useDeposit";
import useDepositMobilePay from "./hook/useDepositMobilePay";
import useDepositOnline from "./hook/useDepositOnline";
import useDepositLocalBank from "./hook/useDepositLocalBank";
import useDepositLoadCard from "./hook/useDepositLoadCard";

import path from "../../router";
import config from "../../config";

import MobileForm from "./components/mobileForm";
import OnlineBankForm from "./components/onlineBankForm";
import LocalBankForm from "./components/localBankForm";
import LoadCardForm from "./components/loadCardForm";
import DepositInfoMoule from "./deposit.infoMoule";
import DepositRecentHistory from "./deposit.recentHistory";
import usePopBox from "../hook/usePopBox";

const Deposit = () => {
	const parameterDefaultType = getUrlParameter("type");
	const isDepositTypeIncludes = Object.values(defDepositType).includes(
		parameterDefaultType
	);

	const { t } = useTranslation();

	const isMountedRef = useRef(null);

	const { loading, setLoading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const [depositType, setDepositType] = useState(
		isDepositTypeIncludes ? parameterDefaultType : defDepositType.mobile
	);

	const [isGroupListFetchDone, setIsGroupListFetchDone] = useState(true);

	const [formInfo, setFormInfo] = useState({
		imgFile: null,
		refId: null,
		time: moment(),
		amount: {
			val: "",
			checked: null,
			tip: ""
		},
		cardCode: {
			val: "",
			checked: null,
			tip: ""
		},
		cardSerial: {
			val: "",
			checked: null,
			tip: ""
		},
		depositPromo: {
			idx: 0,
			bonusCode: null
		}
	});

	const [cardCodeInfoIconActive, setCardCodeInfoIconActive] = useState(false);
	const [isInitDataDone, setIsInitDataDone] = useState(false);

	const _isConvert = isConvert(userInfo.currencyId);

	const depositPromoMsg = userInfo?.phoneVerified
		? ""
		: t("lbl_DepositPromoMsg1");

	const { errorPopBox } = usePopBox();
	const closePopBox = () => {
		setPopBox({ isOpen: false });
	};
	const {
		asyncUploadBankPopBox,
		getDepositInfoRecent,
		depositInfoRecentDatas,
		setDepositInfoRecentDatas,
		depositPromoList,
		setDepositPromotionQueue
	} = useDeposit({
		isMountedRef,
		userInfo
	});

	const {
		getMobilePayGroupList,
		getMobilePayInfoList,
		setMobilePayInfoList,
		mobilePayGourpList,
		mobilePayInfoList
	} = useDepositMobilePay({ isMountedRef });

	const {
		getOnlineBankGroupList,
		getOnlineBankInfoList,
		setOnlineBankInfoList,
		onlineBankGroupList,
		onlineBankInfoList
	} = useDepositOnline({ isMountedRef });

	const {
		loadCardPayGroupList,
		getLoadCardPayGroupList,
		getLoadCardPayInfoList,
		getReqLoadCardPay
	} = useDepositLoadCard({
		isMountedRef
	});

	const {
		getLocalBankGroupList,
		getLocalBankInfo,
		localBankGroupList,
		localBankInfo,
		postLocalBankReqWireTransfer,
		uploadLocalBankReceipt,
		setLocalBankReceipt,
		setAccountName
	} = useDepositLocalBank({ isMountedRef });

	const onChangeDepositType = async type => {
		setDepositType(type);

		setIsGroupListFetchDone(false);

		navigate(`/${userInfo.langId}/${path.deposit.root}?type=${type}`);

		if (type === defDepositType.mobile) {
			await getMobilePayGroupList();
		} else if (type === defDepositType.localBank) {
			await getLocalBankGroupList();
		} else if (type === defDepositType.onlineBank) {
			await getOnlineBankGroupList();
		}

		setIsGroupListFetchDone(true);
	};

	const onChangeForm = (val, col) => {
		let checked = true;
		let tip = "";
		let _val = val;

		if (col === "amount") {
			_val = String(_val).replace(/^(0+)|[^\d]+/g, "");

			const amountResult = onValidAmount(_val);

			checked = amountResult.checked;
			tip = amountResult.tip;
		}

		if (col === "cardCode") {
			if (_val === "") {
				checked = false;
				tip = t("msg_PleaseEnterCardCode");
			}
		}

		if (col === "cardSerial") {
			if (_val === "") {
				checked = false;
				tip = t("msg_PleaseEnterCardSerial");
			}
		}

		setFormInfo(prev => {
			return {
				...prev,
				[col]: { val: _val, checked, tip }
			};
		});
	};

	const onValidAmount = _amount => {
		const result = checkAmount({
			amount: _amount,
			minAmount: formInfo.minAmount,
			maxAmount: formInfo.maxAmount,
			formatRequired: _isConvert,
			t,
			digits: 0
		});

		return {
			checked: result.status === 0,
			tip: result.msg
		};
	};

	const onSubmit = async () => {
		const resetForm = () => {
			setFormInfo(prev => {
				return {
					...prev,
					imgFile: null,
					refId: null,
					time: moment(),
					amount: { val: "", checked: null, tip: "" },
					cardCode: {
						val: "",
						checked: null,
						tip: ""
					},
					cardSerial: {
						val: "",
						checked: null,
						tip: ""
					}
				};
			});
		};

		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		if (typeof window !== "undefined") {
			const {
				payId,
				sysId,
				channelId,
				amount,
				mode,
				cardCode,
				cardSerial,
				depositPromo
			} = formInfo;
			const resultAmount = _isConvert ? amount.val * 1000 : amount.val;
			setLoading(true);

			if (depositType === defDepositType.localBank) {
				if (loading) return;

				const asyncAccountNameConfirm = () =>
					new Promise(resolve => {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ProfileConfirmCheck,
							accountName: formInfo.accountName,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={() => resolve(false)}>
										{t("lbl_ReModify")}
									</button>
									<button
										className="btn-check"
										onClick={() => resolve(true)}>
										{t("lbl_Confirm")}
									</button>
								</div>
							)
						});
					});

				if (!userInfo.accountName && formInfo.accountName) {
					const success = await asyncAccountNameConfirm();

					closePopBox();

					if (!success) {
						setLoading(false);
						return;
					}

					await setAccountName(formInfo.accountName);
				}
				const transId = await postLocalBankReqWireTransfer({
					amount: resultAmount,
					sysId
				});
				if (transId) {
					try {
						const result = await Promise.all([
							!formInfo.imgFile ||
								uploadLocalBankReceipt({
									transId,
									imgFile: formInfo.imgFile
								}),
							!formInfo.refId ||
								setLocalBankReceipt({
									transId,
									depositTime: formInfo.time,
									fefNo: formInfo.refId
								}),
							!formInfo?.depositPromo?.bonusCode ||
								setDepositPromotionQueue({
									transId,
									bonusCode: formInfo.depositPromo.bonusCode
								})
						]);

						if (result.every(res => res)) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.Success,
								message2: "lbl_DepositProcessingDescription",
								onClickClose: closePopBox,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-cancel"
											onClick={closePopBox}>
											OK
										</button>
									</div>
								)
							});
						}
					} catch (e) {
						errorPopBox();
					}
				}
			} else if (depositType === defDepositType.mobile) {
				const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqMobilePay`;

				const params = [
					`ChannelId=${channelId}`,
					`Amount=${resultAmount}`,
					depositPromo?.bonusCode
						? `BonusCode=${depositPromo.bonusCode}`
						: ""
				]
					.filter(Boolean)
					.join("&");

				window.open(`${baseUrl}?${params}`);

				await delay(1000);
			} else if (depositType === defDepositType.onlineBank) {
				const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqOnlineBanking`;
				const params = [
					`sysId=${sysId || 0}`,
					`payId=${payId}`,
					`ChannelId=${channelId}`,
					`Amount=${resultAmount}`,
					depositPromo?.bonusCode
						? `BonusCode=${depositPromo.bonusCode}`
						: ""
				]
					.filter(Boolean)
					.join("&");

				window.open(`${baseUrl}?${params}`);

				await delay(1000);
			} else if (depositType === defDepositType.loadCard) {
				if (mode === 3) {
					getReqLoadCardPay({
						langId: userInfo.langId,
						channelId,
						cardCode: cardCode.val,
						cardSerial: cardSerial.val,
						amount: resultAmount,
						bonusCode: depositPromo?.bonusCode
					});
				} else {
					const openUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqLoadCardPay`;

					const params = [
						`ChannelId=${channelId}`,
						`Code=${cardCode.val}`,
						`Serial=${cardSerial.val}`,
						`Amount=${resultAmount}`,
						depositPromo?.bonusCode
							? `BonusCode=${depositPromo.bonusCode}`
							: ""
					]
						.filter(Boolean)
						.join("&");

					window.open(`${openUrl}?${params}`);

					await delay(1000);
				}
			}

			setLoading(false);
			resetForm();
		}
	};

	const onInputboxKeyDown = event => {
		if (event.key === "Enter") {
			onSubmit();
		}
	};

	const changeDeposotPromoHandlar = ({ idx, bonusCode }) =>
		setFormInfo(prev => {
			return {
				...prev,
				depositPromo: {
					idx,
					bonusCode
				}
			};
		});

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			try {
				await Promise.all([
					getMobilePayGroupList(),
					getLocalBankGroupList(),
					getOnlineBankGroupList(),
					getLoadCardPayGroupList()
				]);

				setIsInitDataDone(true);
			} catch (e) {
				errorPopBox();
			}
			setLoading(false);
		};

		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (userInfo.isLogin && userInfo.userName) {
			const cookieBackupDomain = `backupDomain_${userInfo.userName}`;
			const isShowBackupDomain = readCookie(cookieBackupDomain) !== "1";

			if (isShowBackupDomain) {
				api_site_GetSupportDomainList().then(
					res => {
						if (!isMountedRef.current) return;

						if (
							res.data.errorCode === 0 &&
							res.data.data.length > 0
						) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.BackupDomain,
								onClickClose: () =>
									setPopBox({ isOpen: false }),
								linkList: res.data.data
							});
						} else if (res.data.errorCode !== 0) {
							errorPopBox(
								res.data.message || "error",
								res.data.errorCode
							);
						}
					},
					() => {
						errorPopBox();
					}
				);
			}
		}
	}, [userInfo.isLogin, userInfo.userName, setPopBox]);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	if (loading || !isInitDataDone) return null;

	const depositOptions = defDepositOptions({
		mobilePayGourpList,
		onlineBankGroupList,
		localBankGroupList,
		loadCardPayGroupList
	});

	const filterDepositOptions = depositOptions.filter(item => !item.isHide);

	if (!filterDepositOptions.length) return null;

	const defaultDepositOption = depositOptions.find(
		option => option.type === parameterDefaultType
	);

	if (!isDepositTypeIncludes || defaultDepositOption.isHide) {
		onChangeDepositType(filterDepositOptions[0].type);
	}

	let checked = formInfo?.amount?.checked;

	if (depositType === defDepositType.loadCard) {
		checked =
			checked &&
			formInfo?.cardCode?.checked &&
			formInfo?.cardSerial?.checked;
	} else if (depositType === defDepositType.localBank) {
		checked = checked && (userInfo.accountName || formInfo.accountName);
		// formInfo?.refId &&
		// formInfo?.imgFile?.type.includes("image");
	}

	return (
		<>
			<DepositInfoMoule
				t={t}
				langId={userInfo.langId}
				depositOptions={filterDepositOptions}
				depositType={depositType}
				checked={!!checked}
				onSubmit={onSubmit}
				setDepositType={onChangeDepositType}>
				{depositType === defDepositType.mobile && (
					<MobileForm
						t={t}
						depositType={depositType}
						_isConvert={_isConvert}
						mobilePayGourpList={mobilePayGourpList}
						getMobilePayInfoList={getMobilePayInfoList}
						mobilePayInfoList={mobilePayInfoList}
						formInfo={formInfo}
						depositPromoMsg={depositPromoMsg}
						setFormInfo={setFormInfo}
						onChangeForm={onChangeForm}
						onInputboxKeyDown={onInputboxKeyDown}
						depositPromoList={depositPromoList}
						isGroupListFetchDone={isGroupListFetchDone}
						changeDeposotPromoHandlar={changeDeposotPromoHandlar}
					/>
				)}

				{depositType === defDepositType.localBank && (
					<LocalBankForm
						t={t}
						userInfo={userInfo}
						depositType={depositType}
						_isConvert={_isConvert}
						localBankGroupList={localBankGroupList}
						formInfo={formInfo}
						depositPromoMsg={depositPromoMsg}
						setFormInfo={setFormInfo}
						onChangeForm={onChangeForm}
						onInputboxKeyDown={onInputboxKeyDown}
						getLocalBankInfo={getLocalBankInfo}
						localBankInfo={localBankInfo}
						asyncUploadBankPopBox={asyncUploadBankPopBox}
						depositPromoList={depositPromoList}
						isGroupListFetchDone={isGroupListFetchDone}
						changeDeposotPromoHandlar={changeDeposotPromoHandlar}
					/>
				)}

				{depositType === defDepositType.onlineBank && (
					<OnlineBankForm
						t={t}
						depositType={depositType}
						_isConvert={_isConvert}
						onlineBankGroupList={onlineBankGroupList}
						getOnlineBankInfoList={getOnlineBankInfoList}
						onlineBankInfoList={onlineBankInfoList}
						formInfo={formInfo}
						depositPromoMsg={depositPromoMsg}
						onChangeForm={onChangeForm}
						setFormInfo={setFormInfo}
						setOnlineBankInfoList={setOnlineBankInfoList}
						onInputboxKeyDown={onInputboxKeyDown}
						depositPromoList={depositPromoList}
						isGroupListFetchDone={isGroupListFetchDone}
						changeDeposotPromoHandlar={changeDeposotPromoHandlar}
					/>
				)}

				{depositType === defDepositType.loadCard && (
					<LoadCardForm
						t={t}
						formInfo={formInfo}
						depositPromoMsg={depositPromoMsg}
						_isConvert={_isConvert}
						depositType={depositType}
						cardCodeInfoIconActive={cardCodeInfoIconActive}
						setFormInfo={setFormInfo}
						loadCardPayGroupList={loadCardPayGroupList}
						getLoadCardPayInfoList={getLoadCardPayInfoList}
						onChangeForm={onChangeForm}
						onInputboxKeyDown={onInputboxKeyDown}
						setCardCodeInfoIconActive={setCardCodeInfoIconActive}
						depositPromoList={depositPromoList}
						isGroupListFetchDone={isGroupListFetchDone}
						changeDeposotPromoHandlar={changeDeposotPromoHandlar}
					/>
				)}
			</DepositInfoMoule>

			<DepositRecentHistory
				asyncUploadBankPopBox={asyncUploadBankPopBox}
				getDepositInfoRecent={getDepositInfoRecent}
				depositInfoRecentDatas={depositInfoRecentDatas}
				setDepositInfoRecentDatas={setDepositInfoRecentDatas}
				uploadLocalBankReceipt={uploadLocalBankReceipt}
				setLocalBankReceipt={setLocalBankReceipt}
			/>
		</>
	);
};

export default Deposit;
