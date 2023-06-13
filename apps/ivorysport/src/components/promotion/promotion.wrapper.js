import React, { useState } from "react";
import { promoPopBox } from "../common/context";
import PromotionInfoPopbox from "./promotionInfo.popbox";

export default ({ children }) => {
	const [promoBox, setPromoBox] = useState({
		isOpen: false
	});

	return (
		<promoPopBox.Provider value={{ promoBox, setPromoBox }}>
			{children}
			<PromotionInfoPopbox />
		</promoPopBox.Provider>
	);
};
