import React, { useRef, useEffect, useContext, useMemo } from "react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { isDateRange } from "@ailab-desktop/common";
import {
	useDrawPrizeFetcher,
	defDrawPrizeStatus
} from "../hook/useDrawPrizeFetcher";
import { useDataApi } from "../hook/useDataApi";
import { getCurrencyCode } from "../common/common";
import usePopBox from "../hook/usePopBox";
import { userInfoContext, loadingContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import { defEventId, eventPeriod, CURRENCY_PERMISSION } from "./luckyWheel.def";

import { api_events_GetDisplayDrawPrizeList } from "../../service/api/events";

import LuckyWheelTitle from "./luckyWheel.title";
import LuckyWheelAnimation from "./luckyWheel.Animation";
import LuckWheelEventModule from "./luckWheel.eventModule";

const { startDate, endDate } = eventPeriod;
const isInPeriod = isDateRange(startDate, endDate);

const LuckyWheel = () => {
	const { t } = useTranslation();
	const isMountedRef = useRef(null);
	const { userInfo } = useContext(userInfoContext);
	const { loading } = useContext(loadingContext);
	const { errorPopBox, setPopBox, closePopBox } = usePopBox();

	const currencyId = useMemo(
		() => userInfo?.currencyId ?? getCurrencyCode(userInfo.langId)
	);

	const isPassCurrencyIdPermission = CURRENCY_PERMISSION.includes(currencyId);

	const { drawPrize, custDrawPrizeList, postDrawPrize, checkDrawPrize } =
		useDrawPrizeFetcher({ defEventId, isMountedRef });

	const [{ data: displayDrawPrizeList }, getDisplayDrawPrizeList] =
		useDataApi([], api_events_GetDisplayDrawPrizeList);

	const openPrizePopBox = (prizeName, type) => {
		const contents = {
			[defDrawPrizeStatus.canJoin]: (
				<div className="pop wheelPop active">
					<div className="animation active">
						<div className="coin" />
						<div className="coin" />
						<div className="coin" />
						<div className="coin" />
						<div className="coin" />
					</div>
					<div className="active">
						<button
							className="icon icon-close"
							onClick={() => closePopBox()}
						/>

						<div className="title">
							{t("lbl_LuckyWheel_popboxTitle")}
						</div>
						<div>
							{t("lbl_LuckyWheel_popboxDescription1", {
								prizeName
							})}
						</div>
						<div className="am">{prizeName}</div>
					</div>
				</div>
			),
			[defDrawPrizeStatus.isJoin]: (
				<div className="pop wheelPop active">
					<div className="animation active">
						<div className="coin" />
						<div className="coin" />
						<div className="coin" />
						<div className="coin" />
						<div className="coin" />
					</div>
					<div className="active">
						<button
							className="icon icon-close"
							onClick={() => closePopBox()}
						/>

						<div className="title">
							{t("lbl_LuckyWheel_popboxTitle")}
						</div>
						<div>
							{t("lbl_LuckyWheel_popboxDescription2", {
								prizeName
							})}
						</div>
						<div className="am">{prizeName}</div>
					</div>
				</div>
			)
		};

		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Modal,
			closePopBox,
			content: contents[type]
		});
	};

	const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

	const onPostDrawPrize = async () => {
		const postDrawPrizePromise = postDrawPrize();

		const [drawPrizeResponse] = await Promise.all([
			postDrawPrizePromise,
			delay(5000)
		]);

		const {
			errorCode,
			message,
			data: { prizeName }
		} = drawPrizeResponse;

		if (errorCode === defDrawPrizeStatus.canJoin)
			return openPrizePopBox(prizeName, defDrawPrizeStatus.canJoin);

		if (errorCode === defDrawPrizeStatus.isJoin)
			return openPrizePopBox(prizeName, defDrawPrizeStatus.isJoin);

		return errorPopBox(message || `[${errorCode}] error`, errorCode);
	};

	useEffect(() => {
		getDisplayDrawPrizeList({ eventId: defEventId });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	if (loading) return null;

	if (!isPassCurrencyIdPermission || !isInPeriod) {
		navigate(`/${userInfo.langId}`);
		return [];
	}

	return (
		<div className="eventPage">
			<LuckyWheelTitle t={t} />

			<LuckyWheelAnimation
				displayDrawPrizeList={displayDrawPrizeList}
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
				drawPrize={drawPrize}
				openPrizePopBox={openPrizePopBox}
				onPostDrawPrize={onPostDrawPrize}
				checkDrawPrize={checkDrawPrize}
				errorPopBox={errorPopBox}
				setPopBox={setPopBox}
			/>

			<LuckWheelEventModule
				t={t}
				custDrawPrizeList={custDrawPrizeList}
				currencyId={currencyId}
				isLogin={userInfo.isLogin}
				langId={userInfo.langId}
			/>
		</div>
	);
};

export default LuckyWheel;
