import React, { useContext } from "react";
import { defCasinoProviders } from "../../../datas/productList";
import config from "../../../config";
import { userInfoContext } from "../../common/context";

const HomePopularSlotGames = () => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<div className="home-popularslots">
			<div className="home-title">POPULAR slot games Ranking</div>
			<div className="popularslots-content">
				<div className="popularslots-inner">
					<div className="regular">
						<a
							className="item"
							href={`/${userInfo.langId}/casino?provider=${defCasinoProviders.PG.name}`}>
							<img
								src={`${config.t_and_cURL}/desktop/img/home-page/popular-slots-pg.png`}
								alt=""
							/>
						</a>
					</div>
					<div className="variation">
						<a
							className="item"
							href={`/${userInfo.langId}/casino?provider=${defCasinoProviders.PP.name}`}>
							<img
								src={`${config.t_and_cURL}/desktop/img/home-page/pop-pp.jpg`}
								alt=""
							/>
							<div>
								<img
									src={`${config.t_and_cURL}/desktop/img/home-page/popular-slots-pp.png`}
									alt=""
								/>
							</div>
						</a>
						<a
							className="item"
							href={`/${userInfo.langId}/casino?provider=${defCasinoProviders.Skywind.name}`}>
							<img
								src={`${config.t_and_cURL}/desktop/img/home-page/pop-sky.png`}
								alt=""
							/>
							<div>
								<img
									src={`${config.t_and_cURL}/desktop/img/home-page/popular-slots-sky.png`}
									alt=""
								/>
							</div>
						</a>
						<a
							className="item"
							href={`/${userInfo.langId}/casino?provider=${defCasinoProviders.SG.name}`}>
							<img
								src={`${config.t_and_cURL}/desktop/img/home-page/pop-spad.jpg`}
								alt=""
							/>
							<div>
								<img
									src={`${config.t_and_cURL}/desktop/img/home-page/popular-slots-spade.png`}
									alt=""
								/>
							</div>
						</a>
					</div>
				</div>
				<div className="popularslots-inner">
					<div className="regular">
						<a
							className="item"
							href={`/${userInfo.langId}/casino?provider=${defCasinoProviders.AdvantPlay.name}`}>
							<img
								src={`${config.t_and_cURL}/desktop/img/home-page/popular-slots-ap.png`}
								alt=""
							/>
						</a>
					</div>
					<div className="variation">
						<a
							className="item"
							href={`/${userInfo.langId}/casino?provider=${defCasinoProviders.JILI.name}`}>
							<img
								src={`${config.t_and_cURL}/desktop/img/home-page/pop-jili.jpg`}
								alt=""
							/>
							<div>
								<img
									src={`${config.t_and_cURL}/desktop/img/home-page/popular-slots-jili.png`}
									alt=""
								/>
							</div>
						</a>
						<a
							className="item"
							href={`/${userInfo.langId}/casino?provider=${defCasinoProviders.MGPSW.name}`}>
							<img
								src={`${config.t_and_cURL}/desktop/img/home-page/pop-micro.jpg`}
								alt=""
							/>
							<div>
								<img
									src={`${config.t_and_cURL}/desktop/img/home-page/popular-slots-micro.png`}
									alt=""
								/>
							</div>
						</a>
						<a
							className="item"
							href={`/${userInfo.langId}/casino?provider=${defCasinoProviders.CQ9.name}`}>
							<img
								src={`${config.t_and_cURL}/desktop/img/home-page/pop-cq9.jpg`}
								alt=""
							/>
							<div>
								<img
									src={`${config.t_and_cURL}/desktop/img/home-page/cq9.png`}
									alt=""
								/>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePopularSlotGames;
