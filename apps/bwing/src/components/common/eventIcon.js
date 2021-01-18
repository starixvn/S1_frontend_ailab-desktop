export const defIconType = {
	new: "icon-newicon",
	live: "liveIcon"
};

export const defEventPeriod = {
	referral: { end: "2021/02/18 00:00:00" },
	icg: { end: "2021/02/18 00:00:00" },
	one789: { end: "2021/01/22 11:00:00" }
};

export const showPeriodIcon = ({ icon, period }) => {
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
