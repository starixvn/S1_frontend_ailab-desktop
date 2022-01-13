import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import usePopBox from "../hook/usePopBox";
import {
	api_account_GetWalletTransferStatus,
	api_account_SetWalletTransferStatus
} from "../../service/api/account";

const defAutoStatus = {
	isAuto: 1,
	notAuto: 2
};

const AutoTransfer = () => {
	const isMountedRef = useRef(null);
	const { t } = useTranslation();
	const [isAutoTransfer, setIsAutoTransfer] = useState(false);
	const { errorPopBox } = usePopBox();

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

	const onChangeAutoTransfer = () => {
		const _autoStatus = !isAutoTransfer
			? defAutoStatus.isAuto
			: defAutoStatus.notAuto;
		api_account_SetWalletTransferStatus({
			AutoTransfer: _autoStatus
		}).then(
			res => {
				if (isMountedRef.current && res.data.errorCode === 0) {
					setIsAutoTransfer(!isAutoTransfer);
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
		</div>
	);
};

export default AutoTransfer;
