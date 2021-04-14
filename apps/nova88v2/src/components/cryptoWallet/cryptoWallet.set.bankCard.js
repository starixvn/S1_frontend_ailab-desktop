import React, { useEffect, useRef, useState } from "react";
import Loading from "../common/loading";

export default props => {
	const [loading] = useState(false);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const arr = props.walletList?.map(item => {
		return (
			<div className="addBankName" key={`walletCard-${item.usdtAddress}`}>
				<div className="cryptoInfo">
					<i className="icon icon-BTC" />
					<div>{item.nickName}</div>
				</div>
				<div className="walletNickname">{item.usdtAddress}</div>
			</div>
		);
	});

	return loading ? (
		<Loading />
	) : (
		<>
			{props.walletList?.length > 0 ? (
				<div className="infoModule">
					<div className="walletModule">
						<div className="addBank haveBank">{arr}</div>
					</div>
				</div>
			) : null}
		</>
	);
};
