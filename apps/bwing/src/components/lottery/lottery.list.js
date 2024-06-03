import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { isShowEventIcon, switchLobbyIcon } from "../layout/header.menu.newDef";

const LotteryList = ({ lotterySubMenus = [], onclickLotteryItem }) => {
	if (lotterySubMenus.length === 0) return null;

	return lotterySubMenus.map(subMenuItem => {
		return (
			<LotteryListItem
				key={subMenuItem?.tpGameIdNo}
				onclickLotteryItem={onclickLotteryItem}
				subMenuItem={subMenuItem}
			/>
		);
	});
};

LotteryList.propTypes = {
	lotterySubMenus: PropTypes.arrayOf(PropTypes.any).isRequired,
	onclickLotteryItem: PropTypes.func.isRequired
};

export default LotteryList;

const LotteryListItem = ({ subMenuItem, onclickLotteryItem }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const displayName =
		subMenuItem?.currencyGameName &&
		subMenuItem?.currencyGameName[userInfo?.langId] &&
		subMenuItem?.currencyGameName[userInfo?.langId];

	// * 後端這裡是字串格式 需做處理
	const suBMenuLobbyImage =
		subMenuItem?.pcLobbyPicUrl && JSON.parse(subMenuItem?.pcLobbyPicUrl)[0];

	const { iconType, iconStartTime, iconEndTime } = subMenuItem || {};

	const lotteryLobbyIcon =
		isShowEventIcon(iconStartTime, iconEndTime) &&
		switchLobbyIcon(iconType);

	return (
		<a
			className={classNames("lobby-products-items", {
				maintain: subMenuItem?.isInMaintain
			})}
			onClick={() => onclickLotteryItem(subMenuItem)}>
			{subMenuItem?.isInMaintain && (
				<div className="tag-maintain">{t("lbl_underMaintenance")}</div>
			)}
			{lotteryLobbyIcon && <div className={lotteryLobbyIcon} />}

			<img src={suBMenuLobbyImage} alt={subMenuItem?.productName} />
			<div className="name">
				{displayName || subMenuItem?.productName}
			</div>
		</a>
	);
};

LotteryListItem.propTypes = {
	onclickLotteryItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
