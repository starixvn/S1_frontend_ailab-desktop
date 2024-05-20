import React, { useContext } from "react";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";
import FishingList from "./fishing.list";
import LobbyBottomBanner from "../common-lobby/LobbyBottomBanner";
import LobbyBanner from "../common-lobby/LobbyBanner";
import useGetSubMenu from "../common-lobby/hooks/useGetSubmenu";

const Fishing = () => {
	const { userInfo } = useContext(userInfoContext);

	const subMenu = useGetSubMenu("fishing");

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
				<FishingList subMenu={subMenu} />
				<LobbyBottomBanner />
			</div>
		</>
	);
};

export default Fishing;
