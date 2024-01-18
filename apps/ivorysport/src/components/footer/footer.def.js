import { bannerImgUrl } from "../../config";
import productList from "../../datas/productList";
import path from "../../router";

export const PAYMENT_LIST = {
	2: [
		{
			name: "Maybank",
			img: `${bannerImgUrl}/desktop/img/footer/square/maybank.jpg`
		},
		{
			name: "OCBC",
			img: `${bannerImgUrl}/desktop/img/footer/square/ocbc.jpg`
		},
		{
			name: "Ambank",
			img: `${bannerImgUrl}/desktop/img/footer/square/ambank.jpg`
		},
		{
			name: "CIMB",
			img: `${bannerImgUrl}/desktop/img/footer/square/cimb.jpg`
		},
		{
			name: "RHB",
			img: `${bannerImgUrl}/desktop/img/footer/square/rhb.jpg`
		},
		{
			name: "AFFIN",
			img: `${bannerImgUrl}/desktop/img/footer/square/affin.jpg`
		},
		{
			name: "HLB",
			img: `${bannerImgUrl}/desktop/img/footer/square/hlb.jpg`
		},
		{
			name: "PBB",
			img: `${bannerImgUrl}/desktop/img/footer/square/pbb.jpg`
		},
		{
			name: "Duitnow",
			img: `${bannerImgUrl}/desktop/img/footer/square/duitnow.jpg`
		},
		{
			name: "TnG",
			img: `${bannerImgUrl}/desktop/img/footer/square/tng.jpg`
		},
		{
			name: "Boost",
			img: `${bannerImgUrl}/desktop/img/footer/square/boost.jpg`
		},
		{
			name: "Grabpay",
			img: `${bannerImgUrl}/desktop/img/footer/square/grabpay.jpg`
		},
		{
			name: "Shopeepay",
			img: `${bannerImgUrl}/desktop/img/footer/square/shopeepay.jpg`
		}
	],
	4: [
		{
			name: "Kasikorn Bank",
			img: `${bannerImgUrl}/desktop/img/footer/square/kasikornbank.jpg`
		},
		{
			name: "Krung Thai Bank",
			img: `${bannerImgUrl}/desktop/img/footer/square/ktb.jpg`
		},
		{
			name: "Siam Commercial Bank",
			img: `${bannerImgUrl}/desktop/img/footer/square/scb.jpg`
		},
		{
			name: "Bangkok Bank",
			img: `${bannerImgUrl}/desktop/img/footer/square/bangkokbank.jpg`
		},
		{
			name: "Bank of Ayudhya",
			img: `${bannerImgUrl}/desktop/img/footer/square/ayudhya.jpg`
		},
		{
			name: "Promtpay",
			img: `${bannerImgUrl}/desktop/img/footer/square/promptpay.jpg`
		},
		{
			name: "TrueMoney",
			img: `${bannerImgUrl}/desktop/img/footer/square/truemoney.jpg`
		}
	],
	15: [
		{
			name: "BCA",
			img: `${bannerImgUrl}/desktop/img/footer/square/bca.jpg`
		},
		{
			name: "MANDIRI",
			img: `${bannerImgUrl}/desktop/img/footer/square/mandiri.jpg`
		},
		{
			name: "BRI",
			img: `${bannerImgUrl}/desktop/img/footer/square/bri.jpg`
		},
		{
			name: "PERMATA",
			img: `${bannerImgUrl}/desktop/img/footer/square/permata.jpg`
		},
		{
			name: "CIMB",
			img: `${bannerImgUrl}/desktop/img/footer/square/cimb.jpg`
		},
		{
			name: "BNI",
			img: `${bannerImgUrl}/desktop/img/footer/square/bni.jpg`
		},
		{
			name: "QRIS",
			img: `${bannerImgUrl}/desktop/img/footer/square/qris.jpg`
		},
		{
			name: "GOPAY",
			img: `${bannerImgUrl}/desktop/img/footer/square/gopay.jpg`
		},
		{
			name: "OVO",
			img: `${bannerImgUrl}/desktop/img/footer/square/ovo.jpg`
		},
		{
			name: "DANA",
			img: `${bannerImgUrl}/desktop/img/footer/square/dana.jpg`
		},
		{
			name: "SAKUKU",
			img: `${bannerImgUrl}/desktop/img/footer/square/sakuku.jpg`
		},
		{
			name: "LINKAJA",
			img: `${bannerImgUrl}/desktop/img/footer/square/linkaja.jpg`
		},
		{
			name: "SHOPEEPAY",
			img: `${bannerImgUrl}/desktop/img/footer/square/shopeepay.jpg`
		},
		{
			name: "DOKU",
			img: `${bannerImgUrl}/desktop/img/footer/square/doku.jpg`
		}
	]
};

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
