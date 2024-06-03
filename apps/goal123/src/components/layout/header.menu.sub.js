import React, { useContext } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { menuIconTypeEnum } from "@ailab-desktop/common";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { newDefSubItemClassName, isShowEventIcon } from "./header.menu.newDef";

const subMenuIcon = Object.freeze({
	[menuIconTypeEnum.Null]: null,
	[menuIconTypeEnum.New]: "newicon"
});

const HeaderSubMenu = ({ currentMenuKey, menuList, onClickProductItem }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const switchSubMenuIcon = iconType => {
		return subMenuIcon[iconType] || null;
	};

	return menuList.map(mainMenuItem => {
		const { lobbyCategoryId, data } = mainMenuItem || {};
		const subMenuItemClassName =
			newDefSubItemClassName[String(lobbyCategoryId)];

		if (data && subMenuItemClassName) {
			return (
				<div
					key={lobbyCategoryId}
					className={classNames(`${subMenuItemClassName}`, {
						active: currentMenuKey === lobbyCategoryId
					})}>
					{data?.map(subMenuItem => {
						// * 後端這裡是字串格式 需做處理
						const subMenuImage =
							subMenuItem?.pcHeaderPicUrl &&
							JSON.parse(subMenuItem?.pcHeaderPicUrl)[0];

						const displayName =
							subMenuItem?.currencyGameName &&
							subMenuItem?.currencyGameName[userInfo?.langId] &&
							subMenuItem?.currencyGameName[userInfo?.langId];

						const {
							iconType,
							iconStartTime,
							iconEndTime,
							productName,
							isInMaintain,
							tpGameIdNo
						} = subMenuItem || {};

						const submenuIcon =
							(isShowEventIcon(iconStartTime, iconEndTime) &&
								switchSubMenuIcon(iconType)) ||
							"";

						return (
							<button
								key={tpGameIdNo}
								className={classNames({
									under: isInMaintain
								})}
								onClick={() => onClickProductItem(subMenuItem)}>
								<div className={submenuIcon} />
								<img
									className="item-img"
									src={subMenuImage}
									alt={productName}
								/>
								<span>{displayName || productName}</span>
								{isInMaintain && (
									<div className="maintenance">
										{t("lbl_underMaintenance")}
									</div>
								)}
							</button>
						);
					})}
				</div>
			);
		}

		return null;
	});
};

HeaderSubMenu.propTypes = {
	menuList: PropTypes.arrayOf(PropTypes.any).isRequired,
	onClickProductItem: PropTypes.func.isRequired,
	currentMenuKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired
};

export default HeaderSubMenu;
