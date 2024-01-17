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
	other: 8
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
	ESports: 11
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
