import productList, { defCasinoProviders } from "../../datas/productList";
import path from "../../router";
import { siteInfo } from "../../config";
import {
	defEventIcon,
	defEventPeriod,
	showEventIcon
} from "../common/eventIcon";

import cq9IconImg from "../../styles/img/dropdown/fishing/cq9-icon.png";
import icgIconImg from "../../styles/img/dropdown/fishing/icg-icon.png";
import ggIconImg from "../../styles/img/dropdown/fishing/gg-icon.png";
import sgIconImg from "../../styles/img/dropdown/fishing/sg-icon.png";

import gamesSabaclubBgImg from "../../styles/img/dropdown/games/sabaclub.png";
import gamesSabaclubNpcImg from "../../styles/img/dropdown/games/sabaclub-item.png";
import gamesV8pokerBgImg from "../../styles/img/dropdown/games/v8poker.png";
import gamesV8pokerNpcImg from "../../styles/img/dropdown/games/v8poker-item.png";
import gamesKenoBgImg from "../../styles/img/dropdown/games/keno.png";
import gamesKenoNpcImg from "../../styles/img/dropdown/games/keno-item.png";
import gamesLotteryBgImg from "../../styles/img/dropdown/games/lottery.png";
import gamesLotteryNpcImg from "../../styles/img/dropdown/games/lottery-item.png";

import livecasinoN2liveNpcImg from "../../styles/img/livecasino/n2live.png";
import livecasinoN2liveIconImg from "../../styles/img/livecasino/n2live-icon.png";
import livecasinoWmNpcImg from "../../styles/img/livecasino/wm.png";
import livecasinoWmIconImg from "../../styles/img/livecasino/wm-icon.png";
import livecasinoDgNpcImg from "../../styles/img/livecasino/dg.png";
import livecasinoDgIconImg from "../../styles/img/livecasino/dg-icon.png";
import livecasinoAllbetNpcImg from "../../styles/img/livecasino/allbet.png";
import livecasinoAllbetIconImg from "../../styles/img/livecasino/allbet-icon.png";
import livecasinoAgNpcImg from "../../styles/img/livecasino/ag.png";
import livecasinoAgIconImg from "../../styles/img/livecasino/ag-icon.png";
import livecasinoPpNpcImg from "../../styles/img/livecasino/pp.png";
import livecasinoPpIconImg from "../../styles/img/livecasino/pp-icon.png";
import livecasinoSaNpcImg from "../../styles/img/livecasino/sa.png";
import livecasinoSaIconImg from "../../styles/img/livecasino/sa-icon.png";
import livecasinoAeNpcImg from "../../styles/img/livecasino/ae.png";
import livecasinoAeIconImg from "../../styles/img/livecasino/ae-icon.png";
import livecasinoEbetNpcImg from "../../styles/img/livecasino/ebet.png";
import livecasinoEbetIconImg from "../../styles/img/livecasino/ebet-icon.png";

import slotsPlaytechBgImg from "../../styles/img/dropdown/slots/playtech.png";
import slotsPlaytechNpcImg from "../../styles/img/dropdown/slots/playtech-item.png";
import slotsPlaytechIconImg from "../../styles/img/dropdown/slots/playtech-icon.png";

import slotsIcgBgImg from "../../styles/img/dropdown/slots/icg.png";
import slotsIcgNpcImg from "../../styles/img/dropdown/slots/icg-item.png";
import slotsIcgIconImg from "../../styles/img/dropdown/slots/icg-icon.png";

import slotsCq9BgImg from "../../styles/img/dropdown/slots/cq9.png";
import slotsCq9NpcImg from "../../styles/img/dropdown/slots/cq9-item.png";
import slotsCq9IconImg from "../../styles/img/dropdown/slots/cq9-icon.png";

import slotsGpiBgImg from "../../styles/img/dropdown/slots/gpi.png";
import slotsGpiNpcImg from "../../styles/img/dropdown/slots/gpi-item.png";
import slotsGpiIconImg from "../../styles/img/dropdown/slots/gpi-icon.png";

import slotsYggBgImg from "../../styles/img/dropdown/slots/ygg.png";
import slotsYggNpcImg from "../../styles/img/dropdown/slots/ygg-item.png";
import slotsYggIconImg from "../../styles/img/dropdown/slots/ygg-icon.png";

import slotsSgBgImg from "../../styles/img/dropdown/slots/sg.png";
import slotsSgNpcImg from "../../styles/img/dropdown/slots/sg-item.png";
import slotsSgIconImg from "../../styles/img/dropdown/slots/sg-icon.png";

