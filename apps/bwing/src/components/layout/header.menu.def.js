import productList, { defCasinoProviders } from "../../datas/productList";
import path from "../../router";
import {
	defEventIcon,
	defEventPeriod,
	showEventIcon
} from "../common/eventIcon";

export const defMenuType = {
	entPage: "entPage",
	Link: "Link",
	LinkOrBtn: "LinkOrBtn",
	useGoToGame: "useGoToGame"
};

export const defMenuLinks = {
	// cryptoSports: {
	// 	className: "icon-app-white",
	// 	menuType: defMenuType.entPage,
	// 	productInfo: { ...productList.cryptoSports }
	// },
	home: {
		className: "icon-home-white",
		path: path.home.root
	},
	sports: {
		// productInfo: productList.soccer,
		path: path["sports-lobby"].root,
		displayKey: "lbl_Sports",
		subMenu: [
			{
				...productList.cryptoSports,
				className: "cryptosport",
				displayKey: "lbl_cryptoSports",
				parameter: { ...productList.cryptoSports },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.sports_cryptoSports
					})
				],
				img: "sports/crypto.png"
			},
			{
				...productList.sportSaba,
				subPath: path.sports.root,
				className: "sabaSport",
				displayKey: "lbl_Saba_Sport",
				parameter: { ...productList.sportSaba },
				img: "sports/saba.png"
			},
			{
				...productList.sportSbo,
				subPath: path.sportSbo.root,
				className: "sbobet",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.sportSbo
					})
				],
				displayKey: "lbl_Sbobet",
				parameter: { ...productList.sportSbo },
				afterLogin: true,
				img: "sports/sbo.png"
			},
			{
				...productList.sportBti,
				subPath: path.sportBti.root,
				className: "btiSport",
				displayKey: "lbl_Bti_Sport",
				parameter: { ...productList.sportBti },
				img: "sports/bti.png"
			},
			{
				...productList.sports_IM,
				subPath: path.sportsIM.root,
				className: "InplayMatrix",
				displayKey: "lbl_IM_Sports",
				parameter: { ...productList.sports_IM },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				],
				img: "sports/im.png"
			},
			{
				...productList.virtualSports,
				subPath: path.sports.root,
				className: "virtual",
				displayKey: "lbl_Virtual_Sports",
				parameter: { ...productList.virtualSports },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.sports_virtualSports
					})
				],
				img: "sports/virtual.png"
			}
		]
	},
	// cockFighting: {
	// 	productInfo: productList.cockFighting,
	// 	displayKey: "lbl_CockFighting"
	// },
	// sabaClub: {
	// 	productInfo: productList.sabaClub,
	// 	displayKey: "lbl_Vgaming"
	// },
	games: {
		displayKey: "lbl_Games",
		path: path.games.root,
		className: "gamesbtn",
		subDivClass1: "ballR1",
		subDivClass2: "ballR1 ballG1",
		subMenu: [
			{
				...productList.KingMaker,
				className: "kingmaker",
				lobbyImg: "km.png",
				displayKey: "lbl_King_Maker",
				menuType: defMenuType.entPage,
				lobbyPage: { bgClass: "kingmaker" },
				img: "games/km.png"
			},
			{
				...productList.V8_Poker,
				className: "v8",
				displayKey: "lbl_V8Poker",
				menuType: defMenuType.entPage,
				lobbyPage: { bgClass: "v8pork" },
				lobbyImg: "v8.png",
				img: "games/v8.png"
			},
			{
				...productList.sabaClub,
				path: path.sports.root,
				className: "vgaming",
				displayKey: "lbl_Vgaming",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.sabaClub },
				lobbyPage: { bgClass: "vgaming" },
				lobbyImg: "vgaming.png",
				img: "games/vgaming.png"
			},
			{
				...productList.tableGame,
				path: path.sports.root,
				className: "tablegame",
				displayKey: "lbl_tableGame",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.tableGame },
				lobbyPage: { bgClass: "tablegame" },
				lobbyImg: "tablegame.png",
				img: "games/tablegame.png"
			},
			{
				...productList.IM_Avaitor,
				className: "aviator",
				lobbyImg: "aviator.png",
				displayText: "Avaitor",
				menuType: defMenuType.entPage,
				lobbyPage: { bgClass: "spribe aviator" },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				],
				img: "games/aviator.png"
			},
			{
				...productList.IM_Mines,
				className: "mines",
				lobbyImg: "mines.png",
				displayText: "Mines",
				menuType: defMenuType.entPage,
				lobbyPage: { bgClass: "spribe mines" },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				],
				img: "games/mines.png"
			},
			{
				...productList.IM_Goal,
				className: "goal",
				lobbyImg: "goal.png",
				displayText: "Goal",
				menuType: defMenuType.entPage,
				lobbyPage: { bgClass: "spribe goal" },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				],
				img: "games/goal.png"
			},
			{
				...productList.IM_Dice,
				className: "dice",
				lobbyImg: "dice.png",
				displayText: "Dice",
				menuType: defMenuType.entPage,
				lobbyPage: { bgClass: "spribe dice" },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				],
				img: "games/dice.png"
			},
			{
				...productList.Spaceman,
				className: "spaceman",
				lobbyImg: "pp.png",
				displayText: "Spaceman",
				menuType: defMenuType.entPage,
				lobbyPage: { bgClass: "spaceman" },
				img: "games/pp.png"
			},
			{
				...productList.Crash,
				className: "crash",
				lobbyImg: "ap.png",
				displayText: "Crash",
				menuType: defMenuType.entPage,
				lobbyPage: { bgClass: "crash" },
				img: "games/ap.png"
			},
			{
				...productList.GoRush,
				className: "gorush",
				lobbyImg: "jili.png",
				displayText: "Go Rush",
				menuType: defMenuType.entPage,
				lobbyPage: { bgClass: "gorush" },
				img: "games/jili.png"
			}
			// {
			// 	...productList.MaxGame,
			// 	className: "maxgame",
			// 	displayText: "Max Game",
			// 	menuType: defMenuType.entPage,
			// 	lobbyPage: { bgClass: "maxgame" },
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.game_MaxGame
			// 		})
			// 	]
			// },

			// {
			// 	...productList.virtualGame,
			// 	path: path.sports.root,
			// 	className: "virtual",
			// 	displayKey: "lbl_Virtual_Games",
			// 	menuType: defMenuType.LinkOrBtn,
			// 	parameter: { ...productList.virtualGame },
			// 	lobbyPage: { bgClass: "virtualgames" }
			// }
		]
	},
	// numberGame: {
	// 	productInfo: productList.numberGame,
	// 	path: path.sports.root,
	// 	displayKey: "lbl_NumberGame"
	// },
	// virtualSport: {
	// 	productInfo: productList.virtualSports,
	// 	path: path.sports.root,
	// 	displayKey: "lbl_VirtualSport"
	// },
	eSport: {
		path: path.eSport.root,
		displayKey: "lbl_eSports",
		subMenu: [
			// {
			// 	...productList.eSport_Dota2,
			// 	_class: "dota",
			// 	displayKey: "Dota2",
			// 	menuType: defMenuType.entPage
			// },
			// {
			// 	...productList.eSport_Csgo,
			// 	_class: "cso",
			// 	displayKey: "CSGO",
			// 	menuType: defMenuType.entPage
			// },
			{
				...productList.eSport,
				_class: "saba",
				className: "saba",
				lobbyImg: "saba.png",
				displayKey: "lbl_Saba",
				menuType: defMenuType.entPage,
				img: "esports/saba.png"
			},
			{
				...productList.eSport_IM,
				_class: "Inplaymatrix",
				className: "inplaymatrix",
				lobbyImg: `im.png`,
				displayText: "IM E-Sports",
				menuType: defMenuType.entPage,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				],
				img: "esports/im.png"
			},
			{
				...productList.eSport_TFGaming,
				_class: "tfg",
				className: "tfg",
				lobbyImg: `tfgaming.png`,
				displayKey: "lbl_TFGaming",
				menuType: defMenuType.entPage,
				img: "esports/tfgaming.png"
			}
			// {
			// 	...productList.eSport_LeagueOfLegends,
			// 	_class: "lol",
			// 	displayKey: "LOL",
			// 	menuType: defMenuType.entPage
			// },
			// {
			// 	...productList.eSport_KingOfGlory,
			// 	_class: "king",
			// 	displayKey: "Kog",
			// 	menuType: defMenuType.entPage
			// }
		]
	},
	casino: {
		path: path.casino.root,
		displayKey: "lbl_Slots",
		className: "slotsbtn",
		subDivClass1: "light light-slot",
		subMenu: [
			{
				...defCasinoProviders.PP,
				className: "PP",
				icon: "icon icon-PP",
				displayText: "Pragmatic Play",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.PP.name },
				img: "slots/pp.png"
			},
			{
				...defCasinoProviders.SG,
				className: "SG",
				icon: "icon icon-SG",
				displayText: "Spadegaming",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.SG.name },
				img: "slots/sg.png"
			},
			{
				...defCasinoProviders.AdvantPlay,
				className: "APnew",
				displayText: "AdvantPlay",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.AdvantPlay.name },
				img: "slots/ap.png"
			},
			{
				...defCasinoProviders.Amigo,
				displayText: "Amigo Gaming",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.Amigo.name },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.slot_amigo
					})
				],
				img: "slots/amigo.png"
			},
			{
				...defCasinoProviders.Endorphina,
				className: "Endorphina",
				displayText: "ES",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.Endorphina.name },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.slot_endorphina
					})
				],
				img: "slots/es.png"
			},
			{
				...defCasinoProviders.Nextspin,
				className: "Nextspin",
				displayText: "Nextspin",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.Nextspin.name },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.slot_nextspin
					})
				],
				img: "slots/nextspin.png"
			},
			{
				...defCasinoProviders.PG,
				className: "PG",
				icon: "icon icon-PG",
				displayText: "PG Soft",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.PG.name },
				img: "slots/pg.png"
			},
			{
				...defCasinoProviders.BNG,
				className: "",
				icon: "",
				displayText: "BNG",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.BNG.name },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.slot_bng
					})
				],
				img: "slots/bng.png"
			},
			{
				...defCasinoProviders.FaChai,
				className: "",
				icon: "",
				displayText: "Fa Chai",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.FaChai.name },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.slot_fachai
					})
				],
				img: "slots/fachai.png"
			},
			// * bwing 改版中，因此先不做(目前沒有圖)
			// {
			// 	...defCasinoProviders.FaChai,
			// 	className: "",
			// 	icon: "",
			// 	displayText: "Fa Chai",
			// 	menuType: defMenuType.Link,
			// 	parameter: { provider: defCasinoProviders.FaChai.name },
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.slot_fachai
			// 		})
			// 	]
			// },
			{
				...defCasinoProviders.MGPSW,
				className: "MG",
				icon: "icon icon-mg",
				displayText: "Microgaming",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.MGPSW.name },
				img: "slots/mg.png"
			},
			{
				...defCasinoProviders.JILI,
				className: "JILI",
				icon: "icon icon-jili",
				displayText: "JILI",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.JILI.name },
				img: "slots/jili.png"
			},
			{
				...defCasinoProviders.SPRIBE,
				className: "SPRIBE",
				icon: "SPRIBE",
				displayText: "SPRIBE",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.SPRIBE.name },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				],
				img: "slots/spribe.png"
			},
			{
				...defCasinoProviders.NoLimitCity,
				displayText: "NoLimit City",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.NoLimitCity.name },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.slot_NoLimitCity
					})
				],
				img: "slots/nlc.png"
			},
			{
				...defCasinoProviders.RedTiger,
				className: "RED",
				displayText: "Red Tiger",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.RedTiger.name },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_RedTiger
					})
				],
				img: "slots/redtiger.png"
			},
			{
				...defCasinoProviders.NetEnt,
				className: "NE",
				displayText: "NetEnt",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.NetEnt.name },
				img: "slots/netent.png"
			},
			{
				...defCasinoProviders.CQ9,
				className: "CQ9",
				// isNew: true,
				icon: "icon icon-cq9",
				displayText: "CQ9",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.CQ9.name },
				img: "slots/cq9.png"
			},
			{
				keyName: "slot_PNG",
				icon: "icon icon-png",
				displayText: "Play' n GO",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotplayngo.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_PNG },
				parameter: { provider: "png" },
				...defCasinoProviders.PNG,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.PNG
					})
				],
				img: "slots/png.png"
			},
			{
				...defCasinoProviders.GPI,
				className: "GPI",
				icon: "icon icon-GPI",
				displayText: "Game Play",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.GPI.name },
				img: "slots/gpi.png"
			},
			{
				...defCasinoProviders.YGG,
				className: "YGG",
				icon: "icon icon-YGG",
				displayText: "YGGDrassil",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.YGG.name },
				img: "slots/ygg.png"
			},
			{
				...defCasinoProviders.Habanero,
				className: "HO",
				displayText: "Habanero",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.Habanero.name },
				img: "slots/hb.png"
			},
			{
				...defCasinoProviders.SimplePlay,
				className: "SP",
				displayText: "SimplePlay",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.SimplePlay.name },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_SimplePlay
					})
				],
				img: "slots/simpleplay.png"
			},
			{
				...defCasinoProviders.Skywind,
				className: "SK",
				displayText: "Skywind",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.Skywind.name },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.skywind
					})
				],
				img: "slots/skywind.png"
			},
			{
				...defCasinoProviders.PlayTech,
				className: "PT",
				icon: "icon icon-pt",
				displayText: "PlayTech",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.PlayTech.name },
				img: "slots/pt.png"
			}

			// {
			// 	...defCasinoProviders.AstroTech,
			// 	className: "ICG",
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.icg
			// 		})
			// 	],
			// 	icon: "icon icon-ICG",
			// 	displayText: "Astro Tech",
			// 	menuType: defMenuType.Link,
			// 	parameter: { provider: defCasinoProviders.AstroTech.name }
			// },
			// {
			// 	...defCasinoProviders.OW,
			// 	className: "OW",
			// 	icon: "icon icon-OW",
			// 	displayText: "Saba Casino",
			// 	menuType: defMenuType.entPage
			// }
		]
	},
	liveCasino: {
		displayKey: "lbl_LiveCasino",
		path: path.liveCasino.root,
		className: "livecasinobtn",
		subDivClass1: "dice",
		subDivClass2: "dice dice2",
		subMenu: [
			{
				...productList.liveCasino_PP,
				className: "livePP",
				lobbyImg: "pp.png",
				icon: "icon icon-PP",
				displayText: "Pragmatic Play",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-pp"
				},
				img: "livecasino/pp.png"
			},
			{
				...productList.liveCasino_BG,
				className: "liveBG",
				lobbyImg: "bg.png",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.liveCasino_BG
					})
				],
				icon: "icon icon-BG",
				displayText: "Big Gaming",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-bg"
				},
				img: "livecasino/bg.png"
			},
			{
				...productList.liveCasino_YeeBet,
				className: "liveYB",
				lobbyImg: "yeebet.png",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.yee_bet
					})
				],
				displayText: "YEEBET",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-yb"
				},
				img: "livecasino/yeebet.png"
			},
			{
				...productList.liveCasino_Skywind,
				className: "liveSK",
				lobbyImg: "skywind.png",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.skywind
					})
				],
				displayText: "Skywind",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-sk"
				},
				img: "livecasino/skywind.png"
			},
			{
				...productList.liveCasino_MG,
				className: "liveMG",
				lobbyImg: "mg.png",
				icon: "icon icon-mg",
				displayText: "Microgaming",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-mg"
				},
				img: "livecasino/mg.png"
			},
			{
				...productList.liveCasino_EVO,
				className: "liveEvo",
				lobbyImg: "evo.png",
				displayText: "Evolution Gaming",
				menuType: defMenuType.entPage,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.liveCasino_evo
					})
				],
				lobbyPage: {
					bgClass: "live-evo"
				},
				img: "livecasino/evo.png"
			},
			{
				...productList.liveCasino_PlayTech,
				className: "livePT",
				lobbyImg: "pt.png",
				icon: "icon icon-pt",
				displayText: "PlayTech",
				lobbyPage: {
					bgClass: "live-pt"
				},
				img: "livecasino/pt.png"
			},
			{
				...productList.liveCasino_n2live,
				className: "liven2live",
				lobbyImg: "n2.png",
				icon: "icon icon-N2LIVE",
				displayText: "n2-LIVE",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-n2"
				},
				img: "livecasino/n2.png"
			},
			{
				...productList.liveCasino_One789,
				className: "live789",
				lobbyImg: "789.png",
				icon: "icon icon-one789",
				displayKey: "lbl_liveCasino_789SeDie",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-789"
				},
				img: "livecasino/789.png"
			},
			{
				gameId: 20,
				tpId: 20,
				className: "liveWM",
				lobbyImg: "wm.png",
				icon: "icon icon-WM",
				displayText: "WM Casino",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-wm"
				},
				tpGameType: 32,
				img: "livecasino/wm.png"
			},
			{
				gameId: 4,
				tpId: 4,
				className: "liveDG",
				lobbyImg: "dg.png",
				icon: "icon icon-DG",
				displayText: "Dream Gaming",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-dg"
				},
				tpGameType: 10,
				img: "livecasino/dg.png"
			},
			{
				gameId: 12,
				tpId: 12,
				className: "liveALL",
				lobbyImg: "ab.png",
				icon: "icon icon-AB",
				displayText: "Allbet",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-ab"
				},
				tpGameType: 6,
				img: "livecasino/ab.png"
			},
			{
				gameId: 3,
				tpId: 3,
				className: "liveAG",
				lobbyImg: "ag.png",
				icon: "icon icon-AG",
				displayText: "Asia Gaming",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-ag"
				},
				tpGameType: 8,
				img: "livecasino/ag.png"
			},
			{
				gameId: 2,
				tpId: 2,
				className: "liveSA",
				lobbyImg: "sa.png",
				icon: "icon icon-SA",
				displayText: "SA Gaming",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-sa"
				},
				tpGameType: 9,
				img: "livecasino/sa.png"
			},
			{
				gameId: 15,
				tpId: 15,
				className: "liveAE",
				icon: "icon icon-AE",
				displayText: "AE Sexy",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-ae"
				},
				lobbyImg: "sexy.png",
				tpGameType: 18,
				img: "livecasino/sexy.png"
			},
			{
				gameId: 18,
				tpId: 18,
				className: "liveEB",
				icon: "icon icon-EB",
				displayText: "WE",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-we"
				},
				lobbyImg: "we.png",
				tpGameType: 28,
				img: "livecasino/we.png"
			}
		]
	},
	fishing: {
		// productInfo: productList.fishing,
		displayKey: "lbl_Fishing",
		path: path.fishing.root,
		subMenu: [
			{
				...productList.fishing_SG,
				className: "fs-god",
				lobbyImg: "fg.png",
				displayKey: "lbl_FishingSG1",
				menuType: defMenuType.entPage,
				parameter: { ...productList.fishing_SG },
				lobbyPage: {
					bgClass: "fish-god"
				},
				img: "fishing/fg.png"
			},
			{
				...productList.fishing_Zombie_Party,
				className: "fs-zp",
				displayKey: "lbl_Fishing_Zombie_Party",
				menuType: defMenuType.entPage,
				parameter: { ...productList.fishing_Zombie_Party },
				lobbyPage: {
					bgClass: "fish-zp"
				},
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.fishing_Zombie_Party
					})
				],
				lobbyImg: "zp.png",
				img: "fishing/zp.png"
			},
			{
				...productList.fishing_Alien_Hunter,
				className: "fs-ah",
				displayKey: "lbl_Fishing_Alien_Hunter",
				menuType: defMenuType.entPage,
				parameter: { ...productList.fishing_Alien_Hunter },
				lobbyPage: {
					bgClass: "fish-ah"
				},
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.fishing_Alien_Hunter
					})
				],
				lobbyImg: "ah.png",
				img: "fishing/ah.png"
			},
			{
				...productList.CQ9_Paradise,
				className: "fs-paradise",
				lobbyImg: "pd.png",
				displayKey: "lbl_Paradise",
				menuType: defMenuType.entPage,
				parameter: { ...productList.CQ9_Paradise },
				lobbyPage: {
					bgClass: "fish-paradise"
				},
				img: "fishing/pd.png"
			},
			{
				...productList.CQ9_Oneshot_Fishing,
				className: "fs-Oneshot",
				lobbyImg: "os.png",
				displayKey: "lbl_Oneshot_Fishing",
				menuType: defMenuType.entPage,
				parameter: { ...productList.CQ9_Oneshot_Fishing },
				lobbyPage: {
					bgClass: "fish-of"
				},
				img: "fishing/os.png"
			},
			{
				...productList.fishing_SGW,
				className: "fs-war",
				lobbyImg: "fw.png",
				displayKey: "lbl_FishingSG2",
				menuType: defMenuType.entPage,
				parameter: { ...productList.fishing_SGW },
				lobbyPage: {
					bgClass: "fish-wrd"
				},
				img: "fishing/fw.png"
			}

			// {
			// 	...productList.Skywind_Ocean_Ruler,
			// 	className: "fs-or",
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.skywind
			// 		})
			// 	],
			// 	displayKey: "Skywind_Ocean_Ruler",
			// 	menuType: defMenuType.entPage,
			// 	parameter: { ...productList.Skywind_Ocean_Ruler },
			// 	lobbyPage: {
			// 		bgClass: "fish-or"
			// 	}
			// },
			// {
			// 	...productList.Skywind_Cai_Shen_Da_Hai,
			// 	className: "fs-casdaha",
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.skywind
			// 		})
			// 	],
			// 	displayKey: "Skywind_Cai_Shen_Da_Hai",
			// 	menuType: defMenuType.entPage,
			// 	parameter: { ...productList.Skywind_Cai_Shen_Da_Hai },
			// 	lobbyPage: {
			// 		bgClass: "fish-casdaha"
			// 	}
			// },
			// {
			// 	...productList.ICG_DRAGONBALL_FISHING,
			// 	className: "fs-db",
			// 	displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
			// 	menuType: defMenuType.entPage,
			// 	parameter: { ...productList.ICG_DRAGONBALL_FISHING },
			// 	lobbyPage: {
			// 		bgClass: "fish-db"
			// 	}
			// },
			// {
			// 	...productList.ICG_FISHING_OF_SAVIORS,
			// 	className: "fs-fos",
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.icg
			// 		})
			// 	],
			// 	displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
			// 	menuType: defMenuType.entPage,
			// 	parameter: { ...productList.ICG_FISHING_OF_SAVIORS },
			// 	lobbyPage: {
			// 		bgClass: "fish-saviors"
			// 	}
			// },
			// {
			// 	...productList.ICG_THE_TYRANT_AND_THE_PRINCESS,
			// 	className: "fs-ttatp",
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.icg
			// 		})
			// 	],
			// 	displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
			// 	menuType: defMenuType.entPage,
			// 	parameter: {
			// 		...productList.ICG_THE_TYRANT_AND_THE_PRINCESS
			// 	},
			// 	lobbyPage: {
			// 		bgClass: "fish-ttsatp"
			// 	}
			// },

			// {
			// 	...productList.CQ9_LuckyFishing,
			// 	className: "fsluckey",
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.cq9
			// 		})
			// 	],
			// 	displayKey: "lbl_Lucky_Fishing",
			// 	menuType: defMenuType.entPage,
			// 	parameter: { ...productList.CQ9_Lucky_Fishing }
			// },
			// {
			// 	...productList.CQ9_Water_Margin_Fishing,
			// 	className: "fswatermargin",
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.cq9
			// 		})
			// 	],
			// 	displayKey: "lbl_Water_Margin_Fishing",
			// 	menuType: defMenuType.entPage,
			// 	parameter: { ...productList.CQ9_Water_Margin_Fishing }
			// },
			// {
			// 	...productList.CQ9_Thunder_Fighter,
			// 	className: "fsthunderfighter",
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.cq9
			// 		})
			// 	],
			// 	displayKey: "lbl_Thunder_Fighter",
			// 	menuType: defMenuType.entPage,
			// 	parameter: { ...productList.CQ9_Thunder_Fighter }
			// },
		]
	},
	lottery: {
		displayKey: "lbl_Lottery",
		path: path.lottery.root,
		subMenu: [
			// {
			// 	...productList.GPI_VNLottery,
			// 	className: "vn",
			// 	lobbyImg: `${baseImgUrl}/desktop/img/4.0/lobby/livecasino/sg.png`,
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.GPI_Lottery
			// 		})
			// 	],
			// 	displayKey: "GPI_VNLottery",
			// 	menuType: defMenuType.entPage,
			// 	lobbyPage: { bgClass: "vn" }
			// },
			// {
			// 	...productList.tcg,
			// 	className: "tcg",
			// 	lobbyImg: `${baseImgUrl}/desktop/img/4.0/lobby/livecasino/sg.png`,
			// 	displayKey: "lbl_TcGame",
			// 	menuType: defMenuType.entPage,
			// 	lobbyPage: { bgClass: "tcg" }
			// },
			{
				...productList.One789_lottery,
				path: path.sports.root,
				className: "traditional",
				lobbyImg: "789.png",
				displayKey: "lbl_TraditionalLottery",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.One789_lottery },
				lobbyPage: { bgClass: "traditional" },
				img: "lottery/789.png"
			},
			{
				...productList.tcg,
				className: "tcg",
				displayKey: "lbl_TcGame",
				menuType: defMenuType.entPage,
				lobbyPage: { bgClass: "tcg" },
				lobbyImg: "tcg.png",
				img: "lottery/tcg.png"
			},
			{
				...productList.keno,
				path: path.sports.root,
				className: "keno",
				lobbyImg: "keno.png",
				displayKey: "lbl_Keno",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.keno },
				lobbyPage: { bgClass: "keno" },
				img: "lottery/keno.png"
			},
			{
				...productList.lottery,
				path: path.sports.root,
				className: "lottery",
				lobbyImg: "lottery.png",
				displayKey: "lbl_Lottery",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.lottery },
				lobbyPage: { bgClass: "lottery" },
				img: "lottery/lottery.png"
			},
			{
				...productList.GPI_VNLottery,
				className: "vn",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.GPI_Lottery
					})
				],
				displayKey: "GPI_VNLottery",
				menuType: defMenuType.entPage,
				lobbyPage: { bgClass: "vn" },
				lobbyImg: "vn-lottery.png",
				img: "lottery/vn-lottery.png"
			}
			// {
			// 	...productList.One789_lottery_789,
			// 	path: path.sports.root,
			// 	className: "one789",
			// 	displayKey: "lbl_789Lottery",
			// 	menuType: defMenuType.LinkOrBtn,
			// 	parameter: { ...productList.One789_lottery_789 },
			// 	lobbyPage: { bgClass: "lottery789" }
			// },
		]
	},
	vip: {
		path: path.vip.root,
		displayKey: "lbl_Vip"
	},

	promotion: {
		path: path.promotion.root,
		displayKey: "lbl_Promotions",
		eventIcons: [
			showEventIcon({
				icon: defEventIcon.hot,
				period: defEventPeriod.promo
			})
		]
	},
	affiliate: {
		affiliate: true,
		displayKey: "lbl_Affiliates"
	}
	// ranking: {
	// 	path: path.leaderBoard.root,
	// 	displayKey: "lbl_Ranking",
	// 	className: "liveIcon"
	// }
	// lottery: {
	// 	productInfo: productList.lottery,
	// 	path: path.sports.root,
	// 	displayKey: "lbl_KenoAndLottery"
	// }
	// fishing: {
	// 	productInfo: productList.fishing,
	// 	path: path.sports.root,
	// 	displayKey: "lbl_Fishing"
	// }
};

export const defSubListClassName = {
	sports: "sports",
	casino: "slots",
	liveCasino: "livecasino",
	games: "game",
	fishing: "fish",
	lottery: "lottery",
	eSport: "esport"
};
