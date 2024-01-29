import React, { useEffect } from "react";
import { useLocation } from "@reach/router";
import { Link, navigate } from "gatsby";
import moment from "moment";
import {
	getUrlParameter,
	readCookie,
	getLocalStorage,
	removeLocalStorage,
	defCurrencyList
} from "../../common/common";
import { defDepositOptions, defDepositType } from "../deposit.def";
import defPopBoxType from "../../common/defPopBoxType";
import usePopBox from "../../hook/usePopBox";
import path from "../../../router";

const useDepositEffect = ({
	t,
	userInfo,
	formInfo,
	isMountedRef,
	depositOptions,
	depositInfoStorage,
	isInitDataDone,
	autoDepositGroupList,
	mobilePayGourpList,
	onlineBankGroupList,
	localBankGroupList,
	cryptoPayGroupList,
	setLoading,
	onValidAmount,
	setDepositType,
	setIsInitDataDone,
	setDepositOptions,
	setSaveInfoChecked,
	onChangeAmount,
	getMobilePayGroupList,
	getLocalBankGroupList,
	getOnlineBankGroupList,
	getCryptoPayGroupList,
	getAutoDepositGroupList,
	getLinePayLink,
	linePayLink,
	checkKyc
}) => {
	const location = useLocation();
	const parameterType = getUrlParameter("type");
	const { setPopBox } = usePopBox();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			try {
				// * 當嘗試 call 所有 payment 來確認是否有權限或資料時，沒有權限的 payment api status 將 return 500
				await Promise.all([
					getMobilePayGroupList(),
					getLocalBankGroupList(),
					getOnlineBankGroupList(),
					getCryptoPayGroupList(),
					getAutoDepositGroupList(),
					checkKyc()
				]);
			} catch (e) {
				// * 當 return 500 時不需要做特別的錯誤處理，其他的錯誤(errorCode不等於0)會在各個function處理掉
			}
			setIsInitDataDone(true);
			setLoading(false);
		};

		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const checkRemoveStorage = () => {
			const savedCheck = getLocalStorage(
				`${userInfo.userName}-ivorysportdepositquerySavedChecked`
			);

			if (!savedCheck) {
				removeLocalStorage(
					`${userInfo.userName}-ivorysportdepositquery`
				);
				removeLocalStorage(
					`${userInfo.userName}-ivorysportdepositquerySavedChecked`
				);
			}
		};
		const initializeDepositOptions = () => {
			if (isInitDataDone) {
				const originalDepositOptions = defDepositOptions({
					autoDepositGroupList,
					mobilePayGourpList,
					onlineBankGroupList,
					localBankGroupList,
					cryptoPayGroupList,
					linePayLink
				});

				const filterDepositOptions = originalDepositOptions.filter(
					item => !item.isHide
				);

				if (filterDepositOptions.length) {
					setDepositOptions(filterDepositOptions);
				}
			}
		};

		initializeDepositOptions();

		window.addEventListener("beforeunload", checkRemoveStorage);

		return () => {
			checkRemoveStorage();

			window.removeEventListener("beforeunload", checkRemoveStorage);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isInitDataDone]);

	useEffect(() => {
		if (isInitDataDone && userInfo.currencyId === defCurrencyList.THB) {
			getLinePayLink();
		}
	}, [userInfo, isInitDataDone]);

	useEffect(() => {
		if (isInitDataDone) {
			const originalDepositOptions = defDepositOptions({
				linePayLink,
				autoDepositGroupList,
				mobilePayGourpList,
				onlineBankGroupList,
				localBankGroupList,
				cryptoPayGroupList
			});
			const filterDepositOptions = originalDepositOptions.filter(
				item => !item.isHide
			);
			const excludeLinePay = filterDepositOptions.filter(
				item => item.type !== defDepositType.linePay
			);
			if (
				userInfo.currencyId &&
				userInfo.currencyId !== defCurrencyList.THB
			) {
				setDepositOptions(excludeLinePay);
			} else if (
				userInfo.currencyId &&
				userInfo.currencyId === defCurrencyList.THB &&
				!linePayLink
			) {
				setDepositOptions(excludeLinePay);
			} else {
				setDepositOptions(filterDepositOptions);
			}
		}
	}, [userInfo, isInitDataDone, linePayLink]);

	useEffect(() => {
		const initializeDepositType = () => {
			const getDepositType = () => {
				if (
					Object.values(depositOptions).some(
						item => item.type === depositInfoStorage?.type
					)
				)
					return depositInfoStorage?.type;

				if (
					Object.values(depositOptions).some(
						item => item.type === parameterType
					)
				)
					return parameterType;

				return depositOptions[0].type;
			};

			if (userInfo.userName) {
				const initialDepositType = getDepositType();

				setDepositType(initialDepositType);
			}
		};
		const checkLocalStorageUpdateForm = () => {
			const savedCheck = getLocalStorage(
				`${userInfo.userName}-ivorysportdepositquerySavedChecked`
			);
			if (depositInfoStorage?.amount) {
				onChangeAmount(depositInfoStorage.amount);
			}

			if (
				depositInfoStorage?.search &&
				depositInfoStorage.search !== location.search
			) {
				const { pathname } = location;

				navigate(`${pathname}${depositInfoStorage.search}`);
			}
			if (savedCheck) {
				setSaveInfoChecked(savedCheck);
			}
		};

		if (depositOptions.length > 0) {
			initializeDepositType();
			checkLocalStorageUpdateForm();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInfo.userName, depositOptions]);

	useEffect(() => {
		let isMounted = true;

		const checkUserInfo = () => {
			const { isLogin, accountName, phoneNo, email } = userInfo;

			if (
				isLogin &&
				isMounted &&
				((!accountName && accountName !== undefined) ||
					(!phoneNo && phoneNo !== undefined) ||
					(!email && email !== undefined))
			) {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.UpdateProfile,
					title: t("lbl_ImportantNote"),
					content: t("lbl_UpdatePersonalInfoDeposit"),
					btnBar: (
						<div className="btnGroup">
							<Link
								className="btn-check"
								to={`/${userInfo.langId}/${path.profile.root}?prevPage=${path.deposit.root}`}>
								{t("lbl_UpdatePersonalDetail")}
							</Link>
						</div>
					)
				});
			}
		};

		const cookiePromptDeposit = `promptDeposit${userInfo.userName}`;
		const isShowPromptDeposit = readCookie(cookiePromptDeposit) !== "1";

		const now = moment();
		const nowInGMT8 = now.utcOffset(480);
		const hour = nowInGMT8.hour();
		if (
			// * 真正的 login
			userInfo.isLogin &&
			Object.keys(userInfo).includes("accountName") &&
			userInfo.currencyId === defCurrencyList.THB &&
			hour >= 0 &&
			hour < 3 &&
			isShowPromptDeposit &&
			isMounted
		) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.PromptDeposit,
				onClickClose: () => {
					setPopBox({ isOpen: false });
					checkUserInfo();
				}
			});
		} else {
			checkUserInfo();
		}

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInfo.isLogin, userInfo.userName, userInfo.accountName]);

	useEffect(() => {
		if (formInfo.amount !== null) {
			onValidAmount(formInfo.amount);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formInfo.amount, formInfo.minAmount, formInfo.maxAmount]);
};

export { useDepositEffect };
