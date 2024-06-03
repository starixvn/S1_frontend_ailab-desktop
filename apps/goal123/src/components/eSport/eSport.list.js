import React from "react";
import { lobbyCategoryEnum } from "@ailab-desktop/common";
import LobbyListItem from "../common-lobby/LobbyListItem";
import useMenu from "../hook/useMenu";

const EsportList = () => {
	const { menuList, onClickProductItem } = useMenu();
	const eSportSubMenus =
		menuList.find(
			mainMenuItem =>
				mainMenuItem.lobbyCategoryId === lobbyCategoryEnum.ESPORTS
		)?.data || [];

	return (
		<div className="lobby-list">
			{eSportSubMenus.map(subMenuItem => {
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

export default EsportList;
