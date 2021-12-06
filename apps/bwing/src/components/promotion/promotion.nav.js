import React from "react";
import { defFilterType } from "./promotion.def";

const defPromoNavs = [
	{
		displayKey: "lbl_Promotion_All",
		value: defFilterType.all,
		className: "blueBorder"
	},
	{
		displayKey: "lbl_NewMember",
		value: defFilterType.firstDeposit,
		className: "blueBorder"
	},
	{
		displayKey: "lbl_Special",
		value: defFilterType.other,
		className: "blueBorder"
	},
	{
		displayKey: "lbl_Sportsbook",
		value: defFilterType.sportsbook,
		className: "blueBorder"
	},
	{
		displayKey: "lbl_Casino",
		value: defFilterType.liveCasino,
		className: "blueBorder"
	},
	{
		displayKey: "lbl_Promotion_Slot",
		value: defFilterType.slots,
		className: "blueBorder"
	},
	{
		displayKey: "lbl_PromoCode",
		value: defFilterType.specialBonus,
		className: "blueBorder"
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
			<div className="quickSelect">
				<div className="btnGroup promoType">
					{defPromoNavsFormat.map(item => (
						<button
							key={`promo-nav-${item.displayKey}`}
							className={
								item.value === selected
									? item.selectedClass
										? item.selectedClass
										: "blueGradient"
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
					<div className="inputBox-blue">
						<input
							value={specialCode}
							onKeyPress={onKeyPress}
							placeholder={t("lbl_PromoCode")}
							onChange={onChangeSpecialCode}
						/>
					</div>
					<div className="btnGroup">
						<button
							className="orange"
							onClick={onSetSpecialCodeSubmit}>
							{t("lbl_Submit")}
						</button>
					</div>
				</div>
			) : null}
		</>
	);
};
