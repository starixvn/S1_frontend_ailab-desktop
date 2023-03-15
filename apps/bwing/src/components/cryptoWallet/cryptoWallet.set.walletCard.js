import React, { useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { api_accountStrict_DelCustCryptoWallet } from "../../service/api/accountStrict";
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

	const delUSDTwallet = ({ CurrencyId, Network, NickName, Address }) => {
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
								CurrencyId,
								Network,
								NickName,
								Address
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

	const removeUSDT = ({ CurrencyId, Network, NickName, Address }) => {
		api_accountStrict_DelCustCryptoWallet({
			CurrencyId,
			Network,
			NickName,
			Address
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

	const arr = walletList?.map(
		({ usdtAddress, nickName, currencyId, network }) => {
			return (
				<div
					className="addCryptoName"
					key={`walletCard-${currencyId}-${usdtAddress}`}>
					<div className="addCryptoInfo">
						<div className="cryptoName">
							<div className="icon icon-USDT">
								<span>{nickName}</span>
							</div>
						</div>

						{/* * 暫時隱藏 delete crypto wallet 按鈕，以防止有用戶重複新增刪除帳號來套利，當 risk 評估覺得可以的話有機會再打開 */}
						{/* <div> */}
						{/* 	<button */}
						{/* 		onClick={() => */}
						{/* 			delUSDTwallet({ */}
						{/* 				CurrencyId: currencyId, */}
						{/* 				Network: network, */}
						{/* 				NickName: nickName, */}
						{/* 				Address: usdtAddress */}
						{/* 			}) */}
						{/* 		} */}
						{/* 		className="icon icon-bin" */}
						{/* 	/> */}
						{/* </div> */}
					</div>
					<div className="addCryptoInfo">
						<div className="txt-dark">
							<span>{usdtAddress}</span>
						</div>
					</div>
				</div>
			);
		}
	);

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
