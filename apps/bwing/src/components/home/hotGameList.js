import React from "react";
import { Link } from "@reach/router";
import ReactMarquee from "react-fast-marquee";
import { defPopBoxType } from "../common/defPopBoxType";
import { SET_ENTER_PAGE, SET_CASINO_ENTER_PAGE } from "../../service/enterPage";
import path from "../../router";

import imgIconPG from "../../styles/img/hotgame/pg.png";
import imgIconCQ9 from "../../styles/img/hotgame/cq9.png";
import imgIconPP from "../../styles/img/hotgame/pp.png";
import imgIconYGG from "../../styles/img/hotgame/ygg.png";
import imgIconSG from "../../styles/img/hotgame/sg.png";

import imgMahjongWaysTwo from "../../styles/img/hotgame/hotgame1.jpg";
import imgAztec from "../../styles/img/hotgame/hotgame2.jpg";
import imgFiveGodbeasts from "../../styles/img/hotgame/hotgame3.jpg";
import imgHercules from "../../styles/img/hotgame/hotgame4.jpg";
import imgThreeStarFortune from "../../styles/img/hotgame/hotgame5.jpg";
import imgFiveLionsGold from "../../styles/img/hotgame/hotgame6.jpg";
import imgDancingFever from "../../styles/img/hotgame/hotgame7.jpg";
import imgFiveFortuneDragons from "../../styles/img/hotgame/hotgame8.jpg";
import imgThorInfinityReels from "../../styles/img/hotgame/hotgame9.jpg";
import imgLuckyNeko from "../../styles/img/hotgame/hotgame10.jpg";

const defGameType = {
	default: "default",
	casino: "casino"
};

const defGameList = [
	{
		name: "Mahjong Ways Two",
		provider: "PG",
		providerImg: imgIconPG,
		img: imgMahjongWaysTwo,
		tpId: 14,
		gameId: "mahjong-ways2",
		gameType: defGameType.casino
	},
	{
		name: "Treasures of Aztec",
		provider: "PG",
		providerImg: imgIconPG,
		img: imgAztec,
		tpId: 14,
		gameId: "treasures-aztec",
		gameType: defGameType.casino
	},
	{
		name: "5 God beasts",
		provider: "CQ9",
		providerImg: imgIconCQ9,
		img: imgFiveGodbeasts,
		tpId: 16,
		gameId: 117,
		gameType: defGameType.casino
	},
	{
		name: "Hercules",
		provider: "CQ9",
		providerImg: imgIconCQ9,
		img: imgHercules,
		tpId: 16,
		gameId: 161,
		gameType: defGameType.casino
	},
	{
		name: "Three Star Fortune",
		provider: "PP",
		providerImg: imgIconPP,
		img: imgThreeStarFortune,
		tpId: 5,
		gameId: "vs10threestar",
		gameType: defGameType.casino
	},
	{
		name: "5 Lions Gold",
		provider: "PP",
		providerImg: imgIconPP,
		img: imgFiveLionsGold,
		tpId: 5,
		gameId: "vs243lionsgold",
		gameType: defGameType.casino
	},
	{
		name: "Dancing Fever",
		provider: "Spade",
		providerImg: imgIconSG,
		img: imgDancingFever,
		tpId: 10,
		gameId: "S-DF02",
		gameType: defGameType.casino
	},
	{
		name: "5 Fortune Dragons",
		provider: "Spade",
		providerImg: imgIconSG,
		img: imgFiveFortuneDragons,
		tpId: 10,
		gameId: "S-FD01",
		gameType: defGameType.casino
	},
	{
		name: "Thor Infinity Reels",
		provider: "YGG",
		providerImg: imgIconYGG,
		img: imgThorInfinityReels,
		tpId: 8,
		gameId: "1035",
		gameType: defGameType.casino
	},
	{
		name: "Lucky Neko",
		provider: "YGG",
		providerImg: imgIconYGG,
		img: imgLuckyNeko,
		tpId: 8,
		gameId: "7382",
		gameType: defGameType.casino
	}
];

export default ({ setPopBox, t, userInfo, allMaintainList }) => {
	const openLoginPopBox = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	const onNavigate = (tpId, gameId, gameType, _isInMaintain) => {
		if (_isInMaintain) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.UnderMaintain,
				clickClose
			});

			return;
		}

		if (gameType === defGameType.default) {
			SET_ENTER_PAGE({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				loginCallback: openLoginPopBox
			});
		} else if (gameType === defGameType.casino) {
			if (userInfo.isLogin === false) {
				openLoginPopBox();
			} else {
				SET_CASINO_ENTER_PAGE({
					tpId,
					gameId,
					isFree: false,
					langId: userInfo.langId
				});
			}
		}
	};
	return (
		<HotGameList
			t={t}
			gameList={defGameList}
			allMaintainList={allMaintainList}
			onNavigate={onNavigate}
		/>
	);
};

const HotGameList = ({ t, gameList, allMaintainList, onNavigate }) => {
	const rows = gameList.map(g => {
		const isInMaintain = allMaintainList?.some(
			mt =>
				mt.tpId === g.tpId &&
				(mt.tpCategoryId === g.tpCategory ||
					mt.tpCategoryId === defTpCategoryId.all)
		);

		return (
			<a
				key={`hotgamelist-${g.tpId}-${g.gameId}-${g.gameType}`}
				onClick={() =>
					onNavigate(g.tpId, g.gameId, g.gameType, isInMaintain)
				}
				style={{
					margin: "0 10px"
				}}>
				<img className="gameimg" src={g.img} alt="" />
				<div className="title">
					<p>{g.name}</p>
					<img src={g.providerImg} alt="" />
				</div>
			</a>
		);
	});
	return (
		<div className="hotgame">
			<div className="titleBox">
				<div className="title">{t("lbl_HOT_GAMES")}</div>
				<Link to={path.casino.root}>{t("lbl_More")}...</Link>
			</div>

			<div className="gameBox">
				<ReactMarquee
					speed={85}
					pauseOnHover={true}
					gradientColor={false}>
					<div className="swiper-container">
						<div
							className="swiper-wrapper"
							style={{ display: "flex" }}>
							{rows}
						</div>
					</div>
				</ReactMarquee>
			</div>
		</div>
	);
};
