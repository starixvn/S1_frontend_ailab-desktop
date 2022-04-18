import React, { useState, useEffect, useRef } from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import LeftMenu from "../components/common/leftMenu";
import Withdrawal from "../components/withdrawal/withdrawal.set.bank";
import RecentHistory from "../components/withdrawal/recentHistory";
import Loading from "../components/common/loading";
import { api_account_GetWithdrawalAvailableBalance } from "../service/api/account";
import {
	api_payment_KycCheck,
	api_payment_GetWithdrawalInfoRecent,
	api_payment_GetWithdrawalLimit
} from "../service/api/payment";
import usePopBox from "../components/hook/usePopBox";

export default () => {
	return (
		<Wrapper afterLogin={true}>
			<Layout showFooter={true}>
				<main>
					<section className="inside">
						<LeftMenu />
						<div className="rightModule">
							<Content />
						</div>
					</section>
				</main>
			</Layout>
		</Wrapper>
	);
};

const Content = () => {
	const { errorPopBox } = usePopBox();
	const [loading, setLoading] = useState(true);
	const [balanceData, setBalanceData] = useState({});
	const [kycStatus, setKycStatus] = useState("");
	const [recentData, setRecentData] = useState([]);

	const [uSDTWithdrawalLimit, setUSDTWithdrawalLimit] = useState([]);
	const [withdrawalLimit, setWithdrawalLimit] = useState({});

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
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
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
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
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
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
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
						withdrawalMax: data.withdrawalAvailableAmount,
						unlimited: data.unlimited,
						currencyId: data.currencyId,
						network: data.network
					}));
					setUSDTWithdrawalLimit(_usdtList);

					setWithdrawalLimit({
						withdrawalMin: res.data.data.withdrawalMin,
						withdrawalMax: res.data.data.withdrawalAvailableAmount,
						unlimited: res.data.data.unlimited,
						maxTimes: res.data.data.maxTimes,
						withdrawalTimes: res.data.data.withdrawalTimes
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

	if (loading) return <Loading />;

	return (
		<>
			<div className="infoModule">
				<Withdrawal
					balanceData={balanceData}
					kycStatus={kycStatus}
					uSDTWithdrawalLimit={uSDTWithdrawalLimit}
					withdrawalLimit={withdrawalLimit}
					setLoading={setLoading}
					getKycStatus={getKycStatus}
					getWithdrawalLimit={getWithdrawalLimit}
					getWithdrawalInfoRecent={getWithdrawalInfoRecent}
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
