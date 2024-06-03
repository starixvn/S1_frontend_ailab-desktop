import React, { useContext } from "react";
import { lobbyCategoryEnum } from "@ailab-desktop/common";
import useMenu from "../hook/useMenu";
import { userInfoContext } from "../common/context";
import ESportBanner from "./eSport.banner";
import ESportList from "./eSport.list";

const ESport = () => {
	const { userInfo } = useContext(userInfoContext);
	const { menuList = [], onClickProductItem } = useMenu();

	const eSportSubMenus = menuList.find(
		mainMenuItem =>
			mainMenuItem.lobbyCategoryId === lobbyCategoryEnum.ESPORTS
	)?.data;

	return (
		<>
			<ESportBanner langId={userInfo.langId} />
			<div className="wrapper mt-5">
				<div className="col-12">
					<div className="lobby-products">
						<ESportList
							eSportSubMenus={eSportSubMenus}
							onclickESportItem={onClickProductItem}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ESport;
