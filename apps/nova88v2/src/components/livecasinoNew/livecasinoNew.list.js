import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { bannerImgUrl } from "../../config";
import { defTpGameType } from "../../datas/productList";

export default ({
	liveCasinoSubMenu,
	maintainList,
	tpGameTypeSettingList,
	clickItem,
	t
}) => {
	if (liveCasinoSubMenu.length <= 0) return null;

	return liveCasinoSubMenu.map(subMenuItem => {
		if (!subMenuItem.lobbyPage) return null;
		if (tpGameTypeSettingList && tpGameTypeSettingList.length > 0) {
			tpGameTypeSettingList.forEach(settingItem => {
				if (
					settingItem.gameType === subMenuItem.tpGameType &&
					settingItem.tpId === subMenuItem.tpId
				) {
					Object.assign(subMenuItem, settingItem);
				}
			});
		}
		if (subMenuItem?.noShow) return null;
		return (
			<LiveCasinoListItem
				key={`${subMenuItem?.displayKey}-${subMenuItem?.tpId}-${subMenuItem?.gameId}`}
				t={t}
				clickItem={clickItem}
				subMenuItem={subMenuItem}
				maintainList={maintainList}
			/>
		);
	});
};

const LiveCasinoListItem = ({ t, clickItem, subMenuItem, maintainList }) => {
	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		path,
		needLogin,
		menuType,
		lobbyPage: { npcImg },
		tpGameType,
		noPlay
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);

	const isInMaintain = maintainList.some(
		item =>
			item.tpId === tpId &&
			(item.tpGameType === tpGameType ||
				item.tpGameType === defTpGameType.All)
	);

	const isNew = () => {
		if (
			subMenuItem.eventIcons &&
			subMenuItem.eventIcons[0] &&
			// * 這裡因為跟 menu className 不同所以如果 defEventIcon 更改這裡判斷也需更改
			subMenuItem.eventIcons[0].match("new")
		) {
			return true;
		}

		return false;
	};

	return (
		<div
			className={classNames("lobby-content-item", {
				under: isInMaintain
			})}
			onClick={() =>
				clickItem({
					tpId,
					gameId,
					path,
					needLogin,
					menuType,
					tpGameType,
					noPlay
				})
			}
		>
			{isInMaintain && (
				<div className="under-text">{t("lbl_underMaintenance")}</div>
			)}

			{isNew() && <div className="new-icon">{t("lbl_New")}</div>}

			<div className="img-wrapper">
				<img
					src={`${bannerImgUrl}/desktop/img/4.0/lobby-livecasino/${npcImg}`}
					alt="casino-img"
				/>
				<div className="btn-container">
					<button>{t("lbl_PlayNow")}</button>
				</div>
			</div>

			<div className="lobby-title">{_displayText}</div>
		</div>
	);
};

LiveCasinoListItem.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};
