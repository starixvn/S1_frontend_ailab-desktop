import React from "react";
import WinnerID from "../../styles/img/vip/cny-winner-popup-id.jpg";
import WinnerTH from "../../styles/img/vip/cny-winner-popup-th.jpg";
import WinnerEN from "../../styles/img/vip/cny-winner-popup-en.jpg";
import WinnerCS from "../../styles/img/vip/cny-winner-popup-cs.jpg";

export default ({ langId, clickClose }) => {
	let img = null;
	if (langId === "cs") {
		img = WinnerCS;
	} else if (langId === "th") {
		img = WinnerTH;
	} else if (langId === "id") {
		img = WinnerID;
	} else {
		img = WinnerEN;
	}

	return (
		<div className="rankpop active">
			<button className="icon icon-close" onClick={clickClose} />
			<img src={img} alt="ranking winner" />
		</div>
	);
};
