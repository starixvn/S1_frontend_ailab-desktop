import React, { useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { api_accountStrict_delCustUSDTInfo } from "../../service/api/accountStrict";
import usePopBox from "../hook/usePopBox";
import defPopBoxType from "../common/defPopBoxType";
import { popBoxContext } from "../common/context";
import Loading from "../common/loading";

const WalletCard = ({ walletList, loading, userInfo, GetCustBankInfo }) => {
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

	const delUSDTwallet = ({
		USDTAddress,
		NickName,
		AccountName,
		CurrencyId
	}) => {
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
								USDTAddress,
								NickName,
								AccountName,
								CurrencyId
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

	const removeUSDT = ({ USDTAddress, NickName, AccountName, CurrencyId }) => {
		api_accountStrict_delCustUSDTInfo({
			USDTAddress,
			NickName,
			AccountName,
			CurrencyId
		})
			.then(res => {
				if (res.data.errorCode === 0) {
					setPopBox({ isOpen: false });
					GetCustBankInfo();
				} else {
					errorPopBox(
						res.data.message || "error",
						res.data.errorCode
					);
				}
			})
			.catch(() => {
				errorPopBox();
			});
	};

	const arr = walletList?.map(item => {
		return (
			<div
				className="addBankName"
				key={`walletCard-${item.currencyId}-${item.usdtAddress}`}>
				<div className="cryptoInfo">
					<i className="icon icon-USDT" />
					<div>{item.usdtAddress}</div>
				</div>

				{/* * 暫時隱藏 delete crypto wallet 按鈕，以防止有用戶重複新增刪除帳號來套利，當 risk 評估覺得可以的話有機會再打開 */}
				{/* <button
					className="icon icon-bin"
					onClick={() =>
						delUSDTwallet({
							USDTAddress: item.usdtAddress,
							NickName: item.nickName,
							AccountName: userInfo.accountName,
							CurrencyId: item.currencyId
						})
					}
				/> */}
				<div className="walletNickname">{item.nickName}</div>
			</div>
		);
	});
	return loading ? (
		<Loading />
	) : (
		<>
			{walletList?.length > 0 ? (
				<div className="infoModule">
					<div className="walletModule">
						<div className="addBank haveBank">{arr}</div>
					</div>
				</div>
			) : null}
		</>
	);
};

WalletCard.propTypes = {
	walletList: PropTypes.arrayOf(PropTypes.any).isRequired,
	loading: PropTypes.bool.isRequired
};

export default WalletCard;
