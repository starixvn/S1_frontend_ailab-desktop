import React, { useContext } from "react";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";
import GameList from "./game.list";
import useGetSubMenu from "../common-lobby/hooks/useGetSubmenu";
import LobbyBanner from "../common-lobby/LobbyBanner";
import LobbyBottomBanner from "../common-lobby/LobbyBottomBanner";

const Games = () => {
	const { userInfo } = useContext(userInfoContext);

	const subMenu = useGetSubMenu("games");

	const bannerUrl = {
		en: `${bannerImgUrl}/desktop/img/home-page/lobbybanner/lobbybanner-games-en.jpg`,
		vn: `${bannerImgUrl}/desktop/img/home-page/lobbybanner/lobbybanner-games-vn.jpg`
	};

	return (
		<>
			<LobbyBanner
				src={userInfo.langId === "en" ? bannerUrl.en : bannerUrl.vn}
			/>
			<div className="lobby-wrapper">
				<GameList subMenu={subMenu} />
				<LobbyBottomBanner />
			</div>
		</>
	);
};

export default Games;
