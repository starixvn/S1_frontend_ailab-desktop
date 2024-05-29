import React, { useContext } from "react";
import { lobbyCategoryEnum } from "@ailab-desktop/common";
import useMenu from "../hook/useMenu";
import { userInfoContext } from "../common/context";
import LiveCasinoBanner from "./livecasino.banner";
import LiveCasinoList from "./livecasino.list";

const LiveCasino = () => {
	const { userInfo } = useContext(userInfoContext);
	const { menuList = [], onClickProductItem } = useMenu();

	const casinoSubMenus = menuList.find(
		mainMenuItem =>
			mainMenuItem.lobbyCategoryId === lobbyCategoryEnum.CASINO
	)?.data;

	return (
		<>
			<LiveCasinoBanner langId={userInfo.langId} />
			<div className="wrapper mt-5">
				<div className="col-12">
					<div className="lobby-products">
						<LiveCasinoList
							casinoSubMenus={casinoSubMenus}
							onclickCasinoItem={onClickProductItem}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default LiveCasino;
