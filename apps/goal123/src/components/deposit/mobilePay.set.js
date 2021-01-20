import React, {
	useEffect,
	useState,
	useContext,
	useRef,
	useReducer
} from "react";
import { Redirect, Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import { api_payment_GetMobilePayInfoList } from "../../service/api/payment";
import { getUrlParameter, isConvert } from "../common/common";
import path from "../../router";
import { userInfoContext, popBoxContext } from "../common/context";
import DepositWrapper from "./wrapper";
import ChannelPanel from "./mobilePay.set.channel";
import AmountPanel from "./mobilePay.set.amount";
import ConfirmPanel from "./mobilePay.set.confirm";
import {
	reducer,
	initState,
	defModule,
	defActionType
} from "./mobilePay.reducer";
import Loading from "../common/loading";
import { defPopBoxType } from "../common/popBox";

export default () => {
	const { t } = useTranslation();
	const [redirectPath, setRedirectPath] = useState(null);
	const { userInfo } = useContext(userInfoContext);
	const [loading, setLoading] = useState(true);
	const isMountedRef = useRef(null);
	const [state, dispatch] = useReducer(reducer, initState);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const gId = getUrlParameter("gId");
		const name = getUrlParameter("name");
		if (!gId || !name) {
			setRedirectPath(`/${userInfo.langId}/${path.deposit.root}`);
		}
	}, [setRedirectPath, userInfo.langId]);

	useEffect(() => {
		const gId = getUrlParameter("gId");
		if (gId) {
			api_payment_GetMobilePayInfoList(Number(gId)).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							dispatch({
								type: defActionType.SET_CHANNELLIST,
								channelList: res.data.data
							});
						}
						setLoading(false);
					}
				},
				err => {
					if (isMountedRef.current) {
						setLoading(false);
					}
				}
			);
		}
	}, [userInfo.langId]);

	const gName = getUrlParameter("name");
	let displayMoudle = null;
	const _isConvert = isConvert(userInfo.currencyId);
	switch (state.displayMoudle) {
		case defModule.ChannelPanel:
			displayMoudle = (
				<ChannelPanel
					dispatch={dispatch}
					channelList={state.channelList}
				/>
			);
			break;
		case defModule.AmountPanel:
			displayMoudle = (
				<AmountPanel
					dispatch={dispatch}
					channelInfo={state.channelList[state.channelIdx]}
					_isConvert={_isConvert}
					amount={state.amount}
				/>
			);
			break;

		case defModule.ConfirmPanel:
			displayMoudle = (
				<ConfirmPanel
					channelInfo={state.channelList[state.channelIdx]}
					_isConvert={_isConvert}
					amount={state.amount}
				/>
			);
			break;
		default:
			break;
	}

	const ClickBack = () => {
		dispatch({ type: defActionType.CLICK_BACK });
	};

	return loading ? (
		<Loading />
	) : redirectPath === null ? (
		<DepositWrapper step={state.step}>
			<div className="platformName">
				<div className={`icon icon-${gName}`} />
				<div>
					<div className="txt-yellow">{t("lbl_MobileDeposit")}</div>
					<div className="txt-red">
						{t("lbl_CreditTime")}:{t("lbl_Instant")}
					</div>
				</div>
				{state.step === 2 ? (
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
