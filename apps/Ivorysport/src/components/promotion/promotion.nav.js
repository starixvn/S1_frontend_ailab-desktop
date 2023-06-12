import React from "react";

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

const defPromoNavs = [
	{
		displayKey: "lbl_All",
		value: defFilterType.all,
		className: "blueBorder icon icon-icon32px_ALL",
		selectedClassName: "blue icon icon-icon32px_ALL"
	},
	{
		displayKey: "lbl_NewMember",
		value: defFilterType.firstDeposit,
		className: "blueBorder",
		selectedClassName: "blue"
	},
	{
		displayKey: "lbl_Special",
		value: defFilterType.other,
		className: "blueBorder",
		selectedClassName: "blue"
	},
	{
		displayKey: "lbl_Sportsbook",
		value: defFilterType.sportsbook,
		className: "blueBorder",
		selectedClassName: "blue"
	},
	{
		displayKey: "lbl_LiveCasino",
		value: defFilterType.liveCasino,
		className: "blueBorder",
		selectedClassName: "blue"
	},
	{
		displayKey: "lbl_Promotion_Slot",
		value: defFilterType.slots,
		className: "blueBorder",
		selectedClassName: "blue"
	},
	{
		displayKey: "lbl_PromoCode",
		value: defFilterType.specialBonus,
		className: "blueBorder",
		selectedClassName: "blue"
	}
];

export default ({
	t,
	userInfo,
	selected,
	onClick,
	specialCode,
	setSpecialCode,
	onSetSpecialCodeSubmit
}) => {
	const onChangeSpecialCode = e => {
		const trim = string =>
			string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
		setSpecialCode(trim(e.target.value));
	};

	const onKeyPress = e => {
		if (e.key === "Enter") onSetSpecialCodeSubmit();
	};

	const defPromoNavsFormat = defPromoNavs.filter(
		item => item.value !== defFilterType.specialBonus || userInfo.isLogin
	);

	return (
		<>
			<div className="promosSelect">
				<div className="btnGroup promoType">
					{defPromoNavsFormat.map(item => (
						<button
							key={`promo-nav-${item.displayKey}`}
							className={
								item.value === selected
									? item.selectedClassName
									: item.className
							}
							onClick={() => onClick(item.value)}>
							{t(item.displayKey).toUpperCase()}
						</button>
					))}
				</div>
			</div>
			{selected === defFilterType.specialBonus ? (
				<div className="specialBonus">
					<div className="inputBox-white">
						<input
							value={specialCode}
							onKeyPress={onKeyPress}
							placeholder={t("lbl_PromoCode")}
							onChange={onChangeSpecialCode}
						/>
					</div>

					<div className="btnGroup">
						<button
							className="btn-check"
							onClick={onSetSpecialCodeSubmit}>
							{t("lbl_Submit")}
						</button>
					</div>
				</div>
			) : null}
		</>
	);
};
