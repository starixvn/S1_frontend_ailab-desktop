import React, { useContext } from "react";
import { Link } from "gatsby";
import { products } from "@ailab-desktop/common";
import { useTranslation } from "react-i18next";
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
						<Link
							className="item"
							to={`/${userInfo.langId}/casino?provider=${products.PGSoft.tpId}`}>
							<img
								src={`${config.t_and_cURL}/desktop/img/home-page/popular-slots-pg.png`}
								alt="home-slot-pg"
							/>
						</Link>
					</div>
					<div className="variation">
						<Link
							className="item"
							to={`/${userInfo.langId}/casino?provider=${products.PragmaticPlaySlot.tpId}`}>
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
						</Link>
						<Link
							className="item"
							to={`/${userInfo.langId}/casino?provider=${products.SkywindSlot.tpId}`}>
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
						</Link>
						<Link
							className="item"
							to={`/${userInfo.langId}/casino?provider=${products.Spadegaming.tpId}`}>
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
						</Link>
					</div>
				</div>
				<div className="popularslots-inner">
					<div className="regular">
						<Link
							className="item"
							to={`/${userInfo.langId}/casino?provider=${products.AdvantPlay.tpId}`}>
							<img
								src={`${config.t_and_cURL}/desktop/img/home-page/popular-slots-ap.png`}
								alt="home-slot-ap"
							/>
						</Link>
					</div>
					<div className="variation">
						<Link
							className="item"
							to={`/${userInfo.langId}/casino?provider=${products.JILI.tpId}`}>
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
						</Link>
						<Link
							className="item"
							to={`/${userInfo.langId}/casino?provider=${products.MicrogamingSlot.tpId}`}>
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
						</Link>
						<Link
							className="item"
							to={`/${userInfo.langId}/casino?provider=${products.CQ9.tpId}`}>
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
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePopularSlotGames;
