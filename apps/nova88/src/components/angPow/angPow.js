import React, { useContext, useEffect, useRef, useState } from "react";
import { Redirect } from "@reach/router";
import { useTranslation } from "react-i18next";
import moment from "moment";

import AngPowAnimation from "./angPow.animation";
import AngPowEventModule from "./angPow.eventModule";
import { userInfoContext, loadingContext } from "../common/context";
import useDrawPrize from "./hook/useDrawPrize";
import { eventPeriod } from "./angPow.def";
import { isDateRange } from "../common/common";

const { startDate, endDate } = eventPeriod;
const currentDate = moment();
const isInPeriod = isDateRange(currentDate, startDate, endDate);

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

	//  TODOS:
	// function onImageLoaded(url, cb) {
	// 	const image = new Image();
	// 	image.src = url;

	// 	if (image.complete) {
	// 		// 圖片已經被載入
	// 		cb(image);
	// 	} else {
	// 		// 如果圖片未被載入，則設定載入時的回調
	// 		image.onload = function () {
	// 			cb(image);
	// 		};
	// 	}
	// }

	useEffect(() => {
		checkDrawPrize();
		getCustDrawPrizeList();
	}, [userInfo.isLogin]);

	if (loading) return null;

	if (!isInPeriod) return <Redirect to={`/${userInfo.langId}`} noThrow />;

	return (
		<div className="event">
			<img
				src={require(`../../styles/img/event/title_${userInfo.langId}.png`)}
				alt="title_en"
			/>
			<AngPowAnimation
				t={t}
				isLogin={userInfo.isLogin}
				langId={userInfo.langId}
				drawPrize={drawPrize}
				checkDrawPrize={checkDrawPrize}
				postDrawPrize={postDrawPrize}
				getCustDrawPrizeList={getCustDrawPrizeList}
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
