import React, { useRef, useEffect, useContext } from "react";
import { navigate } from "gatsby";
import { userInfoContext } from "../common/context";
import allowedCurrencyList from "../../datas/allowedCurrencyList";
import Intro from "./intro";
import Fixture from "./fixture";
import Event from "./event";
import BetBtn from "./betBtn";

const Main = () => {
	const { userInfo } = useContext(userInfoContext);

	useEffect(() => {
		const allowedCurrency = allowedCurrencyList.worldCup;

		if (!allowedCurrency.includes(userInfo.currencyId)) {
			navigate(`/${userInfo.langId}`);
		}
	}, [userInfo.currencyId]);

	const eventPageRef = useRef(null);
	const scrollToEvent = () => {
		if (eventPageRef && eventPageRef.current) {
			eventPageRef.current.scrollIntoView({
				behavior: "smooth"
			});
		}
	};

	return (
		<>
			<Intro scrollToEvent={scrollToEvent} />
			<div className="eventPage bottom" ref={eventPageRef}>
				<Fixture />
				<Event />
			</div>
			<BetBtn />
		</>
	);
};

export default Main;
