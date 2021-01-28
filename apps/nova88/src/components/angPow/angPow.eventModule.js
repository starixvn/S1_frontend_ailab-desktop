import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const AngPowEventModule = ({ drawPrizeList, currencyId, isLogin, t }) => {
	return (
		<div className="eventModule">
			<div>
				<div className="arrow-top">
					<div className="border" />
				</div>
				<div className="arrow-left" />
				<div className="moduleCenter">
					<div>
						<div className="tag">{t("lbl_AngPow_Conditions")}</div>
						<div className="title">
							{t("lbl_AngPow_EventTitle")}
						</div>
						<div>
							{t("lbl_Start")}: 11-02-2021 00:00:00 GMT+8{" "}
							{t("lbl_End")}: 26-02-2021 23:59:59 GMT+8
						</div>
						<div>{t("lbl_AngPow_MemberEligibility")}</div>
						<div className="title txt-orange">
							{t("lbl_AngPow_OtherConditions")}
						</div>
						<div className="txt-lightgray">
							{t("lbl_AngPow_OtherConditions1")}
						</div>
						<div className="txt-lightgray">
							{t("lbl_AngPow_OtherConditions2")}
						</div>

						{isLogin ? (
							<>
								<div className="tag">
									{t("lbl_AngPow_MyAngPow")}
								</div>

								{drawPrizeList.length ? (
									<table className="eventList">
										<tbody>
											<tr>
												<td>
													{t("lbl_Date")} ( +08:00 )
												</td>
												<td>
													{t("lbl_AngPow_Awards")} (
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
																"YYYY-MM-DD HH:mm:ss"
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

AngPowEventModule.propTypes = {
	drawPrizeList: PropTypes.arrayOf(PropTypes.any).isRequired,
	currencyId: PropTypes.number,
	isLogin: PropTypes.bool.isRequired,
	t: PropTypes.func.isRequired
};

AngPowEventModule.defaultProps = {
	currencyId: 2
};
export default AngPowEventModule;
