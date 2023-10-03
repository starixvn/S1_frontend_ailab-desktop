import React from "react";
import { defFilterType } from "./promotion.def";

const defPromoNavs = [
	{
		displayKey: "lbl_Promotion_All",
		value: defFilterType.all
	},
	{
		displayKey: "lbl_NewMember",
		value: defFilterType.firstDeposit
	},
	{
		displayKey: "lbl_Special",
		value: defFilterType.other
	},
	{
		displayKey: "lbl_Sportsbook",
		value: defFilterType.sportsbook
	},
	{
		displayKey: "lbl_Casino",
		value: defFilterType.liveCasino
	},
	{
		displayKey: "lbl_Promotion_Slot",
		value: defFilterType.slots
	},
	{
		displayKey: "lbl_PromoCode",
		value: defFilterType.specialBonus
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
			<div className="lobby-category">
				<div className="lobby-category-menu">
					{defPromoNavsFormat.map(item => (
						<div
							key={`promo-nav-${item.displayKey}`}
							className={`lobby-category-item ${
								item.value === selected ? "active" : ""
							}`}
							onClick={() => onClick(item.value)}>
							{t(item.displayKey).toUpperCase()}
						</div>
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
