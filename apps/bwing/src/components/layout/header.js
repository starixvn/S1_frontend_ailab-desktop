import React, { useContext, useEffect, useState } from "react";
import { Link } from "@reach/router";
import { userInfoContext } from "../common/context";
import Logo from "../../styles/img/logo.png";
import Menu from "./header.menu";
import config from "../../config";
import Functions from "./header.functions";
import LanguageDropDown from "./header.langDropdown";
import { api_site_GetTpIds } from "../../service/api/site";

// xmas code ↓
import xmasLogo from "../../styles/img/christmas/logo.png";
const xmasDay = new Date(2020, 11, 25);
const afterXmas = new Date() > xmasDay;

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const [casinoTpIds, setCasinoTpIds] = useState(null);

	useEffect(() => {
		if (userInfo.isLogin && casinoTpIds === null) {
			api_site_GetTpIds().then(
				res => {
					if (res.data.errorCode === 0) {
						setCasinoTpIds(res.data.data);
					}
				},
				err => {
					if (this.isMountedRef) {
					}
				}
			);
		} else if (userInfo.isLogin === false && casinoTpIds?.length > 0) {
			setCasinoTpIds(null);
		}
	}, [userInfo.isLogin, casinoTpIds]);

	return (
		<header>
			<div className="header">
				<div className="logo">
					<Link className="logo" to={`/${userInfo.langId}`}>
						{/*  xmas code in "src={..." ↓  */}
						<img
							src={afterXmas ? Logo : xmasLogo}
							alt={config.siteName}
						/>
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
