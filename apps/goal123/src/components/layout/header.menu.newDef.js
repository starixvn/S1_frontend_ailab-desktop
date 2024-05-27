import React from "react";
import moment from "moment/moment";
import {
	lobbyCategoryEnum,
	menuIconTypeEnum,
	products
} from "@ailab-desktop/common";
import path from "../../router";

export const defMenuType = {
	entPage: "entPage",
	Link: "Link",
	useGoToGame: "useGoToGame"
};

// * 這裡只定義動態的 (api 來的 category)，靜態的寫死在 render 的地方
export const newDefSubItemClassName = {
	[lobbyCategoryEnum.SPORTS]: "sportList",
	[lobbyCategoryEnum.SLOTS]: "casinoList",
	[lobbyCategoryEnum.CASINO]: "livecasinoList",
	[lobbyCategoryEnum.GAMES]: "gameList",
	[lobbyCategoryEnum.FISHING]: "fishList",
	[lobbyCategoryEnum.LOTTERY]: "lotteryList",
	[lobbyCategoryEnum.ESPORTS]: "esportList",
	[lobbyCategoryEnum.Cockfighting]: "cockList"
};

// * mainMenu的 icon 和 subMenu的 icon 是各自獨立的 後端只專注在 subMenu 的處理
export const defMainMenuIcon = {
	newTag: "newTag",
	hotTag: "hotTag"
};

// * Lobby Icon 樣式
export const lobbyIconEnum = Object.freeze({
	[menuIconTypeEnum.Null]: null,
	[menuIconTypeEnum.New]: <div className="newicon" />
});

// * Get Lobby Icon 涵式
export const switchLobbyIcon = iconType => {
	return lobbyIconEnum[iconType] || null;
};

export const isShowEventIcon = (iconStartTime, iconEndTime) => {
	if (!moment(iconStartTime).isValid() || !moment(iconEndTime).isValid())
		return null;

	return moment().isBetween(iconStartTime, iconEndTime);
};

