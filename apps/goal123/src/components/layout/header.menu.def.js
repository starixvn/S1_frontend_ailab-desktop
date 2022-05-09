import productList, { defCasinoProviders } from "../../datas/productList";
import path from "../../router";
import { siteInfo, bannerImgUrl } from "../../config";
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

export const defMenuLinks = langId => ({
	sports: {
		productInfo: productList.soccer,
		displayKey: "lbl_Sports",
		subMenu: [
			{
				...productList.sportSaba,
				subPath: path.sports.root,
				className: "sport",
				displayKey: "lbl_Saba_Sport",
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/saba.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/saba-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/sabas-icon.png`,
				parameter: { ...productList.sportSaba }
			},
			{
				...productList.virtualSports,
				subPath: path.sports.root,
				className: "sport",
				displayKey: "lbl_Virtual_Sports",
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/betradar.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/betradar-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/betradar-icon.png`,
				parameter: { ...productList.virtualSports },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.sports_virtualSports
					})
				]
			}
			// {
			// 	...productList.sportBti,
			// 	subPath: path.sportBti.root,
			// 	menuType: defMenuType.entPage,
			// 	className: "BTI",
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.sportBti
			// 		})
			// 	],
			// 	displayKey: "lbl_Bti_Sport",
			// 	bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/bti.png`,
			// 	npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/bti-item.png`,
			// 	iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/bti-icon.png`,
			// 	parameter: { ...productList.sportBti }
			// }
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
		className: "game",
		subMenu: [
			{
				...productList.tcg,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.lottery_tcg
					})
				],
				displayKey: "lbl_TcGame",
				menuType: defMenuType.entPage,
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/tcg.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/tcg-item.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/games/tcg.png`
				},
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/newicon/tcg-icon.png`
			},
			{
				...productList.KingMaker,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.KingMaker
					})
				],
				displayKey: "lbl_King_Maker",
				menuType: defMenuType.entPage,
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/kingmaker.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/kingmaker-item.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/games/kingmaker.png`
				},
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/newicon/kingmaker-icon.png`
			},
			{
				...productList.sabaClub,
				// path: path.sports.root,
				className: "sabaclub",
				displayKey: "lbl_Vgaming",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.sabaClub },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/vg.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/vg-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/newicon/vg-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/games/vg.png`
				}
			},
			{
				...productList.V8_Poker,
				className: "v8",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.v8Poker
					})
				],
				displayKey: "lbl_V8Poker",
				menuType: defMenuType.entPage,
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/v8poker.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/v8poker-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/newicon/v8poker-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/games/v8.png`
				}
			},
			{
				...productList.keno,
				// path: path.sports.root,
				className: "keno",
				displayKey: "lbl_Keno",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.keno },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/keno.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/keno-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/newicon/keno-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/games/keno.png`
				}
			},
			{
				...productList.lottery,
				// path: path.sports.root,
				className: "lottery",
				displayKey: "lbl_Lottery",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.lottery },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/lottery.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/lottery-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/newicon/lottery-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/games/lottery.png`
				}
			},
			{
				...productList.tableGame,
				// path: path.sports.root,
				className: "tablegame",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.tableGame
					})
				],
				displayKey: "lbl_tableGame",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.tableGame },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/tablegame.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/tablegame-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/newicon/tablegame-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/games/tablegame.png`
				}
			},
			{
				...productList.virtualGame,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.game_virtualGame
					})
				],
				displayKey: "lbl_Virtual_Games",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.virtualGame },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/virtualgames.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/virtualgames-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/newicon/virtualgames-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/games/virtualgames.png`
				}
			}
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
		entryList: [
			{
				...productList.eSport_Dota2,
				imgSrc: `${bannerImgUrl}/desktop/img/esports/dota2.png`,
				displayKey: "Dota2",
				menuType: defMenuType.entPage
			},
			{
				...productList.eSport_Csgo,
				imgSrc: `${bannerImgUrl}/desktop/img/esports/cs.png`,
				displayKey: "CSGO",
				menuType: defMenuType.entPage
			},
			{
				...productList.eSport,
				imgSrc: `${bannerImgUrl}/desktop/img/esports/all.png`,
				displayKey: "All",
				menuType: defMenuType.entPage
			},
			{
				...productList.eSport_LeagueOfLegends,
				imgSrc: `${bannerImgUrl}/desktop/img/esports/lol.png`,
				displayKey: "LOL",
				menuType: defMenuType.entPage
			},
			{
				...productList.eSport_KingOfGlory,
				imgSrc: `${bannerImgUrl}/desktop/img/esports/king.png`,
				displayKey: "Kog",
				menuType: defMenuType.entPage
			}
		]
	},
	casino: {
		path: path.casino.root,
		displayKey: "lbl_Slots",
		className: "casinobtn",
		subMenu: [
			{
				...defCasinoProviders.AdvantPlay,
				displayText: "AdvantPlay",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.AdvantPlay.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/ap.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/ap-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/ap-icon.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_AdvantPlay
					})
				]
			},
			{
				...defCasinoProviders.PP,
				className: "PP",
				icon: "icon icon-PP",
				displayText: "Pragmatic Play",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.PP.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/pp.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/pp-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/pp-icon.png`
			},
			{
				...defCasinoProviders.Habanero,
				displayText: "Habanero",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.Habanero.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/habanero.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/habanero-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/habanero-icon.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_Habanero
					})
				]
			},
			{
				...defCasinoProviders.NetEnt,
				displayText: "NetEnt",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.NetEnt.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/ne.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/ne-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/ne-icon.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_NetEnt
					})
				]
			},
			{
				...defCasinoProviders.MGPSW,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.mgpsw
					})
				],
				displayText: "Microgaming",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.MGPSW.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/mg.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/mg-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/mg-icon.png`
			},
			{
				...defCasinoProviders.JILI,
				className: "JI",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_ji
					})
				],
				displayText: "JILI",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.JILI.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/jili.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/jili-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/jili-icon.png`
			},
			{
				...defCasinoProviders.PT,
				className: "PT",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_pt
					})
				],
				icon: "icon icon-pt",
				displayText: "Playtech",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.PT.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/playtech.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/playtech-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/playtech-icon.png`
			},
			{
				...defCasinoProviders.AstroTech,
				className: "ICG",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.icg
					})
				],
				icon: "icon icon-icg",
				displayText: "Astro Tech",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.AstroTech.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/icg.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/icg-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/icg-icon.png`
			},
			{
				...defCasinoProviders.CQ9,
				className: "CQ9",
				icon: "icon icon-cq9",
				displayText: "CQ9",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.CQ9.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/cq9.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/cq9-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/cq9-icon.png`
			},
			{
				...defCasinoProviders.GPI,
				className: "GPI",
				icon: "icon icon-GPI",
				displayText: "Game Play",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.GPI.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/gpi.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/GPI-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/gpi-icon.png`
			},
			{
				...defCasinoProviders.YGG,
				className: "YGG",
				icon: "icon icon-YGG",
				displayText: "YGGDrassil",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.YGG.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/ygg.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/ygg-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/ygg-icon.png`
			},
			// {
			// 	className: "JOKER",
			// 	icon: "icon icon-JOKER",
			// 	displayText: "JOKER",
			// 	menuType: defMenuType.Link,
			// 	tpId: 9,
			// 	parameter: { tpId: 9 }
			// },
			{
				...defCasinoProviders.SG,
				className: "SG",
				icon: "icon icon-SG",
				displayText: "Spadegaming",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.SG.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/sg.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/sg-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/sg-icon.png`
			},
			{
				...defCasinoProviders.RedTiger,
				className: "RedTiger",
				displayText: "Red Tiger",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.RedTiger.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/rt.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/rt-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/rt-icon.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_RedTiger
					})
				]
			},
			{
				...defCasinoProviders.PG,
				className: "PG",
				icon: "icon icon-PG",
				displayText: "PG Soft",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.PG.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/pg.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/pg-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/pg-icon.png`
			},
			{
				...defCasinoProviders.OW,
				className: "OW",
				icon: "icon icon-OW",
				displayText: "Saba Casino",
				menuType: defMenuType.entPage,
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/sabaslot.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/sabaslot-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/sabaslot-icon.png`
			}
		]
	},
	liveCasino: {
		displayKey: "lbl_LiveCasino",
		className: "livecasinobtn",
		path: path.liveCasino.root,
		subMenu: [
			// {
			// 	...defCasinoProviders.MGPSW,
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.mgpsw
			// 		})
			// 	],
			// 	displayText: "MG",
			// 	menuType: defMenuType.entPage,
			// 	parameter: { provider: defCasinoProviders.MGPSW.name },
			// npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/mg.png`,
			// iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/mg-icon.png`,				// 	disabledInSlider: true,
			// 	lobbyPage: {
			// 		bgImg: livecasinoLobbyMgBgImg,
			// 		iconImg: livecasinoLobbyMgIconImg
			// 	}
			// },
			{
				...productList.liveCasino_PP,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.liveCasino_pp
					})
				],
				className: "livePP",
				icon: "icon icon-PP",
				listNpcImgUrl: "pp.png",
				displayText: "Pragmatic Play",
				menuType: defMenuType.entPage,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/pp.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/pp-icon.png`,
				lobbyImg: "pp"
			},
			{
				...productList.liveCasino_EVO,
				className: "evolution",
				listNpcImgUrl: "evolution.png",
				displayText: "Evolution Gaming",
				menuType: defMenuType.entPage,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/evolution.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/evolution-icon.png`,
				lobbyImg: "evolution",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.liveCasino_evo
					})
				]
			},
			{
				...productList.liveCasino_PT,
				className: "PT",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.liveCasino_pt
					})
				],
				icon: "icon icon-pt",
				displayText: "Playtech",
				menuType: defMenuType.useGoToGame,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/playtech.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/playtech-icon.png`,
				disabledInSlider: true,
				lobbyImg: "pt"
			},
			{
				...productList.liveCasino_n2live,
				tpId: 28,
				className: "liveN2LIVE",
				icon: "icon icon-N2LIVE",
				listNpcImgUrl: "n2live.png",
				displayText: "n2-LIVE",
				menuType: defMenuType.entPage,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/n2live.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/n2live-icon.png`,
				lobbyImg: "n2live"
			},
			{
				...productList.liveCasino_WM,
				gameId: 20,
				tpId: 20,
				className: "liveWM",
				icon: "icon icon-WM",
				listNpcImgUrl: "wm.png",
				displayText: "WM Casino",
				menuType: defMenuType.entPage,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/wm.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/wm-icon.png`,
				lobbyImg: "wm"
			},
			{
				...productList.liveCasino_DG,
				gameId: 4,
				tpId: 4,
				className: "liveDG",
				icon: "icon icon-DG",
				listNpcImgUrl: "dg.png",
				displayText: "Dream Gaming",
				menuType: defMenuType.entPage,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/dg.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/dg-icon.png`,
				lobbyImg: "dg"
			},
			{
				...productList.liveCasino_Allbet,
				gameId: 12,
				tpId: 12,
				className: "liveALL",
				icon: "icon icon-AB",
				listNpcImgUrl: "ab.png",
				displayText: "Allbet",
				menuType: defMenuType.entPage,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/allbet.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/allbet-icon.png`,
				lobbyImg: "allbet"
			},
			{
				...productList.liveCasino_AG,
				gameId: 3,
				tpId: 3,
				className: "liveAG",
				icon: "icon icon-AG",
				listNpcImgUrl: "ag.png",
				displayText: "Asia Gaming",
				menuType: defMenuType.entPage,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/ag.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/ag-icon.png`,
				lobbyImg: "ag"
			},
			{
				...productList.liveCasino_SA,
				gameId: 2,
				tpId: 2,
				className: "liveSA",
				icon: "icon icon-SA",
				listNpcImgUrl: "sa.png",
				displayText: "SA Gaming",
				menuType: defMenuType.entPage,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/sa.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/sa-icon.png`,
				lobbyImg: "sa"
			},
			{
				...productList.liveCasino_AE,
				gameId: 15,
				tpId: 15,
				className: "liveAE",
				icon: "icon icon-AE",
				listNpcImgUrl: "ae.png",
				displayText: "AE Casino",
				menuType: defMenuType.entPage,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/ae.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/ae-icon.png`,
				lobbyImg: "ae"
			},
			{
				...productList.liveCasino_eBET,
				gameId: 18,
				tpId: 18,
				className: "liveEB",
				icon: "icon icon-EB",
				listNpcImgUrl: "ebet.png",
				displayText: "eBET",
				menuType: defMenuType.entPage,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/ebet.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/ebet-icon.png`,
				lobbyImg: "ebet"
			}
		]
	},
	fishing: {
		// productInfo: productList.fishing,
		displayKey: "lbl_Fishing",
		path: path.fishing.root,
		subMenu: [
			{
				...productList.CQ9_Paradise,
				className: "paradise",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.cq9
					})
				],
				displayKey: "lbl_Paradise",
				menuType: defMenuType.entPage,
				parameter: { ...productList.CQ9_Paradise },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/paradise.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/paradise-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/newicon/cq9-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/fishing/paradise.png`,
					providerImg: "cq9"
				}
			},
			// {
			// 	...productList.CQ9_LuckyFishing,
			// 	className: "luckyfishing",
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
			{
				...productList.CQ9_Oneshot_Fishing,
				className: "oneshotfishing",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.cq9
					})
				],
				displayKey: "lbl_Oneshot_Fishing",
				menuType: defMenuType.entPage,
				parameter: { ...productList.CQ9_Oneshot_Fishing },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/oneshot.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/oneshot-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/newicon/cq9-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/fishing/oneshot.png`,
					providerImg: "cq9"
				}
			},
			// {
			// 	...productList.CQ9_Water_Margin_Fishing,
			// 	className: "watermarginfishing",
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
			// 	className: "thunderfighter",
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

			{
				...productList.ICG_DRAGONBALL_FISHING,
				className: "fdb",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.icg
					})
				],
				displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
				menuType: defMenuType.entPage,
				parameter: { ...productList.ICG_DRAGONBALL_FISHING },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/dragonball.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/dragonball-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/newicon/icg-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/fishing/dragonball.png`,
					providerImg: "icg"
				}
			},
			{
				...productList.ICG_FISHING_OF_SAVIORS,
				className: "ffos",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.icg
					})
				],
				displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
				menuType: defMenuType.entPage,
				parameter: {
					...productList.ICG_FISHING_OF_SAVIORS
				},
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/saviors.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/saviors-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/newicon/icg-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/fishing/saviors.png`,
					providerImg: "icg"
				}
			},
			{
				...productList.ICG_THE_TYRANT_AND_THE_PRINCESS,
				className: "fttatp",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.icg
					})
				],
				displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
				menuType: defMenuType.entPage,
				parameter: {
					...productList.ICG_THE_TYRANT_AND_THE_PRINCESS
				},
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/thetyrant.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/thetyrant-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/newicon/icg-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/fishing/tyrant.png`,
					providerImg: "icg"
				}
			},
			{
				...productList.fishing,
				className: "fgg",
				displayKey: "lbl_FishingGG",
				menuType: defMenuType.entPage,
				parameter: { ...productList.fishing },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/fishingworld.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/fishingworld-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/newicon/gg-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/fishing/fishingworld.png`,
					providerImg: "gg"
				}
			},
			{
				...productList.fishing_SG,
				className: "fsg",
				displayKey: "lbl_FishingSG1",
				menuType: defMenuType.entPage,
				parameter: { ...productList.fishing_SG },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/fishinggod.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/fishinggod-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/newicon/sg-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/fishing/fishinggod.png`,
					providerImg: "sp"
				}
			},
			{
				...productList.fishing_SGW,
				className: "fsgw",
				displayKey: "lbl_FishingSG2",
				menuType: defMenuType.entPage,
				parameter: { ...productList.fishing_SGW },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/fishingwar.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/fishingwar-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/newicon/sg-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/fishing/fishingwar.png`,
					providerImg: "sp"
				}
			}
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
		path: siteInfo({ langId }).affiliateLink,
		displayKey: "lbl_Affiliates",
		target: "_blank",
		isFullPath: true
	}
	// leaderBoard: {
	// 	path: path.leaderBoard.root,
	// 	displayKey: "lbl_Ranking",
	// 	className: "icon icon-live"
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
});
export const defSubListClassName = {
	sports: "sportList",
	casino: "casinoList",
	liveCasino: "livecasinoList",
	games: "gameList",
	fishing: "fishList"
};
