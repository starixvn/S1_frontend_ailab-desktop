import React, { memo } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { eventPeriod, eventPeriod_minDeposit } from "./luckyWheel.def";
import { isDateRange } from "../common/common";

const LuckWheelEventModule = ({
	t,
	custDrawPrizeList,
	currencyId,
	isLogin
}) => {
	return (
		<div className="eventModule">
			<div>
				<div className="arrow-top">
					<div className="border" />
				</div>
				<div className="arrow-left" />
				<div className="moduleCenter">
					<div>
						<div className="tag">
							{t("luckyWheel.lbl_conditions")}
						</div>

						<div className="title">
							{t("luckyWheel.lbl_eventTitle")}
						</div>

						<div>
							{`${t("lbl_Start")}: ${
								eventPeriod.startDate
							} GMT+07:00`}
						</div>

						<div>{t("luckyWheel.lbl_memberEligibility")}</div>

						{isDateRange(
							eventPeriod_minDeposit.startDate,
							null
						) && (
							<div>
								{t("luckyWheel.lbl_MinDeposit", {
									amount: "50,000"
								})}
							</div>
						)}

						<div className="eventInfo">
							<div className="title">
								{t("luckyWheel.lbl_otherConditions")}
							</div>

							<div className="txt-lightgray">
								{t("luckyWheel.lbl_otherConditions1")}
							</div>
							<div className="txt-lightgray">
								{t("luckyWheel.lbl_otherConditions2")}
							</div>
							<div className="txt-lightgray">
								{t("luckyWheel.lbl_otherConditions3")}
							</div>
							<div className="txt-lightgray">
								{t("luckyWheel.lbl_otherConditions4")}
							</div>
							<div className="txt-lightgray">
								{t("luckyWheel.lbl_otherConditions5")}
							</div>
						</div>

						{isLogin && (
							<>
								<div className="tag">
									{t("luckyWheel.lbl_eventSubTitle")}
								</div>

								{custDrawPrizeList.length ? (
									<table className="eventList">
										<tbody>
											<tr>
												<td>
													{t("lbl_Date")} (
													{moment().format("Z")})
												</td>
												<td>
													{t("lbl_MysteryBox_Awards")}
													(
													{t(
														`Currency_${currencyId}`
													)}
													)
												</td>
											</tr>

											{custDrawPrizeList.map(item => {
												return (
													<tr
														key={`key-${item.drawTime}`}>
														<td>
															{moment(
																item.drawTime
															).format(
																"YYYY/MM/DD HH:mm:ss"
															)}
														</td>
														<td>
															<div>
																{item.prizeName}
															</div>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								) : (
									<div className="nodata icon icon-nodata">
										<div className="txt-white">
											{t("lbl_NoData")}
										</div>
									</div>
								)}
							</>
						)}
					</div>
				</div>
				<div className="arrow-right" />
				<div className="arrow-bottom">
					<div className="border" />
				</div>
			</div>
		</div>
	);
};

LuckWheelEventModule.defaultProps = {
	currencyId: 51
};

LuckWheelEventModule.propTypes = {
	t: PropTypes.func.isRequired,
	custDrawPrizeList: PropTypes.arrayOf(PropTypes.any).isRequired,
	currencyId: PropTypes.number,
	isLogin: PropTypes.bool.isRequired
};

export default memo(LuckWheelEventModule);
