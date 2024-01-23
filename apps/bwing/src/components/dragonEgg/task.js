import classNames from "classnames";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import {
	CategoryIdEnum,
	PromotionMissionTypeEnum,
	useGragonEgg
} from "@ailab-desktop/hooks";
import path from "../../router";
import { bannerImgUrl } from "../../config";
import { number_format } from "../common/common";
import { defPopBoxType } from "../common/defPopBoxType";
import { popBoxContext, userInfoContext } from "../common/context";
import { DrawPopBox, PrizePopBox } from "./popBox";
import eventId from "../../datas/eventId";

const Task = () => {
	const { t } = useTranslation();

	const { setPopBox } = useContext(popBoxContext);
	const {
		userInfo: { langId }
	} = useContext(userInfoContext);

	const { eggTicket, missionList, getMissionList } = useGragonEgg();

	const goMission = ({ type, tpCategoryId }) => {
		let targetPath = "";

		if (type === PromotionMissionTypeEnum.referFriend) {
			targetPath = path.referral.root;
		} else if (type === PromotionMissionTypeEnum.accumulateDeposit) {
			targetPath = path.deposit.root;
		} else if (tpCategoryId === CategoryIdEnum.sports) {
			targetPath = path.sports.root;
		} else if (tpCategoryId === CategoryIdEnum.slots) {
			targetPath = path.casino.root;
		} else if (tpCategoryId === CategoryIdEnum.liveCasino) {
			targetPath = path.liveCasino.root;
		}

		navigate(`/${targetPath}`);
	};

	const drawPrize = ({ isMulti }) => {
		if (isMulti) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Modal,
				className: "dragonegg-result-pop active",
				content: <PrizePopBox isMulti={isMulti} />
			});
		} else {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Modal,
				className: "dragonegg-pop",
				content: <DrawPopBox />
			});
		}
	};

	useEffect(() => {
		getMissionList();
	}, [langId]);

	return (
		<div className="event-main">
			<img
				src={`${bannerImgUrl}/desktop/img/event/dragonegg/daily_bg.png`}
				alt="daily_bg"
				className="event-daily-bg"
			/>
			<div className="event-task-wrapper">
				<div className="event-task">
					<div className="event-task-title">
						{missionList.length > 0
							? t("lbl_DragonEgg_DailyTask")
							: t("lbl_DragonEgg_DrawNow")}
					</div>
					{missionList.map(
						({
							type,
							eggCount,
							goalAmount,
							isCompleted,
							missionName,
							tpCategoryId,
							progressAmount
						}) => {
							const percentage =
								progressAmount > goalAmount
									? 100
									: (
											(progressAmount / goalAmount) *
											100
									  ).toFixed(2);

							return (
								<div
									className="event-task-item"
									key={missionName}
								>
									<img
										src={`${bannerImgUrl}/desktop/img/event/dragonegg/daily_egg${
											eggCount === 2 ? "-2" : ""
										}.png`}
										alt="daily_egg"
									/>
									<div className="event-task-info">
										<div className="text">
											{missionName}
										</div>
										<div className="progress">
											<div
												className="progress-bar"
												style={{
													width: `${percentage}%`
												}}
											/>
											{type ===
											PromotionMissionTypeEnum.referFriend ? (
												<div className="progress-info">
													{progressAmount} /
													{goalAmount}
												</div>
											) : (
												<div className="progress-info">
													{number_format({
														number: progressAmount,
														formatRequired: true,
														digits: 0
													})}
													/
													{number_format({
														number: goalAmount,
														formatRequired: true,
														digits: 0
													})}
												</div>
											)}
										</div>
									</div>
									<button
										className={classNames(
											"event-task-btn",
											{
												active: isCompleted
											}
										)}
										onClick={() => {
											if (!isCompleted)
												goMission({
													type,
													tpCategoryId
												});
										}}
									>
										{isCompleted
											? t("lbl_DragonEgg_Received")
											: t("lbl_DragonEgg_Go")}
									</button>
								</div>
							);
						}
					)}
				</div>
				<div className="event-draw">
					<div className="event-draw-egg">
						<div className="event-draw-value">{eggTicket}</div>
						<img
							src={`${bannerImgUrl}/desktop/img/event/dragonegg/draw_dragon.png`}
							alt="draw_dragon"
						/>
					</div>
					<div className="event-draw-btn">
						<button
							className={classNames("draw-single", {
								active: eggTicket > 0
							})}
							onClick={() => {
								if (eggTicket > 0)
									drawPrize({
										isMulti: false,
										eventId: eventId.dragonEgg
									});
							}}
						>
							{t("lbl_DragonEgg_DrawNow")}
						</button>
						<button
							className={classNames("draw-ten", {
								active: eggTicket >= 10
							})}
							onClick={() => {
								if (eggTicket >= 10)
									drawPrize({
										isMulti: true,
										eventId: eventId.dragonEgg
									});
							}}
						>
							{t("lbl_DragonEgg_ClickFor10")}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Task;
