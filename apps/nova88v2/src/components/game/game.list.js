import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { bannerImgUrl } from "../../config";
import { defTpGameType } from "../../datas/productList";

const GameList = ({
	t,
	gameSubMenu,
	maintainList,
	tpGameTypeSettingList,
	clickItem
}) => {
	if (gameSubMenu.length <= 0) return null;

	return gameSubMenu.map(subMenuItem => {
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
			<GameListItem
				key={`${subMenuItem?.displayKey}-${subMenuItem?.tpId}-${subMenuItem?.gameId}`}
				t={t}
				subMenuItem={subMenuItem}
				maintainList={maintainList}
				clickItem={clickItem}
			/>
		);
	});
};

GameList.propTypes = {
	t: PropTypes.func.isRequired,
	gameSubMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired,
	clickItem: PropTypes.func.isRequired,
	tpGameTypeSettingList: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default GameList;

const GameListItem = ({ t, clickItem, subMenuItem, maintainList }) => {
	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		path,
		needLogin,
		lobbyPage: { bgImg },
		tpGameType,
		noPlay
	} = subMenuItem;
	const _displayText = displayText || t(displayKey);

	const isInMaintain = maintainList?.some(
		mt =>
			mt.tpId === tpId &&
			(mt.tpGameType === tpGameType ||
				mt.tpGameType === defTpGameType.All)
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
					isInMaintain,
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
					src={`${bannerImgUrl}/desktop/img/4.0/lobby-games/${bgImg}`}
					alt={bgImg}
				/>
				<div className="btn-container">
					<button>{t("lbl_PlayNow")}</button>
				</div>
			</div>
			<div className="lobby-title">{_displayText}</div>
		</div>
	);
};

GameListItem.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};
