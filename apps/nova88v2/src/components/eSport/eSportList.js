import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { bannerImgUrl } from "../../config";

const ESportList = ({
	t,
	eSportsSubMenu,
	tpGameTypeSettingList,
	clickItem
}) => {
	if (eSportsSubMenu.length <= 0) return null;

	return eSportsSubMenu.map(subMenuItem => {
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
			<SlideItem
				key={`${subMenuItem?.displayKey}-${subMenuItem?.tpId}-${subMenuItem?.gameId}`}
				t={t}
				subMenuItem={subMenuItem}
				clickItem={clickItem}
			/>
		);
	});
};

ESportList.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	eSportsSubMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	tpGameTypeSettingList: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default ESportList;

const SlideItem = ({ t, subMenuItem, clickItem }) => {
	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		tpGameType,
		path,
		needLogin,
		lobbyPage: { bgImg },
		isInMaintain,
		betType,
		noPlay
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);

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
					betType,
					noPlay,
					tpGameType
				})
			}
		>
			{isInMaintain && (
				<div className="under-text">{t("lbl_underMaintenance")}</div>
			)}

			{isNew() && <div className="new-icon">{t("lbl_New")}</div>}

			<img
				src={`${bannerImgUrl}/desktop/img/4.0/lobby-esports/${bgImg}`}
				alt={bgImg}
			/>
			<div className="lobby-title">{_displayText}</div>
		</div>
	);
};

SlideItem.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
