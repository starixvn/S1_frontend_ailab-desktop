import React from "react";
import { defMenuLinks } from "../layout/header.menu.def";

const LiveCasinoSwipper = ({ langId, productTpIds }) => {
	// let subItems = null;
	// let mainUrl = "";

	let defLiveCasinoSubMenu = defMenuLinks(langId)?.liveCasino?.subMenu;

	console.log({
		defLiveCasinoSubMenu,
		productTpIds
	});

	const fakeProductTpIds = [1, 2, 3, 4, 5, 6];

	if (defLiveCasinoSubMenu?.length && fakeProductTpIds?.length) {
		defLiveCasinoSubMenu = defLiveCasinoSubMenu.filter(subItem =>
			fakeProductTpIds.includes(subItem.tpId)
		);
	}

	/*
	className: "liveN2LIVE"
displayText: "N2Live"
eventIcons: ["icon-new"]
icon: "icon icon-N2LIVE"
menuType: "entPage"
tpId: 28
	*/
	console.log(defLiveCasinoSubMenu);

	return (
		<div className="indexliveCasinoList">
			<div>
				<div className="title">
					<i className="icon icon-gamecasino" />
					Live Casino
				</div>
				<div className="indexCasino ">
					<div className="swiper-container">
						<div className="swiper-wrapper">
							<div className="swiper-slide">
								<a href="">
									<div className="casino-item">
										<img src="../../styles/img/livecasino/ae.png" />

										<div className="title">AE</div>
									</div>
								</a>
							</div>
							<div className="swiper-slide">
								<a href="">
									<div className="casino-item">
										<img src="../img/livecasino/ag.png" />
										<div className="title">AG</div>
									</div>
								</a>
							</div>
							<div className="swiper-slide">
								<a href="">
									<div className="casino-item active">
										<img src="../img/livecasino/dg.png" />
										<div className="title">DG</div>
									</div>
								</a>
							</div>
							<div className="swiper-slide">
								<a href="">
									<div className="casino-item">
										<img src="../img/livecasino/ebet.png" />
										<div className="title">eBet</div>
									</div>
								</a>
							</div>
							<div className="swiper-slide">
								<a href="">
									<div className="casino-item">
										<img src="../img/livecasino/n2live.png" />
										<div className="title">N2Live</div>
									</div>
								</a>
							</div>
							<div className="swiper-slide">
								<a href="">
									<div className="casino-item">
										<img src="../img/livecasino/allbet.png" />
										<div className="title">Allbet</div>
									</div>
								</a>
							</div>
							<div className="swiper-slide">
								<a href="">
									<div className="casino-item">
										<img src="../img/livecasino/pp.png" />
										<div className="title">PP</div>
									</div>
								</a>
							</div>
							<div className="swiper-slide">
								<a href="">
									<div className="casino-item">
										<img src="../img/livecasino/sa.png" />
										<div className="title">SA</div>
									</div>
								</a>
							</div>
						</div>
					</div>
					<div className="swiper-button-next" />
					<div className="swiper-button-prev" />
				</div>
			</div>
		</div>
	);
};

export default LiveCasinoSwipper;
