import { defCurrencyList } from "../common/common";
import { bannerImgUrl } from "../../config";

export const allowCurrencies = [
	defCurrencyList.MYR,
	defCurrencyList.THB,
	defCurrencyList.IDR,
	defCurrencyList.VND
];

export const defbanner = langId => [
	{
		url: `${bannerImgUrl}/desktop/img/vintage${
			langId ? `-${langId}` : langId
		}.png`,
		level: 1,
		levelText: "vintage"
	},
	{
		url: `${bannerImgUrl}/desktop/img/silver${
			langId ? `-${langId}` : langId
		}.png`,
		level: 2,
		levelText: "silver"
	},
	{
		url: `${bannerImgUrl}/desktop/img/gold${
			langId ? `-${langId}` : langId
		}.png`,
		level: 3,
		levelText: "gold"
	},
	{
		url: `${bannerImgUrl}/desktop/img/titanium${
			langId ? `-${langId}` : langId
		}.png`,
		level: 4,
		levelText: "titanium"
	},
	{
		url: `${bannerImgUrl}/desktop/img/diamond${
			langId ? `-${langId}` : langId
		}.png`,
		level: 5,
		levelText: "diamond"
	},
	{
		url: `${bannerImgUrl}/desktop/img/nova${
			langId ? `-${langId}` : langId
		}.png`,
		level: 6,
		levelText: "nova"
	}
];

export const defPageClubImg = [
	{
		url: `${bannerImgUrl}/desktop/img/vip1.png`,
		displayKey: "lbl_Vintage_Club",
		alt: "vip01"
	},
	{
		url: `${bannerImgUrl}/desktop/img/vip2.png`,
		displayKey: "lbl_Silver_Club",
		alt: "vip02"
	},
	{
		url: `${bannerImgUrl}/desktop/img/vip3.png`,
		displayKey: "lbl_Gold_Club",
		alt: "vip03"
	},
	{
		url: `${bannerImgUrl}/desktop/img/vip4.png`,
		displayKey: "lbl_Titanium_Club",
		alt: "vip04"
	},
	{
		url: `${bannerImgUrl}/desktop/img/vip5.png`,
		displayKey: "lbl_Diamond_Club",
		alt: "vip05"
	},
	{
		url: `${bannerImgUrl}/desktop/img/vip6.png`,
		displayKey: "lbl_Nova_Club",
		alt: "vip06"
	}
];
