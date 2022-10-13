import { defCasinoProviders } from "../../datas/productList";
import { bannerImgUrl } from "../../config";

export const defRowsPerPage = 20;

export const defNav = {
	ALLGAMES: {
		key: "ALLGAMES",
		displayKey: "lbl_All"
	},
	PROMO: {
		key: "PROMO",
		displayKey: "lbl_Jackpot",
		hot: true
	},
	NEW: {
		key: "NEW",
		displayKey: "lbl_New"
	},
	FEATURED: {
		key: "FEATURED",
		displayKey: "lbl_Feature"
	},
	FAVOURITE: {
		key: "FAVOURITE",
		displayKey: "lbl_Favourite"
	}
};

export const defSearchColumn = {
	searchText: "searchText",
	provider: "provider"
};

export const defLobbyImgList = [
	{
		img: `${bannerImgUrl}/desktop/img/partnerlogo/ho.png`,
		activeImg: `${bannerImgUrl}/desktop/img/partnerlogo/hoa.png`,
		lobbyDisplayName: "Habanero",
		providerId: defCasinoProviders.Habanero.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/partnerlogo/ap.png`,
		activeImg: `${bannerImgUrl}/desktop/img/partnerlogo/apa.png`,
		lobbyDisplayName: "AdvantPlay",
		providerId: defCasinoProviders.AdvantPlay.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/partnerlogo/red.png`,
		activeImg: `${bannerImgUrl}/desktop/img/partnerlogo/reda.png`,
		lobbyDisplayName: "Red Tiger",
		providerId: defCasinoProviders.RedTiger.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/partnerlogo/ne.png`,
		activeImg: `${bannerImgUrl}/desktop/img/partnerlogo/nea.png`,
		lobbyDisplayName: "NetEnt",
		providerId: defCasinoProviders.NetEnt.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/partnerlogo/simpleplay.png`,
		activeImg: `${bannerImgUrl}/desktop/img/partnerlogo/simpleplaya.png`,
		lobbyDisplayName: "SimplePlay",
		providerId: defCasinoProviders.SimplePlay.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/partnerlogo/jili.png`,
		activeImg: `${bannerImgUrl}/desktop/img/partnerlogo/jilia.png`,
		lobbyDisplayName: "JILI",
		providerId: defCasinoProviders.JILI.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/partnerlogo/pp.png`,
		activeImg: `${bannerImgUrl}/desktop/img/partnerlogo/ppa.png`,
		lobbyDisplayName: "Pragmatic Play",
		providerId: defCasinoProviders.PP.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/partnerlogo/gpi.png`,
		activeImg: `${bannerImgUrl}/desktop/img/partnerlogo/gpia.png`,
		lobbyDisplayName: "GAMEPLAY",
		providerId: defCasinoProviders.GPI.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/partnerlogo/ygg.png`,
		activeImg: `${bannerImgUrl}/desktop/img/partnerlogo/ygga.png`,
		lobbyDisplayName: "YGGDRASIL",
		providerId: defCasinoProviders.YGG.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/partnerlogo/sg.png`,
		activeImg: `${bannerImgUrl}/desktop/img/partnerlogo/sga.png`,
		lobbyDisplayName: "SPADEGAMING",
		providerId: defCasinoProviders.SG.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/partnerlogo/pg.png`,
		activeImg: `${bannerImgUrl}/desktop/img/partnerlogo/pga.png`,
		lobbyDisplayName: "PG Soft",
		providerId: defCasinoProviders.PG.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/partnerlogo/cq9.png`,
		activeImg: `${bannerImgUrl}/desktop/img/partnerlogo/cq9a.png`,
		lobbyDisplayName: "CQ9",
		providerId: defCasinoProviders.CQ9.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/partnerlogo/icg.png`,
		activeImg: `${bannerImgUrl}/desktop/img/partnerlogo/icga.png`,
		lobbyDisplayName: "Astro Tech",
		providerId: defCasinoProviders.AstroTech.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/partnerlogo/pt.png`,
		activeImg: `${bannerImgUrl}/desktop/img/partnerlogo/pta.png`,
		lobbyDisplayName: "PLAYTECH",
		providerId: defCasinoProviders.PT.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/partnerlogo/mg.png`,
		activeImg: `${bannerImgUrl}/desktop/img/partnerlogo/mga.png`,
		lobbyDisplayName: "MG",
		providerId: defCasinoProviders.MGPSW.tpId
	}
];
