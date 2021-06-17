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

	const arr = custBankList?.map(item => {
		const bankLogo = String(item.bankLogo).toLowerCase();

		return (
			<div className="addBankName" key={`bankCard-${item.accountNo}`}>
				<div className="addBankInfo">
					<div className="bankName">
						<img
							src={`${config.cloudImgUrl}/SiteSkin/img/BankLogo/${bankLogo}`}
							alt={item.bankName}
						/>
					</div>
				</div>
				<div className="addBankInfo">
					<div className="txt-blue">{item.accountNo}</div>
					<button
						aria-label="deleteBankAccount"
						className="icon icon-bin"
						onClick={delBankAccount.bind(
							this,
							item.sysId,
							item.accountNo
						)}
					/>
				</div>
			</div>
		);
	});
	return loading ? (
		<Loading />
	) : (
		<>
			{custBankList?.length > 0 ? (
				<div className="infoModule">
					<div className="walletModule">
						<div className="addBank haveBank">{arr}</div>
					</div>
				</div>
			) : null}
		</>
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
