import React, { useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { api_accountStrict_DelCustUSDTInfo } from "../../service/api/accountStrict";
import usePopBox from "../hook/usePopBox";
import { defPopBoxType } from "../common/defPopBoxType";
import { popBoxContext } from "../common/context";
import Loading from "../common/loading";

const WalletCard = ({
	walletList,
	loading,
	userInfo,
	numberOfAccount,
	GetCustBankInfo
}) => {
	const isMountedRef = useRef(null);
	const { t } = useTranslation();
	const { errorPopBox } = usePopBox();
	const { setPopBox } = useContext(popBoxContext);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const delUSDTwallet = ({ accountName, nickName, usdtAddress }) => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.ConfirmDelete,
			message: t("lbl_AreYouSureDelete"),
			message2: t("lbl_CantBeRestore"),
			btnBar: (
				<div className="btnGroup">
					<button
						className="btn-check"
						onClick={() =>
							removeUSDT({
								accountName,
								nickName,
								usdtAddress
							})
						}>
						{t("lbl_Yes")}
					</button>
					<button
						className="btn-cancel"
						onClick={() => setPopBox({ isOpen: false })}>
						{t("lbl_No")}
					</button>
				</div>
			)
		});
	};

	const removeUSDT = ({ accountName, nickName, usdtAddress }) => {
		api_accountStrict_DelCustUSDTInfo({
			accountName,
			nickName,
			usdtAddress
		})
			.then(res => {
				if (res.data.errorCode === 0) {
					setPopBox({ isOpen: false });
					GetCustBankInfo();
				} else {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: res.data.message,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-check"
									onClick={() =>
										setPopBox({ isOpen: false })
									}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			})
			.catch(() => {
				errorPopBox();
			});
	};

	const arr = walletList?.map(({ usdtAddress, nickName }) => {
		return (
			<div className="addCryptoName" key={`walletCard-${usdtAddress}`}>
				<div className="addCryptoInfo">
					<div className="cryptoName">
						<div className="icon icon-USDT">
							<span>{nickName}</span>
						</div>
					</div>
					<div>
						<button
							onClick={() =>
								delUSDTwallet({
									usdtAddress,
									nickName,
									accountName: userInfo.accountName
								})
							}
							className="icon icon-bin"
						/>
					</div>
				</div>
				<div className="addCryptoInfo">
					<div className="txt-dark">
						<span>{usdtAddress}</span>
					</div>
				</div>
			</div>
		);
	});

	if (loading) return <Loading />;

	if (walletList?.length > 0)
		return (
			<div className="infoModule">
				<div className="walletModule">
					<div className="addCrypto haveBank">
						<div className="txt-blue15">
							<div className="remainder">
								{t("lbl_Number_Of_Wallet")}: {numberOfAccount}/3
							</div>
						</div>

						{arr}
					</div>
				</div>
			</div>
		);

	return null;
};

WalletCard.propTypes = {
	walletList: PropTypes.arrayOf(PropTypes.any).isRequired,
	loading: PropTypes.bool.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	numberOfAccount: PropTypes.number.isRequired,
	GetCustBankInfo: PropTypes.func.isRequired
};

export default WalletCard;
