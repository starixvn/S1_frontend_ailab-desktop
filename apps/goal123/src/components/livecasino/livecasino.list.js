import React from "react";
import { lobbyCategoryEnum } from "@ailab-desktop/common";
import LobbyListItem from "../common-lobby/LobbyListItem";
import useMenu from "../hook/useMenu";

const LiveCasinoList = () => {
	const { menuList, onClickProductItem } = useMenu();
	const casinoSubMenus =
		menuList.find(
			mainMenuItem =>
				mainMenuItem.lobbyCategoryId === lobbyCategoryEnum.CASINO
		)?.data || [];

	return (
		<div className="lobby-list">
			{casinoSubMenus.map(subMenuItem => {
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

export default LiveCasinoList;
