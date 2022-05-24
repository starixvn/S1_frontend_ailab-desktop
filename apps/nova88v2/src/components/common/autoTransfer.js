import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import usePopBox from "../hook/usePopBox";
import {
	api_account_GetWalletTransferStatus,
	api_account_SetWalletTransferStatus
} from "../../service/api/account";
import defPopBoxType from "./defPopBoxType";

const defAutoStatus = {
	isAuto: 1,
	notAuto: 2
};

const AutoTransfer = () => {
	const isMountedRef = useRef(null);
	const { t } = useTranslation();
	const [isAutoTransfer, setIsAutoTransfer] = useState(false);
	const { errorPopBox, setPopBox } = usePopBox();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		api_account_GetWalletTransferStatus().then(
			res => {
				if (isMountedRef.current && res.data.errorCode === 0) {
					const _isAuto = res.data.data === defAutoStatus.isAuto;
					setIsAutoTransfer(_isAuto);
				} else if (res.data.errorCode !== 0) {
					errorPopBox(
						res.data.message || "error",
						res.data.errorCode
					);
				}
			},
			() => {
				if (!isMountedRef.current) return;
				errorPopBox();
			}
		);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const changeStatus = () => {
		const _autoStatus = !isAutoTransfer
			? defAutoStatus.isAuto
			: defAutoStatus.notAuto;
		api_account_SetWalletTransferStatus({
			AutoTransfer: _autoStatus
		}).then(
			res => {
				if (isMountedRef.current && res.data.errorCode === 0) {
					setIsAutoTransfer(!isAutoTransfer);
					setPopBox({ isOpen: false });
				} else if (res.data.errorCode !== 0) {
					errorPopBox(
						res.data.message || "error",
						res.data.errorCode
					);
				}
			},
			() => {
				if (!isMountedRef.current) return;
				errorPopBox();
			}
		);
	};

	const onChangeAutoTransfer = () => {
		if (isAutoTransfer === false) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Success,
				title: t("lbl_Caution"),
				description: (
					<div className="txt-lightgray">
						{t("lbl_AutoTransferHint")}
					</div>
				),
				btnBar: (
					<div className="btnGroup">
						<button className="btn-check" onClick={changeStatus}>
							OK
						</button>
						<button
							className="btn-cancel"
							onClick={() => setPopBox({ isOpen: false })}>
							{t("lbl_Cancel")}
						</button>
					</div>
				)
			});
		} else {
			changeStatus();
		}
	};

	return (
		<div className="swithModule">
			{t("lbl_Main_Wallet_Auto_Transfer")}
			<button
				className={`switchBtn${isAutoTransfer ? " active" : ""}`}
				onClick={onChangeAutoTransfer}>
				<span>ON</span>
				<span>OFF</span>
				<div className={isAutoTransfer ? "active" : ""} />
			</button>
			<button className="icon icon-information" />
			<div className="inputInfo transfer">
				<span>{t("lbl_Caution")}</span>
				{t("lbl_AutoTransferHint")}
			</div>
		</div>
	);
};

export default AutoTransfer;
