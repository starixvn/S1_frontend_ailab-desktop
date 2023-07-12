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
	exchange: [defCurrencyList.INR, defCurrencyList.BDT, defCurrencyList.USD],
	worldCup: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.INR
	],
	rewards: [defCurrencyList.MYR, defCurrencyList.THB, defCurrencyList.IDR],
	sportsCricket: [defCurrencyList.BDT, defCurrencyList.INR],
	sportsVolleyball: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.USD,
		defCurrencyList.CNY,
		defCurrencyList.KHM
	],

	// ==== withdrawal method ====
	bankCard: [
		defCurrencyList.MYR,
		defCurrencyList.THB,
		defCurrencyList.IDR,
		defCurrencyList.INR,
		defCurrencyList.KHM
	],
	eWallet: [
		defCurrencyList.IDR,
		defCurrencyList.BDT,
		defCurrencyList.MYR,
		defCurrencyList.THB
	],
	allbet: [defCurrencyList.IDR, defCurrencyList.MYR, defCurrencyList.THB],

	// ==== products ====

	// slot
	slotAMB: [
		defCurrencyList.THB,
		defCurrencyList.USD,
		defCurrencyList.CNY,
		defCurrencyList.KHM
	],
	casino_WM: [
		defCurrencyList.MYR,
		defCurrencyList.USD,
		defCurrencyList.THB,
		defCurrencyList.CNY,
		defCurrencyList.IDR,
		defCurrencyList.INR,
		defCurrencyList.KHM
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
		defCurrencyList.INR
	],

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
