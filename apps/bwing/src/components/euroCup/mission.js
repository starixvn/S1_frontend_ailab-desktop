import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import { bannerImgUrl } from "../../config";
import path from "../../router";
import { numFormatToDigits } from "../common/common";
import { userInfoContext } from "../common/context";
import ProgressBar from "./components/ProgressBar";

const Mission = ({ tickets }) => {
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState(1);
	const numbers = Array.from({ length: 5 }, (_, index) => index + 1);
	const { promotionMission, cupEventPromotionMissionProgress } = tickets;
	const getProgressWidth = (cur, target) => {
		const percentage = (cur / target) * 100;
		return percentage > 100 ? "100%" : `${percentage}%`;
	};

	return (
		<div className="mission-box">
			<div className="mission-bar">
				{numbers.map(number => (
					<div
						className={classNames({
							active: activeTab === number && number !== 5,
							five: activeTab === number && number === 5
						})}
						onClick={() => setActiveTab(number)}
					>
						{t("lbl_CupEvent_Mission")} {number}
						{number < 5 && (
							<img
								src={`${bannerImgUrl}/desktop/img/event/eurocup/arrow-grey.png`}
								alt="arrow-grey"
							/>
						)}
					</div>
				))}
			</div>
			<div className="mission-item">
				<div
					className={classNames("mission-one", {
						close: activeTab !== 1
					})}
				>
					<div className="ticket-title">Get 1 ticket</div>
					<div className="subtitle">
						{t("lbl_CupEvent_Mission_Subtitle")}
					</div>
					<div className="progress">
						{promotionMission?.[0]?.isCompleted ? (
							<img
								src={`${bannerImgUrl}/desktop/img/event/eurocup/done-yellow.png`}
								alt="done-yellow"
							/>
						) : (
							<img
								src={`${bannerImgUrl}/desktop/img/event/eurocup/done-grey.png`}
								alt="done-grey"
							/>
						)}

						<div className="progress-bar">
							<div
								className="item"
								style={{
									width: promotionMission?.[0]?.isCompleted
										? "100%"
										: "50%"
								}}
							/>
							{/* 完成Register達到50% round加上active */}
							<div className="round active" />
						</div>
						<img
							src={`${bannerImgUrl}/desktop/img/event/eurocup/${
								promotionMission?.[0]?.isCompleted
									? "done-yellow"
									: "done-grey"
							}.png`}
							alt={
								promotionMission?.[0]?.isCompleted
									? "done-yellow"
									: "done-grey"
							}
						/>
					</div>
					<div className="state">
						<div>
							<img
								src={`${bannerImgUrl}/desktop/img/event/eurocup/register-icon.png`}
								alt="register-icon"
							/>
							<div>
								<span>{t("lbl_Completed")}</span>
								<span>
									{t("lbl_CupEvent_Mission_Register")}
								</span>
							</div>
						</div>
						<div>
							<img
								src={`${bannerImgUrl}/desktop/img/event/eurocup/verify-icon.png`}
								alt="verify-icon"
							/>
							<div>
								<span>{t("lbl_Completed")}</span>
								<span>{t("lbl_CupEvent_Mission_Verify")}</span>
							</div>
						</div>
					</div>
				</div>
				<div
					className={classNames("mission-two", {
						close: activeTab !== 2
					})}
				>
					<div className="ticket-title">Get 1 ticket</div>
					<div className="amount-item">
						<div className="money">
							<img
								src={`${bannerImgUrl}/desktop/img/event/eurocup/money-icon.png`}
								alt="money-icon"
							/>
							<div>
								<span>Make at least </span>
								<span>
									{numFormatToDigits(
										promotionMission?.[1]?.depositAmount,
										0
									)}{" "}
									VND
								</span>
								<span>accumulated deposit</span>
							</div>
							<button
								onClick={() =>
									navigate(
										`/${userInfo.langId}/${path.deposit.root}`
									)
								}
							>
								{t("lbl_Deposit")}
							</button>
						</div>
						<div className="progress">
							<div
								className="progress-bar"
								style={{
									width: getProgressWidth(
										cupEventPromotionMissionProgress?.depositAmount,
										promotionMission?.[1]?.depositAmount
									)
								}}
							/>
						</div>
						<div className="number">
							<div>Currently accumulated</div>
							<div>
								<span>
									{numFormatToDigits(
										cupEventPromotionMissionProgress?.depositAmount,
										0
									)}
								</span>{" "}
								/{" "}
								{numFormatToDigits(
									promotionMission?.[1]?.depositAmount,
									0
								)}{" "}
								VND
							</div>
						</div>
					</div>
				</div>
				<div
					className={classNames("mission-three", {
						close: activeTab !== 3
					})}
				>
					<div className="ticket-title">Get 1 ticket</div>
					<div className="amount-item">
						<div className="money">
							<img
								src={`${bannerImgUrl}/desktop/img/event/eurocup/money-icon.png`}
								alt="money-icon"
							/>
							<div>
								<span>Make at least </span>
								<span>10,000,000 VND</span>
								<span>accumulated deposit</span>
							</div>
							<button
								onClick={() =>
									navigate(
										`/${userInfo.langId}/${path.deposit.root}`
									)
								}
							>
								{t("lbl_Deposit")}
							</button>
						</div>
						<div className="progress">
							<div
								className="progress-bar"
								style={{
									width: getProgressWidth(
										cupEventPromotionMissionProgress?.depositAmount,
										promotionMission?.[2]?.depositAmount
									)
								}}
							/>
						</div>
						<div className="number">
							<div>Currently accumulated</div>
							<div>
								<span>
									{numFormatToDigits(
										cupEventPromotionMissionProgress?.depositAmount,
										0
									)}
								</span>{" "}
								/{" "}
								{numFormatToDigits(
									promotionMission?.[2]?.depositAmount,
									0
								)}{" "}
								VND
							</div>
						</div>
					</div>
				</div>
				<div
					className={classNames("mission-four", {
						close: activeTab !== 4
					})}
				>
					<div className="ticket-title">Get 2 ticket</div>
					<div className="subtitle">
						Recommend 3 new friends and at least one of the newly
						recommended friends must complete Task 1 and Task 2
					</div>
					<div className="sheet">
						<div className="sheet-title">
							<div>{t("lbl_ID")}</div>
							<div>{t("lbl_CupEvent_Mission")} 01</div>
							<div>{t("lbl_CupEvent_Mission")} 02</div>
						</div>
						<div>
							{cupEventPromotionMissionProgress?.affList?.map(
								({ accountName, mission1, mission2 }) => (
									<div className="sheet-item">
										<div className="user">
											{accountName}
										</div>
										<div
											className={classNames("check-box", {
												yellow: mission1
											})}
										/>
										<div
											className={classNames("check-box", {
												green: mission2
											})}
										/>
									</div>
								)
							)}
						</div>
					</div>
				</div>
				<div
					className={classNames("mission-five", {
						close: activeTab !== 5
					})}
				>
					<div className="ticket-title">Get 5 ticket</div>
					<div>
						<div className="subtitle">
							Complete 20 Euro 2024 bets settled at Saba Sport
							<span>
								Completed 20 EURO2024 settled bets with minimum
								1,000,000 VND per bet at Saba Sport before
								EURO2024 Quarter-finals
							</span>
						</div>
						<ProgressBar
							cur={
								cupEventPromotionMissionProgress?.completedBetCount
							}
							target={20}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
Mission.propTypes = {
	tickets: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Mission;
