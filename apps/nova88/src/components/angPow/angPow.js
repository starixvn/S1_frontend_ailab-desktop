import React, { useContext, useEffect, useRef } from "react";
import { navigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import moment from "moment";
import AngPowAnimation from "./angPow.animation";
import AngPowEventModule from "./angPow.eventModule";
import { userInfoContext, loadingContext } from "../common/context";
import useDrawPrize from "./hook/useDrawPrize";
import { eventPeriod } from "./angPow.def";
import { isDateRange } from "../common/common";

const AngPow = () => {
	const { t } = useTranslation();

	const isMountedRef = useRef(null);

	const {
		drawPrize,
		drawPrizeList,
		checkDrawPrize,
		postDrawPrize,
		getCustDrawPrizeList
	} = useDrawPrize({
		isMountedRef
	});

	const { userInfo } = useContext(userInfoContext);
	const { loading } = useContext(loadingContext);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const checkDate = () => {
			const { startDate, endDate } = eventPeriod;
			const currentDate = moment();

			if (!isDateRange(currentDate, startDate, endDate)) {
				navigate("/");
			}
		};

		checkDate();
		checkDrawPrize();
		getCustDrawPrizeList();
	}, [userInfo.isLogin]);

	if (loading) return null;

	return (
		<div className="event">
			<img
				src={require(`../../styles/img/event/title_${userInfo.langId}.png`)}
				alt="title_en"
			/>
			<AngPowAnimation
				t={t}
				isLogin={userInfo.isLogin}
				drawPrize={drawPrize}
				checkDrawPrize={checkDrawPrize}
				postDrawPrize={postDrawPrize}
			/>
			<AngPowEventModule
				drawPrizeList={drawPrizeList}
				currencyId={userInfo.currencyId}
				isLogin={userInfo.isLogin}
				t={t}
			/>
		</div>
	);
};

export default AngPow;
