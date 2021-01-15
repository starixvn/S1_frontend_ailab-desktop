import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import { userInfoContext } from "../common/context";
import { defLeftMenu } from "./leftMenu.def";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	let currentPage =
		typeof window !== undefined ? `${window.location.pathname}/` : "";

	let arr = Object.keys(defLeftMenu).map(menuKey => {
		let menu = defLeftMenu[menuKey];

		let subMenuArr = Object.keys(menu.subMenu).map(_key => {
			let _active = currentPage.includes(
				`/${userInfo.langId}/${menu.subMenu[_key].path}/`
			)
				? " active"
				: "";

			let _iconClassName = "";
			let s = menu.subMenu[_key];
			if (s.periodIcons) {
				let iconStrings = "";
				for (let i = 0; i < s.periodIcons.length; i++) {
					iconStrings += s.periodIcons[i] + " ";
				}
				_iconClassName = `icon ${iconStrings}`;
			}

			return (
				<Link
					key={`leftMenu-subMenu-${_key}`}
					to={`/${userInfo.langId}/${menu.subMenu[_key].path}`}
					className={`menuSelect${_active}`}>
					<span className={_iconClassName}>
						{t(menu.subMenu[_key].displayKey)}
					</span>
				</Link>
			);
		});

		return (
			<div className="menuModule" key={`leftMenu-${menu.displayKey}`}>
				<button className="menuHeader">{t(menu.displayKey)}</button>
				{subMenuArr}
			</div>
		);
	});

	return <div id="leftMenu">{arr}</div>;
};
