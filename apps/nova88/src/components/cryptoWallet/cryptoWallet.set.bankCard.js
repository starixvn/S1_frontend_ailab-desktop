import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import config from "../../config";
import Loading from "../common/loading";

export default props => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const fakeList = [{ id: 1 }, { id: 2 }];
	// ↑↑
	const arr = fakeList?.map(item => {
		return (
			<div className="addBankName" key={`walletCard-${item.id}`}>
				<div className="cryptoInfo">
					<i className="icon icon-BTC" />
					<div>test test</div>
				</div>
				<div className="walletNickname">test</div>
			</div>
			// <div className="addBankName" key={`bankCard-${item.accountNo}`}>
			// 	<div className="addBankInfo">
			// 		<div className="bankName">
			// 			<img
			// 				alt="BankLogo"
			// 				src={`${config.imgUrl}/common/images/BankLogo/${item.bankLogo}`}
			// 			/>
			// 		</div>
			// 	</div>
			// 	<div className="addBankInfo">
			// 		<div className="txt-blue">{item.accountNo}</div>
			// 		<button
			// 			aria-label="deleteBankAccount"
			// 			className="icon icon-bin"
			// 			onClick={deleteBankAccount.bind(
			// 				this,
			// 				item.sysId,
			// 				item.accountNo
			// 			)}
			// 		/>
			// 	</div>
			// </div>
		);
	});
	return loading ? (
		<Loading />
	) : (
		<>
			{props.custBankList?.length > 0 ? (
				<div className="infoModule">
					<div className="walletModule">
						<div className="addBank haveBank">{arr}</div>
					</div>
				</div>
			) : null}
		</>
	);
};
