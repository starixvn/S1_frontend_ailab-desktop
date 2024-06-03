import React, { useContext } from "react";
import { lobbyCategoryEnum } from "@ailab-desktop/common";
import useMenu from "../hook/useMenu";
import { userInfoContext } from "../common/context";
import LotteryBanner from "./lottery.banner";
import LotteryList from "./lottery.list";

const Games = () => {
	const { userInfo } = useContext(userInfoContext);
	const { menuList = [], onClickProductItem } = useMenu();

	const lotterySubMenus = menuList.find(
		mainMenuItem =>
			mainMenuItem.lobbyCategoryId === lobbyCategoryEnum.LOTTERY
	)?.data;
	return (
		<>
			<LotteryBanner langId={userInfo.langId} />
			<div className="wrapper mt-5">
				<div className="col-12">
					<div className="lobby-products">
						<LotteryList
							lotterySubMenus={lotterySubMenus}
							onclickLotteryItem={onClickProductItem}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Games;
