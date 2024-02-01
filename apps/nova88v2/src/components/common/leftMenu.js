import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import { userInfoContext } from "./context";
import { defLeftMenu } from "./leftMenu.def";
import {
	WITHDRAWAL_BLOCK_SETTING_TYPE,
	useGetWithdrawalBlockSetting
} from "../hook";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const { displayBankCard, displayCrypto } = useGetWithdrawalBlockSetting();

	const currentPage =
		typeof window !== "undefined" ? `${window.location.pathname}/` : "";

	const arr = Object.keys(defLeftMenu).map(menuKey => {
		const menu = defLeftMenu[menuKey];

		const subMenuArr = Object.keys(menu.subMenu).map(_key => {
			const _active = currentPage.includes(
				`/${userInfo.langId}/${menu.subMenu[_key].path}/`
			)
				? " active"
				: "";

			let _iconClassName = "";
			const s = menu.subMenu[_key];

			let isShowItem = s?.allowCurrency
				? s.allowCurrency.includes(userInfo.currencyId)
				: true;

			if (s?.withdrawalSettingType)
				isShowItem =
					s.withdrawalSettingType ===
					WITHDRAWAL_BLOCK_SETTING_TYPE.BankCard
						? displayBankCard
						: displayCrypto;

			if (s.eventIcons) {
				let iconStrings = "";
				for (let i = 0; i < s.eventIcons.length; i++) {
					iconStrings += `${s.eventIcons[i]} `;
				}
				_iconClassName = `icon ${iconStrings}`;
			}

			return (
				isShowItem && (
					<Link
						key={`leftMenu-subMenu-${_key}`}
						to={`/${userInfo.langId}/${s.path}`}
						className={`menuSelect${_active}`}
					>
						<span className={_iconClassName}>
							{t(s.displayKey)}
						</span>
					</Link>
				)
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
