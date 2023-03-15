import { defCurrencyList } from "../components/common/common";

const allowedCurrencyList = {
	VIP: [defCurrencyList.MYR, defCurrencyList.THB, defCurrencyList.IDR],
	affiliate: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.CNY,
		defCurrencyList.BDT,
		defCurrencyList.USD,
		defCurrencyList.INR
	],
	exchange: [defCurrencyList.INR, defCurrencyList.BDT],
	worldCup: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.INR
	],
	rewards: [defCurrencyList.MYR, defCurrencyList.THB, defCurrencyList.IDR],

	// ==== withdrawal method ====
	bankCard: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.INR
	],
	eWallet: [
		defCurrencyList.IDR,
		defCurrencyList.BDT,
		defCurrencyList.MYR,
		defCurrencyList.THB
	],

	// ==== products ====

	// slot
	slotAMB: [defCurrencyList.THB, defCurrencyList.USD, defCurrencyList.CNY],

	// poker
	oneGame: [
		defCurrencyList.MYR,
		defCurrencyList.IDR,
		defCurrencyList.THB,
		defCurrencyList.BDT,
		defCurrencyList.CNY,
		defCurrencyList.USD
	],

	// game
	mPoker: [defCurrencyList.THB],
	amb: [defCurrencyList.THB],

	// fishing
	fishingGod: [defCurrencyList.INR],
	oneShot: [defCurrencyList.INR],
	tyrantAndProncess: [defCurrencyList.INR],
	fishingOfSaviors: [defCurrencyList.INR],

	// lottery
	indo4d: [defCurrencyList.IDR],
	thaiLottery: [defCurrencyList.THB]
};

export default allowedCurrencyList;
