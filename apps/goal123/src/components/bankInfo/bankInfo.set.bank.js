import React, { useEffect, useRef, useState, useContext } from "react";
import { defActionType } from "./bankInfo.reducer";
import { api_payment_GetBankInfoSysList } from "../../service/api/payment";
import { popBoxContext } from "../common/context";
import config from "../../config";
import Loading from "../common/loading";
import { defPopBoxType } from "../common/popBox";

export default ({ t, dispatch, bankList, toLastStep, selectBank }) => {
	const { setPopBox } = useContext(popBoxContext);
	const [loading, setLoading] = useState(false);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		api_payment_GetBankInfoSysList().then(
			res => {
				if (isMountedRef.current) {
					setLoading(true);
					if (res.data.errorCode === 0) {
						dispatch({
							type: defActionType.SET_BANKLIST,
							bankList: res.data.data
						});
					} else {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: `[${res.data.errorCode}] ${res.data.message}`,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={ClickClose}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
					setLoading(false);
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
									onClick={ClickClose}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
					setLoading(false);
				}
			}
		);
	}, []);

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const arr = bankList?.map((item, i) => {
		return (
			<li key={`addBankAccount-${item.sysId}`}>
				<a onClick={selectBank.bind(this, i)}>
					<img
						src={`${
							config.imgUrl
						}/common/images/BankLogo/${item.bankLogo?.toLowerCase()}`}
						alt={item.bankName}
					/>
				</a>
			</li>
		);
	});

	return loading ? (
		<Loading />
	) : (
		<>
			<div className="platformName">
				<div className="icon icon-arrow-right2" />
				<div>
					<div className="txt-blue2">{t("lbl_SelectBank")}</div>
				</div>
				<button
					className="icon icon-arrow-left2"
					onClick={toLastStep}
				/>
			</div>
			<div className="subModuleList">
				<div className="subModule">
					<div className="subModuleBody">
						<ul>{arr}</ul>
					</div>
				</div>
			</div>
		</>
	);
};
