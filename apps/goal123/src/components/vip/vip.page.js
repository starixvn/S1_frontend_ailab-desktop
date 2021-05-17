import React from "react";
import PropTypes from "prop-types";
import PageEventListVn from "./components/pageEventList.vn";

import imgProgramEn from "../../styles/img/vip/vip_program_en.jpg";
import imgProgramVn from "../../styles/img/vip/vip_program_vn.jpg";

const VipPage = ({ pageClubImg, currencyId, t, langId, showJoinPopBox }) => {
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
							<td>{t("lbl_Vip_LastUpdated")} ： 17/05/2021</td>
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
				<img
					onClick={showJoinPopBox}
					src={programImgs[langId]}
					alt={`vip-program-${langId}`}
				/>
			) : null}
		</>
	);
};

VipPage.propTypes = {
	pageClubImg: PropTypes.arrayOf(PropTypes.object).isRequired,
	currencyId: PropTypes.number.isRequired,
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	showJoinPopBox: PropTypes.func.isRequired
};

export default VipPage;
