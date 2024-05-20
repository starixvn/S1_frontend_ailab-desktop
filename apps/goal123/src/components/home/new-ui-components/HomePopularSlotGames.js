import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { defCasinoProviders } from "../../../datas/productList";
import config from "../../../config";
import { userInfoContext } from "../../common/context";

const HomePopularSlotGames = () => {
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();

	return (
		<div className="home-popularslots">
			<div className="home-title">
				{t("lbl_Home_Popular_Slot_Games_Ranking")}
			</div>
			<div className="popularslots-content">
				<div className="popularslots-inner">
					<div className="regular">
						<a
							className="item"
							href={`/${userInfo.langId}/casino?provider=${defCasinoProviders.PG.name}`}>
							<img
								src={`${config.t_and_cURL}/desktop/img/home-page/popular-slots-pg.png`}
								alt="home-slot-pg"
							/>
						</a>
					</div>
					<div className="variation">
						<a
							className="item"
							href={`/${userInfo.langId}/casino?provider=${defCasinoProviders.PP.name}`}>
							<img
								src={`${config.t_and_cURL}/desktop/img/home-page/pop-pp.jpg`}
								alt="home-pop-pp"
							/>
							<div>
								<img
									src={`${config.t_and_cURL}/desktop/img/home-page/popular-slots-pp.png`}
									alt="home-popular-slots-pp"
								/>
							</div>
						</a>
						<a
							className="item"
							href={`/${userInfo.langId}/casino?provider=${defCasinoProviders.Skywind.name}`}>
							<img
								src={`${config.t_and_cURL}/desktop/img/home-page/pop-sky.png`}
								alt="home-pop-sky"
							/>
							<div>
								<img
									src={`${config.t_and_cURL}/desktop/img/home-page/popular-slots-sky.png`}
									alt="home-popular-slots-sky"
								/>
							</div>
						</a>
						<a
							className="item"
							href={`/${userInfo.langId}/casino?provider=${defCasinoProviders.SG.name}`}>
							<img
								src={`${config.t_and_cURL}/desktop/img/home-page/pop-spad.jpg`}
								alt="home-pop-spad"
							/>
							<div>
								<img
									src={`${config.t_and_cURL}/desktop/img/home-page/popular-slots-spade.png`}
									alt="home-popular-slots-spade"
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
								alt="home-slot-ap"
							/>
						</a>
					</div>
					<div className="variation">
						<a
							className="item"
							href={`/${userInfo.langId}/casino?provider=${defCasinoProviders.JILI.name}`}>
							<img
								src={`${config.t_and_cURL}/desktop/img/home-page/pop-jili.jpg`}
								alt="home-pop-jili"
							/>
							<div>
								<img
									src={`${config.t_and_cURL}/desktop/img/home-page/popular-slots-jili.png`}
									alt="popular-slots-jili"
								/>
							</div>
						</a>
						<a
							className="item"
							href={`/${userInfo.langId}/casino?provider=${defCasinoProviders.MGPSW.name}`}>
							<img
								src={`${config.t_and_cURL}/desktop/img/home-page/pop-micro.jpg`}
								alt="home-pop-micro"
							/>
							<div>
								<img
									src={`${config.t_and_cURL}/desktop/img/home-page/popular-slots-micro.png`}
									alt="popular-slots-micro"
								/>
							</div>
						</a>
						<a
							className="item"
							href={`/${userInfo.langId}/casino?provider=${defCasinoProviders.CQ9.name}`}>
							<img
								src={`${config.t_and_cURL}/desktop/img/home-page/pop-cq9.jpg`}
								alt="home-pop-cq9"
							/>
							<div>
								<img
									src={`${config.t_and_cURL}/desktop/img/home-page/cq9.png`}
									alt="home-popular-slots-cq9"
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
