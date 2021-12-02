import React, { useEffect } from "react";
import { useLocation, Link, navigate } from "@reach/router";
import {
	getUrlParameter,
	readCookie,
	getLocalStorage,
	removeLocalStorage
} from "../../common/common";
import { defDepositOptions } from "../deposit.def";
import defPopBoxType from "../../common/defPopBoxType";
import usePopBox from "../../hook/usePopBox";
import path from "../../../router";
import { api_site_GetSupportDomainList } from "../../../service/api/site";

const useDepositEffect = ({
	t,
	userInfo,
	formInfo,
	isMountedRef,
	depositOptions,
	depositInfoStorage,
	isInitDataDone,
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
	getCryptoPayGroupList
}) => {
	const location = useLocation();
	const parameterType = getUrlParameter("type");
	const { setPopBox, errorPopBox } = usePopBox();

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
				await Promise.all([
					getMobilePayGroupList(),
					getLocalBankGroupList(),
					getOnlineBankGroupList(),
					getCryptoPayGroupList()
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
		const checkRemoveStorage = () => {
			const savedCheck = getLocalStorage(
				`${userInfo.userName}-nova88depositquerySavedChecked`
			);

			if (!savedCheck) {
				removeLocalStorage(`${userInfo.userName}-nova88depositquery`);
				removeLocalStorage(
					`${userInfo.userName}-nova88depositquerySavedChecked`
				);
			}
		};

		const initializeDepositOptions = () => {
			if (isInitDataDone) {
				const originalDepositOptions = defDepositOptions({
					mobilePayGourpList,
					onlineBankGroupList,
					localBankGroupList,
					cryptoPayGroupList
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
				`${userInfo.userName}-nova88depositquerySavedChecked`
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

		if (userInfo.isLogin && userInfo.userName) {
			const cookieBackupDomain = `backupDomain_${userInfo.userName}`;
			const isShowBackupDomain = readCookie(cookieBackupDomain) !== "1";
			const closeBackupThenCheckInfo = () => {
				setPopBox({ isOpen: false });
				checkUserInfo();
			};
			if (isShowBackupDomain) {
				api_site_GetSupportDomainList({ langId: userInfo.langId }).then(
					res => {
						if (
							res.data.errorCode === 0 &&
							isMounted &&
							res.data.data.length > 0
						) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.BackupDomain,
								onClickClose: () => closeBackupThenCheckInfo(),
								linkList: res.data.data
							});
						}
					}
				);
			} else {
				checkUserInfo();
			}
		}

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInfo.isLogin, userInfo.userName, setPopBox]);

	useEffect(() => {
		if (formInfo.amount !== null) {
			onValidAmount(formInfo.amount);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formInfo.amount, formInfo.minAmount, formInfo.maxAmount]);
};

export { useDepositEffect };
