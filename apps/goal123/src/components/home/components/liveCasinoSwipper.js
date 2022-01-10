import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { defMenuLinks } from "../../layout/header.menu.def";
import CustomSwipper from "../../common/customSwipper";
import { bannerImgUrl } from "../../../config";

const LiveCasinoSwipper = ({ t, clickItem, langId, productTpIds }) => {
	const [startswiper, setStartswiper] = useState(false);

	let slides = defMenuLinks(langId)?.liveCasino?.subMenu;

	slides = slides.filter(subItem => !subItem.disabledInSlider);

	if (slides?.length && productTpIds?.length) {
		slides = slides.filter(subItem => productTpIds.includes(subItem.tpId));
	}

	useEffect(() => {
		setTimeout(() => setStartswiper(true), 0);
	}, []);

	const rows = slides.map(item => {
		const {
			listNpcImgUrl,
			tpId,
			gameId,
			needLogin,
			path,
			tpGameType
		} = item;

		if (!listNpcImgUrl) return null;

		return (
			<div className="swiper-slide" key={`livecasino-${listNpcImgUrl}`}>
				<button
					onClick={() =>
						clickItem({
							tpId,
							gameId,
							needLogin,
							path,
							tpGameType
						})
					}>
					<div className="casino-item">
						<img
							src={`${bannerImgUrl}/desktop/img/livecasino/${listNpcImgUrl}`}
							alt={listNpcImgUrl}
						/>
					</div>
				</button>
			</div>
		);
	});

	return (
		<div>
			<div className="title">
				<i className="icon icon-gamecasino" />
				{t("lbl_LiveCasino")}
			</div>

			<div className="indexCasino">
				{startswiper && (
					<CustomSwipper
						withBtn={true}
						withPagination={false}
						config={{
							autoplay: {
								delay: 3500,
								disableOnInteraction: false
							},
							slidesPerView: 3
						}}>
						{rows}
					</CustomSwipper>
				)}
			</div>
		</div>
	);
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
