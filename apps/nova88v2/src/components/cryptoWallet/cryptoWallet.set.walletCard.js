import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Loading from "../common/loading";

const WalletCard = ({ walletList, loading }) => {
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const arr = walletList?.map(item => {
		return (
			<div className="addBankName" key={`walletCard-${item.usdtAddress}`}>
				<div className="cryptoInfo">
					<i className="icon icon-USDT" />
					<div>{item.usdtAddress}</div>
				</div>
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
