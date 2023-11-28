import React from "react";
import PropTypes from "prop-types";
import FishingListItem from "./fishing.list.item";

const FishingList = ({
	fishingSubMenu,
	maintainList,
	tpGameTypeSettingList,
	clickItem,
	t
}) => {
	if (fishingSubMenu.length <= 0) return null;

	return fishingSubMenu.map(subMenuItem => {
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
			<FishingListItem
				key={`${subMenuItem?.displayKey}-${subMenuItem?.tpId}-${subMenuItem?.gameId}`}
				t={t}
				clickItem={clickItem}
				subMenuItem={subMenuItem}
				maintainList={maintainList}
			/>
		);
	});
};

export default FishingList;

FishingList.propTypes = {
	fishingSubMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired,
	tpGameTypeSettingList: PropTypes.arrayOf(PropTypes.any).isRequired
};
