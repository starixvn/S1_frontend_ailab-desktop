import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import { userInfoContext } from "./context";
import { defLeftMenu } from "./leftMenu.def";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const currentPage =
		typeof window !== undefined ? `${window.location.pathname}/` : "";

	const arr = Object.keys(defLeftMenu).map(menuKey => {
		const menu = defLeftMenu[menuKey];

		const subMenuArr = Object.keys(menu.subMenu).map(_key => {
			const _active = currentPage.includes(
				`/${userInfo.langId}/${menu.subMenu[_key].path}/`
			)
				? " active"
				: "";

			return (
				<Link
					key={`leftMenu-subMenu-${_key}`}
					to={`/${userInfo.langId}/${menu.subMenu[_key].path}`}
					className={`menuSelect${_active}`}>
					<span>{t(menu.subMenu[_key].displayKey)}</span>
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
