import React, { useState, useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
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
	api_payment_GetWithdrawalLimit
} from "../service/api/payment";

const USDT_TYPE = {
	ERC20: "ERC20",
	TRC20: "TRC20"
};

export default () => {
	return (
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
				<Footer />
			</Layout>
		</Wrapper>
	);
};

const Content = () => {
	const { t } = useTranslation();

	const [loading, setLoading] = useState(true);
	const [balanceData, setBalanceData] = useState({});
	const [kycStatus, setKycStatus] = useState("");
	const [recentData, setRecentData] = useState([]);
	const [uSDTWithdrawalLimit, setUSDTWithdrawalLimit] = useState({
		[USDT_TYPE.TRC20]: {},
		[USDT_TYPE.ERC20]: {}
	});

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
				getWithdrawalLimit()
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
										onClick={closePopBox}>
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
									onClick={closePopBox}>
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
										onClick={closePopBox}>
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
									onClick={closePopBox}>
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
										onClick={closePopBox}>
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
									onClick={closePopBox}>
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

					const TRC20Info = usdtList.find(
						item => item.network === USDT_TYPE.TRC20
					);
					const ERC20Info = usdtList.find(
						item => item.network === USDT_TYPE.ERC20
					);

					setUSDTWithdrawalLimit({
						[USDT_TYPE.TRC20]: {
							withdrawalMin: TRC20Info.withdrawalMin,
							withdrawalMax: TRC20Info.withdrawalAvailableAmount,
							isAmountLimited: !TRC20Info.unlimited
						},
						[USDT_TYPE.ERC20]: {
							withdrawalMin: ERC20Info.withdrawalMin,
							withdrawalMax: ERC20Info.withdrawalAvailableAmount,
							isAmountLimited: !ERC20Info.unlimited
						}
					});

					setWithdrawalLimit({
						withdrawalMin: res.data.data.withdrawalMin,
						withdrawalMax: res.data.data.withdrawalAvailableAmount,
						isAmountLimited: !res.data.data.unlimited
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
									onClick={closePopBox}>
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
								onClick={closePopBox}>
								{t("lbl_Close")}
							</button>
						</div>
					)
				});
			}
		);

	if (loading) return <Loading />;

	return (
		<>
			<div className="infoModule">
				<Withdrawal
					balanceData={balanceData}
					kycStatus={kycStatus}
					withdrawalMin={withdrawalLimit.withdrawalMin}
					withdrawalMax={withdrawalLimit.withdrawalMax}
					isAmountLimited={withdrawalLimit.isAmountLimited}
					uSDTWithdrawalLimit={uSDTWithdrawalLimit}
					withdrawalLimit={withdrawalLimit}
					setLoading={setLoading}
					getKycStatus={getKycStatus}
					getWithdrawalInfoRecent={getWithdrawalInfoRecent}
					getWithdrawalLimit={getWithdrawalLimit}
					getWithdrawalAvailableBalance={
						getWithdrawalAvailableBalance
					}
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
