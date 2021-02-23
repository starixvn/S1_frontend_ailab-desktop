import React, { useContext, useRef, useEffect } from "react";
import { Redirect } from "@reach/router";
import { useTranslation } from "react-i18next";
import { userInfoContext, loadingContext } from "../common/context";

import MysteryBoxAnimation from "./mysteryBox.animation";
import MysteryBoxEventModule from "./mysteryBox.eventModule";
import useDrawPrize from "./hook/useDrawPrize";
import { eventPeriod } from "./mysteryBox.def";
import { isDateRange } from "../common/common";

const { startDate, endDate } = eventPeriod;
const isInPeriod = isDateRange(startDate, endDate);

const MysteryBox = () => {
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
		checkDrawPrize();
		getCustDrawPrizeList();
	}, [userInfo.isLogin]);

	if (loading) return null;

	if (!isInPeriod) return <Redirect to={`/${userInfo.langId}`} noThrow />;

	return (
		<div className="event2">
			<div className="eventTitle">{t("lbl_MysteryBox")}</div>

			<MysteryBoxAnimation
				t={t}
				isLogin={userInfo.isLogin}
				drawPrize={drawPrize}
				checkDrawPrize={checkDrawPrize}
				postDrawPrize={postDrawPrize}
			/>

			<MysteryBoxEventModule
				t={t}
				drawPrizeList={drawPrizeList}
				currencyId={userInfo.currencyId}
				isLogin={userInfo.isLogin}
				langId={userInfo.langId}
			/>
		</div>
	);
};

export default MysteryBox;
