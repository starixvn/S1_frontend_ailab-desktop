import productList from "../../datas/productList";
import path from "../../router";

export const defSportsBetting_Section1 = {
	soccer: {
		productInfo: productList.soccer,
		path: path.sports.root,
		displayKey: "lbl_SoccerBetting"
	},
	basketball: {
		productInfo: productList.basketball,
		path: path.sports.root,
		displayKey: "lbl_BasketballBetting"
	},
	baseball: {
		productInfo: productList.baseball,
		path: path.sports.root,
		displayKey: "lbl_BaseballBetting"
	},
	badmintion: {
		productInfo: productList.badmintion,
		path: path.sports.root,
		displayKey: "lbl_badminton"
	}
};

export const defSportsBetting_Section2 = {
	football: {
		productInfo: productList.football,
		path: path.sports.root,
		displayKey: "lbl_FootballBetting"
	},
	tennis: {
		productInfo: productList.tennis,
		path: path.sports.root,
		displayKey: "lbl_TennisBetting"
	},
	hockey: {
		productInfo: productList.hockey,
		path: path.sports.root,
		displayKey: "lbl_HockeyBetting"
	},
	eSport: {
		productInfo: productList.eSport,
		path: path.sports.root,
		displayKey: "lbl_eSportsBetting"
	}
};

export const defFooterProductList = {
	1: [
		{
			title: "lbl_Sports_Betting_Online",
			content: "lbl_Sports_Betting_Online_Malaysia_desc"
		},
		{
			title: "lbl_Soccer_Betting_Live_Betting",
			content: "lbl_Soccer_Betting_Live_Betting_desc"
		}
	],
	2: [
		{
			title: "lbl_Sports_Betting_In_Play_Betting",
			content: "lbl_Sports_Betting_In_Play_Betting_desc"
		},
		{
			title: "lbl_Online_Casino_Live_Casino",
			content: "lbl_Online_Casino_Live_Casino_desc"
		},
		{
			title: "lbl_Keno_Lottery_Betting",
			content: "lbl_Keno_Lottery_Betting_desc"
		}
	],
	3: [
		{
			title: "lbl_Virtual_Sports",
			content: "lbl_Virtual_Sports_desc"
		},
		{
			title: "lbl_Fishing_in_footer",
			content: "lbl_Fishing_desc"
		},
		{
			title: "lbl_eSports",
			content: "lbl_Esport_desc"
		}
	],
	4: [
		{
			title: "lbl_Mobile_Betting",
			content: "lbl_Mobile_Betting_desc"
		},
		{
			title: "lbl_Open_An_Account",
			content: "lbl_Open_An_Account_desc"
		},
		{
			title: "lbl_Payment_Options",
			content: "lbl_Payment_Options_desc"
		}
	],
	5: [
		{
			title: "lbl_Affiliates_in_footer",
			content: "lbl_Affiliates_desc"
		},
		{
			title: "lbl_Responsible_Gaming",
			content: "lbl_Responsible_Gaming_desc"
		},
		{
			title: "lbl_Security",
			content: "lbl_Security_desc"
		}
	]
};
