import React, { useRef, useEffect, useContext } from "react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { isDateRange } from "@ailab-desktop/common";
import {
	useDrawPrizeFetcher,
	defDrawPrizeStatus
} from "../hook/useDrawPrizeFetcher";
import { useDataApi } from "../hook/useDataApi";
import usePopBox from "../hook/usePopBox";
import { userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import { defEventId, eventPeriod } from "./luckyWheel.def";

import LuckyWheelTitle from "./luckyWheel.title";
import LuckyWheelAnimation from "./luckyWheel.Animation";
import LuckWheelEventModule from "./luckWheel.eventModule";

import { api_events_GetDisplayDrawPrizeList } from "../../service/api/events";
import useRetentionPromotion from "../retention/hooks/useRetentionPromotion";
import router from "../../router";

const { startDate, endDate } = eventPeriod;
const isInPeriod = isDateRange({ startDate, endDate });

const LuckyWheel = () => {
	const { t } = useTranslation();
	const isMountedRef = useRef(null);
	const { userInfo } = useContext(userInfoContext);
	const { errorPopBox, setPopBox, closePopBox } = usePopBox();
	const { retentionBonusCode } = useRetentionPromotion();

	const { drawPrize, custDrawPrizeList, postDrawPrize, checkDrawPrize } =
		useDrawPrizeFetcher({ defEventId, isMountedRef });

	const [{ data: displayDrawPrizeList }, getDisplayDrawPrizeList] =
		useDataApi([], api_events_GetDisplayDrawPrizeList);

	const openPrizePopBox = (prizeName, type) => {
		const contents = {
			[defDrawPrizeStatus.canJoin]: (
				<div id="popup" className="luckyboxPup active">
					<div className="pop eventpop active">
						<button
							className="icon icon-close"
							onClick={closePopBox}
						/>

						<div className="title">
							{t("lbl_LuckyWheel_popboxTitle1")}
						</div>

						<div>{t("lbl_LuckyWheel_congratulations")}!</div>

						{`${t("lbl_LuckyWheel_popboxDescription1", {
							prizeName
						})}`}

						<div className="am">{prizeName}</div>
					</div>
				</div>
			),
			[defDrawPrizeStatus.isJoin]: (
				<div id="popup" className="luckyboxPup active">
					<div className="pop eventpop active">
						<button
							className="icon icon-close"
							onClick={closePopBox}
						/>
						<div className="title">
							{t("lbl_LuckyWheel_popboxTitle1")}
						</div>

						{`${t("lbl_LuckyWheel_popboxDescription2", {
							prizeName
						})}`}

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

	const handleretention = () => {
		navigate(`/${userInfo.langId}/${router.retention.root}`);
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

	if (!isInPeriod) {
		navigate(`/${userInfo.langId}`);
		return [];
	}

	return (
		<>
			<LuckyWheelTitle t={t} />
			{retentionBonusCode && (
				<div className="eventpage-tap">
					<>
						<button className="active">
							{t("Label_Retention_LuckyWheel")}
						</button>
						<button onClick={handleretention}>
							{t("Label_Retention_SurpriseReward")}
						</button>
					</>
				</div>
			)}

			<LuckyWheelAnimation
				displayDrawPrizeList={displayDrawPrizeList}
				isLogin={userInfo.isLogin}
				drawPrize={drawPrize}
				onPostDrawPrize={onPostDrawPrize}
				openPrizePopBox={openPrizePopBox}
				checkDrawPrize={checkDrawPrize}
				errorPopBox={errorPopBox}
				setPopBox={setPopBox}
			/>

			<div className="poker" />

			<LuckWheelEventModule
				t={t}
				custDrawPrizeList={custDrawPrizeList}
				currencyId={userInfo.currencyId}
				isLogin={userInfo.isLogin}
				langId={userInfo.langId}
			/>
		</>
	);
};

export default LuckyWheel;
