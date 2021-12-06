import React, { useContext, useState, useEffect, useRef } from "react";
import { Redirect } from "@reach/router";
import DropdownHeader from "../common/dropdown.langList";
import { userInfoContext } from "../common/context";
import usePopBox from "../hook/usePopBox";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const [redirectPath] = useState(null);
	const { errorPopBox } = usePopBox();
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	return redirectPath === null ? (
		<DropdownHeader
			mainKey="header-langList"
			className="country"
			subClassName="countryList"
			selectedValue={userInfo.langId}
			isLogin={userInfo.isLogin}
			errorPopBox={errorPopBox}
		/>
	) : (
		<Redirect to={redirectPath} noThrow />
	);
};
