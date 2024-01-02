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
import { isConvert, number_format } from "../common/common";
import defPopBoxType from "../common/defPopBoxType";
import { popBoxContext, userInfoContext } from "../common/context";
import { DrawPopBox, PrizePopBox } from "./popBox";
import eventId from "../../datas/eventId";

const Task = () => {
	const { t } = useTranslation();

	const { setPopBox } = useContext(popBoxContext);
	const {
		userInfo: { langId, currencyId }
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

		navigate(`/${langId}/${targetPath}`);
	};

	const drawPrize = ({ isMulti }) => {
		if (isMulti) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Modal,
				className: "pop dragonegg-result-pop",
				content: <PrizePopBox isMulti={isMulti} />
			});
		} else {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Modal,
				className: "pop dragonegg-pop",
				content: <DrawPopBox />
			});
		}
	};

	useEffect(() => {
		getMissionList();
	}, [langId]);

	return (
		<div className="event-main">
			<div className="event-task">
				{missionList.length > 0 && (
					<div className="event-main-title">
						{t("lbl_DragonEgg_DailyTask")}
					</div>
				)}
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
								: ((progressAmount / goalAmount) * 100).toFixed(
										2
								  );

						return (
							<div className="event-task-item" key={missionName}>
								<div className="event-task-info">
									<div className="text">{missionName}</div>
									<div className="progress">
										<div
											className="progress-bar"
											style={{ width: `${percentage}%` }}
										/>
									</div>
									{type ===
									PromotionMissionTypeEnum.referFriend ? (
										<div className="progress-info">
											<span>{progressAmount}</span> /
											{goalAmount}
										</div>
									) : (
										<div className="progress-info">
											<span>
												{number_format(
													progressAmount,
													isConvert(currencyId),
													0
												)}
											</span>
											/
											{number_format(
												goalAmount,
												isConvert(currencyId),
												0
											)}
										</div>
									)}
								</div>
								<div
									className={classNames("event-task-inner", {
										active: isCompleted
									})}
									onClick={() => {
										if (!isCompleted)
											goMission({
												type,
												tpCategoryId
											});
									}}
								>
									<img
										className={`event-task-${
											eggCount === 1 ? "one" : "two"
										}`}
										src={`${bannerImgUrl}/desktop/img/event/dragonegg/daily-egg${
											eggCount === 1 ? "1" : "2"
										}${isCompleted ? "-ok" : ""}.png`}
										alt="daily_egg"
									/>
									<button
										className={classNames(
											"event-task-btn",
											{
												active: isCompleted
											}
										)}
									>
										{isCompleted
											? t("lbl_DragonEgg_Received")
											: t("lbl_DragonEgg_Go")}
									</button>
								</div>
							</div>
						);
					}
				)}
			</div>
			<div className="event-draw">
				<div className="event-draw-egg">
					<div className="event-draw-value">
						{t("lbl_DragonEgg_Eggs")}: <span>{eggTicket}</span>
					</div>
					<img
						className="event-draw-img"
						src={`${bannerImgUrl}/desktop/img/event/dragonegg/index-game-eggs.png`}
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
	);
};

export default Task;
