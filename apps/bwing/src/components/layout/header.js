import React, { useContext, useEffect, useState } from "react";
import { Link } from "@reach/router";
import { userInfoContext } from "../common/context";
import Logo from "../../styles/img/logo.png";
import LogoNewYear from "../../styles/img/newyear/logo.png";
import Menu from "./header.menu";
import config from "../../config";
import Functions from "./header.functions";
import LanguageDropDown from "./header.langDropdown";
import { api_site_GetTpIds } from "../../service/api/site";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const [casinoTpIds, setCasinoTpIds] = useState(null);

	useEffect(() => {
		let mounted = true;
		if (userInfo.isLogin && casinoTpIds === null) {
			api_site_GetTpIds().then(res => {
				if (res.data.errorCode === 0 && mounted) {
					setCasinoTpIds(res.data.data);
				}
			});
		} else if (userInfo.isLogin === false && casinoTpIds?.length > 0) {
			setCasinoTpIds(null);
		}

		return () => {
			mounted = false;
		};
	}, [userInfo.isLogin, casinoTpIds]);

	return (
		<header>
			<div className="header">
				{/* new year style ↓ */}
				{/* <div className="flower" /> */}
				<div className="flower flowerR" />
				{/* new year style ↑ */}
				<div className="logo">
					<Link className="logo" to={`/${userInfo.langId}`}>
						{/* <img src={Logo} alt={config.siteName} /> */}
						{/* new year style ↓ */}
						<img src={LogoNewYear} alt={config.siteName} />
					</Link>
				</div>
				<Menu casinoTpIds={casinoTpIds} />
				<div className="function">
					<LanguageDropDown />
					<Functions />
				</div>
			</div>
		</header>
	);
};
