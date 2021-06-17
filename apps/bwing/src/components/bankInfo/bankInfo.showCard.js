import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import config from "../../config";
import Loading from "../common/loading";

const BankInfoCard = ({ t, custBankList, delBankAccount, loading }) => {
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const arr = custBankList?.map(item => {
		return (
			<div className="addBankName" key={`bankCard-${item.accountNo}`}>
				<div className="addBankInfo">
					<div className="bankName">
						<img
							alt="BankLogo"
							src={`${config.imgUrl}/common/images/BankLogo/${item.bankLogo}`}
						/>
					</div>
					<div>
						<button
							aria-label="delBankAccount"
							className="icon icon-bin"
							onClick={delBankAccount.bind(
								this,
								item.sysId,
								item.accountNo
							)}
						/>
					</div>
				</div>
				<div className="addBankInfo">
					<div className="txt-dark">{item.accountNo}</div>
				</div>
			</div>
		);
	});
	return loading ? (
		<Loading />
	) : (
		<div className="infoModule">
			<div className="walletModule">
				<div className="addBank haveBank">
					<div className="txt-blue15">
						{t("lbl_BANK_ACCOUNT")}
						<div className="remainder">
							{t("lbl_NumberOfBankAccounts")}:{" "}
							{custBankList ? custBankList?.length : 0}/3
						</div>
					</div>
					{arr}
				</div>
			</div>
		</div>
	);
};

BankInfoCard.defaultProps = {
	custBankList: null
};

BankInfoCard.propTypes = {
	t: PropTypes.func.isRequired,
	custBankList: PropTypes.arrayOf(PropTypes.any),
	delBankAccount: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired
};

export default BankInfoCard;
