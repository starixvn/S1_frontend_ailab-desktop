import React, { useEffect, useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { api_accountStrict_DelCustBankInfo } from "../../service/api/accountStrict";
import config from "../../config";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import Loading from "../common/loading";

const BankInfoCard = ({
	currentBankInfoDetail,
	updateCustBankInfo,
	datas,
	isShowConfirmPage,
	onChangeBankInfo
}) => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [loading, setLoading] = useState(false);
	const isMountedRef = useRef(null);
	const { t } = useTranslation();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const checkInput = (sysId, accountNo, bankName) => {
		onChangeBankInfo({ sysId, accountNo, bankName });
	};

	const popDelete = (sysId, accountNo) => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.ConfirmDelete,
			message: t("lbl_AreYouSureDelete"),
			message2: t("lbl_CantBeRestore"),
			btnBar: (
				<div className="btnGroup">
					<button
						className="btn-cancel"
						onClick={() => {
							deleteCard(sysId, accountNo);
						}}
					>
						{t("lbl_Yes")}
					</button>
					<button className="btn-check" onClick={ClickCancel}>
						{t("lbl_No")}
					</button>
				</div>
			)
		});
	};

	const ClickCancel = () => {
		setPopBox({ isOpen: false });
	};

	const deleteCard = (sysId, accountNo) => {
		setPopBox({ isOpen: false });
		setLoading(true);

		api_accountStrict_DelCustBankInfo({
			AccountName: userInfo.accountName,
			AccountNo: accountNo,
			SysId: sysId
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						updateCustBankInfo();
					} else {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: `[${res.data.errorCode}] ${res.data.message}`,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={ClickCancel}
									>
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
									onClick={ClickCancel}
								>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
					setLoading(false);
				}
			}
		);
	};

	const bankCardArr = datas.map(item => {
		const key = `withdrawal-banklist-${item.sysId}-${item.accountNo}`;
		const checkKey = `${key}-check`;

		return (
			<div
				className={`addBankName ${item?.disabled ? "pending" : ""}`}
				key={key}
			>
				{item?.disabled && (
					<div className="mask">{t("lbl_underMaintenance")}</div>
				)}
				<div className="addBankInfo">
					<div className="bankName">
						<img
							src={`${
								config.cloudImgUrl
							}/${item.bankLogo?.toLowerCase()}`}
							alt={item.bankName}
						/>
					</div>
					<div className="checkbox">
						<input
							type="checkbox"
							checked={
								currentBankInfoDetail.sysId === item.sysId &&
								currentBankInfoDetail.accountNo ===
									item.accountNo &&
								!item.disabled
							}
							onChange={checkInput.bind(
								this,
								item.sysId,
								item.accountNo,
								item.bankName
							)}
							id={checkKey}
							disabled={item.disabled}
						/>
						<label
							htmlFor={checkKey}
							className="icon icon-checkbox-checked"
						/>
					</div>
				</div>
				<div className="addBankInfo">
					<div className="txt-blue2">
						<span>{item.accountNo?.slice(0, 4)}</span>
						<span>{item.accountNo?.slice(4, 8)}</span>
						<span>{item.accountNo?.slice(8, 12)}</span>
						<span>{item.accountNo?.slice(12, 16)}</span>
					</div>
					{isShowConfirmPage ? null : (
						<div
							className="icon icon-bin"
							onClick={popDelete.bind(
								this,
								item.sysId,
								item.accountNo
							)}
						/>
					)}
				</div>
			</div>
		);
	});

	return loading ? <Loading /> : bankCardArr;
};

BankInfoCard.defaultProps = {
	datas: []
};

BankInfoCard.propTypes = {
	datas: PropTypes.arrayOf(PropTypes.any),
	currentBankInfoDetail: PropTypes.objectOf(PropTypes.any).isRequired,
	isShowConfirmPage: PropTypes.bool.isRequired,
	onChangeBankInfo: PropTypes.func.isRequired,
	updateCustBankInfo: PropTypes.func.isRequired
};

export default BankInfoCard;
