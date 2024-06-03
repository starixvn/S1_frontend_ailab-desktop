import React, { useContext } from "react";
import { lobbyCategoryEnum } from "@ailab-desktop/common";
import useMenu from "../hook/useMenu";
import { userInfoContext } from "../common/context";
import GamesBanner from "./games.banner";
import GameList from "./game.list";

const Games = () => {
	const { userInfo } = useContext(userInfoContext);

	const { menuList = [], onClickProductItem } = useMenu();

	const gameSubMenus = menuList.find(
		mainMenuItem => mainMenuItem.lobbyCategoryId === lobbyCategoryEnum.GAMES
	)?.data;

	return (
		<>
			<GamesBanner langId={userInfo.langId} />
			<div className="wrapper mt-5">
				<div className="col-12">
					<div className="lobby-products">
						<GameList
							gameSubMenus={gameSubMenus}
							onclickGameItem={onClickProductItem}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Games;
