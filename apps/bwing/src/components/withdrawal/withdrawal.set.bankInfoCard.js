import React, { useEffect, useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { api_accountStrict_DelCustBankInfo } from "../../service/api/accountStrict";
import config from "../../config";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import Loading from "../common/loading";

const BankInfoCard = props => {
	const { currentBankInfoDetail, getCustBankInfo, datas } = props;

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
		props.onChangeBankInfo({ sysId, accountNo, bankName });
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
						onClick={deleteCard.bind(this, sysId, accountNo)}>
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

		const selected =
			currentBankInfoDetail.sysId === sysId &&
			currentBankInfoDetail.accountNo === accountNo;

		api_accountStrict_DelCustBankInfo({
			AccountName: userInfo.accountName,
			AccountNo: accountNo,
			SysId: sysId
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						if (selected) {
							props.onChangeBankInfo({});
						}

						getCustBankInfo();
					} else {
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
					}
					setLoading(false);
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
					setLoading(false);
				}
			}
		);
	};

	const bankCardArr = datas.map(item => {
		const key = `withdrawal-banklist-${item.sysId}-${item.accountNo}`;
		const checkKey = `${key}-check`;
		return (
			<div className="addBankName" key={key}>
				<div className="addBankInfo">
					<div className="bankName">
						<img
							src={`${
								config.imgUrl
							}/common/images/BankLogo/${item.bankLogo?.toLowerCase()}`}
							alt={item.bankName}
						/>
					</div>
					<div>
						{props.isShowConfirmPage ? null : (
							<button
								className="icon icon-bin"
								onClick={popDelete.bind(
									this,
									item.sysId,
									item.accountNo
								)}
							/>
						)}

						<div className="checkbox">
							<input
								type="checkbox"
								checked={
									currentBankInfoDetail.sysId ===
										item.sysId &&
									currentBankInfoDetail.accountNo ===
										item.accountNo
								}
								onChange={checkInput.bind(
									this,
									item.sysId,
									item.accountNo,
									item.bankName
								)}
								id={checkKey}
							/>
							<label
								htmlFor={checkKey}
								className="icon icon-checkbox-checked"
							/>
						</div>
					</div>
				</div>
				<div className="addBankInfo">
					<div className="txt-dark">
						<span>{item.accountNo?.slice(0, 4)}</span>
						<span>{item.accountNo?.slice(4, 8)}</span>
						<span>{item.accountNo?.slice(8, 12)}</span>
						<span>{item.accountNo?.slice(12, 16)}</span>
					</div>
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
	getCustBankInfo: PropTypes.func.isRequired
};

export default BankInfoCard;
