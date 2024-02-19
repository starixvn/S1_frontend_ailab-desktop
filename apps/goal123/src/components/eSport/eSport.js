import React, { useContext } from "react";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";
import EsportList from "./eSport.list";
import useGetSubMenu from "../common-lobby/hooks/useGetSubmenu";
import LobbyBanner from "../common-lobby/LobbyBanner";
import LobbyBottomBanner from "../common-lobby/LobbyBottomBanner";

const Esport = () => {
	const { userInfo } = useContext(userInfoContext);

	const subMenu = useGetSubMenu("eSport");

	const bannerUrl = {
		en: `${bannerImgUrl}/desktop/img/home-page/lobbybanner/lobbybanner-esports-en.jpg`,
		vn: `${bannerImgUrl}/desktop/img/home-page/lobbybanner/lobbybanner-esports-vn.jpg`
	};

	return (
		<>
			<LobbyBanner
				src={userInfo.langId === "en" ? bannerUrl.en : bannerUrl.vn}
			/>
			<div className="lobby-wrapper">
				<EsportList subMenu={subMenu} />
				<LobbyBottomBanner />
			</div>
		</>
	);
};

export default Esport;
