import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import config from "../../config";
import Loading from "../common/loading";

const BankInfoCard = ({ custBankList, delBankAccount, loading }) => {
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const arr = custBankList?.map(item => (
		<div className="addBankName" key={`bankCard-${item.accountNo}`}>
			<div className="addBankInfo">
				<div className="bankName">
					<img
						alt="BankLogo"
						src={`${
							config.imgUrl
						}/common/images/BankLogo/${item.bankLogo?.toLowerCase()}`}
					/>
				</div>
			</div>
			<div className="addBankInfo">
				<div className="txt-blue2">{item.accountNo}</div>
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
	));
	return loading ? (
		<Loading />
	) : (
		custBankList?.length > 0 && (
			<div className="infoModule">
				<div className="walletModule">
					<div className="addBank haveBank">{arr}</div>
				</div>
			</div>
		)
	);
};

BankInfoCard.defaultProps = {
	custBankList: null
};

BankInfoCard.propTypes = {
	custBankList: PropTypes.arrayOf(PropTypes.any),
	delBankAccount: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired
};

export default BankInfoCard;