import slotsPpBgImg from "../../styles/img/dropdown/slots/pp.png";
import slotsPpNpcImg from "../../styles/img/dropdown/slots/pp-item.png";
import slotsPpIconImg from "../../styles/img/dropdown/slots/pp-icon.png";

import slotsPgBgImg from "../../styles/img/dropdown/slots/pg.png";
import slotsPgNpcImg from "../../styles/img/dropdown/slots/pg-item.png";
import slotsPgIconImg from "../../styles/img/dropdown/slots/pg-icon.png";

import slotsOwBgImg from "../../styles/img/dropdown/slots/ow.png";
import slotsOwNpcImg from "../../styles/img/dropdown/slots/ow-item.png";
import slotsOwIconImg from "../../styles/img/dropdown/slots/ow-icon.png";

import fishingParadiseBgImg from "../../styles/img/dropdown/fishing/paradise.png";
import fishingParadiseNpcImg from "../../styles/img/dropdown/fishing/paradise-item.png";
import fishingOneshotBgImg from "../../styles/img/dropdown/fishing/oneshot.png";
import fishingOneshotNpcImg from "../../styles/img/dropdown/fishing/oneshot-item.png";
import fishingDragonballBgImg from "../../styles/img/dropdown/fishing/dragonball.png";
import fishingDragonballNpcImg from "../../styles/img/dropdown/fishing/dragonball-item.png";
import fishingSaviorsBgImg from "../../styles/img/dropdown/fishing/saviors.png";
import fishingSaviorsNpcImg from "../../styles/img/dropdown/fishing/saviors-item.png";
import fishingThetyrantBgImg from "../../styles/img/dropdown/fishing/thetyrant.png";
import fishingThetyrantNpcImg from "../../styles/img/dropdown/fishing/thetyrant-item.png";
import fishingFishingworldBgImg from "../../styles/img/dropdown/fishing/fishingworld.png";
import fishingFishingworldNpcImg from "../../styles/img/dropdown/fishing/fishingworld-item.png";
import fishingFishinggodBgImg from "../../styles/img/dropdown/fishing/fishinggod.png";
import fishingFishinggodNpcImg from "../../styles/img/dropdown/fishing/fishinggod-item.png";
import fishingFishingwarBgImg from "../../styles/img/dropdown/fishing/fishingwar.png";
import fishingFishingwarNpcImg from "../../styles/img/dropdown/fishing/fishingwar-item.png";

export const defMenuType = {
	entPage: "entPage",
	Link: "Link",
	LinkOrBtn: "LinkOrBtn"
};

