import React, { useState } from "react";
import PropTypes from "prop-types";
import { navigate, Link } from "@reach/router";
import productList from "../../../datas/productList";
import path from "../../../router";

import sportsblueImgResult from "../../../styles/img/hotgames/sportsblue.png";
import sportsImgResult from "../../../styles/img/hotgames/sports.png";
import sabasoccerImgResult from "../../../styles/img/hotgames/sabasoccer.png";
import sabasoccerNpcImgResult from "../../../styles/img/hotgames/sabasoccer-item.png";
import slotsImgResult from "../../../styles/img/hotgames/slots.png";
import slotsNpcImgResult from "../../../styles/img/hotgames/slots-item.png";
import sabaclubImgResult from "../../../styles/img/hotgames/sabaclub.png";
import sabaclubNpcImgResult from "../../../styles/img/hotgames/sabaclub-item.png";
import fishingImgResult from "../../../styles/img/hotgames/fishing.png";
import fishingNpcImgResult from "../../../styles/img/hotgames/fishing-item.png";
import virtualsportsImgResult from "../../../styles/img/hotgames/virtualsports.png";
import virtualsportsNpcImgResult from "../../../styles/img/hotgames/virtualsports-item.png";
import kenoImgResult from "../../../styles/img/hotgames/keno.png";
import kenoNpcImgResult from "../../../styles/img/hotgames/keno-item.png";
import v8pokerImgResult from "../../../styles/img/hotgames/v8poker.png";
import v8pokerNpcImgResult from "../../../styles/img/hotgames/v8poker-item.png";
import esportsImgResult from "../../../styles/img/hotgames/esports.png";
import esportsNpcImgResult from "../../../styles/img/hotgames/esports-item.png";

const HotGameList = ({ t, langId, clickItem }) => {
	const [showSportsHover, setShowSetspoHover] = useState(false);

	const defHotGameList = [
		{
			title: t("lbl_SabaSoccer"),
			img: sabasoccerImgResult,
			npcImg: sabasoccerNpcImgResult,
			path: `/${langId}/${path.sports.root}?game=${productList.soccer.name}`
		},
		{
			title: t("lbl_Slots"),
			img: slotsImgResult,
			npcImg: slotsNpcImgResult,
			path: `/${langId}/${path.casino.root}`
		},
		{
			title: t("lbl_SabaClub"),
			img: sabaclubImgResult,
			npcImg: sabaclubNpcImgResult,
			...productList.sabaClub
		},
		{
			title: t("lbl_Fishing"),
			img: fishingImgResult,
			npcImg: fishingNpcImgResult,
			...productList.fishing
		},
		{
			title: t("lbl_VirtualSports"),
			img: virtualsportsImgResult,
			npcImg: virtualsportsNpcImgResult,
			path: `/${langId}/${path.sports.root}?game=${productList.virtualSports.name}`
		},
		{
			title: t("lbl_Keno"),
			img: kenoImgResult,
			npcImg: kenoNpcImgResult,
			...productList.keno
		},
		{
			title: t("lbl_V8Poker"),
			img: v8pokerImgResult,
			npcImg: v8pokerNpcImgResult,
			...productList.V8_Poker
		},
		{
			title: t("lbl_eSports"),
			img: esportsImgResult,
			npcImg: esportsNpcImgResult,
			...productList.eSport
		}
	];

	return (
		<div className="indexGameList">
			<div>
				<div className="title">
					<i className="icon icon-hotgame" />
					{t("lbl_HotGame")}
				</div>
				<div className="indexGamelist-wrapper">
					<div className="leftGame">
						<Link
							onMouseOver={() => setShowSetspoHover(true)}
							onMouseLeave={() => setShowSetspoHover(false)}
							to={`/${langId}/${path.sports.root}?game=${productList.soccer.name}`}>
							<img
								className={showSportsHover ? "show" : ""}
								src={sportsImgResult}
								alt="home-img-sports"
							/>
							<img
								className={showSportsHover ? "" : "show"}
								src={sportsblueImgResult}
								alt="home-img-sportsblue"
							/>
						</Link>
					</div>
					<div className="rightGame">
						{defHotGameList.map(item => {
							return (
								<button
									key={`hotgame-${item.title}`}
									onClick={() =>
										item.path
											? navigate(item.path)
											: clickItem({
													tpId: item.tpId,
													gameId: item.gameId
											  })
									}>
									<div className="game-item">
										<img src={item.img} alt="sabasoccer" />
										<img
											className="gameImg"
											src={item.npcImg}
											alt="sabasoccer-item"
										/>
										<div className="title">
											{String(item.title).toUpperCase()}
										</div>
									</div>
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

HotGameList.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	clickItem: PropTypes.func.isRequired
};

export default HotGameList;
