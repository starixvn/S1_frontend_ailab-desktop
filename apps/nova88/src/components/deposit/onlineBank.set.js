import React, {
	useEffect,
	useState,
	useContext,
	useRef,
	useReducer
} from "react";
import { Redirect, Link, useLocation, navigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import {
	api_payment_GetOnlineBankInfoSysList,
	api_payment_GetOnlinePaymentList
} from "../../service/api/payment";
import { getUrlParameter, isConvert } from "../common/common";
import path from "../../router";
import { userInfoContext } from "../common/context";
import DepositWrapper from "./wrapper";
import BankPanel from "./onlineBank.set.bank";
import AmountPanel from "./onlineBank.set.amount";
import ConfirmPanel from "./onlineBank.set.confirm";
import {
	reducer,
	initState,
	defModule,
	defActionType
} from "./onlineBank.reducer";
import config from "../../config";

const _path = path.deposit.sub.onlineBank.root;

export default () => {
	const { t } = useTranslation();

	const [redirectPath, setRedirectPath] = useState(null);
	const isMountedRef = useRef(null);
	const [state, dispatch] = useReducer(reducer, initState);
	const location = useLocation();

	const { userInfo } = useContext(userInfoContext);

	const getOnlinePaymentInfo = async pId => {
		try {
			const {
				data: { data, errorCode }
			} = await api_payment_GetOnlinePaymentList();
			if (!isMountedRef.current) return;

			const success = errorCode === 0;

			if (success) {
				return data.find(item => item.payId === pId);
			}
		} catch (error) {}
	};

	const getOnlineBankInfoSysList = async pId => {
		await api_payment_GetOnlineBankInfoSysList({
			payId: Number(pId)
		}).then(res => {
			if (res.data.errorCode === 0) {
				const datas = res.data.data.map(b => {
					return b;
				});

				if (isMountedRef.current) {
					if (datas.length > 0) {
						dispatch({
							type: defActionType.SET_BANKLIST,
							bankList: datas
						});
					} else {
						setRedirectPath(
							`${userInfo.langId}/${path.deposit.root}`
						);
					}
				}
			}
		});
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const pId = getUrlParameter("pId");
		const cId = getUrlParameter("cId");
		const name = getUrlParameter("name");
		if (!pId || !cId || !name) {
			setRedirectPath(`/${userInfo.langId}/${path.deposit.root}`);
		}
	}, [setRedirectPath]);

	useEffect(() => {
		async function fetchData() {
			const pId = getUrlParameter("pId");

			if (location.state?.selBank === undefined) {
				const paymentInfo = await getOnlinePaymentInfo(Number(pId));
				if (!paymentInfo?.selBank)
					return navigate(`/${userInfo.langId}/${path.deposit.root}`);

				const { channelId, payName, maxAmount, minAmount, selBank } =
					paymentInfo;

				navigate(
					`${_path}?name=${payName}&pId=${pId}&cId=${channelId}&max=${maxAmount}&min=${minAmount}`,
					{
						state: { selBank }
					}
				);
			} else if (!location.state.selBank)
				return dispatch({
					type: defActionType.JUNP_TO_ENTER_AMOUNT
				});

			if (pId) {
				await getOnlineBankInfoSysList(pId);
			}
		}
		fetchData();
	}, [userInfo.langId]);

	const pName = getUrlParameter("name");
	let displayMoudle = null;
	const _isConvert = isConvert(userInfo.currencyId);
	switch (state.displayMoudle) {
		case defModule.BankPanel:
			displayMoudle = (
				<BankPanel dispatch={dispatch} bankList={state.bankList} />
			);
			break;
		case defModule.AmountPanel: {
			const maxAmount = getUrlParameter("max");
			const minAmount = getUrlParameter("min");
			displayMoudle = (
				<AmountPanel
					dispatch={dispatch}
					bankInfo={state.bankList[state.bankIdx]}
					_isConvert={_isConvert}
					amount={state.amount}
					checked={state.checked}
					tip={state.tip}
					maxAmount={maxAmount}
					minAmount={minAmount}
				/>
			);
			break;
		}

		case defModule.ConfirmPanel:
			displayMoudle = (
				<ConfirmPanel
					bankInfo={state.bankList[state.bankIdx]}
					_isConvert={_isConvert}
					amount={state.amount}
					dispatch={dispatch}
				/>
			);
			break;

		default:
			break;
	}

	const ClickBack = () => {
		dispatch({ type: defActionType.CLICK_BACK });
	};

	return redirectPath === null ? (
		<DepositWrapper step={state.step}>
			<div className="platformName">
				<div className="icon">
					<img
						src={`${config.cloudImgUrl}/SiteSkin/img/Payment/${pName}.png`}
					/>
				</div>
				<div>
					<div className="txt-blue">{t("lbl_OnlineBanking")}</div>
					<div className="txt-orange">
						{t("lbl_CreditTime")}:{t("lbl_Instant")}
					</div>
				</div>
				{state.step === 2 ||
				(state.step === 3 && location.state?.selBank === false) ? (
					<Link
						to={`/${userInfo.langId}/${path.deposit.root}`}
						className="icon icon-arrow-left2"
					/>
				) : (
					<a onClick={ClickBack} className="icon icon-arrow-left2" />
				)}
			</div>
			{displayMoudle}
		</DepositWrapper>
	) : (
		<Redirect to={redirectPath} noThrow />
	);
};
