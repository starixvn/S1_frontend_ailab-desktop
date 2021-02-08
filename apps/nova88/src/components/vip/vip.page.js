import React from "react";
import PropTypes from "prop-types";
import { currencyCode } from "../../datas/countryCode";
import { isConvert } from "../common/common";
import PageEventListMyr from "./components/pageEventList.myr";
import PageEventListTh from "./components/pageEventList.th";
import PageEventListId from "./components/pageEventList.id";

const VipPage = ({ pageClubImg, currencyId, t }) => {
	return (
		<div className="vipPage">
			<table className="medal">
				<tbody>
					<tr>
						<td />
						{pageClubImg.map(item => (
							<td key={`${item.displayKey}-${item.alt}`}>
								<img src={item.url} alt={item.alt} />

								{t(item.displayKey)}
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
	const _isConvert = isConvert(currencyId);
	if (currencyId === currencyCode.TH)
		return (
			<PageEventListTh currencyId={currencyId} isConvert={_isConvert} />
		);

	if (currencyId === currencyCode.ID)
		return (
			<PageEventListId currencyId={currencyId} isConvert={_isConvert} />
		);

	return <PageEventListMyr currencyId={currencyId} isConvert={_isConvert} />;
};

VipPage.propTypes = {
	pageClubImg: PropTypes.arrayOf(PropTypes.object).isRequired,
	currencyId: PropTypes.number.isRequired
};

export default VipPage;
