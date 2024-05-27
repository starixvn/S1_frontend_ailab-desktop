import React, { useContext } from "react";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";
import LivecasinoList from "./livecasino.list";
import LobbyBanner from "../common-lobby/LobbyBanner";
import LobbyBottomBanner from "../common-lobby/LobbyBottomBanner";

const Livecasino = () => {
	const { userInfo } = useContext(userInfoContext);

	const bannerUrl = {
		en: `${bannerImgUrl}/desktop/img/home-page/lobbybanner/lobbybanner-casino-en.jpg`,
		vn: `${bannerImgUrl}/desktop/img/home-page/lobbybanner/lobbybanner-casino-vn.jpg`
	};

	return (
		<>
			<LobbyBanner
				src={userInfo.langId === "en" ? bannerUrl.en : bannerUrl.vn}
			/>
			<div className="lobby-wrapper">
				<LivecasinoList />
				<LobbyBottomBanner />
			</div>
		</>
	);
};
export default Livecasino;
