import React from "react";
import { lobbyCategoryEnum } from "@ailab-desktop/common";
import LobbyListItem from "../common-lobby/LobbyListItem";
import useMenu from "../hook/useMenu";

const LotteryList = () => {
	const { menuList, onClickProductItem } = useMenu();
	const lotterySubMenus =
		menuList.find(
			mainMenuItem =>
				mainMenuItem.lobbyCategoryId === lobbyCategoryEnum.LOTTERY
		)?.data || [];

	return (
		<div className="lobby-list">
			{lotterySubMenus.map(subMenuItem => {
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

export default LotteryList;
