import React from "react";
import { lobbyCategoryEnum } from "@ailab-desktop/common";
import useMenu from "../hook/useMenu";
import LobbyListItem from "../common-lobby/LobbyListItem";

const GameList = () => {
	const { menuList, onClickProductItem } = useMenu();
	const gameSubMenus =
		menuList.find(
			mainMenuItem =>
				mainMenuItem.lobbyCategoryId === lobbyCategoryEnum.GAMES
		)?.data || [];

	return (
		<div className="lobby-list">
			{gameSubMenus.map(subMenuItem => {
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

export default GameList;
