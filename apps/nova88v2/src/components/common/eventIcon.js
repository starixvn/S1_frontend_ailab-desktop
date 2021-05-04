export const defEventIcon = {
	new: "icon icon-new",
	live: "live"
};

export const defEventPeriod = {
	// oneGaming: { end: "2021/03/03 11:00:00" },
	// cq9: { end: "2021/03/06 00:00:00" },
	// referral: { end: "2021/02/05 11:00:00" },
	// icg: { end: "2021/02/05 11:00:00" },
	vip: { start: "2021/02/05 12:00:00" },
	n2: { start: "2021/03/02 12:00:00" },
	ranking: { start: "2021/03/01 12:00:00" },
	tv: { start: "2021/03/30 00:00:00" },
	casino_pt: { end: "2021/06/05 11:00:00" }
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
