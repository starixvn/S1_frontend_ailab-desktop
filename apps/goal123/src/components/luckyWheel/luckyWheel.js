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
import { defPopBoxType } from "../common/popBox";
import { defEventId, eventPeriod } from "./luckyWheel.def";

import LuckyWheelTitle from "./luckyWheel.title";
import LuckyWheelAnimation from "./luckyWheel.Animation";
import LuckWheelEventModule from "./luckWheel.eventModule";
import { api_events_GetDisplayDrawPrizeList } from "../../service/api/events";
import useRetentionPromotion from "../retention/hooks/useRetentionPromotion";

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
				<div className="pop goldbox_pop wheel_pop">
					<button className="icon icon-close" onClick={closePopBox} />
					<div className="title">
						{t("lbl_LuckyWheel_popboxTitle1")}
					</div>

					{`${t("lbl_LuckyWheel_congratulations")}!`}

					<div className="content">
						{t("lbl_LuckyWheel_popboxDescription1", {
							prizeName
						})}
					</div>

					<div className="am">{prizeName}</div>
				</div>
			),
			[defDrawPrizeStatus.isJoin]: (
				<div className="pop goldbox_pop wheel_pop">
					<button className="icon icon-close" onClick={closePopBox} />
					<div className="title">
						{t("lbl_LuckyWheel_popboxTitle1")}
					</div>
					<div className="content">
						{t("lbl_LuckyWheel_popboxDescription2", {
							prizeName
						})}
					</div>

					<div className="am">{prizeName}</div>
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

		if (errorCode === 0) {
			openPrizePopBox(prizeName, defDrawPrizeStatus.canJoin);
		} else if (errorCode === defDrawPrizeStatus.isJoin) {
			openPrizePopBox(prizeName, defDrawPrizeStatus.isJoin);
		} else {
			errorPopBox(message || `[${errorCode}] error`, errorCode);
		}
	};

	const handleretention = () => {
		navigate(`/${userInfo.langId}/retention`);
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
		<div className="eventPage">
			{retentionBonusCode && (
				<div className="eventpage-tap">
					<>
						<button className="active">
							{t("lbl_LuckyWheel_title")}
						</button>
						<button onClick={handleretention}>
							{t("Label_Retention_SurpriseReward")}
						</button>
					</>
				</div>
			)}

			<LuckyWheelTitle t={t} langId={userInfo.langId} />

			<LuckyWheelAnimation
				displayDrawPrizeList={displayDrawPrizeList}
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
				drawPrize={drawPrize}
				onPostDrawPrize={onPostDrawPrize}
				openPrizePopBox={openPrizePopBox}
				checkDrawPrize={checkDrawPrize}
				errorPopBox={errorPopBox}
				setPopBox={setPopBox}
			/>

			<LuckWheelEventModule
				t={t}
				custDrawPrizeList={custDrawPrizeList}
				currencyId={userInfo.currencyId}
				isLogin={userInfo.isLogin}
				langId={userInfo.langId}
			/>
		</div>
	);
};

export default LuckyWheel;
