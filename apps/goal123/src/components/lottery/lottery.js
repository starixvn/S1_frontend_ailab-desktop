import React, { useContext } from "react";
import { userInfoContext } from "../common/context";
import LotteryList from "./lottery.list";
import { bannerImgUrl } from "../../config";
import LobbyBanner from "../common-lobby/LobbyBanner";
import LobbyBottomBanner from "../common-lobby/LobbyBottomBanner";

const LotteryLobby = () => {
	const { userInfo } = useContext(userInfoContext);

	const bannerUrl = {
		en: `${bannerImgUrl}/desktop/img/home-page/lobbybanner/lobbybanner-lottery-en.jpg`,
		vn: `${bannerImgUrl}/desktop/img/home-page/lobbybanner/lobbybanner-lottery-vn.jpg`
	};

	return (
		<>
			<LobbyBanner
				src={userInfo.langId === "en" ? bannerUrl.en : bannerUrl.vn}
			/>
			<div className="lobby-wrapper">
				<LotteryList />
				<LobbyBottomBanner />
			</div>
		</>
	);
};

export default LotteryLobby;
