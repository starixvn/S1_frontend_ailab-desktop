import React, { memo } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { eventPeriod } from "./luckyWheel.def";

const LuckWheelEventModule = ({
	t,
	custDrawPrizeList,
	currencyId,
	isLogin
}) => {
	return (
		<div className="info">
			<div className="rewards title">
				<span>{t("lbl_LuckyWheel_conditions")}</span>

				<div className="title">{t("lbl_LuckyWheel_eventTitle")}</div>
				<div>
					{`${t("lbl_Start")}: ${eventPeriod.startDate} GMT+08:00`}
				</div>
				<div>{t("lbl_LuckyWheel_memberEligibility")}</div>
			</div>

			<div className="other title">
				<span>{t("lbl_LuckyWheel_otherConditions")}</span>

				<ul>
					<li>{t("lbl_LuckyWheel_otherConditions1")}</li>
					<li>{t("lbl_LuckyWheel_otherConditions2")}</li>
					<li>{t("lbl_LuckyWheel_otherConditions3")}</li>
					<li>{t("lbl_LuckyWheel_otherConditions4")}</li>
					<li>{t("lbl_LuckyWheel_otherConditions5")}</li>
				</ul>
			</div>

			{isLogin && (
				<>
					<div className="luckyBox title">
						<span>{t("lbl_LuckyWheel_eventSubTitle")}</span>
					</div>

					{custDrawPrizeList.length <= 0 ? (
						<div className="nodata icon icon-nodata">
							<div className="txt-white">{t("lbl_NoData")}</div>
						</div>
					) : (
						<div className="eventList">
							<div className="listBoxShadow">
								<div>
									<div>
										<div>
											{t("lbl_Date")} ({" "}
											{moment().format("Z")} )
										</div>
									</div>
									<div>
										{t("lbl_MysteryBox_Awards")} ({" "}
										{t(`Currency_${currencyId}`)} )
									</div>
								</div>

								{custDrawPrizeList.map(item => {
									return (
										<div key={`key-${item.drawTime}`}>
											<div>
												{moment(item.drawTime).format(
													"YYYY/MM/DD HH:mm:ss"
												)}
											</div>
											<div>
												<div>{item.prizeName}</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

LuckWheelEventModule.defaultProps = {
	currencyId: 2
};

LuckWheelEventModule.propTypes = {
	t: PropTypes.func.isRequired,
	custDrawPrizeList: PropTypes.arrayOf(PropTypes.any).isRequired,
	currencyId: PropTypes.number,
	isLogin: PropTypes.bool.isRequired
};

export default memo(LuckWheelEventModule);
