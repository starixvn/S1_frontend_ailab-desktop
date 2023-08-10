import PropTypes from "prop-types";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Loading from "../common/loading";
import { defPopBoxType } from "../common/popBox";
import config from "../../config";
import { popBoxContext, userInfoContext } from "../common/context";
import { api_accountStrict_DelCustEWalletInfo } from "../../service/api/accountStrict";

const EWalletInfoCard = ({
	datas,
	isShowConfirmPage,
	currentEWalletDetail,
	onChangeEWalletInfo,
	updateCustEWalletInfo
}) => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [loading, setLoading] = useState(false);
	const isMountedRef = useRef(null);
	const { t } = useTranslation();

	const checkInput = (sysId, accountNo, eWalletName) => {
		onChangeEWalletInfo({ sysId, accountNo, eWalletName });
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

		api_accountStrict_DelCustEWalletInfo({
			AccountName: userInfo.accountName,
			AccountNo: accountNo,
			SysId: sysId
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						updateCustEWalletInfo();
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

	const eWalletCardArr = datas.map(item => {
		const key = `withdrawal-eWalletlist-${item.sysId}-${item.accountNo}`;
		const checkKey = `${key}-check`;

		return (
			<div className="addBankName" key={key}>
				<div className="addBankInfo">
					<div className="bankName">
						<img
							src={`${
								config.paymentImgUrl
							}/${item.eWalletLogo?.toLowerCase()}`}
							alt={item.eWalletName}
						/>
					</div>
					<div className="checkbox">
						<input
							type="checkbox"
							checked={
								currentEWalletDetail.sysId === item.sysId &&
								currentEWalletDetail.accountNo ===
									item.accountNo
							}
							onChange={checkInput.bind(
								this,
								item.sysId,
								item.accountNo,
								item.eWalletName
							)}
							id={checkKey}
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

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	return loading ? <Loading /> : eWalletCardArr;
};

EWalletInfoCard.defaultProps = {
	datas: []
};

EWalletInfoCard.propTypes = {
	datas: PropTypes.arrayOf(PropTypes.any),
	isShowConfirmPage: PropTypes.bool.isRequired,
	currentEWalletDetail: PropTypes.objectOf(PropTypes.any).isRequired,
	onChangeEWalletInfo: PropTypes.func.isRequired,
	updateCustEWalletInfo: PropTypes.func.isRequired
};

export default EWalletInfoCard;
