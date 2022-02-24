export const defEventIcon = {
	new: "icon-newicon",
	live: "liveIcon",
	hot: "icon-hoticon"
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
	sportBti: { end: "2021/06/28 11:00:00" },
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
	tableGame: { start: "2022/03/24 11:00:00" }
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
