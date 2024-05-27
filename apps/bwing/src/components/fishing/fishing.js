import React, { useContext } from "react";
import { lobbyCategoryEnum } from "@ailab-desktop/common";
import useMenu from "../hook/useMenu";
import { userInfoContext } from "../common/context";
import FishingBanner from "./fishing.banner";
import FishingList from "./fishing.list";

const Fishing = () => {
	const { userInfo } = useContext(userInfoContext);
	const { menuList = [], onClickProductItem } = useMenu();

	const fishingSubMenus = menuList.find(
		mainMenuItem =>
			mainMenuItem.lobbyCategoryId === lobbyCategoryEnum.FISHING
	)?.data;

	return (
		<>
			<FishingBanner langId={userInfo.langId} />
			<div className="wrapper mt-5">
				<div className="col-12">
					<div className="lobby-products">
						<FishingList
							fishingSubMenus={fishingSubMenus}
							onclickFishingItem={onClickProductItem}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Fishing;
