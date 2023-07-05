import React from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";
import { currencyIdToTimeZone, defCurrencyList } from "../common/common";
import TableInfo from "./components/tableInfo";

const VipTable = ({
	t,
	pageClubImg,
	currencyId,
	langId,
	userInfo,
	vipBanner
}) => {
	return (
		<div className="vipPage">
			<table className="medal">
				<tbody>
					<tr>
						<td>
							{t("lbl_Vip_LastUpdated")} ：{" "}
							{moment(
								vipBanner?.lastUpdateTime,
								"YYYY-MM-DDThh:mm:ssZ"
							)
								.zone(
									currencyIdToTimeZone[
										userInfo.currencyId ??
											defCurrencyList.MYR
									]
								)
								.format("MM/DD/YYYY")}
						</td>
						{pageClubImg.map(item => (
							<td key={`${item.displayKey}-${item.alt}`}>
								<img src={item.url} alt={item.alt} />
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

			{vipBanner && (
				<TableInfo currencyId={currencyId} vipBanner={vipBanner} />
			)}
		</div>
	);
};

VipTable.propTypes = {
	t: PropTypes.func.isRequired,
	pageClubImg: PropTypes.arrayOf(PropTypes.object).isRequired,
	currencyId: PropTypes.number.isRequired,
	langId: PropTypes.string.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	vipBanner: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default VipTable;
