import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { currencyCode } from "../../datas/countryCode";
import { isConvert } from "../common/common";
import PageEventListMyr from "./components/pageEventList.myr";
import PageEventListTh from "./components/pageEventList.th";
import PageEventListId from "./components/pageEventList.id";
import path from "../../router";

const VipPage = ({
	pageClubImg,
	currencyId,
	t,
	langId,
	bottomImg,
	isLogin
}) => (
	<>
		<div className="vipPage">
			<table className="medal">
				<tbody>
					<tr>
						<td>{t("lbl_Vip_LastUpdated")} ： 07/19/2022</td>
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

			<VipPageEventList currencyId={currencyId} />
		</div>

		{langId ? (
			<Link
				to={`/${langId}/${path.join.root}`}
				style={isLogin ? { pointerEvents: "none" } : {}}>
				<img src={bottomImg} alt={`vip-program-${langId}`} />
			</Link>
		) : null}
	</>
);

VipPage.defaultProps = {
	isLogin: null
};

VipPage.propTypes = {
	pageClubImg: PropTypes.arrayOf(PropTypes.object).isRequired,
	currencyId: PropTypes.number.isRequired,
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	bottomImg: PropTypes.string.isRequired,
	isLogin: PropTypes.bool
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

VipPageEventList.propTypes = {
	currencyId: PropTypes.number.isRequired
};

export default VipPage;
