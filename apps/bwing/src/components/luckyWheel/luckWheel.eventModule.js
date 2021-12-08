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
		<div className="luckyModule">
			<div>
				<div className="corner" />

				<div className="moduleCenter">
					<div>
						<div className="tag">
							{t("luckyWheel.lbl_conditions")}
						</div>
						<div className="title txt-yellow2">
							{t("luckyWheel.lbl_eventTitle")}
						</div>
						<div>
							{`${t("lbl_Start")}: ${
								eventPeriod.startDate
							} GMT+07:00`}
						</div>
						<div>{t("luckyWheel.lbl_memberEligibility")}</div>
						<div className="txt-yellow2">
							{t("luckyWheel.lbl_otherConditions")}
						</div>
						<div>{t("luckyWheel.lbl_otherConditions1")}</div>
						<div>{t("luckyWheel.lbl_otherConditions2")}</div>
						<div>{t("luckyWheel.lbl_otherConditions3")}</div>
						<div>{t("luckyWheel.lbl_otherConditions4")}</div>
						<div>{t("luckyWheel.lbl_otherConditions5")}</div>
					</div>
				</div>

				{isLogin && (
					<div className="moduleCenter">
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
											{t("lbl_MysteryBox_Awards")} (
											{t(`Currency_${currencyId}`)})
										</td>
									</tr>

									{custDrawPrizeList.map(item => {
										return (
											<tr key={`key-${item.drawTime}`}>
												<td>
													{moment(
														item.drawTime
													).format(
														"YYYY/MM/DD HH:mm:ss"
													)}
												</td>
												<td>
													<div>{item.prizeName}</div>
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
					</div>
				)}

				<div className="corner" />
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
