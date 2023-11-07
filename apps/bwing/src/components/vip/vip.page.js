import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import PageEventListVn from "./components/pageEventList.vn";

const VipPage = ({ pageClubImg, currencyId, t, langId, vipBanner }) => {
	return (
		<div className="vip-table">
			<table className="vip-medal">
				<tbody>
					<tr>
						<td>
							{t("lbl_Vip_LastUpdated")} ：{" "}
							{moment(
								vipBanner?.lastUpdateTime,
								"YYYY-MM-DDThh:mm:ssZ"
							)
								.zone("+07:00")
								.format("MM/DD/YYYY")}
						</td>
						{pageClubImg.map(item => (
							<td key={`${item.displayKey}-${item.alt}`}>
								<img src={item.img} alt={item.alt} />
								{langId === "cs" ? (
									<>
										{t(item.displayKey)}
										<p>{t("lbl_Club")}</p>
									</>
								) : (
									t(item.displayKey)
								)}
							</td>
						))}
					</tr>
				</tbody>
			</table>
			<PageEventListVn currencyId={currencyId} vipBanner={vipBanner} />
		</div>
	);
};

VipPage.propTypes = {
	pageClubImg: PropTypes.arrayOf(PropTypes.object).isRequired,
	currencyId: PropTypes.number.isRequired,
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	vipBanner: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default VipPage;
