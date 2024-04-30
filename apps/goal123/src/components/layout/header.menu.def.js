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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/saba.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/saba-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/sabas-icon.png`,
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/sbo.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/sbo-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/sbo-icon.png`,
				parameter: { ...productList.sportSbo },
				afterLogin: true
			},
			{
				...productList.sportBti,
				subPath: path.sportBti.root,
				menuType: defMenuType.entPage,
				className: "BTI",
				displayKey: "lbl_Bti_Sport",
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/bti.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/bti-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/bti-icon.png`,
				parameter: { ...productList.sportBti }
			},
			{
				...productList.sports_IM,
				subPath: path.sportsIM.root,
				menuType: defMenuType.entPage,
				displayText: "IM Sports",
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/inplaymatrix.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/inplaymatrix-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/sports/inplaymatrix-icon.png`,
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/king.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/king-item.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/new-games/king.png`,
					hoverImg: `${bannerImgUrl}/desktop/img/new-games/king-hover.png`
				},
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/newicon/kingmaker-icon.png`
			},
			{
				...productList["93Connect"],
				displayText: "93Connect",
				menuType: defMenuType.entPage,
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/93connect.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/93connect-item.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/new-games/93connect.png`,
					hoverImg: `${bannerImgUrl}/desktop/img/new-games/93connect-hover.png`
				},
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/newicon/93connect-icon.png`,
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/vga.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/vga-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/newicon/vg-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/new-games/vga.png`,
					hoverImg: `${bannerImgUrl}/desktop/img/new-games/vga-hover.png`
				}
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/v8.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/v8-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/newicon/v8poker-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/new-games/v8.png`,
					hoverImg: `${bannerImgUrl}/desktop/img/new-games/v8-hover.png`
				}
			},
			{
				...productList.tableGame,
				className: "tablegame",
				displayKey: "lbl_tableGame",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.tableGame },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/table.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/table-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/newicon/tablegame-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/new-games/table.png`,
					hoverImg: `${bannerImgUrl}/desktop/img/new-games/table-hover.png`
				}
			},
			{
				...productList.IM_Avaitor,
				displayText: "Avaitor",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.IM_Avaitor },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/spribeAviator.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/spribeAviator-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/newicon/spribe-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/new-games/spribeAviator.png`,
					hoverImg: `${bannerImgUrl}/desktop/img/new-games/spribeAviator-hover.png`
				},
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/spribeMines.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/spribeMines-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/newicon/spribe-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/new-games/spribeMines.png`,
					hoverImg: `${bannerImgUrl}/desktop/img/new-games/spribeMines-hover.png`
				},
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/spribeGoal.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/spribeGoal-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/newicon/spribe-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/new-games/spribeGoal.png`,
					hoverImg: `${bannerImgUrl}/desktop/img/new-games/spribeGoal-hover.png`
				},
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/spribeDice.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/spribeDice-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/newicon/spribe-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/new-games/spribeDice.png`,
					hoverImg: `${bannerImgUrl}/desktop/img/new-games/spribeDice-hover.png`
				},
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/pp.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/pp-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/newicon/pp-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/new-games/pp.png`,
					hoverImg: `${bannerImgUrl}/desktop/img/new-games/pp-hover.png`
				}
			},
			{
				...productList.Crash,
				displayText: "Crash",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.Crash },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/ap.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/ap-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/newicon/ap-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/new-games/ap.png`,
					hoverImg: `${bannerImgUrl}/desktop/img/new-games/ap-hover.png`
				}
			},
			{
				...productList.GoRush,
				displayText: "Go Rush",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.GoRush },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/jili.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/jili-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/new-games/newicon/jili-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/new-games/jili.png`,
					hoverImg: `${bannerImgUrl}/desktop/img/new-games/jili-hover.png`
				}
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
				imgSrc: `${bannerImgUrl}/desktop/img/esports/saba.png`,
				displayKey: "lbl_Saba",
				displayText: "Saba",
				menuType: defMenuType.entPage,
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/esport/saba.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/esport/saba-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/esport/saba-icon.png`
			},
			{
				...productList.eSport_IM,
				imgSrc: `${bannerImgUrl}/desktop/img/esports/inplaymatrix.png`,
				displayText: "IM E-Sports",
				menuType: defMenuType.entPage,
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/esport/inplaymatrix.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/esport/inplaymatrix-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/esport/inplaymatrix-icon.png`,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				]
			},
			{
				...productList.eSport_TFGaming,
				imgSrc: `${bannerImgUrl}/desktop/img/esports/tfg.png`,
				displayKey: "lbl_TFGaming",
				displayText: "TFGaming",
				menuType: defMenuType.entPage,
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/esport/tfg.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/esport/tfg-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/esport/tfg-icon.png`
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/pp.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/pp-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/pp-icon.png`
			},
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
				...defCasinoProviders.AdvantPlay,
				displayText: "AdvantPlay",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.AdvantPlay.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/apnew.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/apnew-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/ap-icon.png`
			},
			{
				...defCasinoProviders.Amigo,
				displayText: "Amigo Gaming",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.Amigo.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/amigo.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/amigo-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/amigo-icon.png`,
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/es.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/es-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/es-icon.png`,
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/nextspin.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/nextspin-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/nextspin-icon.png`
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
				...defCasinoProviders.BNG,
				className: "",
				icon: "",
				displayText: "BNG",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.BNG.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/bng.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/bng-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/bng-icon.png`,
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/fachai.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/fachai-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/fachai-icon.png`,
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/mg.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/mg-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/mg-icon.png`
			},
			{
				...defCasinoProviders.JILI,
				className: "JI",
				displayText: "JILI",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.JILI.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/jili.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/jili-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/jili-icon.png`
			},
			{
				...defCasinoProviders.SPRIBE,
				displayText: "SPRIBE",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.SPRIBE.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/spribe.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/spribe-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/spribe-icon.png`,
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/nlc.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/nlc-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/nlc-icon.png`,
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
				...defCasinoProviders.NetEnt,
				displayText: "NetEnt",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.NetEnt.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/ne.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/ne-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/ne-icon.png`
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
				...defCasinoProviders.PNG,
				className: "PNG",
				icon: "icon icon-png",
				displayText: "Play' n GO",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.PNG.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/playngo.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/playngo-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/playngo-icon.png`,
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
			{
				...defCasinoProviders.Habanero,
				displayText: "Habanero",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.Habanero.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/habanero.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/habanero-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/habanero-icon.png`
			},
			{
				...defCasinoProviders.SimplePlay,
				displayText: "SimplePlay",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.SimplePlay.name },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/simpleplay.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/simpleplay-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/simpleplay-icon.png`,
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/skywind.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/sk-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/sk-icon.png`,
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/playtech.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/playtech-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/slots/newicon/playtech-icon.png`
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
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/pp.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/pp-icon.png`,
				lobbyImg: "pp"
			},
			{
				...productList.liveCasino_BG,
				className: "liveBG",
				icon: "icon icon-BG",
				listNpcImgUrl: "bg.png",
				displayText: "Big Gaming",
				menuType: defMenuType.entPage,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/bg.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/bg-icon.png`,
				lobbyImg: "bg",
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
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/yb.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/yb-icon.png`,
				lobbyImg: "yb",
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
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/sk.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/sk-icon.png`,
				lobbyImg: "sk"
			},
			{
				...productList.liveCasino_MG,
				className: "MG",
				icon: "icon icon-mg",
				listNpcImgUrl: "mg.png",
				displayText: "Microgaming",
				menuType: defMenuType.entPage,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/mg.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/mg-icon.png`,
				lobbyImg: "mg"
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
			// 新的 PlayTech (Seamless Wallet)
			{
				...productList.liveCasino_PlayTech,
				className: "PT",
				icon: "icon icon-pt",
				displayText: "PlayTech",
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/playtech.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/playtech-icon.png`,
				disabledInSlider: true,
				lobbyImg: "pt"
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
				displayText: "AE Sexy",
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
				listNpcImgUrl: "we.png",
				displayText: "WE",
				menuType: defMenuType.entPage,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/we.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/livecasino/newicon/we-icon.png`,
				lobbyImg: "we"
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
			},
			{
				...productList.fishing_Zombie_Party,
				className: "fsgw",
				displayKey: "lbl_Fishing_Zombie_Party",
				menuType: defMenuType.entPage,
				parameter: { ...productList.fishing_Zombie_Party },
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/zombieparty.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/zombieparty-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/newicon/sg-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/fishing/zombieparty.png`,
					providerImg: "sp"
				},
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/alienhunter.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/alienhunter-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/newicon/sg-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/fishing/alienhunter.png`,
					providerImg: "sp"
				},
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/paradise.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/paradise-item.png`,
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/fishing/newicon/cq9-icon.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/fishing/paradise.png`,
					providerImg: "cq9"
				}
			},
			{
				...productList.CQ9_Oneshot_Fishing,
				className: "oneshotfishing",
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/lottery/vn.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/lottery/vn-item.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/lottery/vnlottery.png`
				},
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/lottery/newicon/vn-icon.png`,
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/tcg.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/tcg-item.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/games/tcg.png`
				},
				iconImgUrl: `${bannerImgUrl}/desktop/img/dropdown/games/newicon/tcg-icon.png`
			},
			{
				...productList.keno,
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/cockfighting/cockfighting.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/cockfighting/cockfighting-item.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/cockfighting/cockfighting.png`,
					hoverImg: `${bannerImgUrl}/desktop/img/cockfighting/cockfighting-hover.png`
				},
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
				bgImgUrl: `${bannerImgUrl}/desktop/img/dropdown/cockfighting/wcc.png`,
				npcImgUrl: `${bannerImgUrl}/desktop/img/dropdown/cockfighting/wcc-item.png`,
				lobbyPage: {
					bgImg: `${bannerImgUrl}/desktop/img/cockfighting/wcc.png`,
					hoverImg: `${bannerImgUrl}/desktop/img/cockfighting/wcc-hover.png`
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
