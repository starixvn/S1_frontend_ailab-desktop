import React, { useContext } from "react";
import PropTypes from "prop-types";
import { popBoxContext } from "../../common/context";
import { defPopBoxType } from "../../common/popBox";
import productList, { defTpGameType } from "../../../datas/productList";
import path from "../../../router";
import config from "../../../config";

const HotGameList = ({ t, langId, clickItem, navigate, allMaintainList }) => {
	const { setPopBox } = useContext(popBoxContext);

	const defTopGameList = [
		{
			title: t("lbl_Sports"),
			img: "sport",
			path: `/${langId}/${path.sports.root}?game=${productList.soccer.name}`
		},
		{
			title: t("lbl_SabaSoccer"),
			img: "sabasports",
			path: `/${langId}/${path.sports.root}?game=${productList.sabaSoccer.name}`,
			...productList.sabaSoccer
		},
		{
			title: t("lbl_Slots"),
			img: "slot",
			path: `/${langId}/${path.casino.root}`
		},
		{
			title: t("lbl_Virtual_Sports"),
			img: "virtual",
			path: `/${langId}/${path.sports.root}?game=${productList.virtualSports.name}`,
			...productList.virtualSports
		}
	];

	const defBottomGameList = [
		{
			title: t("lbl_Vgaming"),
			img: "vg",
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
						<Games
							gameList={defTopGameList}
							clickItem={clickItem}
							navigate={navigate}
							allMaintainList={allMaintainList}
							setPopBox={setPopBox}
						/>
					</div>

					<div className="bottomGame">
						<Games
							gameList={defBottomGameList}
							clickItem={clickItem}
							navigate={navigate}
							allMaintainList={allMaintainList}
							setPopBox={setPopBox}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Games = ({
	gameList,
	clickItem,
	navigate,
	allMaintainList,
	setPopBox
}) => {
	const rows = gameList.map(item => {
		const isInMaintain = allMaintainList?.some(
			mt =>
				mt.tpId === item.tpId &&
				(mt.tpGameType === item.tpGameType ||
					mt.tpGameType === defTpGameType.All)
		);

		const clickOrLink = (_item, _isInMaintain) => {
			const clickClose = () => {
				setPopBox({ isOpen: false });
			};
			if (_isInMaintain) {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.UnderMaintain,
					clickClose
				});
				return;
			}
			_item.path
				? navigate(_item.path)
				: clickItem({
						tpId: _item.tpId,
						gameId: _item.gameId,
						tpGameType: _item.tpGameType
				  });
		};

		return (
			<button
				key={`hot-game-key-${item.title}`}
				onClick={clickOrLink.bind(this, item, isInMaintain)}>
				<div className="game-item">
					<img
						className="gameImg"
						alt={`${item.title}-alt`}
						src={`${config.bannerImgUrl}/desktop/img/hotgame/${item.img}.jpg`}
					/>
					<div className="title">{item.title}</div>
				</div>
			</button>
		);
	});

	return rows;
};

HotGameList.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	clickItem: PropTypes.func.isRequired,
	navigate: PropTypes.func.isRequired,
	allMaintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default HotGameList;