export const defMenuLinks = langId => {
	return {
		sports: {
			productInfo: productList.soccer,
			path: path.sports.root,
			displayKey: "lbl_Sports"
		},
		// cockFighting: {
		// 	productInfo: productList.cockFighting,
		// 	displayKey: "lbl_CockFighting"
		// },
		// sabaClub: {
		// 	productInfo: productList.sabaClub,
		// 	displayKey: "lbl_SabaClub"
		// },
		games: {
			displayKey: "lbl_Games",
			className: "game icon",
			subMenu: [
				{
					...productList.sabaClub,
					path: path.sports.root,
					className: "sabaclub",
					displayKey: "lbl_SabaClub",
					menuType: defMenuType.LinkOrBtn,
					parameter: { ...productList.sabaClub },
					bgImgUrl: gamesSabaclubBgImg,
					npcImgUrl: gamesSabaclubNpcImg
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
					bgImgUrl: gamesV8pokerBgImg,
					npcImgUrl: gamesV8pokerNpcImg
				},
				// {
				// 	...productList.fishing,
				// 	path: path.sports.root,
				// 	className: "fishing",
				// 	displayKey: "lbl_Fishing",
				// 	menuType: defMenuType.LinkOrBtn,
				// 	parameter: { ...productList.fishing }
				// },
				{
					...productList.keno,
					path: path.sports.root,
					className: "keno",
					displayKey: "lbl_Keno",
					menuType: defMenuType.LinkOrBtn,
					parameter: { ...productList.keno },
					bgImgUrl: gamesKenoBgImg,
					npcImgUrl: gamesKenoNpcImg
				},
				{
					...productList.lottery,
					path: path.sports.root,
					className: "lottery",
					displayKey: "lbl_Lottery",
					menuType: defMenuType.LinkOrBtn,
					parameter: { ...productList.lottery },
					bgImgUrl: gamesLotteryBgImg,
					npcImgUrl: gamesLotteryNpcImg
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
			productInfo: productList.eSport,
			path: path.sports.root,
			displayKey: "lbl_eSports"
		},
		casino: {
			path: path.casino.root,
			displayKey: "lbl_Slots",
			className: "casinobtn",
			subMenu: [
				{
					...defCasinoProviders.ICG,
					className: "ICG",
					eventIcons: [
						showEventIcon({
							icon: defEventIcon.new,
							period: defEventPeriod.icg
						})
					],
					icon: "icon icon-icg",
					displayText: "ICG",
					menuType: defMenuType.Link,
					parameter: { provider: defCasinoProviders.ICG.name },
					bgImgUrl: slotsIcgBgImg,
					npcImgUrl: slotsIcgNpcImg,
					iconImgUrl: slotsIcgIconImg
				},
				{
					...defCasinoProviders.CQ9,
					className: "CQ9",
					icon: "icon icon-cq9",
					displayText: "CQ9",
					menuType: defMenuType.Link,
					parameter: { provider: defCasinoProviders.CQ9.name },
					bgImgUrl: slotsCq9BgImg,
					npcImgUrl: slotsCq9NpcImg,
					iconImgUrl: slotsCq9IconImg
				},
				{
					...defCasinoProviders.GPI,
					className: "GPI",
					icon: "icon icon-GPI",
					displayText: "GPI",
					menuType: defMenuType.Link,
					parameter: { provider: defCasinoProviders.GPI.name },
					bgImgUrl: slotsGpiBgImg,
					npcImgUrl: slotsGpiNpcImg,
					iconImgUrl: slotsGpiIconImg
				},
				{
					...defCasinoProviders.YGG,
					className: "YGG",
					icon: "icon icon-YGG",
					displayText: "YGG",
					menuType: defMenuType.Link,
					parameter: { provider: defCasinoProviders.YGG.name },
					bgImgUrl: slotsYggBgImg,
					npcImgUrl: slotsYggNpcImg,
					iconImgUrl: slotsYggIconImg
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
					displayText: "SG",
					menuType: defMenuType.Link,
					parameter: { provider: defCasinoProviders.SG.name },
					bgImgUrl: slotsSgBgImg,
					npcImgUrl: slotsSgNpcImg,
					iconImgUrl: slotsSgIconImg
				},
				{
					...defCasinoProviders.PP,
					className: "PP",
					icon: "icon icon-PP",
					displayText: "PP",
					menuType: defMenuType.Link,
					parameter: { provider: defCasinoProviders.PP.name },
					bgImgUrl: slotsPpBgImg,
					npcImgUrl: slotsPpNpcImg,
					iconImgUrl: slotsPpIconImg
				},
				{
					...defCasinoProviders.PG,
					className: "PG",
					icon: "icon icon-PG",
					displayText: "PG",
					menuType: defMenuType.Link,
					parameter: { provider: defCasinoProviders.PG.name },
					bgImgUrl: slotsPgBgImg,
					npcImgUrl: slotsPgNpcImg,
					iconImgUrl: slotsPgIconImg
				},
				{
					...defCasinoProviders.OW,
					className: "OW",
					icon: "icon icon-OW",
					displayText: "OW",
					menuType: defMenuType.entPage,
					bgImgUrl: slotsOwBgImg,
					npcImgUrl: slotsOwNpcImg,
					iconImgUrl: slotsOwIconImg
				}
			]
		},
		liveCasino: {
			displayKey: "lbl_LiveCasino",
			subMenu: [
				{
					tpId: 28,
					className: "liveN2LIVE",
					icon: "icon icon-N2LIVE",
					listNpcImgUrl: "n2live.png",
					displayText: "N2Live",
					menuType: defMenuType.entPage,
					eventIcons: [
						showEventIcon({
							icon: defEventIcon.new,
							period: defEventPeriod.n2Live
						})
					],
					npcImgUrl: livecasinoN2liveNpcImg,
					iconImgUrl: livecasinoN2liveIconImg
				},
				{
					gameId: 20,
					tpId: 20,
					className: "liveWM",
					icon: "icon icon-WM",
					listNpcImgUrl: "WM.png",
					displayText: "WM",
					menuType: defMenuType.entPage,
					npcImgUrl: livecasinoWmNpcImg,
					iconImgUrl: livecasinoWmIconImg
				},
				{
					gameId: 4,
					tpId: 4,
					className: "liveDG",
					icon: "icon icon-DG",
					listNpcImgUrl: "dg.png",
					displayText: "DG",
					menuType: defMenuType.entPage,
					npcImgUrl: livecasinoDgNpcImg,
					iconImgUrl: livecasinoDgIconImg
				},
				{
					gameId: 12,
					tpId: 12,
					className: "liveALL",
					icon: "icon icon-AB",
					listNpcImgUrl: "allbet.png",
					displayText: "Allbet",
					menuType: defMenuType.entPage,
					npcImgUrl: livecasinoAllbetNpcImg,
					iconImgUrl: livecasinoAllbetIconImg
				},
				{
					gameId: 3,
					tpId: 3,
					className: "liveAG",
					icon: "icon icon-AG",
					listNpcImgUrl: "ag.png",
					displayText: "AG",
					menuType: defMenuType.entPage,
					npcImgUrl: livecasinoAgNpcImg,
					iconImgUrl: livecasinoAgIconImg
				},
				{
					gameId: 101,
					tpId: 5,
					className: "livePP",
					icon: "icon icon-PP",
					listNpcImgUrl: "pp.png",
					displayText: "PP",
					menuType: defMenuType.entPage,
					npcImgUrl: livecasinoPpNpcImg,
					iconImgUrl: livecasinoPpIconImg
				},
				{
					gameId: 2,
					tpId: 2,
					className: "liveSA",
					icon: "icon icon-SA",
					listNpcImgUrl: "sa.png",
					displayText: "SA",
					menuType: defMenuType.entPage,
					npcImgUrl: livecasinoSaNpcImg,
					iconImgUrl: livecasinoSaIconImg
				},
				{
					gameId: 15,
					tpId: 15,
					className: "liveAE",
					icon: "icon icon-AE",
					listNpcImgUrl: "ae.png",
					displayText: "AE",
					menuType: defMenuType.entPage,
					npcImgUrl: livecasinoAeNpcImg,
					iconImgUrl: livecasinoAeIconImg
				},
				{
					gameId: 18,
					tpId: 18,
					className: "liveEB",
					icon: "icon icon-EB",
					listNpcImgUrl: "ebet.png",
					displayText: "eBET",
					menuType: defMenuType.entPage,
					npcImgUrl: livecasinoEbetNpcImg,
					iconImgUrl: livecasinoEbetIconImg
				}
			]
		},
		fishing: {
			// productInfo: productList.fishing,
			displayKey: "lbl_Fishing",
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
					bgImgUrl: fishingParadiseBgImg,
					npcImgUrl: fishingParadiseNpcImg,
					iconImgUrl: cq9IconImg
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
					bgImgUrl: fishingOneshotBgImg,
					npcImgUrl: fishingOneshotNpcImg,
					iconImgUrl: cq9IconImg
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
					bgImgUrl: fishingDragonballBgImg,
					npcImgUrl: fishingDragonballNpcImg,
					iconImgUrl: icgIconImg
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
					bgImgUrl: fishingSaviorsBgImg,
					npcImgUrl: fishingSaviorsNpcImg,
					iconImgUrl: icgIconImg
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
					bgImgUrl: fishingThetyrantBgImg,
					npcImgUrl: fishingThetyrantNpcImg,
					iconImgUrl: icgIconImg
				},
				{
					...productList.fishing,
					className: "fgg",
					displayKey: "lbl_FishingGG",
					menuType: defMenuType.entPage,
					parameter: { ...productList.fishing },
					bgImgUrl: fishingFishingworldBgImg,
					npcImgUrl: fishingFishingworldNpcImg,
					iconImgUrl: ggIconImg
				},
				{
					...productList.fishing_SG,
					className: "fsg",
					displayKey: "lbl_FishingSG1",
					menuType: defMenuType.entPage,
					parameter: { ...productList.fishing_SG },
					bgImgUrl: fishingFishinggodBgImg,
					npcImgUrl: fishingFishinggodNpcImg,
					iconImgUrl: sgIconImg
				},
				{
					...productList.fishing_SGW,
					className: "fsgw",
					displayKey: "lbl_FishingSG2",
					menuType: defMenuType.entPage,
					parameter: { ...productList.fishing_SGW },
					bgImgUrl: fishingFishingwarBgImg,
					npcImgUrl: fishingFishingwarNpcImg,
					iconImgUrl: sgIconImg
				}
			]
		},
		vip: {
			path: path.vip.root,
			displayKey: "lbl_Vip",
			eventIcons: [
				showEventIcon({
					icon: defEventIcon.new,
					period: defEventPeriod.vip
				})
			]
		},
		promotion: {
			path: path.promotion.root,
			displayKey: "lbl_Promotions"
		},

		affiliate: {
			path: siteInfo({ langId }).affiliateLink,
			displayKey: "lbl_Affiliates",
			target: "_blank",
			isFullPath: true
		},
		leaderBoard: {
			path: path.leaderBoard.root,
			displayKey: "lbl_Ranking",
			className: "icon icon-live"
		}
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
};
export const defSubListClassName = {
	casino: "casinoList",
	liveCasino: "livecasinoList",
	games: "gameList",
	fishing: "fishList"
};
