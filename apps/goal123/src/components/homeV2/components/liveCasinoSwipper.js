import React from "react";
import PropTypes from "prop-types";
import { defMenuLinks } from "../../layout/header.menu.def";
import { AutoPlayWithBtn } from "../../common/swipperBanner";

const LiveCasinoSwipper = ({ t, clickItem, langId, productTpIds }) => {
	let defLiveCasinoSubMenu = defMenuLinks(langId)?.liveCasino?.subMenu;

	if (defLiveCasinoSubMenu?.length && productTpIds?.length) {
		defLiveCasinoSubMenu = defLiveCasinoSubMenu.filter(subItem =>
			productTpIds.includes(subItem.tpId)
		);
	}

	const rows = defLiveCasinoSubMenu.map(item => {
		const {
			displayText,
			listNpcImgUrl,
			tpId,
			gameId,
			needLogin,
			path
		} = item;

		if (!listNpcImgUrl) return null;

		return (
			<div className="swiper-slide" key={`livecasino-${displayText}`}>
				<button
					onClick={() =>
						clickItem({
							tpId,
							gameId,
							needLogin,
							path
						})
					}>
					<div className="casino-item">
						<img
							src={require(`../../../styles/img/livecasino/${listNpcImgUrl}`)}
							alt={listNpcImgUrl}
						/>

						<div className="title">{displayText}</div>
					</div>
				</button>
			</div>
		);
	});

	if (defLiveCasinoSubMenu?.length)
		return (
			<div className="indexliveCasinoList">
				<div>
					<div className="title">
						<i className="icon icon-gamecasino" />
						{t("lbl_LiveCasino")}
					</div>
					<div className="indexCasino ">
						<AutoPlayWithBtn
							Rows={rows}
							config={{
								slidesPerView: 5,
								spaceBetween: 10,
								slidesPerGroup: 1,
								pagination: {
									el: "",
									clickable: false
								},
								rebuildOnUpdate: false
							}}
						/>
					</div>
				</div>
			</div>
		);

	return null;
};

LiveCasinoSwipper.defaultProps = {
	productTpIds: []
};

LiveCasinoSwipper.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	productTpIds: PropTypes.arrayOf(PropTypes.number)
};

export default LiveCasinoSwipper;
