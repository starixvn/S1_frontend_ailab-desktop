import { isDateRange } from "@ailab-desktop/common";
import { defCurrencyList } from "../components/common/common";

export const changeAllowCurrenciesByTime = ({
	allowCurriesList,
	currencies,
	endTime
}) => {
	const oldCurrencyList = allowCurriesList ?? Object.values(defCurrencyList);
	const allowCurrencies = isDateRange({ endDate: endTime })
		? oldCurrencyList.filter(currency => !currencies.includes(currency))
		: oldCurrencyList;

	return allowCurrencies;
};

const allowedCurrencyList = {
	VIP: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.VND
	],
	affiliate: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.CNY,
		defCurrencyList.BDT,
		defCurrencyList.USD,
		defCurrencyList.INR,
		defCurrencyList.VND,
		defCurrencyList.KHM
	],
	exchange: [defCurrencyList.INR, defCurrencyList.BDT, defCurrencyList.USD],
	worldCup: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.INR
	],
	rewards: [defCurrencyList.MYR, defCurrencyList.THB, defCurrencyList.IDR],

	// ==== transfer ====
	transferFunds: [
		defCurrencyList.INR,
		defCurrencyList.BDT,
		defCurrencyList.USD
	],

	// ==== withdrawal method ====
	allbet: [
		defCurrencyList.IDR,
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.VND
	],

	// ==== products ====

	// sports
	sportsCricket: [defCurrencyList.BDT, defCurrencyList.INR],
	sportsVolleyball: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.USD,
		defCurrencyList.CNY,
		defCurrencyList.KHM
	],

	// slot
	slotAMB: [
		defCurrencyList.THB,
		defCurrencyList.USD,
		defCurrencyList.CNY,
		defCurrencyList.KHM
	],

	slotJoker: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.KHM,
		defCurrencyList.IDR,
		defCurrencyList.INR,
		defCurrencyList.BDT,
		defCurrencyList.CNY,
		defCurrencyList.USD
	],
	slotPegasus: [defCurrencyList.MYR],
	slot_FaChai: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.INR,
		defCurrencyList.BDT,
		defCurrencyList.USD,
		defCurrencyList.VND
	],
	slot_SimplePlay: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.BDT,
		defCurrencyList.USD,
		defCurrencyList.INR,
		defCurrencyList.VND,
		defCurrencyList.KHM
	],
	slot_MGPSW: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.BDT,
		defCurrencyList.USD,
		defCurrencyList.INR,
		defCurrencyList.VND,
		defCurrencyList.KHM
	],
	slotPGSoft: [
		defCurrencyList.IDR,
		defCurrencyList.THB,
		defCurrencyList.BDT,
		defCurrencyList.CNY,
		defCurrencyList.USD,
		defCurrencyList.KHM,
		defCurrencyList.INR,
		defCurrencyList.VND
	],
	slot_SkyWind: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.CNY,
		defCurrencyList.USD,
		defCurrencyList.INR,
		defCurrencyList.VND,
		defCurrencyList.KHM
	],
	casino_Amigo: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.BDT,
		defCurrencyList.IDR,
		defCurrencyList.CNY,
		defCurrencyList.USD,
		defCurrencyList.INR,
		defCurrencyList.VND,
		defCurrencyList.KHM
	],
	liveCasino_N2: [
		defCurrencyList.IDR,
		defCurrencyList.THB,
		defCurrencyList.BDT,
		defCurrencyList.CNY,
		defCurrencyList.USD,
		defCurrencyList.KHM,
		defCurrencyList.INR,
		defCurrencyList.VND
	],
	liveCasino_DG: [
		defCurrencyList.MYR,
		defCurrencyList.IDR,
		defCurrencyList.THB,
		defCurrencyList.CNY,
		defCurrencyList.USD,
		defCurrencyList.KHM,
		defCurrencyList.INR,
		defCurrencyList.VND,
		defCurrencyList.BDT
	],
	liveCasinoPlayTech: [
		defCurrencyList.MYR,
		defCurrencyList.IDR,
		defCurrencyList.THB,
		defCurrencyList.CNY,
		defCurrencyList.USD,
		defCurrencyList.KHM,
		defCurrencyList.INR,
		defCurrencyList.VND
	],
	liveCasino_AG: [
		defCurrencyList.MYR,
		defCurrencyList.IDR,
		defCurrencyList.THB,
		defCurrencyList.CNY,
		defCurrencyList.USD,
		defCurrencyList.KHM,
		defCurrencyList.INR,
		defCurrencyList.VND
	],
	casinoSA: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.BDT,
		defCurrencyList.USD,
		defCurrencyList.INR,
		defCurrencyList.VND,
		defCurrencyList.KHM
	],
	casino_MGPSW: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.BDT,
		defCurrencyList.USD,
		defCurrencyList.INR,
		defCurrencyList.VND,
		defCurrencyList.KHM
	],
	casino_WM: [
		defCurrencyList.MYR,
		defCurrencyList.USD,
		defCurrencyList.THB,
		defCurrencyList.CNY,
		defCurrencyList.IDR,
		defCurrencyList.INR,
		defCurrencyList.KHM,
		defCurrencyList.VND
	],
	casino_SkyWind: [
		defCurrencyList.MYR,
		defCurrencyList.IDR,
		defCurrencyList.CNY,
		defCurrencyList.USD,
		defCurrencyList.KHM,
		defCurrencyList.INR,
		defCurrencyList.VND
	],

	// game
	mPoker: [defCurrencyList.THB],
	amb: [defCurrencyList.THB],
	vGaming: [
		defCurrencyList.MYR,
		defCurrencyList.IDR,
		defCurrencyList.THB,
		defCurrencyList.BDT,
		defCurrencyList.CNY,
		defCurrencyList.USD,
		defCurrencyList.KHM,
		defCurrencyList.INR,
		defCurrencyList.VND
	],
	spaceman: [
		defCurrencyList.MYR,
		defCurrencyList.IDR,
		defCurrencyList.THB,
		defCurrencyList.BDT,
		defCurrencyList.CNY,
		defCurrencyList.USD,
		defCurrencyList.KHM,
		defCurrencyList.VND
	],

	// fishing
	fishingGod: [defCurrencyList.INR, defCurrencyList.VND],
	fishingHaiba: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.KHM,
		defCurrencyList.IDR,
		defCurrencyList.INR,
		defCurrencyList.BDT,
		defCurrencyList.CNY,
		defCurrencyList.USD
	],
	happyFish5: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.KHM,
		defCurrencyList.IDR,
		defCurrencyList.INR,
		defCurrencyList.BDT,
		defCurrencyList.CNY,
		defCurrencyList.USD
	],
	monsterAwaken: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.KHM,
		defCurrencyList.IDR,
		defCurrencyList.INR,
		defCurrencyList.BDT,
		defCurrencyList.CNY,
		defCurrencyList.USD
	],
	oneShot: [defCurrencyList.INR, defCurrencyList.VND],
	tyrantAndProncess: [defCurrencyList.INR],
	fishingOfSaviors: [defCurrencyList.INR],
	zombieParty: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.KHM,
		defCurrencyList.IDR,
		defCurrencyList.INR,
		defCurrencyList.BDT,
		defCurrencyList.CNY,
		defCurrencyList.USD,
		defCurrencyList.VND
	],
	alienHunter: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.KHM,
		defCurrencyList.IDR,
		defCurrencyList.INR,
		defCurrencyList.BDT,
		defCurrencyList.CNY,
		defCurrencyList.USD,
		defCurrencyList.VND
	],

	// lottery
	indo4d: [defCurrencyList.IDR],
	thaiLottery: [defCurrencyList.THB],
	fast3: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.KHM,
		defCurrencyList.IDR,
		defCurrencyList.INR,
		defCurrencyList.BDT,
		defCurrencyList.CNY,
		defCurrencyList.USD
	],

	// other products

	// slot & game
	SPRIBE: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.INR,
		defCurrencyList.USD,
		defCurrencyList.CNY,
		defCurrencyList.KHM,
		defCurrencyList.VND
	],
	slotPlayTech: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.CNY,
		defCurrencyList.USD,
		defCurrencyList.INR,
		defCurrencyList.VND,
		defCurrencyList.KHM
	],
	V8Poker: [
		defCurrencyList.MYR,
		defCurrencyList.USD,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.INR,
		defCurrencyList.CNY,
		defCurrencyList.KHM,
		defCurrencyList.VND,
		defCurrencyList.USDT
	]
};

export default allowedCurrencyList;
