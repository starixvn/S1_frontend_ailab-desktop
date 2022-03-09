import React, { useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { api_accountStrict_DelCustUSDTInfo } from "../../service/api/accountStrict";
import usePopBox from "../hook/usePopBox";
import { defPopBoxType } from "../common/popBox";
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
		usdtAddress,
		nickName,
		accountName,
		currencyId
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
								usdtAddress,
								nickName,
								accountName,
								currencyId
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

	const removeUSDT = ({ usdtAddress, nickName, accountName, currencyId }) => {
		api_accountStrict_DelCustUSDTInfo({
			usdtAddress,
			nickName,
			accountName,
			currencyId
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

	const arr = walletList?.map(({ usdtAddress, nickName, currencyId }) => {
		return (
			<div
				className="addBankName"
				key={`walletCard-${currencyId}-${usdtAddress}`}>
				<div className="cryptoInfo">
					<i className="icon icon-crypto" />
					<div>{usdtAddress}</div>
					<button
						className="icon icon-bin"
						onClick={() =>
							delUSDTwallet({
								usdtAddress,
								nickName,
								accountName: userInfo.accountName,
								currencyId
							})
						}
					/>
				</div>
				<div className="walletNickname">{nickName}</div>
			</div>
		);
	});

	if (loading) return <Loading />;

	if (walletList?.length > 0)
		return (
			<div className="infoModule">
				<div className="walletModule">
					<div className="addBank haveBank">{arr}</div>
				</div>
			</div>
		);

	return null;
};

WalletCard.propTypes = {
	walletList: PropTypes.arrayOf(PropTypes.any).isRequired,
	loading: PropTypes.bool.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	GetCustBankInfo: PropTypes.func.isRequired
};

export default WalletCard;
