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
	sports: {
		productInfo: productList.soccer,
		// path: path.sports.root,
		displayKey: "lbl_Sports",
		subMenu: [
			{
				...productList.sportSaba,
				subPath: path.sports.root,
				className: "sabaSport",
				displayKey: "lbl_Saba_Sport",
				parameter: { ...productList.sportSaba }
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
				displayText: "SBOBET",
				parameter: { ...productList.sportSbo },
				afterLogin: true
			},
			{
				...productList.sportBti,
				subPath: path.sportBti.root,
				className: "btiSport",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.sportBti
					})
				],
				displayKey: "lbl_Bti_Sport",
				parameter: { ...productList.sportBti }
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
				]
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
		className: "game icon",
		subDivClass1: "ballR1",
		subDivClass2: "ballR1 ballG1",
		subMenu: [
			{
				...productList.tcg,
				className: "tcg",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.lottery_tcg
					})
				],
				displayKey: "lbl_TcGame",
				menuType: defMenuType.entPage,
				lobbyPage: { bgClass: "tcg" }
			},
			{
				...productList.KingMaker,
				className: "kingmaker",
				displayKey: "lbl_King_Maker",
				menuType: defMenuType.entPage,
				lobbyPage: { bgClass: "kingmaker" }
			},
			{
				...productList.One789_lottery,
				path: path.sports.root,
				className: "traditional",
				displayKey: "lbl_TraditionalLottery",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.One789_lottery },
				lobbyPage: { bgClass: "traditional" }
			},
			// {
			// 	...productList.One789_lottery_789,
			// 	path: path.sports.root,
			// 	className: "one789",
			// 	displayKey: "lbl_789Lottery",
			// 	menuType: defMenuType.LinkOrBtn,
			// 	parameter: { ...productList.One789_lottery_789 },
			// 	lobbyPage: { bgClass: "lottery789" }
			// },
			{
				...productList.sabaClub,
				path: path.sports.root,
				className: "sabaclub",
				displayKey: "lbl_Vgaming",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.sabaClub },
				lobbyPage: { bgClass: "sabaClub" }
			},
			{
				...productList.MaxGame,
				className: "maxgame",
				displayText: "Max Game",
				menuType: defMenuType.entPage,
				lobbyPage: { bgClass: "maxgame" },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.game_MaxGame
					})
				]
			},
			{
				...productList.V8_Poker,
				className: "v8",
				displayKey: "lbl_V8Poker",
				menuType: defMenuType.entPage,
				lobbyPage: { bgClass: "v8pork" }
			},
			{
				...productList.keno,
				path: path.sports.root,
				className: "keno",
				displayKey: "lbl_Keno",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.keno },
				lobbyPage: { bgClass: "keno" }
			},
			{
				...productList.lottery,
				path: path.sports.root,
				className: "lottery",
				displayKey: "lbl_Lottery",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.lottery },
				lobbyPage: { bgClass: "lottery" }
			},
			{
				...productList.tableGame,
				path: path.sports.root,
				className: "tablegame",
				displayKey: "lbl_tableGame",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.tableGame },
				lobbyPage: { bgClass: "tablegame" }
			},
			{
				...productList.virtualGame,
				path: path.sports.root,
				className: "virtual",
				displayKey: "lbl_Virtual_Games",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.virtualGame },
				lobbyPage: { bgClass: "virtualgames" }
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
				_class: "dota",
				displayKey: "Dota2",
				menuType: defMenuType.entPage
			},
			{
				...productList.eSport_Csgo,
				_class: "cso",
				displayKey: "CSGO",
				menuType: defMenuType.entPage
			},
			{
				...productList.eSport,
				_class: "all",
				displayKey: "All",
				menuType: defMenuType.entPage
			},
			{
				...productList.eSport_LeagueOfLegends,
				_class: "lol",
				displayKey: "LOL",
				menuType: defMenuType.entPage
			},
			{
				...productList.eSport_KingOfGlory,
				_class: "king",
				displayKey: "Kog",
				menuType: defMenuType.entPage
			}
		]
	},
	casino: {
		path: path.casino.root,
		displayKey: "lbl_Slots",
		className: "casinobtn",
		subDivClass1: "light light-slot",
		subMenu: [
			{
				...defCasinoProviders.AdvantPlay,
				className: "AP",
				displayText: "AdvantPlay",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.AdvantPlay.name },
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
				parameter: { provider: defCasinoProviders.PP.name }
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
				]
			},
			{
				...defCasinoProviders.Habanero,
				className: "HO",
				displayText: "Habanero",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.Habanero.name }
			},
			{
				...defCasinoProviders.NetEnt,
				className: "NE",
				displayText: "NetEnt",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.NetEnt.name }
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
				]
			},
			{
				...defCasinoProviders.MGPSW,
				className: "MG",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.mgpsw
					})
				],
				icon: "icon icon-mg",
				displayText: "Microgaming",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.MGPSW.name }
			},
			{
				...defCasinoProviders.JILI,
				className: "JILI",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_ji
					})
				],
				icon: "icon icon-jili",
				displayText: "JILI",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.JILI.name }
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
				displayText: "PlayTech",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.PT.name }
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
				icon: "icon icon-ICG",
				displayText: "Astro Tech",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.AstroTech.name }
			},
			{
				...defCasinoProviders.CQ9,
				className: "CQ9",
				// isNew: true,
				icon: "icon icon-cq9",
				displayText: "CQ9",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.CQ9.name }
			},
			{
				...defCasinoProviders.GPI,
				className: "GPI",
				icon: "icon icon-GPI",
				displayText: "Game Play",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.GPI.name }
			},
			{
				...defCasinoProviders.YGG,
				className: "YGG",
				icon: "icon icon-YGG",
				displayText: "YGGDrassil",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.YGG.name }
			},
			{
				...defCasinoProviders.SG,
				className: "SG",
				icon: "icon icon-SG",
				displayText: "Spadegaming",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.SG.name }
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
				]
			},
			{
				...defCasinoProviders.PG,
				className: "PG",
				icon: "icon icon-PG",
				displayText: "PG Soft",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.PG.name }
			},
			{
				...defCasinoProviders.OW,
				className: "OW",
				icon: "icon icon-OW",
				displayText: "Saba Casino",
				menuType: defMenuType.entPage
			}
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
				icon: "icon icon-PP",
				displayText: "Pragmatic Play",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-pp"
				}
			},
			{
				...productList.liveCasino_Skywind,
				className: "liveSK",
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
				}
			},
			{
				...productList.liveCasino_MG,
				className: "liveMG",
				icon: "icon icon-mg",
				displayText: "Microgaming",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-mg"
				}
			},
			{
				...productList.liveCasino_EVO,
				className: "liveEvo",
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
				}
			},
			{
				...productList.liveCasino_PT,
				className: "livePT",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.liveCasino_pt
					})
				],
				icon: "icon icon-pt",
				displayText: "Playtech",
				menuType: defMenuType.useGoToGame,
				lobbyPage: {
					bgClass: "live-pt"
				}
			},
			{
				...productList.liveCasino_n2live,
				className: "liven2live",
				icon: "icon icon-N2LIVE",
				displayText: "n2-LIVE",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-n2"
				}
			},
			{
				...productList.liveCasino_One789,
				className: "live789",
				icon: "icon icon-one789",
				displayKey: "lbl_liveCasino_789SeDie",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-789"
				}
			},
			{
				gameId: 20,
				tpId: 20,
				className: "liveWM",
				icon: "icon icon-WM",
				displayText: "WM Casino",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-wm"
				},
				tpGameType: 32
			},
			{
				gameId: 4,
				tpId: 4,
				className: "liveDG",
				icon: "icon icon-DG",
				displayText: "Dream Gaming",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-dg"
				},
				tpGameType: 10
			},
			{
				gameId: 12,
				tpId: 12,
				className: "liveALL",
				icon: "icon icon-AB",
				displayText: "Allbet",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-ab"
				},
				tpGameType: 6
			},
			{
				gameId: 3,
				tpId: 3,
				className: "liveAG",
				icon: "icon icon-AG",
				displayText: "Asia Gaming",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-ag"
				},
				tpGameType: 8
			},
			{
				gameId: 2,
				tpId: 2,
				className: "liveSA",
				icon: "icon icon-SA",
				displayText: "SA Gaming",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-sa"
				},
				tpGameType: 9
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
				tpGameType: 18
			},
			{
				gameId: 18,
				tpId: 18,
				className: "liveEB",
				icon: "icon icon-EB",
				displayText: "eBET",
				menuType: defMenuType.entPage,
				lobbyPage: {
					bgClass: "live-ebet"
				},
				tpGameType: 28
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
				className: "fs-paradise",
				displayKey: "lbl_Paradise",
				menuType: defMenuType.entPage,
				parameter: { ...productList.CQ9_Paradise },
				lobbyPage: {
					bgClass: "fish-paradise"
				}
			},
			{
				...productList.CQ9_Oneshot_Fishing,
				className: "fs-Oneshot",
				displayKey: "lbl_Oneshot_Fishing",
				menuType: defMenuType.entPage,
				parameter: { ...productList.CQ9_Oneshot_Fishing },
				lobbyPage: {
					bgClass: "fish-of"
				}
			},
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
			{
				...productList.ICG_DRAGONBALL_FISHING,
				className: "fs-db",
				displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
				menuType: defMenuType.entPage,
				parameter: { ...productList.ICG_DRAGONBALL_FISHING },
				lobbyPage: {
					bgClass: "fish-db"
				}
			},
			{
				...productList.ICG_FISHING_OF_SAVIORS,
				className: "fs-fos",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.icg
					})
				],
				displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
				menuType: defMenuType.entPage,
				parameter: { ...productList.ICG_FISHING_OF_SAVIORS },
				lobbyPage: {
					bgClass: "fish-saviors"
				}
			},
			{
				...productList.ICG_THE_TYRANT_AND_THE_PRINCESS,
				className: "fs-ttatp",
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
				lobbyPage: {
					bgClass: "fish-ttsatp"
				}
			},
			{
				...productList.fishing,
				className: "fs-world",
				displayKey: "lbl_FishingGG",
				menuType: defMenuType.entPage,
				parameter: { ...productList.fishing },
				lobbyPage: {
					bgClass: "fish-world"
				}
			},
			{
				...productList.fishing_SG,
				className: "fs-god",
				displayKey: "lbl_FishingSG1",
				menuType: defMenuType.entPage,
				parameter: { ...productList.fishing_SG },
				lobbyPage: {
					bgClass: "fish-god"
				}
			},
			{
				...productList.fishing_SGW,
				className: "fs-war",
				displayKey: "lbl_FishingSG2",
				menuType: defMenuType.entPage,
				parameter: { ...productList.fishing_SGW },
				lobbyPage: {
					bgClass: "fish-wrd"
				}
			}
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
	sports: "sportsList",
	casino: "casinoList",
	liveCasino: "livecasinoList",
	games: "gameList",
	fishing: "fishList"
};
