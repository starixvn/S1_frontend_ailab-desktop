export const promoStatus = {
	running: 1,
	Canceled: 2,
	Expiry: 3,
	Fulfill: 4,
	TransferOut: 5
};

export const defPromotionType = {
	firstDeposit: 1,
	redeposit: 2,
	freeBet: 3,
	walletBonus: 5,
	rebate: 6,
	cashback: 7,
	retentionFreeBet: 9,
	specialBonus: 9001,
	other: 8,
	missionBonus: 11
};

export const defBonusType = {
	percentage: 1,
	amount: 2
};

export const defWalletType = {
	Transfer: 0,
	Seamless: 1
};

export const defCategoryId = {
	BonusWallet: 0,
	Slots: 1,
	LiveCasino: 2,
	Fish: 3,
	SabaSports: 4,
	Lottery: 5,
	Sports: 6,
	PtSlots: 7,
	PtLiveCasino: 8,
	SBSW: 9,
	// Mega888SlotRNGFishing 沒有用到
	ESports: 11,
	// 10/17/24 新增
	SportAndSlot: 16,
	SlotAndLiveCasino: 17,
	LiveCasinoAndSport: 18,
	ALLCategory: 19
};

export const defFilterType = {
	all: "all",
	expiry: "expiry",
	firstDeposit: "firstDeposit",
	other: "other",
	sportsbook: "sportsbook",
	liveCasino: "liveCasino",
	slots: "slots",
	specialBonus: "specialBonus"
};

export const promotionPeriodType = {
	Daily: 1,
	Weekly: 2,
	Monthly: 3
};

export const defCategory = {
	Sports: 1,
	Slots: 2,
	LiveCasino: 3,
	Fishing: 4,
	CockFighting: 5,
	Lottery: 6,
	VirtualSports: 7,
	Poker: 8,
	Crypto: 9,
	Games: 10,
	ESports: 11
};
