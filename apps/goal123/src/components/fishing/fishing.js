import React, { useContext } from "react";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";
import FishingList from "./fishing.list";
import LobbyBottomBanner from "../common-lobby/LobbyBottomBanner";
import LobbyBanner from "../common-lobby/LobbyBanner";

const Fishing = () => {
	const { userInfo } = useContext(userInfoContext);

	const bannerUrl = {
		en: `${bannerImgUrl}/desktop/img/home-page/lobbybanner/lobbybanner-fishing-en.jpg`,
		vn: `${bannerImgUrl}/desktop/img/home-page/lobbybanner/lobbybanner-fishing-vn.jpg`
	};

	return (
		<>
			<LobbyBanner
				src={userInfo.langId === "en" ? bannerUrl.en : bannerUrl.vn}
			/>
			<div className="lobby-wrapper">
				<FishingList />
				<LobbyBottomBanner />
			</div>
		</>
	);
};

export default Fishing;
