import React from "react";
import PropTypes from "prop-types";
import { navigate, Link } from "@reach/router";
import productList from "../../../datas/productList";
import path from "../../../router";
import config from "../../../config";

const HotGameList = ({ t, langId, clickItem }) => {
	const defTopGameList = [
		{
			title: t("lbl_Sports"),
			img: "sport",
			path: `/${langId}/${path.sports.root}?game=${productList.soccer.name}`
		},
		{
			title: t("lbl_SabaSoccer"),
			img: "sabasports",
			path: `/${langId}/${path.sports.root}?game=${productList.sabaSoccer.name}`
		},
		{
			title: t("lbl_Slots"),
			img: "slot",
			path: `/${langId}/${path.casino.root}`
		},
		{
			title: t("lbl_VirtualSports"),
			img: "virtual",
			path: `/${langId}/${path.sports.root}?game=${productList.virtualSports.name}`
		}
	];

	const defBottomGameList = [
		{
			title: t("lbl_SabaClub"),
			img: "sabaclub",
			...productList.sabaClub
		},
		{
			title: t("lbl_Keno"),
			img: "keno",
			...productList.keno
		},
		{
			title: t("lbl_Fishing"),
			img: "fishing",
			...productList.fishing
		},

		{
			title: t("lbl_V8Poker"),
			img: "v8",
			...productList.V8_Poker
		},
		{
			title: t("lbl_eSports"),
			img: "esports",
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
					<div className="topGame">
						{defTopGameList.map(item => (
							<button
								key={`hot-game-key-${item.title}`}
								onClick={() =>
									item.path
										? navigate(item.path)
										: clickItem({
												tpId: item.tpId,
												gameId: item.gameId
										  })
								}>
								<div className="game-item">
									<img
										className="gameImg"
										alt={`${item.title}-alt`}
										src={`${config.bannerImgUrl}/hotgame/desktop/${item.img}.jpg`}
									/>
									<div className="title">{item.title}</div>
								</div>
							</button>
						))}
					</div>

					<div className="bottomGame">
						{defBottomGameList.map(item => (
							<button
								key={`hot-game-key-${item.title}`}
								onClick={() =>
									item.path
										? navigate(item.path)
										: clickItem({
												tpId: item.tpId,
												gameId: item.gameId
										  })
								}>
								<div className="game-item">
									<img
										className="gameImg"
										alt={`${item.title}-alt`}
										src={`${config.bannerImgUrl}/hotgame/desktop/${item.img}.jpg`}
									/>
									<div className="title">{item.title}</div>
								</div>
							</button>
						))}
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
