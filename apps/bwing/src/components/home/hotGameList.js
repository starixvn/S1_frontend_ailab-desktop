import React from "react";
import { Link } from "gatsby";
import ReactMarquee from "react-fast-marquee";
import { defPopBoxType } from "../common/defPopBoxType";
import { SET_ENTER_PAGE, SET_CASINO_ENTER_PAGE } from "../../service/enterPage";
import path from "../../router";
import { defTpGameType } from "../../datas/productList";
import { bannerImgUrl } from "../../config";

const defGameType = {
	default: "default",
	casino: "casino"
};

const defGameList = [
	{
		name: "Mahjong Ways Two",
		provider: "PG",
		providerImg: `${bannerImgUrl}/desktop/img/hotgame/pg.png`,
		img: `${bannerImgUrl}/desktop/img/hotgame/hotgame1.jpg`,
		tpId: 14,
		gameId: "mahjong-ways2",
		gameType: defGameType.casino,
		tpGameType: 17
	},
	{
		name: "Treasures of Aztec",
		provider: "PG",
		providerImg: `${bannerImgUrl}/desktop/img/hotgame/pg.png`,
		img: `${bannerImgUrl}/desktop/img/hotgame/hotgame2.jpg`,
		tpId: 14,
		gameId: "treasures-aztec",
		gameType: defGameType.casino,
		tpGameType: 17
	},
	{
		name: "5 God beasts",
		provider: "CQ9",
		providerImg: `${bannerImgUrl}/desktop/img/hotgame/cq9.png`,
		img: `${bannerImgUrl}/desktop/img/hotgame/hotgame3.jpg`,
		tpId: 16,
		gameId: 117,
		gameType: defGameType.casino,
		tpGameType: 29
	},
	{
		name: "Hercules",
		provider: "CQ9",
		providerImg: `${bannerImgUrl}/desktop/img/hotgame/cq9.png`,
		img: `${bannerImgUrl}/desktop/img/hotgame/hotgame4.jpg`,
		tpId: 16,
		gameId: 161,
		gameType: defGameType.casino,
		tpGameType: 29
	},
	{
		name: "Three Star Fortune",
		provider: "PP",
		providerImg: `${bannerImgUrl}/desktop/img/hotgame/pp.png`,
		img: `${bannerImgUrl}/desktop/img/hotgame/hotgame5.jpg`,
		tpId: 5,
		gameId: "vs10threestar",
		gameType: defGameType.casino,
		tpGameType: 7
	},
	{
		name: "5 Lions Gold",
		provider: "PP",
		providerImg: `${bannerImgUrl}/desktop/img/hotgame/pp.png`,
		img: `${bannerImgUrl}/desktop/img/hotgame/hotgame6.jpg`,
		tpId: 5,
		gameId: "vs243lionsgold",
		gameType: defGameType.casino,
		tpGameType: 7
	},
	{
		name: "Dancing Fever",
		provider: "Spade",
		providerImg: `${bannerImgUrl}/desktop/img/hotgame/sg.png`,
		img: `${bannerImgUrl}/desktop/img/hotgame/hotgame7.jpg`,
		tpId: 10,
		gameId: "S-DF02",
		gameType: defGameType.casino,
		tpGameType: 15
	},
	{
		name: "5 Fortune Dragons",
		provider: "Spade",
		providerImg: `${bannerImgUrl}/desktop/img/hotgame/sg.png`,
		img: `${bannerImgUrl}/desktop/img/hotgame/hotgame8.jpg`,
		tpId: 10,
		gameId: "S-FD01",
		gameType: defGameType.casino,
		tpGameType: 15
	},
	{
		name: "Thor Infinity Reels",
		provider: "YGG",
		providerImg: `${bannerImgUrl}/desktop/img/hotgame/ygg.png`,
		img: `${bannerImgUrl}/desktop/img/hotgame/hotgame9.jpg`,
		tpId: 8,
		gameId: "1035",
		gameType: defGameType.casino,
		tpGameType: 14
	},
	{
		name: "Lucky Neko",
		provider: "YGG",
		providerImg: `${bannerImgUrl}/desktop/img/hotgame/ygg.png`,
		img: `${bannerImgUrl}/desktop/img/hotgame/hotgame10.jpg`,
		tpId: 8,
		gameId: "7382",
		gameType: defGameType.casino,
		tpGameType: 14
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
				clickClose: () => {
					setPopBox({ isOpen: false });
				}
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
				(mt.tpGameType === g.tpGameType ||
					mt.tpGameType === defTpGameType.All)
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