export const defMenuObj = Object.freeze({
	[lobbyCategoryEnum.SPORTS]: {
		path: path.sports.root,
		displayKey: "lbl_Sports",
		lobbyCategoryId: lobbyCategoryEnum.SPORTS,
		subMenu: [
			{
				...products.CryptoSports,
				menuType: defMenuType.entPage
			},
			{
				...products.Soccer,
				menuType: defMenuType.Link,
				parameter: { game: "Soccer" },
				path: path.sports.root
			},
			{
				...products.SabaSoccer,
				menuType: defMenuType.Link,
				parameter: { game: "SabaSoccer" },
				path: path.sports.root
			},
			{
				...products.BaseBall,
				menuType: defMenuType.Link,
				parameter: { game: "BaseBall" },
				path: path.sports.root
			},
			{
				...products.Football,
				menuType: defMenuType.Link,
				parameter: { game: "Football" },
				path: path.sports.root
			},
			{
				...products.SBOBET,
				menuType: defMenuType.Link,
				parameter: { game: "SBOBET" },
				path: path.sports.root,
				isNeedLogin: true
			},
			{
				...products.BtiSport,
				menuType: defMenuType.Link,
				parameter: { game: "BtiSport" },
				path: path.sports.root
			},
			{
				...products.IMSports,
				menuType: defMenuType.Link,
				parameter: { game: "IMSports" },
				path: path.sports.root
			},
			{
				...products.VirtualSports,
				menuType: defMenuType.Link,
				parameter: { game: "VirtualSports" },
				path: path.sports.root
			}
		]
	},
	[lobbyCategoryEnum.GAMES]: {
		path: path.games.root,
		displayKey: "lbl_Games",
		lobbyCategoryId: lobbyCategoryEnum.GAMES,
		subMenu: [
			{
				menuType: defMenuType.entPage,
				path: path.games.root,
				...products.KingMaker
			},
			{
				menuType: defMenuType.entPage,
				path: path.games.root,
				...products.Vgaming
			},
			{
				menuType: defMenuType.entPage,
				path: path.games.root,
				...products.V8Poker
			},
			{
				menuType: defMenuType.entPage,
				path: path.sports.root,
				parameter: { game: "TableGame" },
				...products.TableGame
			},
			{
				menuType: defMenuType.entPage,
				path: path.games.root,
				...products.Aviator
			},
			{
				menuType: defMenuType.entPage,
				path: path.games.root,
				...products.Mines
			},
			{
				menuType: defMenuType.entPage,
				path: path.games.root,
				...products.Goal
			},
			{
				menuType: defMenuType.entPage,
				path: path.games.root,
				...products.Dice
			},
			{
				menuType: defMenuType.entPage,
				path: path.games.root,
				...products.Spaceman
			},
			{
				menuType: defMenuType.entPage,
				path: path.games.root,
				...products.Crash
			},
			{
				menuType: defMenuType.entPage,
				path: path.games.root,
				...products.GoRush
			},
			{
				menuType: defMenuType.entPage,
				path: path.games.root,
				...products["93Connect"]
			}
		]
	},
	[lobbyCategoryEnum.ESPORTS]: {
		path: path.eSport.root,
		displayKey: "lbl_eSports",
		lobbyCategoryId: lobbyCategoryEnum.ESPORTS,
		subMenu: [
			{
				menuType: defMenuType.entPage,
				path: path.eSport.root,
				...products.ESportALL
			},
			{
				menuType: defMenuType.entPage,
				path: path.eSport.root,
				...products.IMESports
			},
			{
				menuType: defMenuType.entPage,
				path: path.eSport.root,
				...products.TFGaming
			}
		]
	},
	[lobbyCategoryEnum.SLOTS]: {
		path: path.casino.root,
		displayKey: "lbl_Slots",
		lobbyCategoryId: lobbyCategoryEnum.SLOTS,
		subMenu: [
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.PragmaticPlaySlot.tpId },
				...products.PragmaticPlaySlot,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.Spadegaming.tpId },
				...products.Spadegaming,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.AdvantPlay.tpId },
				...products.AdvantPlay,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.ES.tpId },
				...products.ES,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.Nextspin.tpId },
				...products.Nextspin,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.PGSoft.tpId },
				...products.PGSoft,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.FaChai.tpId },
				...products.FaChai,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.MicrogamingSlot.tpId },
				...products.MicrogamingSlot,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.JILI.tpId },
				...products.JILI,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.SPRIBE.tpId },
				...products.SPRIBE,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.RedTiger.tpId },
				...products.RedTiger,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.NetEnt.tpId },
				...products.NetEnt,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.CQ9.tpId },
				...products.CQ9,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.PlaynGO.tpId },
				...products.PlaynGO,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.GamePlay.tpId },
				...products.GamePlay,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.YGGDrassil.tpId },
				...products.YGGDrassil,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.Habanero.tpId },
				...products.Habanero,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.SimplePlay.tpId },
				...products.SimplePlay,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.SkywindSlot.tpId },
				...products.SkywindSlot,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.NewPlayTechSlot.tpId },
				...products.NewPlayTechSlot,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.BNG.tpId },
				...products.BNG,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.NoLimitCity.tpId },
				...products.NoLimitCity,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.AmigoGaming.tpId },
				...products.AmigoGaming,
				path: path.casino.root
			}
		]
	},
	[lobbyCategoryEnum.CASINO]: {
		path: path.liveCasino.root,
		displayKey: "lbl_LiveCasino",
		lobbyCategoryId: lobbyCategoryEnum.CASINO,
		subMenu: [
			{
				menuType: defMenuType.entPage,
				path: path.liveCasino.root,
				...products.PragmaticPlayCasino
			},
			{
				menuType: defMenuType.entPage,
				path: path.liveCasino.root,
				...products.BigGaming
			},
			{
				menuType: defMenuType.entPage,
				path: path.liveCasino.root,
				...products.YeebetCasino
			},
			{
				menuType: defMenuType.entPage,
				path: path.liveCasino.root,
				...products.SkywindCasino
			},
			{
				menuType: defMenuType.entPage,
				path: path.liveCasino.root,
				...products.MicrogamingCasino
			},
			{
				menuType: defMenuType.entPage,
				path: path.liveCasino.root,
				...products.EvolutionGaming
			},
			{
				menuType: defMenuType.entPage,
				path: path.liveCasino.root,
				...products.NewPlayTechCasino,
				// ? 待詢問 PM
				disabledInSlider: true
			},
			{
				menuType: defMenuType.entPage,
				path: path.liveCasino.root,
				...products.n2LIVE
			},
			{
				menuType: defMenuType.entPage,
				path: path.liveCasino.root,
				...products.WMCasino
			},
			{
				menuType: defMenuType.entPage,
				path: path.liveCasino.root,
				...products.DreamGaming
			},
			{
				menuType: defMenuType.entPage,
				path: path.liveCasino.root,
				...products.Allbet
			},
			{
				menuType: defMenuType.entPage,
				path: path.liveCasino.root,
				...products.AsiaGaming
			},
			{
				menuType: defMenuType.entPage,
				path: path.liveCasino.root,
				...products.SAGaming
			},
			{
				menuType: defMenuType.entPage,
				path: path.liveCasino.root,
				...products.AESexy
			},
			{
				menuType: defMenuType.entPage,
				path: path.liveCasino.root,
				...products.WE
			},
			{
				menuType: defMenuType.entPage,
				path: path.liveCasino.root,
				...products.WonCasino
			}
		]
	},
	[lobbyCategoryEnum.FISHING]: {
		path: path.fishing.root,
		displayKey: "lbl_Fishing",
		lobbyCategoryId: lobbyCategoryEnum.FISHING,
		subMenu: [
			{
				menuType: defMenuType.entPage,
				path: path.fishing.root,
				...products.FishingGod
			},
			{
				menuType: defMenuType.entPage,
				path: path.fishing.root,
				...products.FishingWar
			},
			{
				menuType: defMenuType.entPage,
				path: path.fishing.root,
				...products.ZombieParty
			},
			{
				menuType: defMenuType.entPage,
				path: path.fishing.root,
				...products.AlienHunter
			},
			{
				menuType: defMenuType.entPage,
				path: path.fishing.root,
				...products.Paradise
			},
			{
				menuType: defMenuType.entPage,
				path: path.fishing.root,
				...products.OneshotFishing
			},
			// * 目前正式環境沒有
			{
				menuType: defMenuType.entPage,
				path: path.fishing.root,
				...products.FishingWorld
			}
		]
	},
	[lobbyCategoryEnum.LOTTERY]: {
		path: path.lottery.root,
		displayKey: "lbl_Lottery",
		lobbyCategoryId: lobbyCategoryEnum.LOTTERY,
		subMenu: [
			{
				...products.VNLottery,
				path: path.lottery.root,
				menuType: defMenuType.entPage
			},
			{
				...products.TCG,
				path: path.lottery.root,
				menuType: defMenuType.entPage
			},
			{
				...products.Keno,
				path: path.lottery.root,
				menuType: defMenuType.entPage
			},
			{
				...products.Lottery,
				path: path.lottery.root,
				menuType: defMenuType.entPage
			}
		]
	},
	[lobbyCategoryEnum.Cockfighting]: {
		path: path.cockFighting.root,
		displayKey: "lbl_CockFighting",
		lobbyCategoryId: lobbyCategoryEnum.Cockfighting,
		subMenu: [
			{
				...products.GACockFighting,
				path: path.cockFighting.root,
				menuType: defMenuType.entPage
			},
			{
				...products.WCC_Cockfighting,
				path: path.cockFighting.root,
				menuType: defMenuType.entPage
			}
		]
	}
});
