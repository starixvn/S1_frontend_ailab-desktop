export const defEventIcon = {
	new: "newicon",
	live: "liveicon",
	hot: "hoticon"
};

export const defEventPeriod = {
	cq9: { end: "2021/03/06 00:00:00" },
	referral: {
		start: "2021/03/08 00:00:00",
		end: "2021/04/08 11:00:00"
	},
	icg: { end: "2021/02/05 11:00:00" },
	vip: { start: "2021/02/05 12:00:00" },
	one789: { end: "2021/01/22 11:00:00" },
	v8Poker: { end: "2021/03/06 00:00:00" },
	casino_pt: { end: "2021/06/20 11:00:00" },
	casino_ji: { end: "2021/08/21 11:00:00" },
	sportBti: { end: "2022/07/01 11:00:00" },
	KingMaker: { end: "2021/07/08 11:00:00" },
	liveCasino_pt: { end: "2021/07/08 11:00:00" },
	mgpsw: { end: "2021/08/22 11:00:00" },
	lottery_tcg: { end: "2021/09/11 11:00:00" },
	casino_RedTiger: { end: "2021/12/15 11:00:00" },
	casino_NetEnt: { end: "2021/12/15 11:00:00" },
	casino_AdvantPlay: { end: "2022/02/25 11:00:00" },
	liveCasino_evo: { end: "2021/12/15 11:00:00" },
	liveCasino_pp: {
		start: "2021/11/10 10:00:00",
		end: "2021/12/31 22:59:59"
	},
	promo: { start: "2021/11/11 11:00:00" },
	xmas: { end: "2022/01/03 11:00:00" },
	newYear: { start: "2022/01/27 10:59:59", end: "2022/02/16 10:59:59" },
	casino_Habanero: { end: "2022/04/15 11:00:00" },
	tableGame: { end: "2022/03/24 11:00:00" },
	game_virtualGame: { end: "2022/04/24 11:00:00" },
	sports_virtualSports: { end: "2022/04/24 11:00:00" },
	liveCasino_mg: { end: "2022/08/08 11:00:00" },
	sportSbo: { end: "2022/08/08 11:00:00" },
	worldCup_new: { end: "2022/08/28 23:59:59" },
	worldCup_hot: { start: "2022/08/29 00:00:00", end: "2022/12/18 23:59:59" },
	skywind: { end: "2022/12/08 11:00:00" },
	game_MaxGame: { end: "2022/10/13 11:00:00" },
	casino_SimplePlay: { end: "2022/11/13 11:00:00" },
	GPI_Lottery: { end: "2023/02/11 11:00:00" },
	yee_bet: { end: "2023/03/10 12:00:00" },
	ap_mini_game: { end: "2024/03/10 12:00:00" },
	TFGaming: { end: "2023/06/30 12:00:00" },
	slot_nextspin: { end: "2023/08/12 22:59:59" },
	IM: { end: "2023/09/28 23:59:59" },
	slot_endorphina: { end: "2023/10/25 23:59:59" },
	slot_fachai: { end: "2023/12/31 23:59:59" },
	slot_bng: { end: "2024/01/11 23:59:59" },
	fishing_Zombie_Party: { end: "2023/11/05 23:59:59" },
	fishing_Alien_Hunter: { end: "2023/11/05 23:59:59" },
	PNG: { end: "2023/11/05 23:59:59" },
	slot_NoLimitCity: { end: "2024/01/11 23:59:59" },
	slot_amigo: { end: "2023/12/31 23:59:59" },
	GA_CockFighting: { end: "2024/05/01 23:59:59" },
	game_93Connect: { end: "2024/04/21 23:59:59" }
};

export const showEventIcon = ({ icon, period }) => {
	if (!period) return "";
	const startDate = period.start
		? new Date(`${period.start} GMT+0800`)
		: null;
	const endDate = period.end ? new Date(`${period.end} GMT+0800`) : null;
	const now = new Date();

	if (
		icon &&
		((startDate && !endDate && now > startDate) ||
			(!startDate && endDate && now < endDate) ||
			(startDate && endDate && now > startDate && now < endDate))
	) {
		return icon;
	}
	return "";
};
