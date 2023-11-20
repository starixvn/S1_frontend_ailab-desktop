import React, { useEffect, useRef } from "react";
import DropdownHeader from "../../common/dropdown.langList";
import { useAuth } from "../../hook";
import usePopBox from "../../hook/usePopBox";
import {
	currencyToLangKey,
	defLangGroupCountry,
	defLangGroups,
	getLangs
} from "../header.langDropdown";

const ProfileInfoLangList = () => {
	const { userInfo, setUserInfo } = useAuth();
	const { closePopBox, setPopBox } = usePopBox();

	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const langKey = currencyToLangKey[userInfo.currencyId];

	const _defLangGroup = getLangs(langKey, userInfo.isLogin);

	const selectedLangText = defLangGroups[langKey]?.find(
		({ value: langId }) => langId === (userInfo.langId || "en")
	)?.displayText;

	return (
		<DropdownHeader
			selectedValue={`${selectedLangText} (${userInfo.currencyName})`}
			mainKey="header-langList"
			className="home-profile-country"
			subClassName="countryList"
			defLangGroup={_defLangGroup}
			langId={userInfo.langId}
			defLangGroupCountry={defLangGroupCountry}
			selectedCurrencyId={userInfo.currencyId}
			isLogin={userInfo.isLogin}
			isMountedRef={isMountedRef}
			setPopBox={setPopBox}
			clickClose={closePopBox}
			setUserInfo={setUserInfo}
		/>
	);
};

export default ProfileInfoLangList;
