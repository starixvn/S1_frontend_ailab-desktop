import React, { useContext } from "react";
import { navigate } from "gatsby";
import { isDateRange } from "@ailab-desktop/common";
import { userInfoContext } from "../common/context";
import Task from "./task";
import Blessing from "./blessing";
import History from "./history";
import Info from "./info";
import allowedCurrencyList from "../../datas/allowedCurrencyList";
import { eventPerios } from "../../datas/eventDef";

const DragonEgg = () => {
	const {
		userInfo: { isLogin, langId, currencyId }
	} = useContext(userInfoContext);

	if (
		!(
			isDateRange(eventPerios.dragonEgg) &&
			allowedCurrencyList.dragonEgg.includes(currencyId)
		)
	) {
		navigate(`/${langId}`);
	}

	return (
		<main className={`dragonegg-event ${langId}`}>
			{isLogin && (
				<>
					<Task />
					<Blessing />
					<History />
				</>
			)}
			<Info />
		</main>
	);
};

export default DragonEgg;
