import React, { useContext, useState, useEffect, useRef } from "react";
import { navigate } from "gatsby";
import DropdownHeader from "../common/dropdown.langList";
import { userInfoContext, popBoxContext } from "../common/context";
import { defCurrencyList } from "../common/common";

const getLangs = (langKey, isLogin) => {
	const defLangGroups = {
		ch: [
			{
				displayText: "English",
				value: "en",
				currencyId: defCurrencyList.MYR
			},
			{
				displayText: "简体中文",
				value: "cs",
				currencyId: defCurrencyList.MYR
			},
			{
				displayText: "Malay",
				value: "my",
				currencyId: defCurrencyList.MYR
			}
		],
		th: [
			{
				displayText: "English",
				value: "en",
				currencyId: defCurrencyList.THB
			},
			{ displayText: "ไทย", value: "th", currencyId: defCurrencyList.THB }
		],
		id: [
			{
				displayText: "English",
				value: "en",
				currencyId: defCurrencyList.IDR
			},
			{
				displayText: "Bhs Indonesia",
				value: "id",
				currencyId: defCurrencyList.IDR
			}
		],
		in: [
			{
				displayText: "English",
				value: "en",
				currencyId: defCurrencyList.INR
			},
			{
				displayText: "Hindi",
				value: "hi",
				currencyId: defCurrencyList.INR
			}
		],
		bd: [
			{
				displayText: "English",
				value: "en",
				currencyId: defCurrencyList.BDT
			},
			{
				displayText: "বাংলা",
				value: "bd",
				currencyId: defCurrencyList.BDT
			}
		],
		cs: [
			{
				displayText: "English",
				value: "en",
				currencyId: defCurrencyList.CNY
			},
			{
				displayText: "简体中文",
				value: "cs",
				currencyId: defCurrencyList.CNY
			}
		],
		gb: [
			{
				displayText: "English",
				value: "en",
				currencyId: defCurrencyList.USD
			},
			{
				displayText: "简体中文",
				value: "cs",
				currencyId: defCurrencyList.USD
			}
		]
	};

	return isLogin && langKey
		? { [langKey]: defLangGroups[langKey] }
		: defLangGroups;
};

const currencyToLangKey = {
	2: "ch",
	3: "gb",
	4: "th",
	13: "cs",
	15: "id",
	61: "in",
	74: "bd"
};

const defLangGroupCountry = {
	ch: "Malaysia",
	th: "Thailand",
	id: "Indonesia",
	in: "India",
	cs: "China",
	gb: "Global",
	bd: "Bangladesh"
};

export default () => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
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
	const _defLangGroup = getLangs(langKey, userInfo.isLogin);

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
				selectedCurrencyId={userInfo.currencyId}
				isLogin={userInfo.isLogin}
				isMountedRef={isMountedRef}
				setPopBox={setPopBox}
				clickClose={clickClose}
				setUserInfo={setUserInfo}
			/>
		);
	}
	navigate(redirectPath);
	return [];
};
