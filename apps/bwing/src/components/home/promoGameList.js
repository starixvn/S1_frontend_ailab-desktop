import React, { useContext } from "react";
import { navigate } from "gatsby";
import { SET_ENTER_PAGE, SET_CASINO_ENTER_PAGE } from "../../service/enterPage";
import { defPopBoxType } from "../common/defPopBoxType";
import { popBoxContext } from "../common/context";
import productList, { defTpGameType } from "../../datas/productList";
import path from "../../router";

const defLinkType = {
	default: "default",
	casino: "casino",
	sports: "sports"
};

const defGameList = [
	{
		...productList.soccer,
		img: require("../../styles/img/GameList1.png").default,
		displayKey: "lbl_Soccer",
		linkType: defLinkType.sports
	},
	{
		...productList.One789_lottery,
		img: require("../../styles/img/GameList16.png").default,
		displayKey: "lbl_TraditionalLottery"
	},
	{
		...productList.One789_lottery_789,
		img: require("../../styles/img/GameList14.png").default,
		displayKey: "lbl_789Lottery"
	},
	{
		...productList.liveCasino_One789,
		img: require("../../styles/img/GameList13.png").default,
		displayKey: "lbl_liveCasino_789SeDie"
	},
	{
		...productList.sabaClub,
		img: require("../../styles/img/GameList2.png").default,
		displayKey: "lbl_Saba1Club1",
		betType: 1613
	},
	{
		...productList.sabaClub,
		img: require("../../styles/img/GameList3.png").default,
		displayKey: "lbl_Saba1Club2",
		betType: 1620
	},
	{
		...productList.sabaClub,
		img: require("../../styles/img/GameList4.png").default,
		displayKey: "lbl_Saba1Club3",
		betType: 1612
	},
	{
		...productList.sabaClub,
		img: require("../../styles/img/GameList5.png").default,
		displayKey: "lbl_Saba1Club5",
		betType: 1614
	},
	{
		img: require("../../styles/img/GameList6.png").default,
		displayKey: "lbl_baccarat",
		tpId: 15,
		gameId: 15
	},
	{
		img: require("../../styles/img/GameList7.png").default,
		displayKey: "lbl_dream_gaming_se_die",
		tpId: 4
	},
	{
		...productList.eSport,
		img: require("../../styles/img/GameList8.png").default,
		displayKey: "lbl_eSports"
	},
	{
		...productList.fishing,
		img: require("../../styles/img/GameList9.png").default,
		displayKey: "lbl_FishingGG"
	},
	{
		...productList.virtualSports,
		img: require("../../styles/img/GameList10.png").default,
		displayKey: "lbl_VirtualSports",
		linkType: defLinkType.sports
	},
	{
		...productList.keno,
		img: require("../../styles/img/GameList11.png").default,
		displayKey: "lbl_Keno"
	},
	{
		...productList.keno,
		img: require("../../styles/img/GameList12.png").default,
		displayKey: "lbl_Lottery"
	}
];

export default ({ t, userInfo, maintainList }) => {
	const { setPopBox } = useContext(popBoxContext);

	const ClickGame = (
		tpId,
		gameId,
		betType,
		linkType,
		name,
		isInMaintain,
		tpGameType
	) => {
		const LoginPopBox = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};
		const clickClose = () => {
			setPopBox({ isOpen: false });
		};

		if (isInMaintain) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.UnderMaintain,
				clickClose
			});
			return;
		}

		if (linkType === defLinkType.casino) {
			if (userInfo.isLogin !== true) {
				LoginPopBox();
			} else {
				SET_CASINO_ENTER_PAGE({
					tpId,
					gameId,
					isFree: false,
					langId: userInfo.langId,
					tpGameType
				});
			}
		} else if (linkType === defLinkType.sports) {
			navigate(`/${userInfo.langId}/${path.sports.root}?game=${name}`);
		} else {
			SET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isLogin: userInfo.isLogin,
				betType,
				loginCallback: LoginPopBox,
				tpGameType
			});
		}
	};

	const rows = defGameList.map(g => {
		const displayText = t(g.displayKey) ?? g.displayKey;

		const isInMaintain = maintainList?.some(
			item =>
				item.tpId === g.tpId &&
				(item.tpGameType === g.tpGameType ||
					item.tpGameType === defTpGameType.All)
		);

		return (
			<button
				key={`promoGameList-${g.displayKey}`}
				onClick={ClickGame.bind(
					this,
					g.tpId,
					g.gameId,
					g.betType,
					g.linkType,
					g.name,
					isInMaintain,
					g.tpGameType
				)}>
				<img src={g.img} alt={displayText} />
				<div>{displayText}</div>
			</button>
		);
	});

	return <div className="indexGameList">{rows}</div>;
};
