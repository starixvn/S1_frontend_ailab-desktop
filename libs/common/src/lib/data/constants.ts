export const dragonBoatFestivalEventPeriod = {
	startDate: "2023-06-17 00:00:00",
	endDate: "2023-06-26 23:59:59"
};

// * Product 相關 =================
export enum lobbyCategoryEnum {
	SPORTS = 1,
	ESPORTS,
	CASINO,
	SLOTS,
	Poker,
	GAMES,
	FISHING,
	LOTTERY,
	EXCHANGE,
	FourD,
	Cockfighting
}

export enum memberTypeEnum {
	generalUser = 1,
	liveHost = 3
}

export enum menuActionEnum {
	blank = 1,
	redirect
}

export enum menuIconTypeEnum {
	Null,
	New
}

// * Slot 相關

export enum defTpGameType {
	All
}

export enum defCategory {
	Sports = 1,
	Slots,
	LiveCasino,
	Fishing,
	CockFighting,
	Lottery,
	VirtualSports,
	Poker,
	Crypto,
	Games,
	ESports
}

export const defLoginGameType = {
	returlGameUrl: 1,
	returnHtml: 2
};
