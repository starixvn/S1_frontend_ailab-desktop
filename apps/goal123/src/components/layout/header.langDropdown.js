import React, { useContext, useState, useEffect, useRef } from "react";
import { navigate } from "gatsby";
import DropdownHeader from "../common/dropdown.langList";
import { userInfoContext } from "../common/context";
import usePopBox from "../hook/usePopBox";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const { errorPopBox } = usePopBox();
	const [redirectPath] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	if (redirectPath === null) {
		return (
			<DropdownHeader
				mainKey="header-langList"
				className="country"
				subClassName="countryList"
				selectedValue={userInfo.langId}
				isLogin={userInfo.isLogin}
				errorPopBox={errorPopBox}
			/>
		);
	}
	navigate(redirectPath);
	return [];
};
