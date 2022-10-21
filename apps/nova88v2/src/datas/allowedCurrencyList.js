import { defCurrencyList } from "../components/common/common";

const allowedCurrencyList = {
	VIP: [defCurrencyList.MYR, defCurrencyList.THB, defCurrencyList.IDR],
	affiliate: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.CNY
	],
	exchange: [defCurrencyList.INR, defCurrencyList.BDT],
	worldCup: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.INR
	],
	rewards: [defCurrencyList.MYR, defCurrencyList.THB, defCurrencyList.IDR],

	// ====products====

	// slot
	slotAMB: [defCurrencyList.THB, defCurrencyList.USD, defCurrencyList.CNY],
	slotSaba: [
		defCurrencyList.IDR,
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.BDT,
		defCurrencyList.CNY,
		defCurrencyList.USD
	],

	// poker
	oneGame: [
		defCurrencyList.IDR,
		defCurrencyList.MYR,
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

	// kelo
	indo4d: [defCurrencyList.IDR]
};

export default allowedCurrencyList;
