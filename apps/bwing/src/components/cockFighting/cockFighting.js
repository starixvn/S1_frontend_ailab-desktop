import React, { useContext } from "react";
import { lobbyCategoryEnum } from "@ailab-desktop/common";
import { userInfoContext } from "../common/context";
import CockFightingBanner from "./cockFighting.banner";
import CockFightingList from "./cockFighting.list";
import useMenu from "../hook/useMenu";

const CockFighting = () => {
	const { userInfo } = useContext(userInfoContext);

	const { menuList = [], onClickProductItem } = useMenu();

	const cockFightingSubMenus = menuList.find(
		mainMenuItem =>
			mainMenuItem.lobbyCategoryId === lobbyCategoryEnum.Cockfighting
	)?.data;

	return (
		<>
			<CockFightingBanner langId={userInfo.langId} />
			<div className="wrapper mt-5">
				<div className="col-12">
					<div className="lobby-products">
						<CockFightingList
							cockFightingSubMenus={cockFightingSubMenus}
							onclickCockFightingItem={onClickProductItem}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default CockFighting;
