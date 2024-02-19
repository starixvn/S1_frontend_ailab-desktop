import React, { useContext } from "react";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";
import LobbyBottomBanner from "../common-lobby/LobbyBottomBanner";
import LobbyBanner from "../common-lobby/LobbyBanner";
import useGetSubMenu from "../common-lobby/hooks/useGetSubmenu";
import CockFightingList from "./cockFighting.list";

const CockFighting = () => {
	const { userInfo } = useContext(userInfoContext);

	const subMenu = useGetSubMenu("cockFighting");

	const bannerUrl = {
		en: `${bannerImgUrl}/desktop/img/home-page/lobbybanner/lobbybanner-cockfight-en.jpg`,
		vn: `${bannerImgUrl}/desktop/img/home-page/lobbybanner/lobbybanner-cockfight-vn.jpg`
	};

	return (
		<>
			<LobbyBanner
				src={userInfo.langId === "en" ? bannerUrl.en : bannerUrl.vn}
			/>
			<div className="lobby-wrapper">
				<CockFightingList subMenu={subMenu} />
				<LobbyBottomBanner />
			</div>
		</>
	);
};

export default CockFighting;
