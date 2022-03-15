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
		img: `${bannerImgUrl}/desktop/img/footer/habanero.png`,
		activeImg: `${bannerImgUrl}/desktop/img/footer/habaneroa.png`,
		lobbyDisplayName: "Habanero",
		providerId: defCasinoProviders.Habanero.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/footer/ap.png`,
		activeImg: `${bannerImgUrl}/desktop/img/footer/apa.png`,
		lobbyDisplayName: "AdvantPlay",
		providerId: defCasinoProviders.AdvantPlay.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/footer/rt.png`,
		activeImg: `${bannerImgUrl}/desktop/img/footer/rta.png`,
		lobbyDisplayName: "Red Tiger",
		providerId: defCasinoProviders.RedTiger.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/footer/ne.png`,
		activeImg: `${bannerImgUrl}/desktop/img/footer/nea.png`,
		lobbyDisplayName: "NetEnt",
		providerId: defCasinoProviders.NetEnt.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/footer/jili.png`,
		activeImg: `${bannerImgUrl}/desktop/img/footer/jilia.png`,
		lobbyDisplayName: "JILI",
		providerId: defCasinoProviders.JILI.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/footer/pp.png`,
		activeImg: `${bannerImgUrl}/desktop/img/footer/ppa.png`,
		lobbyDisplayName: "Pragmatic Play",
		providerId: defCasinoProviders.PP.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/footer/gpi.png`,
		activeImg: `${bannerImgUrl}/desktop/img/footer/gpia.png`,
		lobbyDisplayName: "GAMEPLAY",
		providerId: defCasinoProviders.GPI.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/footer/yg.png`,
		activeImg: `${bannerImgUrl}/desktop/img/footer/yga.png`,
		lobbyDisplayName: "YGGDRASIL",
		providerId: defCasinoProviders.YGG.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/footer/sg.png`,
		activeImg: `${bannerImgUrl}/desktop/img/footer/sga.png`,
		lobbyDisplayName: "SPADEGAMING",
		providerId: defCasinoProviders.SG.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/footer/pg.png`,
		activeImg: `${bannerImgUrl}/desktop/img/footer/pga.png`,
		lobbyDisplayName: "PG Soft",
		providerId: defCasinoProviders.PG.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/footer/cq9.png`,
		activeImg: `${bannerImgUrl}/desktop/img/footer/cq9a.png`,
		lobbyDisplayName: "CQ9",
		providerId: defCasinoProviders.CQ9.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/footer/icg.png`,
		activeImg: `${bannerImgUrl}/desktop/img/footer/icga.png`,
		lobbyDisplayName: "AstroTech",
		providerId: defCasinoProviders.AstroTech.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/footer/pt.png`,
		activeImg: `${bannerImgUrl}/desktop/img/footer/pta.png`,
		lobbyDisplayName: "PLAYTECH",
		providerId: defCasinoProviders.PT.tpId
	},
	{
		img: `${bannerImgUrl}/desktop/img/footer/mg.png`,
		activeImg: `${bannerImgUrl}/desktop/img/footer/mga.png`,
		lobbyDisplayName: "MG",
		providerId: defCasinoProviders.MGPSW.tpId
	}
];
