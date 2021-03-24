import React from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import path from "../../router";

import PageEventListVn from "./components/pageEventList.vn";

import imgProgramEn from "../../styles/img/vip/en/vip_program_en.png";
import imgProgramVn from "../../styles/img/vip/vn/vip_program_vn.png";

const VipPage = ({ pageClubImg, currencyId, t, langId }) => {
	const programImgs = {
		en: imgProgramEn,
		vn: imgProgramVn
	};

	return (
		<>
			<div className="vipPage">
				<table className="medal">
					<tbody>
						<tr>
							<td />
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
				<PageEventListVn currencyId={currencyId} />
			</div>

			{langId ? (
				<Link to={`/${langId}/${path.join.root}`}>
					<img
						src={programImgs[langId]}
						alt={`vip-program-${langId}`}
					/>
				</Link>
			) : null}
		</>
	);
};

VipPage.propTypes = {
	pageClubImg: PropTypes.arrayOf(PropTypes.object).isRequired,
	currencyId: PropTypes.number.isRequired,
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired
};

export default VipPage;
