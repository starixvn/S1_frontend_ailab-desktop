export const defEventIcon = {
	new: "icon-newicon",
	live: "liveIcon"
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
	lottery_tcg: { end: "2021/09/11 11:00:00" }
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
