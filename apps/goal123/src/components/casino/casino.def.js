import { defCasinoProviders } from "../../datas/productList";

import cq9Img from "../../styles/img/partnerlogo/cq9.png";
import gpiImg from "../../styles/img/partnerlogo/gpi.png";
import jiliImg from "../../styles/img/partnerlogo/jili.png";
import icgImg from "../../styles/img/partnerlogo/icg.png";
import pgImg from "../../styles/img/partnerlogo/pg.png";
import ppImg from "../../styles/img/partnerlogo/pp.png";
import ptImg from "../../styles/img/partnerlogo/pt.png";
import mgImg from "../../styles/img/partnerlogo/mg.png";
import sgImg from "../../styles/img/partnerlogo/sg.png";
import yggImg from "../../styles/img/partnerlogo/ygg.png";
import rtImg from "../../styles/img/partnerlogo/rt.png";
import neImg from "../../styles/img/partnerlogo/ne.png";

import cq9ActiveImg from "../../styles/img/partnerlogo/cq9a.png";
import gpiActiveImg from "../../styles/img/partnerlogo/gpia.png";
import jiliaActiveImg from "../../styles/img/partnerlogo/jilia.png";
import icgActiveImg from "../../styles/img/partnerlogo/icga.png";
import pgActiveImg from "../../styles/img/partnerlogo/pga.png";
import ppActiveImg from "../../styles/img/partnerlogo/ppa.png";
import ptActiveImg from "../../styles/img/partnerlogo/pta.png";
import mgActiveImg from "../../styles/img/partnerlogo/mga.png";
import sgActiveImg from "../../styles/img/partnerlogo/sga.png";
import yggActiveImg from "../../styles/img/partnerlogo/ygga.png";
import rtActiveImg from "../../styles/img/partnerlogo/rta.png";
import neActiveImg from "../../styles/img/partnerlogo/nea.png";

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
		img: rtImg,
		activeImg: rtActiveImg,
		lobbyDisplayName: "Red Tiger",
		providerId: defCasinoProviders.RedTiger.tpId
	},
	{
		img: neImg,
		activeImg: neActiveImg,
		lobbyDisplayName: "NetEnt",
		providerId: defCasinoProviders.NetEnt.tpId
	},
	{
		img: jiliImg,
		activeImg: jiliaActiveImg,
		lobbyDisplayName: "JILI",
		providerId: defCasinoProviders.JILI.tpId
	},
	{
		img: ppImg,
		activeImg: ppActiveImg,
		lobbyDisplayName: "Pragmatic Play",
		providerId: defCasinoProviders.PP.tpId
	},
	{
		img: gpiImg,
		activeImg: gpiActiveImg,
		lobbyDisplayName: "GAMEPLAY",
		providerId: defCasinoProviders.GPI.tpId
	},
	{
		img: yggImg,
		activeImg: yggActiveImg,
		lobbyDisplayName: "YGGDRASIL",
		providerId: defCasinoProviders.YGG.tpId
	},
	{
		img: sgImg,
		activeImg: sgActiveImg,
		lobbyDisplayName: "SPADEGAMING",
		providerId: defCasinoProviders.SG.tpId
	},
	{
		img: pgImg,
		activeImg: pgActiveImg,
		lobbyDisplayName: "PG Soft",
		providerId: defCasinoProviders.PG.tpId
	},
	{
		img: cq9Img,
		activeImg: cq9ActiveImg,
		lobbyDisplayName: "CQ9",
		providerId: defCasinoProviders.CQ9.tpId
	},
	{
		img: icgImg,
		activeImg: icgActiveImg,
		lobbyDisplayName: "AstroTech",
		providerId: defCasinoProviders.AstroTech.tpId
	},
	{
		img: ptImg,
		activeImg: ptActiveImg,
		lobbyDisplayName: "PLAYTECH",
		providerId: defCasinoProviders.PT.tpId
	},
	{
		img: mgImg,
		activeImg: mgActiveImg,
		lobbyDisplayName: "MG",
		providerId: defCasinoProviders.MGPSW.tpId
	}
];
