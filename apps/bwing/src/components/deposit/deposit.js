import React, { useState } from "react";
import { Redirect } from "@reach/router";
import LocalBankList from "./localBank.list";
import OnlineBankList from "./onlineBank.list";
import MobilePayList from "./mobilePay.list";

export default () => {
	const [redirectPath, setRedirectPath] = useState(null);

	return redirectPath === null ? (
		<div className="subModuleList">
			<MobilePayList />
			<OnlineBankList />
			<LocalBankList />
		</div>
	) : (
		<Redirect to={redirectPath} noThrow />
	);
};
