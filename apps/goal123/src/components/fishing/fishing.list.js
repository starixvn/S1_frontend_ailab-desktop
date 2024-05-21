import React from "react";
import { lobbyCategoryEnum } from "@ailab-desktop/common";
import LobbyListItem from "../common-lobby/LobbyListItem";
import useMenu from "../hook/useMenu";

const FishingList = () => {
	const { menuList, onClickProductItem } = useMenu();
	const fishingSubMenus =
		menuList.find(
			mainMenuItem =>
				mainMenuItem.lobbyCategoryId === lobbyCategoryEnum.FISHING
		)?.data || [];

	return (
		<div className="lobby-list">
			{fishingSubMenus.map(subMenuItem => {
				return (
					<LobbyListItem
						key={subMenuItem?.tpGameIdNo}
						subMenuItem={subMenuItem}
						onClickProductItem={onClickProductItem}
					/>
				);
			})}
		</div>
	);
};

export default FishingList;
