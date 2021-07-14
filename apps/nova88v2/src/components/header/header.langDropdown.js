import React, { useContext, useState, useEffect, useRef } from "react";
import { Redirect } from "@reach/router";
import DropdownHeader from "../common/dropdown.langList";
import { userInfoContext } from "../common/context";

const defLangGroup = {
	en: [{ displayText: "English", value: "en" }],
	ch: [
		// { displayText: "English", value: "en" },
		{ displayText: "简体中文", value: "cs" }
	],
	th: [
		// { displayText: "English", value: "th_en" },
		{ displayText: "ไทย", value: "th" }
	],
	id: [
		// { displayText: "English", value: "id_en" },
		{ displayText: "Bhs Indonesia", value: "id" }
	]
	// in: [
	// 	{ displayText: "English", value: "hi_en" },
	// 	{ displayText: "Hindi", value: "hi" }
	// ]
};

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const [redirectPath] = useState(null);
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
			defLangGroup={defLangGroup}
			selectedValue={userInfo.langId}
			isLogin={userInfo.isLogin}
		/>
	) : (
		<Redirect to={redirectPath} noThrow />
	);
};
