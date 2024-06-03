import React from "react";
import { lobbyCategoryEnum } from "@ailab-desktop/common";
import LobbyListItem from "../common-lobby/LobbyListItem";
import useMenu from "../hook/useMenu";

const CockFightingList = () => {
	const { menuList, onClickProductItem } = useMenu();
	const cockfightingSubMenus =
		menuList.find(
			mainMenuItem =>
				mainMenuItem.lobbyCategoryId === lobbyCategoryEnum.Cockfighting
		)?.data || [];

	return (
		<div className="lobby-list">
			{cockfightingSubMenus.map(subMenuItem => {
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

export default CockFightingList;
