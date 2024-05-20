import React, { useState, useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import LeftMenu from "../components/common/leftMenu";
import Withdrawal from "../components/withdrawal/withdrawal.set.bank";
import RecentHistory from "../components/withdrawal/recentHistory";
import Loading from "../components/common/loading";
import { popBoxContext } from "../components/common/context";
import { defPopBoxType } from "../components/common/popBox";
import { api_account_GetWithdrawalAvailableBalance } from "../service/api/account";
import {
	api_payment_KycCheck,
	api_payment_GetWithdrawalInfoRecent,
	api_payment_GetWithdrawalLimit,
	api_payment_GetWithdrawalBlockSetting
} from "../service/api/payment";

export default () => (
	<Wrapper afterLogin={true}>
		<Layout>
			<main>
				<section className="inside">
					<LeftMenu />
					<div className="rightModule">
						<Content />
					</div>
				</section>
			</main>
			<HomeFooter />
		</Layout>
	</Wrapper>
);

const Content = () => {
	const { t } = useTranslation();

	const [loading, setLoading] = useState(true);
	const [balanceData, setBalanceData] = useState({});
	const [kycStatus, setKycStatus] = useState("");
	const [recentData, setRecentData] = useState([]);
	const [uSDTWithdrawalLimit, setUSDTWithdrawalLimit] = useState([]);
	const [withdrawalSettingTypeList, setWithdrawalSettingTypeList] = useState(
		[]
	);
	const [withdrawalLimit, setWithdrawalLimit] = useState({});

	const { setPopBox } = useContext(popBoxContext);

	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		async function getData() {
			setLoading(true);
			await Promise.all([
				getKycStatus(),
				getWithdrawalAvailableBalance(),
				getWithdrawalInfoRecent(),
				getWithdrawalLimit(),
				getWithdrawalBlockSetting()
			]);
			setLoading(false);
		}
		getData();
	}, []);

	const closePopBox = () => {
		setPopBox({ isOpen: false });
	};

	const getKycStatus = async () => {
		await api_payment_KycCheck().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setKycStatus("normal");
					} else if (res.data.errorCode === 1) {
						setKycStatus("kycUpload");
					} else if (res.data.errorCode === 2) {
						setKycStatus("kycPending");
					} else {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: `[${res.data.errorCode}] ${res.data.message}`,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={closePopBox}
									>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: t("msg_ApiServerError"),
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
									onClick={closePopBox}
								>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			}
		);
	};

	const getWithdrawalAvailableBalance = async () => {
		await api_account_GetWithdrawalAvailableBalance().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setBalanceData(res.data.data);
					} else {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: `[${res.data.errorCode}] ${res.data.message}`,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={closePopBox}
									>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: t("msg_ApiServerError"),
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
									onClick={closePopBox}
								>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			}
		);
	};

	const getWithdrawalInfoRecent = async () => {
		await api_payment_GetWithdrawalInfoRecent().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setRecentData(res.data.data);
					} else {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: `[${res.data.errorCode}] ${res.data.message}`,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={closePopBox}
									>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: t("msg_ApiServerError"),
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
									onClick={closePopBox}
								>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			}
		);
	};

	const getWithdrawalLimit = async () =>
		api_payment_GetWithdrawalLimit().then(
			res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					const { usdtList } = res.data.data;

					const _usdtList = usdtList.map(data => ({
						withdrawalMin: data.withdrawalMin,
						withdrawalMax: res.data.data.withdrawalAvailableAmount,
						unlimited: res.data.data.unlimited,
						currencyId: data.currencyId,
						network: data.network
					}));
					setUSDTWithdrawalLimit(_usdtList);

					setWithdrawalLimit({
						withdrawalMin: res.data.data.withdrawalMin,
						withdrawalMax: res.data.data.withdrawalAvailableAmount,
						unlimited: res.data.data.unlimited,
						maxTimes: res.data.data.maxTimes,
						withdrawalTimes: res.data.data.withdrawalTimes,
						eWalletStatus: res.data.data.eWalletStatus,
						eWalletUnlimited: res.data.data.eWalletUnlimited,
						eWalletWithdrawalAvailableAmount:
							res.data.data.eWalletWithdrawalAvailableAmount,
						eWalletWithdrawalMin: res.data.data.eWalletWithdrawalMin
					});
				} else if (res.data.errorCode !== 0) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: `[${res.data.errorCode}] ${res.data.message}`,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
									onClick={closePopBox}
								>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			},
			() => {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.ErrorMsg,
					message: t("msg_ApiServerError"),
					btnBar: (
						<div className="btnGroup">
							<button
								className="btn-cancel"
								onClick={closePopBox}
							>
								{t("lbl_Close")}
							</button>
						</div>
					)
				});
			}
		);

	const getWithdrawalBlockSetting = async () => {
		await api_payment_GetWithdrawalBlockSetting().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setWithdrawalSettingTypeList(res.data.data);
					} else {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: `[${res.data.errorCode}] ${res.data.message}`,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={closePopBox}
									>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: t("msg_ApiServerError"),
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
									onClick={closePopBox}
								>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			}
		);
	};

	if (loading) return <Loading />;

	return (
		<>
			<div className="infoModule">
				<Withdrawal
					balanceData={balanceData}
					kycStatus={kycStatus}
					withdrawalMin={withdrawalLimit.withdrawalMin}
					withdrawalMax={withdrawalLimit.withdrawalMax}
					unlimited={withdrawalLimit.unlimited}
					uSDTWithdrawalLimit={uSDTWithdrawalLimit}
					withdrawalLimit={withdrawalLimit}
					setLoading={setLoading}
					getKycStatus={getKycStatus}
					getWithdrawalInfoRecent={getWithdrawalInfoRecent}
					getWithdrawalLimit={getWithdrawalLimit}
					getWithdrawalAvailableBalance={
						getWithdrawalAvailableBalance
					}
					withdrawalSettingTypeList={withdrawalSettingTypeList}
				/>
			</div>
			<RecentHistory
				recentData={recentData}
				setRecentData={setRecentData}
				getKycStatus={getKycStatus}
				getWithdrawalLimit={getWithdrawalLimit}
				getWithdrawalAvailableBalance={getWithdrawalAvailableBalance}
				getWithdrawalInfoRecent={getWithdrawalInfoRecent}
			/>
		</>
	);
};
