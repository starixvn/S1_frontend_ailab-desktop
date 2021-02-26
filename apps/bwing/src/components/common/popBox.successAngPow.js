import React, { useEffect, useState } from "react";

export default ({ closePopBox, t, drawPrizeDatas }) => {
	const { jackpot, prizeName } = drawPrizeDatas;

	const [jackpotDisplay, setJackpotDisplay] = useState(false);

	useEffect(() => {
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		const checkJackpot = async () => {
			if (jackpot === 1) {
				setJackpotDisplay(true);
				await delay(3000);
				setJackpotDisplay(false);
			}
		};

		checkJackpot();
	}, [jackpot]);

	if (jackpot === 1 && jackpotDisplay)
		return (
			<div className="gold active">
				<div className="textBox">
					<p className="bigtitle">{prizeName}</p>
				</div>
				<div className="moneyArea">
					<div className="box" />
					<div className="l" />
					<div className="l" />
					<div className="l" />
					<div className="l" />
					<div className="l" />
				</div>
			</div>
		);

	return (
		<div id="popup" className="angpaoPup active">
			<div className="pop eventpop active">
				<button onClick={closePopBox} className="icon icon-close" />
				<div className="title">{t("lbl_Congratulations")}</div>
				<div>{t("lbl_AngPow_CreditedAccount1")}</div>
				<div className="am">{prizeName}</div>
				<div>{t("lbl_AngPow_CreditedAccount2")}</div>
			</div>
		</div>
	);
};
