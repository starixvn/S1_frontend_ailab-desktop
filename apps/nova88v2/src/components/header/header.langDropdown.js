import React, { useContext, useState, useEffect, useRef } from "react";
import { navigate } from "gatsby";
import DropdownHeader from "../common/dropdown.langList";
import { userInfoContext, popBoxContext } from "../common/context";

const getLangs = (currencyId, langKey) => {
	const afterLogin = Boolean(currencyId);

	const defLangGroups = {
		ch: [
			{ displayText: "English", value: "en" },
			{ displayText: "简体中文", value: "cs" },
			{ displayText: "Malay", value: "my" }
		],
		th: [
			{ displayText: "English", value: "th_en" },
			{ displayText: "ไทย", value: "th" }
		],
		id: [
			{ displayText: "English", value: "id_en" },
			{ displayText: "Bhs Indonesia", value: "id" }
		],
		in: [
			{ displayText: "English", value: "hi_en" },
			{ displayText: "Hindi", value: "hi" }
		]
	};

	return afterLogin && langKey
		? { [langKey]: defLangGroups[langKey] }
		: defLangGroups;
};

const currencyToLangKey = {
	2: "ch",
	4: "th",
	15: "id",
	61: "in"
};

const defLangGroupCountry = {
	ch: "Malaysia",
	th: "Thailand",
	id: "Indonesia",
	in: "India"
};

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [redirectPath] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const langKey = currencyToLangKey[userInfo.currencyId];
	const _defLangGroup = getLangs(userInfo.currencyId, langKey);

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	if (redirectPath === null) {
		return (
			<DropdownHeader
				mainKey="header-langList"
				className="country"
				subClassName="countryList"
				defLangGroup={_defLangGroup}
				defLangGroupCountry={defLangGroupCountry}
				selectedValue={userInfo.langId}
				isLogin={userInfo.isLogin}
				isMountedRef={isMountedRef}
				setPopBox={setPopBox}
				clickClose={clickClose}
			/>
		);
	}
	navigate(redirectPath);
	return [];
};
