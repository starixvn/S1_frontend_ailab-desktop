import React from "react";

export const defFilterType = {
	all: 0,
	expiry: 999,
	firstDeposit: 1,
	redeposit: 2,
	freeBet: 3,
	Rebate_and_cashback: "6_7",
	special_bonus: "special_bonus"
};

const defPromoNavs = [
	{
		displayKey: "lbl_All",
		value: defFilterType.all,
		className: "blueBorder icon icon-icon32px_ALL",
		selectedClassName: "blue icon icon-icon32px_ALL"
	},
	{
		displayKey: "lbl_PromotionCategory1",
		value: defFilterType.firstDeposit,
		className: "blueBorder",
		selectedClassName: "blue"
	},
	{
		displayKey: "lbl_FreeBet",
		value: defFilterType.freeBet,
		className: "blueBorder",
		selectedClassName: "blue"
	},
	{
		displayKey: "lbl_PromotionRebateAndCashback",
		value: defFilterType.Rebate_and_cashback,
		className: "blueBorder",
		selectedClassName: "blue"
	},
	{
		displayKey: "lbl_Redeposit_Promo",
		value: defFilterType.redeposit,
		className: "blueBorder",
		selectedClassName: "blue"
	},
	{
		displayKey: "lbl_SpecialBonus",
		value: defFilterType.special_bonus,
		className: "blueBorder",
		selectedClassName: "blue"
	},
	{
		displayKey: "lbl_Expired_Promo",
		value: defFilterType.expiry,
		className: "red",
		selectedClassName: "red"
	}
];

export default ({
	t,
	selected,
	onClick,
	specialCode,
	setSpecialCode,
	onSetSpecialCodeSubmit
}) => {
	const onChangeSpecialCode = e => {
		let trim = string =>
			string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
		setSpecialCode(trim(e.target.value));
	};

	return (
		<div className="quickSelect">
			<div className="btnGroup promoType">
				{defPromoNavs.map(item => (
					<>
						<button
							key={`promo-nav-${item.displayKey}`}
							className={
								item.value === selected
									? item.selectedClassName
									: item.className
							}
							onClick={() => onClick(item.value)}>
							{t(item.displayKey)}
						</button>
						{item.value === defFilterType.special_bonus &&
						selected === defFilterType.special_bonus ? (
							<div className="specialBonus">
								<div className="inputBox-white">
									<input
										value={specialCode}
										placeholder={t("lbl_SpecialBonusCode")}
										onChange={onChangeSpecialCode}
									/>
								</div>
								<button
									className="btn-check"
									onClick={onSetSpecialCodeSubmit}>
									{t("lbl_Submit")}
								</button>
							</div>
						) : null}
					</>
				))}
			</div>
		</div>
	);
};
