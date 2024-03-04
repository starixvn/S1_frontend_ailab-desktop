import productList from "../../datas/productList";
import path from "../../router";
import { defMenuType } from "../layout/header.menu.def";
import { bannerImgUrl } from "../../config";
import {
	defEventIcon,
	defEventPeriod,
	showEventIcon
} from "../common/eventIcon";

export const HOT_GAME_LIST = [
	{
		displayKey: "lbl_Sports",
		category: "sports",
		...productList.sportSaba,
		subPath: path.sports.root,
		parameter: { ...productList.sportSaba }
	},
	{
		displayKey: "lbl_Jackpot",
		category: "jackpot",
		href: `${path.casino.root}?page=jackpot`
	},
	{
		displayKey: "lbl_LiveCasino",
		category: "livecasino",
		href: path.liveCasino.root
	},
	{
		displayKey: "lbl_Vgaming",
		category: "vgaming",
		...productList.sabaClub,
		menuType: defMenuType.LinkOrBtn,
		parameter: { ...productList.sabaClub }
	},
	{
		displayKey: "lbl_SEDIE",
		category: "sedie",
		...productList.liveCasino_One789,
		menuType: defMenuType.entPage,
		icon: "tag-live"
	},
	{
		displayKey: "lbl_Keno",
		category: "keno",
		...productList.keno,
		menuType: defMenuType.LinkOrBtn,
		parameter: { ...productList.keno }
	},
	{ displayKey: "lbl_Fishing", category: "fishing", href: path.fishing.root },
	{ displayKey: "lbl_QuickGames", category: "qgames", href: path.games.root },
	{
		displayKey: "lbl_Lottery",
		category: "lottery",
		...productList.One789_lottery,
		menuType: defMenuType.LinkOrBtn,
		parameter: { ...productList.One789_lottery },
		icon: "tag-live"
	}
];

export const SPORT_LIST = {
	en: [
		{
			displayText: "SBOBET",
			img: `${bannerImgUrl}/desktop/img/4.0/sbo.png`,
			...productList.sportSbo,
			subPath: path.sportSbo.root,
			className: "sbobet",
			eventIcons: [
				showEventIcon({
					icon: defEventIcon.new,
					period: defEventPeriod.sportSbo
				})
			],
			parameter: { ...productList.sportSbo },
			afterLogin: true
		},
		// {
		// 	img: `${bannerImgUrl}/desktop/img/4.0/crypto.png`,
		// 	...productList.cryptoSports,
		// 	className: "cryptosport",
		// 	displayKey: "lbl_cryptoSports",
		// 	parameter: { ...productList.cryptoSports },
		// 	eventIcons: [
		// 		showEventIcon({
		// 			icon: defEventIcon.new,
		// 			period: defEventPeriod.sports_cryptoSports
		// 		})
		// 	]
		// },
		{
			displayKey: "lbl_SabaSport",
			img: `${bannerImgUrl}/desktop/img/4.0/saba.png`,
			...productList.sportSaba,
			subPath: path.sports.root,
			className: "sabaSport",
			parameter: { ...productList.sportSaba }
		},
		{
			displayKey: "lbl_BTISport",
			img: `${bannerImgUrl}/desktop/img/4.0/bti.png`,
			...productList.sportBti,
			subPath: path.sportBti.root,
			className: "btiSport",
			parameter: { ...productList.sportBti }
		},
		{
			displayKey: "lbl_VirtualSports",
			img: `${bannerImgUrl}/desktop/img/4.0/virtual.png`,
			...productList.virtualSports,
			subPath: path.sports.root,
			className: "virtual",
			parameter: { ...productList.virtualSports },
			eventIcons: [
				showEventIcon({
					icon: defEventIcon.new,
					period: defEventPeriod.sports_virtualSports
				})
			]
		},
		{
			displayText: "IM Sports",
			img: `${bannerImgUrl}/desktop/img/4.0/im.png`,
			...productList.sports_IM,
			subPath: path.sportsIM.root,
			className: "InplayMatrix",
			parameter: { ...productList.sports_IM },
			eventIcons: [
				showEventIcon({
					icon: defEventIcon.new,
					period: defEventPeriod.IM
				})
			]
		}
	],
	vn: [
		{
			displayText: "SBOBET",
			img: `${bannerImgUrl}/desktop/img/4.0/sbo-vn.png`,
			...productList.sportSbo,
			subPath: path.sportSbo.root,
			className: "sbobet",
			eventIcons: [
				showEventIcon({
					icon: defEventIcon.new,
					period: defEventPeriod.sportSbo
				})
			],
			parameter: { ...productList.sportSbo },
			afterLogin: true
		},
		// {
		// 	img: `${bannerImgUrl}/desktop/img/4.0/crypto-vn.png`,
		// 	...productList.cryptoSports,
		// 	className: "cryptosport",
		// 	displayKey: "lbl_cryptoSports",
		// 	parameter: { ...productList.cryptoSports },
		// 	eventIcons: [
		// 		showEventIcon({
		// 			icon: defEventIcon.new,
		// 			period: defEventPeriod.sports_cryptoSports
		// 		})
		// 	]
		// },
		{
			displayKey: "lbl_SabaSport",
			img: `${bannerImgUrl}/desktop/img/4.0/saba-vn.png`,
			...productList.sportSaba,
			subPath: path.sports.root,
			className: "sabaSport",
			parameter: { ...productList.sportSaba }
		},
		{
			displayKey: "lbl_BTISport",
			img: `${bannerImgUrl}/desktop/img/4.0/bti-vn.png`,
			...productList.sportBti,
			subPath: path.sportBti.root,
			className: "btiSport",
			parameter: { ...productList.sportBti }
		},
		{
			displayKey: "lbl_VirtualSports",
			img: `${bannerImgUrl}/desktop/img/4.0/virtual-vn.png`,
			...productList.virtualSports,
			subPath: path.sports.root,
			className: "virtual",
			parameter: { ...productList.virtualSports },
			eventIcons: [
				showEventIcon({
					icon: defEventIcon.new,
					period: defEventPeriod.sports_virtualSports
				})
			]
		},
		{
			displayText: "IM Sports",
			img: `${bannerImgUrl}/desktop/img/4.0/im-vn.png`,
			...productList.sports_IM,
			subPath: path.sportsIM.root,
			className: "InplayMatrix",
			parameter: { ...productList.sports_IM },
			eventIcons: [
				showEventIcon({
					icon: defEventIcon.new,
					period: defEventPeriod.IM
				})
			]
		}
	]
};

export const rankMap = {
	1: "1st",
	2: "2nd",
	3: "3rd"
};
