import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { bannerImgUrl } from "../../config";
import path from "../../router";
import { defMenuType } from "../header/header.menu.def";
import productList from "../../datas/productList";
import defPopBoxType from "../common/defPopBoxType";
import { popBoxContext, userInfoContext } from "../common/context";
import { getUrl } from "../common/linkItems";
import { GET_OPEN_RULE, OPEN_IN_BLANK } from "../../service/enterPage";

// 閹割版暫時使用
const homeEntryList = [
	{
		displayKey: "lbl_Sports",
		url: "home_Sportsbook.jpg",
		path: path.sports.root,
		menuType: defMenuType.entPage,
		productInfo: {
			...productList.sports
		},
		needLogin: true,
		description: "28.000 di pasar bermain per bulan",
		keyName: "sportsbook"
	},
	{
		displayKey: "lbl_IceHockey",
		url: "home_Icehockey.jpg",
		menuType: defMenuType.Link,
		parameter: { provider: "saba", type: "hockey" },
		description: "Practice winning every day!",
		keyName: "icehockey",
		path: "sports"
	},
	{
		displayKey: "lbl_eSports",
		url: "home_ESports.jpg",
		path: path.eSport.root,
		productInfo: {
			...productList.eSportAll
		},
		menuType: defMenuType.entPage,
		needLogin: true,
		description: "Teamwork makes the dream work",
		keyName: "eSports"
	},
	{
		displayKey: "lbl_Tennis",
		url: "home_Tennis.jpg",
		menuType: defMenuType.Link,
		parameter: { provider: "saba", type: "tennis" },
		description: "28,000 in play markets per month",
		keyName: "tennis",
		path: "sports"
	},
	{
		displayKey: "lbl_Basketball",
		url: "home_Basketball.jpg",
		menuType: defMenuType.Link,
		parameter: { provider: "saba", type: "basketball" },
		...productList.basketball,
		keyName: "basketball",
		path: "sports"
	},
	{
		displayKey: "lbl_Baseball",
		url: "home_Baseball.jpg",
		menuType: defMenuType.Link,
		parameter: { provider: "saba", type: "baseball" },
		...productList.basketball,
		keyName: "baseball",
		path: "sports"
	}
];

export const HomeEntry = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);

	const showLogin = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	const handleClick = item => {
		if (item.needLogin && !userInfo.isLogin) {
			showLogin();
			return;
		}
		if (item.menuType === defMenuType.Link) {
			if (item.parameter) {
				navigate(
					getUrl(`${userInfo.langId}/${item.path}`, item.parameter)
				);
			} else {
				navigate(`/${userInfo.langId}/${item.path}`);
			}
		}
		if (item.menuType === defMenuType.entPage) {
			const { productInfo } = item;
			const rule = GET_OPEN_RULE(
				userInfo.langId,
				productInfo.tpId,
				productInfo.gameId
			);
			OPEN_IN_BLANK(rule.entPageUrl, rule.windowKey);
		}
	};
	return (
		<div className="home-entry">
			{homeEntryList.map(item => (
				<div
					className="home-entry-item"
					onClick={() => handleClick(item)}
					key={item.keyName}
				>
					<img
						src={`${bannerImgUrl}/desktop/img/${item.url}`}
						alt=""
					/>
					<div className="home-entry-info">
						{t(item.displayKey)}
						<span>{item.description}</span>
					</div>
				</div>
			))}
		</div>
	);
};
