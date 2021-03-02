export const defEventIcon = {
	new: "icon-newicon",
	live: "liveIcon"
};

export const defEventPeriod = {
	cq9: { end: "2021/03/06 00:00:00" },
	referral: { end: "2021/02/05 11:00:00" },
	icg: { end: "2021/02/05 11:00:00" },
	one789: { end: "2021/01/22 11:00:00" },
	v8Poker: { end: "2021/03/06 00:00:00" },
	n2Live: { start: "2021/03/02 12:00:00" }
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
