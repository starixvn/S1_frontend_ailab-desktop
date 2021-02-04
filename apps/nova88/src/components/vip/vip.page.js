import React from "react";
import PropTypes from "prop-types";
import { currencyCode } from "../../datas/countryCode";

import PageEventListMyr from "./components/pageEventList.myr";
import PageEventListTh from "./components/pageEventList.th";
import PageEventListId from "./components/pageEventList.id";

const VipPage = ({ pageClubImg, currencyId }) => {
	return (
		<div className="vipPage">
			<table className="medal">
				<tbody>
					<tr>
						<td />
						{pageClubImg.map(item => (
							<td key={`${item.displayKey}-${item.alt}`}>
								<img src={item.url} alt={item.alt} />
								{item.displayKey}
							</td>
						))}
					</tr>
				</tbody>
			</table>

			<VipPageEventList currencyId={currencyId} />
		</div>
	);
};

const VipPageEventList = ({ currencyId }) => {
	if (currencyId === currencyCode.TH)
		return <PageEventListTh currencyId={currencyId} />;

	if (currencyId === currencyCode.ID)
		return <PageEventListId currencyId={currencyId} />;

	return <PageEventListMyr currencyId={currencyId} />;
};

VipPage.propTypes = {
	pageClubImg: PropTypes.arrayOf(PropTypes.object).isRequired,
	currencyId: PropTypes.number.isRequired
};

export default VipPage;
