import productList, { defCasinoProviders } from "../../datas/productList";
import path from "../../router";
import { bannerImgUrl } from "../../config";
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
	// cryptoSports: {
	// 	className: "cryptobtn",
	// 	menuType: defMenuType.entPage,
	// 	productInfo: { ...productList.cryptoSports }
	// },
	sports: {
		productInfo: productList.soccer,
		displayKey: "lbl_Sports",
		subMenu: [
			// {
			// 	...productList.cryptoSports,
			// 	displayKey: "lbl_cryptoSports",
			// 	bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/cryptosports.png`,
			// 	npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/cryptosports-item.png`,
			// 	iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/cryptosports-icon.png`,
			// 	parameter: { ...productList.cryptoSports },
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.sports_cryptoSports
			// 		})
			// 	]
			// },
			{
				...productList.sportSaba,
				subPath: path.sports.root,
				className: "sport",
				displayKey: "lbl_Saba_Sport",
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SBSW/sports/soccer.png`,
				parameter: { ...productList.sportSaba }
			},
			{
				...productList.sportSbo,
				subPath: path.sportSbo.root,
				menuType: defMenuType.entPage,
				className: "SBO",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.sportSbo
					})
				],
				displayText: "SBOBET",
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SBO/sports/sbobet.png`,
				parameter: { ...productList.sportSbo },
				afterLogin: true
			},
			{
				...productList.sportBti,
				subPath: path.sportBti.root,
				menuType: defMenuType.entPage,
				className: "BTI",
				displayKey: "lbl_Bti_Sport",
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/BTI/sports/bti-sport.png`,
				parameter: { ...productList.sportBti }
			},
			{
				...productList.sports_IM,
				subPath: path.sportsIM.root,
				menuType: defMenuType.entPage,
				displayText: "IM Sports",
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/IM/sports/im-sports.png`,
				parameter: { ...productList.sports_IM },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				],
				afterLogin: true
			},
			{
				...productList.virtualSports,
				subPath: path.sports.root,
				className: "sport",
				displayKey: "lbl_Virtual_Sports",
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SBSW/sports/virtual-sports.png`,
				parameter: { ...productList.virtualSports },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.sports_virtualSports
					})
				]
			}
		]
	},

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
				...productList.KingMaker,
				displayKey: "lbl_King_Maker",
				menuType: defMenuType.entPage,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/KM/games/king-maker.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/KM/games/king-maker.png`
			},
			{
				...productList["93Connect"],
				displayText: "93Connect",
				menuType: defMenuType.entPage,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/NTConnect/games/93connect.png`,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/NTConnect/games/93connect.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.game_93Connect
					})
				]
			},
			{
				...productList.sabaClub,
				className: "sabaclub",
				displayKey: "lbl_Vgaming",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.sabaClub },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SBSW/games/vgaming.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SBSW/games/vgaming.png`
			},
			// {
			// 	...productList.MaxGame,
			// 	displayText: "Max Game",
			// 	menuType: defMenuType.entPage,
			// 	bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/max.png`,
			// 	npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/max-item.png`,
			// 	iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/newicon/maxgame-icon.png`,
			// 	lobbyPage: {
			// 		bgImg: `${bannerImgUrl}/desktop/img/new-games/max.png`,
			// 		hoverImg: `${bannerImgUrl}/desktop/img/new-games/max-hover.png`
			// 	},
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.game_MaxGame
			// 		})
			// 	]
			// },
			{
				...productList.V8_Poker,
				className: "v8",
				displayKey: "lbl_V8Poker",
				menuType: defMenuType.entPage,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/V8/games/v8-poker.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/V8/games/v8-poker.png`
			},
			{
				...productList.tableGame,
				className: "tablegame",
				displayKey: "lbl_tableGame",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.tableGame },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SBSW/games/table-game.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SBSW/games/table-game.png`
			},
			{
				...productList.IM_Avaitor,
				displayText: "Avaitor",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.IM_Avaitor },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SPRIBE/games/aviator.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SPRIBE/games/aviator.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				]
			},
			{
				...productList.IM_Mines,
				displayText: "Mines",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.IM_Mines },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SPRIBE/games/mines.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SPRIBE/games/mines.png`,

				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				]
			},
			{
				...productList.IM_Goal,
				displayText: "Goal",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.IM_Goal },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SPRIBE/games/goal.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SPRIBE/games/goal.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				]
			},
			{
				...productList.IM_Dice,
				displayText: "Dice",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.IM_Dice },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SPRIBE/games/dice.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SPRIBE/games/dice.png`,

				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				]
			},
			{
				...productList.Spaceman,
				displayText: "Spaceman",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.Spaceman },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/PP/games/spaceman.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/PP/games/spaceman.png`
			},
			{
				...productList.Crash,
				displayText: "Crash",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.Crash },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/AP/games/crash.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/AP/games/crash.png`
			},
			{
				...productList.GoRush,
				displayText: "Go Rush",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.GoRush },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/JILI/games/go-rush.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/JILI/games/go-rush.png`
			}
			// {
			// 	...productList.virtualGame,
			// 	displayKey: "lbl_Virtual_Games",
			// 	menuType: defMenuType.LinkOrBtn,
			// 	parameter: { ...productList.virtualGame },
			// 	bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/vir.png`,
			// 	npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/vir-item.png`,
			// 	iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/newicon/virtualgames-icon.png`,
			// 	lobbyPage: {
			// 		bgImg: `${bannerImgUrl}/desktop/img/new-games/vir.png`,
			// 		hoverImg: `${bannerImgUrl}/desktop/img/new-games/vir-hover.png`
			// 	}
			// }
		]
	},
	eSport: {
		path: path.eSport.root,
		displayKey: "lbl_eSports",
		subMenu: [
			// {
			// 	...productList.eSport_Dota2,
			// 	imgSrc: `${bannerImgUrl}/desktop/img/esports/dota2.png`,
			// 	displayKey: "Dota2",
			// 	menuType: defMenuType.entPage
			// },
			// {
			// 	...productList.eSport_Csgo,
			// 	imgSrc: `${bannerImgUrl}/desktop/img/esports/cs.png`,
			// 	displayKey: "CSGO",
			// 	menuType: defMenuType.entPage
			// },
			{
				...productList.eSport,
				imgSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SBSW/esports/saba.png`,
				displayKey: "lbl_Saba",
				displayText: "Saba",
				menuType: defMenuType.entPage,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SBSW/esports/saba.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SBSW/esports/saba.png`
			},
			{
				...productList.eSport_IM,
				imgSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/IM/esports/im-e-sports.png`,
				displayText: "IM E-Sports",
				menuType: defMenuType.entPage,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/IM/esports/im-e-sports.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/IM/esports/im-e-sports.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				]
			},
			{
				...productList.eSport_TFGaming,
				imgSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/TFG/esports/tfgaming.png`,
				displayKey: "lbl_TFGaming",
				displayText: "TFGaming",
				menuType: defMenuType.entPage,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/TFG/esports/tfgaming.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/TFG/esports/tfgaming.png`
			}
			// {
			// 	...productList.eSport_LeagueOfLegends,
			// 	imgSrc: `${bannerImgUrl}/desktop/img/esports/lol.png`,
			// 	displayKey: "LOL",
			// 	menuType: defMenuType.entPage
			// },
			// {
			// 	...productList.eSport_KingOfGlory,
			// 	imgSrc: `${bannerImgUrl}/desktop/img/esports/king.png`,
			// 	displayKey: "Kog",
			// 	menuType: defMenuType.entPage
			// }
		]
	},
	casino: {
		path: path.casino.root,
		displayKey: "lbl_Slots",
		className: "casinobtn",
		subMenu: [
			{
				...defCasinoProviders.PP,
				className: "PP",
				icon: "icon icon-PP",
				displayText: "Pragmatic Play",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.PP.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/PP/slots/pragmatic-play.png`
			},
			{
				...defCasinoProviders.SG,
				className: "SG",
				icon: "icon icon-SG",
				displayText: "Spadegaming",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.SG.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SG/slots/spadegaming.png`
			},
			{
				...defCasinoProviders.AdvantPlay,
				displayText: "AdvantPlay",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.AdvantPlay.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/AP/slots/advantplay.png`
			},
			{
				...defCasinoProviders.Amigo,
				displayText: "Amigo Gaming",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.Amigo.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/Amigo/slots/amigo-gaming.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.slot_amigo
					})
				]
			},
			{
				...defCasinoProviders.Endorphina,
				displayText: "ES",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.Endorphina.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/ES/slots/es.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.slot_endorphina
					})
				]
			},
			{
				...defCasinoProviders.Nextspin,
				displayText: "Nextspin",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.Nextspin.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/Nextspin/slots/nextspin.png`
			},
			{
				...defCasinoProviders.PG,
				className: "PG",
				icon: "icon icon-PG",
				displayText: "PG Soft",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.PG.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/PG/slots/pg-soft.png`
			},
			{
				...defCasinoProviders.BNG,
				className: "",
				icon: "",
				displayText: "BNG",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.BNG.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/BNG/slots/bng.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.slot_bng
					})
				]
			},
			{
				...defCasinoProviders.FaChai,
				className: "",
				icon: "",
				displayText: "Fa Chai",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.FaChai.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/FaChai/slots/fachai.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.slot_fachai
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
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/MG/slots/microgaming.png`
			},
			{
				...defCasinoProviders.JILI,
				className: "JI",
				displayText: "JILI",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.JILI.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/JILI/slots/jili.png`
			},
			{
				...defCasinoProviders.SPRIBE,
				displayText: "SPRIBE",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.SPRIBE.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SPRIBE/slots/spribe.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				]
			},
			{
				...defCasinoProviders.NoLimitCity,
				displayText: "NoLimit City",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.NoLimitCity.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/NLC/slots/nolimit-city.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.slot_NoLimitCity
					})
				]
			},
			{
				...defCasinoProviders.RedTiger,
				className: "RedTiger",
				displayText: "Red Tiger",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.RedTiger.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/RedTiger/slots/red-tiger.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_RedTiger
					})
				]
			},
			{
				...defCasinoProviders.NetEnt,
				displayText: "NetEnt",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.NetEnt.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/Netent/slots/netent.png`
			},
			{
				...defCasinoProviders.CQ9,
				className: "CQ9",
				icon: "icon icon-cq9",
				displayText: "CQ9",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.CQ9.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/CQ9/slots/cq9.png`
			},
			{
				...defCasinoProviders.PNG,
				className: "PNG",
				icon: "icon icon-png",
				displayText: "Play' n GO",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.PNG.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/PNG/slots/playn-go.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.PNG
					})
				]
			},
			{
				...defCasinoProviders.GPI,
				className: "GPI",
				icon: "icon icon-GPI",
				displayText: "Game Play",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.GPI.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/GPI/slots/game-play.png`
			},
			{
				...defCasinoProviders.YGG,
				className: "YGG",
				icon: "icon icon-YGG",
				displayText: "YGGDrassil",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.YGG.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/YGG/slots/yggdrassil.png`
			},
			{
				...defCasinoProviders.Habanero,
				displayText: "Habanero",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.Habanero.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/HB/slots/habanero.png`
			},
			{
				...defCasinoProviders.SimplePlay,
				displayText: "SimplePlay",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.SimplePlay.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SimplePlay/slots/simpleplay.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_SimplePlay
					})
				]
			},
			{
				...defCasinoProviders.Skywind,
				displayText: "Skywind",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.Skywind.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/Skywind/slots/skywind.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.skywind
					})
				]
			},
			// 新的 PlayTech (Seamless Wallet)
			{
				...defCasinoProviders.PlayTech,
				className: "PT",
				icon: "icon icon-pt",
				displayText: "PlayTech",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.PlayTech.name },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/PT/slots/playtech.png`
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
			// 	icon: "icon icon-icg",
			// 	displayText: "Astro Tech",
			// 	menuType: defMenuType.Link,
			// 	parameter: { provider: defCasinoProviders.AstroTech.name },
			// 	bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/icg.png`,
			// 	npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/icg-item.png`,
			// 	iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/icg-icon.png`
			// },
			// {
			// 	...defCasinoProviders.OW,
			// 	className: "OW",
			// 	icon: "icon icon-OW",
			// 	displayText: "Saba Casino",
			// 	menuType: defMenuType.entPage,
			// 	bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/sabaslot.png`,
			// 	npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/sabaslot-item.png`,
			// 	iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/sabaslot-icon.png`
			// }
		]
	},
	liveCasino: {
		displayKey: "lbl_LiveCasino",
		className: "livecasinobtn",
		path: path.liveCasino.root,
		subMenu: [
			{
				...productList.liveCasino_PP,
				className: "livePP",
				icon: "icon icon-PP",
				listNpcImgUrl: "pp.png",
				displayText: "Pragmatic Play",
				menuType: defMenuType.entPage,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/PP/casino/pragmatic-play.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/PP/casino/pragmatic-play.png`
			},
			{
				...productList.liveCasino_Won,
				className: "liveWoncasino",
				icon: "icon icon-Woncasino",
				listNpcImgUrl: "woncasino.png",
				displayText: "Won Casino",
				menuType: defMenuType.entPage,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/WonCasino/casino/woncasino.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/WonCasino/casino/woncasino.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.liveCasino_won
					})
				]
			},
			{
				...productList.liveCasino_BG,
				className: "liveBG",
				icon: "icon icon-BG",
				listNpcImgUrl: "bg.png",
				displayText: "Big Gaming",
				menuType: defMenuType.entPage,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/BG/casino/big-gaming.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/BG/casino/big-gaming.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.liveCasino_BG
					})
				]
			},
			{
				...productList.liveCasino_YeeBet,
				className: "liveYB",
				icon: "",
				listNpcImgUrl: "yb.png",
				displayText: "YEEBET",
				menuType: defMenuType.entPage,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/Yeebet/casino/yeebet-casino.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/Yeebet/casino/yeebet-casino.png`,

				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.yee_bet
					})
				]
			},
			{
				...productList.liveCasino_Skywind,
				listNpcImgUrl: "sk.png",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.skywind
					})
				],
				displayText: "Skywind",
				menuType: defMenuType.entPage,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/Skywind/casino/skywind.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/Skywind/casino/skywind.png`
			},
			{
				...productList.liveCasino_MG,
				className: "MG",
				icon: "icon icon-mg",
				listNpcImgUrl: "mg.png",
				displayText: "Microgaming",
				menuType: defMenuType.entPage,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/MG/casino/microgaming.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/MG/casino/microgaming.png`
			},
			{
				...productList.liveCasino_EVO,
				className: "evolution",
				listNpcImgUrl: "evolution.png",
				displayText: "Evolution Gaming",
				menuType: defMenuType.entPage,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/EVO/casino/evolution-gaming.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/EVO/casino/evolution-gaming.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.liveCasino_evo
					})
				]
			},
			// 新的 PlayTech (Seamless Wallet)
			{
				...productList.liveCasino_PlayTech,
				className: "PT",
				icon: "icon icon-pt",
				displayText: "PlayTech",
				disabledInSlider: true,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/PlayTech/casino/playtech.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/PlayTech/casino/playtech.png`
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
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/WM/casino/wm-casino.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/WM/casino/wm-casino.png`
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
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/DG/casino/dream-gaming.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/DG/casino/dream-gaming.png`
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
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/Allbet/casino/allbet.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/Allbet/casino/allbet.png`
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
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/AG/casino/asia-gaming.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/AG/casino/asia-gaming.png`
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
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SA/casino/sa-gaming.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SA/casino/sa-gaming.png`
			},
			{
				...productList.liveCasino_AE,
				gameId: 15,
				tpId: 15,
				className: "liveAE",
				icon: "icon icon-AE",
				listNpcImgUrl: "ae.png",
				displayText: "AE Sexy",
				menuType: defMenuType.entPage,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/Sexy/casino/ae-sexy.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/Sexy/casino/ae-sexy.png`
			},
			{
				...productList.liveCasino_eBET,
				gameId: 18,
				tpId: 18,
				className: "liveEB",
				icon: "icon icon-EB",
				listNpcImgUrl: "we.png",
				displayText: "WE",
				menuType: defMenuType.entPage,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/WE/casino/we.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/WE/casino/we.png`
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
				className: "fsg",
				displayKey: "lbl_FishingSG1",
				menuType: defMenuType.entPage,
				parameter: { ...productList.fishing_SG },
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SG/fishing/fishing-god.png`,
					providerImg: "sp"
				},
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SG/fishing/fishing-god.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SG/fishing/fishing-god.png`
			},
			{
				...productList.fishing_SGW,
				className: "fsgw",
				displayKey: "lbl_FishingSG2",
				menuType: defMenuType.entPage,
				parameter: { ...productList.fishing_SGW },
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SG/fishing/fishing-war.png`,
					providerImg: "sp"
				},
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SG/fishing/fishing-war.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SG/fishing/fishing-war.png`
			},
			{
				...productList.fishing_Zombie_Party,
				className: "fsgw",
				displayKey: "lbl_Fishing_Zombie_Party",
				menuType: defMenuType.entPage,
				parameter: { ...productList.fishing_Zombie_Party },
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SG/fishing/zombie-party.png`,
					providerImg: "sp"
				},
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SG/fishing/zombie-party.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SG/fishing/zombie-party.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.fishing_Zombie_Party
					})
				]
			},
			{
				...productList.fishing_Alien_Hunter,
				className: "fsgw",
				displayKey: "lbl_Fishing_Alien_Hunter",
				menuType: defMenuType.entPage,
				parameter: { ...productList.fishing_Alien_Hunter },
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SG/fishing/alien-hunter.png`,
					providerImg: "sp"
				},
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SG/fishing/alien-hunter.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SG/fishing/alien-hunter.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.fishing_Alien_Hunter
					})
				]
			},
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
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/CQ9/fishing/paradise.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/CQ9/fishing/paradise.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/CQ9/fishing/paradise.png`,
					providerImg: "cq9"
				}
			},
			{
				...productList.CQ9_Oneshot_Fishing,
				className: "oneshotfishing",
				displayKey: "lbl_Oneshot_Fishing",
				menuType: defMenuType.entPage,
				parameter: { ...productList.CQ9_Oneshot_Fishing },
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/CQ9/fishing/oneshot-fishing.png`,
					providerImg: "cq9"
				},
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/CQ9/fishing/oneshot-fishing.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/CQ9/fishing/oneshot-fishing.png`
			}
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
			// {
			// 	...productList.Skywind_Ocean_Ruler,
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.skywind
			// 		})
			// 	],
			// 	displayKey: "Skywind_Ocean_Ruler",
			// 	menuType: defMenuType.entPage,
			// 	parameter: { ...productList.Skywind_Ocean_Ruler },
			// 	bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/or.png`,
			// 	npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/or-item.png`,
			// 	iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/newicon/sk-icon.png`,
			// 	lobbyPage: {
			// 		bgImg: `${bannerImgUrl}/desktop/img/fishing/oceanruler.png`,
			// 		providerImg: "sk"
			// 	}
			// },
			// {
			// 	...productList.Skywind_Cai_Shen_Da_Hai,
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.skywind
			// 		})
			// 	],
			// 	displayKey: "Skywind_Cai_Shen_Da_Hai",
			// 	menuType: defMenuType.entPage,
			// 	parameter: { ...productList.Skywind_Cai_Shen_Da_Hai },
			// 	bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/casdaha.png`,
			// 	npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/casdaha-item.png`,
			// 	iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/newicon/sk-icon.png`,
			// 	lobbyPage: {
			// 		bgImg: `${bannerImgUrl}/desktop/img/fishing/caishendahai.png`,
			// 		providerImg: "sk"
			// 	}
			// },
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
			// {
			// 	...productList.ICG_DRAGONBALL_FISHING,
			// 	className: "fdb",
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.icg
			// 		})
			// 	],
			// 	displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
			// 	menuType: defMenuType.entPage,
			// 	parameter: { ...productList.ICG_DRAGONBALL_FISHING },
			// 	bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/dragonball.png`,
			// 	npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/dragonball-item.png`,
			// 	iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/newicon/icg-icon.png`,
			// 	lobbyPage: {
			// 		bgImg: `${bannerImgUrl}/desktop/img/fishing/dragonball.png`,
			// 		providerImg: "icg"
			// 	}
			// },
			// {
			// 	...productList.ICG_FISHING_OF_SAVIORS,
			// 	className: "ffos",
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.icg
			// 		})
			// 	],
			// 	displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
			// 	menuType: defMenuType.entPage,
			// 	parameter: {
			// 		...productList.ICG_FISHING_OF_SAVIORS
			// 	},
			// 	bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/saviors.png`,
			// 	npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/saviors-item.png`,
			// 	iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/newicon/icg-icon.png`,
			// 	lobbyPage: {
			// 		bgImg: `${bannerImgUrl}/desktop/img/fishing/saviors.png`,
			// 		providerImg: "icg"
			// 	}
			// },
			// {
			// 	...productList.ICG_THE_TYRANT_AND_THE_PRINCESS,
			// 	className: "fttatp",
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
			// 	bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/thetyrant.png`,
			// 	npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/thetyrant-item.png`,
			// 	iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/newicon/icg-icon.png`,
			// 	lobbyPage: {
			// 		bgImg: `${bannerImgUrl}/desktop/img/fishing/tyrant.png`,
			// 		providerImg: "icg"
			// 	}
			// },
		]
	},
	lottery: {
		displayKey: "lbl_Lottery",
		path: path.lottery.root,
		className: "lottery",
		subMenu: [
			{
				...productList.GPI_VNLottery,
				displayKey: "GPI_VNLottery",
				menuType: defMenuType.entPage,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/GPI/lottery/vn-lottery.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/GPI/lottery/vn-lottery.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.GPI_Lottery
					})
				]
			},
			{
				...productList.tcg,
				displayKey: "lbl_TcGame",
				menuType: defMenuType.entPage,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/TCG/lottery/tc-gaming.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/TCG/lottery/tc-gaming.png`
			},
			{
				...productList.keno,
				className: "keno",
				displayKey: "lbl_Keno",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.keno },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SBSW/lottery/keno.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SBSW/lottery/keno.png`
			},
			{
				...productList.lottery,
				className: "lottery",
				displayKey: "lbl_Lottery",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.lottery },
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/SBSW/lottery/lottery.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/SBSW/lottery/lottery.png`
			}
		]
	},
	cockFighting: {
		displayKey: "lbl_CockFighting",
		path: path.cockFighting.root,
		subMenu: [
			{
				...productList.GA_CockFighting,
				displayText: "GA Cock Fighting",
				menuType: defMenuType.entPage,
				submenuItemSrc: `${bannerImgUrl}/desktop/img/home-page/Header/GA/cockfighting/cockfighting.png`,
				lobbyItemSrc: `${bannerImgUrl}/desktop/img/home-page/LobbyHeader/GA/cockfighting/cockfighting.png`,

				// * 設計稿尚未提供 Logo
				// iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/cockfighting-icon.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.GA_CockFighting
					})
				]
			},
			{
				...productList.WCC_CockFighting,
				displayText: "WCC Cockfighting",
				menuType: defMenuType.entPage,
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/cockfighting/wcc-cockfighting.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/cockfighting/wcc-cockfighting-item.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/cockfighting/wcc-cockfighting.png`,
					hoverImg: `${bannerImgUrl}/desktop/img/cockfighting/wcc-cockfighting-hover.png`
				},
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.WCC_CockFighting
					})
				]
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

	// affiliate: {
	// 	path: siteInfo({ langId }).affiliateLink,
	// 	displayKey: "lbl_Affiliates",
	// 	target: "_blank",
	// 	isFullPath: true
	// },
	ambassador: {
		path: path.ambassador.root,
		displayKey: "lbl_Ambassador"
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
	fishing: "fishList",
	lottery: "lotteryList",
	cockFighting: "cockList",
	eSport: "esportList"
};
