import React, { useContext } from "react";
import { Link } from "@reach/router";
import { userInfoContext } from "../common/context";
import Logo from "../../styles/img/logo.png";
import Menu from "./header.menu";
import config from "../../config";
import Functions from "./header.functions";
import LanguageDropDown from "./header.langDropdown";

export default ({ productTpIds }) => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<header>
			<div className="header">
				<div className="logo">
					<Link className="logo" to={`/${userInfo.langId}`}>
						<img src={Logo} alt={config.siteName} />
					</Link>
				</div>
				<Menu productTpIds={productTpIds} />
				<div className="function">
					<LanguageDropDown />
					<Functions />
				</div>
			</div>
		</header>
	);
};
