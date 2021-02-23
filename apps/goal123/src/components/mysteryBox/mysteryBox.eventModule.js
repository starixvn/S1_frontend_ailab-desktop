import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { eventPeriod } from "./mysteryBox.def";
import config from "../../config";

const MysteryBoxEventModule = ({
	t,
	langId,
	drawPrizeList,
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
							{t("lbl_MysteryBox_Conditions")}
						</div>
						<div className="title">
							{t("lbl_MysteryBox_EventTitle")}
						</div>
						<div>
							{`${t("lbl_Start")}: ${
								eventPeriod.startDate
							} GMT+07:00`}
						</div>

						<div>{t("lbl_MysteryBox_MemberEligibility")}</div>
						<div className="eventInfo">
							<div className="title">
								{t("lbl_MysteryBoxw_OtherConditions")}
							</div>
							<div className="txt-lightgray">
								{t("lbl_MysteryBox_OtherConditions1")}
							</div>
							<div className="txt-lightgray">
								{t("lbl_MysteryBox_OtherConditions2")}
							</div>
							<div className="txt-lightgray">
								{t("lbl_MysteryBox_OtherConditions3")}
							</div>
							<div className="txt-lightgray">
								{t("lbl_MysteryBox_OtherConditions4")}
							</div>
							<div className="txt-lightgray">
								{t("lbl_MysteryBox_OtherConditions5")}
							</div>
						</div>

						<a
							className="more"
							target="_blank"
							href={`${config.t_and_cURL}/SiteSkin/${config.siteName}/ranking/${langId}3.html`}>
							{t("lbl_MoreDetails")}
						</a>

						{isLogin ? (
							<>
								<div className="tag">
									{t("lbl_MysteryBox_MysteryBoxRewards")}
								</div>
								{drawPrizeList.length ? (
									<table className="eventList">
										<tbody>
											<tr>
												<td>
													{t("lbl_Date")} (
													{moment().format("Z")})
												</td>
												<td>
													{t("lbl_MysteryBox_Awards")}{" "}
													(
													{t(
														`Currency_${currencyId}`
													)}{" "}
													)
												</td>
											</tr>
											{drawPrizeList.map(item => {
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
						) : null}
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

MysteryBoxEventModule.propTypes = {
	drawPrizeList: PropTypes.arrayOf(PropTypes.any).isRequired,
	currencyId: PropTypes.number,
	isLogin: PropTypes.bool.isRequired,
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired
};

MysteryBoxEventModule.defaultProps = {
	currencyId: 2
};

export default MysteryBoxEventModule;
