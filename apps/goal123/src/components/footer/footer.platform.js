import React, { useState } from "react";
import { navigate } from "gatsby";
import PropTypes from "prop-types";
import productList, {
	defCasinoProviders,
	defTpGameType
} from "../../datas/productList";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { bannerImgUrl } from "../../config";
import usePopBox from "../hook/usePopBox";
import { defPopBoxType } from "../common/popBox";
import path from "../../router";

const defPlatform = [
	{
		path: path.sports.root,
		parameter: { game: "soccer" },
		imgName: "saba"
	},
	{
		...productList.eSport_TFGaming,
		imgName: "tfg"
	},
	{
		...productList.sportSbo,
		imgName: "sbo"
	},
	{
		path: path.sportBti.root,
		...productList.sportBti,
		imgName: "bti"
	},
	{
		...productList.liveCasino_AG,
		imgName: "ag"
	},
	{
		...productList.liveCasino_AE,
		imgName: "ae"
	},
	{
		...defCasinoProviders.PP,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.PP.name },
		imgName: "pp"
	},
	{
		...productList.liveCasino_BG,
		imgName: "bg"
	},
	{
		...productList.liveCasino_YeeBet,
		imgName: "yb"
	},
	{
		...defCasinoProviders.MGPSW,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.MGPSW.name },
		imgName: "mg"
	},
	{
		...defCasinoProviders.PlayTech,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.PlayTech.name },
		imgName: "pt"
	},
	{
		...defCasinoProviders.PG,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.PG.name },
		imgName: "pg"
	},
	{
		...defCasinoProviders.SG,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.SG.name },
		imgName: "sg"
	},
	{
		...defCasinoProviders.YGG,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.YGG.name },
		imgName: "yg"
	},
	{
		...defCasinoProviders.CQ9,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.CQ9.name },
		imgName: "cq9"
	},
	{
		...defCasinoProviders.PNG,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.PNG.name },
		imgName: "png"
	},
	{
		...defCasinoProviders.JILI,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.JILI.name },
		imgName: "jili"
	},
	{
		...productList.fishing,
		imgName: "yl"
	},
	{
		...productList.V8_Poker,
		imgName: "v8"
	},
	{
		...productList.KingMaker,
		imgName: "kingmaker"
	},
	{
		...productList.tcg,
		imgName: "tcg"
	},
	{
		...defCasinoProviders.RedTiger,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.RedTiger.name },
		imgName: "rt"
	},
	{
		...defCasinoProviders.NetEnt,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.NetEnt.name },
		imgName: "ne"
	},
	{
		...defCasinoProviders.AdvantPlay,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.AdvantPlay.name },
		imgName: "ap"
	},
	{
		...productList.liveCasino_EVO,
		imgName: "evolution"
	},
	{
		...defCasinoProviders.Habanero,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.Habanero.name },
		imgName: "habanero"
	},
	{
		...defCasinoProviders.SimplePlay,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.SimplePlay.name },
		imgName: "simpleplay"
	},
	{
		...defCasinoProviders.Skywind,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.Skywind.name },
		imgName: "sk"
	},
	{
		...defCasinoProviders.Nextspin,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.Nextspin.name },
		imgName: "nextspin"
	},
	{
		...productList.sports_IM,
		path: path.sportsIM.root,
		imgName: "im-sports"
	},
	{
		...productList.eSport_IM,
		imgName: "im-esports"
	},
	{
		...defCasinoProviders.SPRIBE,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.SPRIBE.name },
		imgName: "spribe"
	},
	{
		...defCasinoProviders.Endorphina,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.Endorphina.name },
		imgName: "es"
	},
	{
		...defCasinoProviders.liveCasino_eBET,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.Endorphina.name },
		imgName: "we"
	},
	{
		...defCasinoProviders.FaChai,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.FaChai.name },
		imgName: "fachai"
	},
	{
		...defCasinoProviders.BNG,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.BNG.name },
		imgName: "bng"
	},
	{
		...defCasinoProviders.NoLimitCity,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.NoLimitCity.name },
		imgName: "nlc"
	},
	{
		...defCasinoProviders.Amigo,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.Amigo.name },
		imgName: "amigo"
	},
	{
		...productList.GA_CockFighting,
		imgName: "cockfighting"
	},
	{
		...productList["93Connect"],
		imgName: "93connect"
	},
	{
		...productList.liveCasino_Won,
		imgName: "woncasino"
	}
];

const Platform = ({ langId, isLogin, productTpIds, maintainList }) => {
	const [hoverNamme, setHoverNamme] = useState(null);

	const { setPopBox } = usePopBox();

	const handleHoverImg = _hoverName => {
		setHoverNamme(_hoverName);
	};

	const ClickItem = ({
		path: _path,
		urlParams,
		tpId,
		gameId,
		isInMaintain,
		tpGameType
	}) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (isInMaintain) {
			return;
		}

		if (_path) {
			navigate(`/${langId}/${_path}${urlParams}`);
		} else if (tpId || gameId) {
			SET_ENTER_PAGE({
				isLogin,
				langId,
				tpId,
				gameId,
				loginCallback,
				tpGameType
			});
		}
	};

	const filterPlatform = defPlatform.filter(
		item => !item.tpId || (item.tpId && productTpIds?.includes(item.tpId))
	);
	const showRows = isLogin ? filterPlatform : defPlatform;

	const rows = showRows.map(p => {
		const key = `footer-platform-${p.imgName}`;

		let params = null;
		if (p.parameter) {
			params = Object.keys(p.parameter).map(
				_key => `${_key}=${p.parameter[_key]}`
			);
		}

		const _urlParams = params !== null ? `?${params.join("&")}` : "";

		const isInMaintain = maintainList?.some(
			mt =>
				mt.tpId === p.tpId &&
				(mt.tpGameType === p.tpGameType ||
					mt.tpGameType === defTpGameType.All)
		);

		return (
			<button key={key}>
				<img
					alt="logo"
					src={`${bannerImgUrl}/desktop/img/footer/${p.imgName}${
						hoverNamme === p.imgName ? "a" : ""
					}.png`}
					onClick={() =>
						ClickItem({ ...p, urlParams: _urlParams, isInMaintain })
					}
					onMouseOver={handleHoverImg.bind(this, p.imgName)}
					onMouseOut={handleHoverImg.bind(this, null)}
					onBlur={() => 0}
					onFocus={() => 0}
				/>
			</button>
		);
	});

	return (
		<div className="platform">
			<div>{rows}</div>
		</div>
	);
};

Platform.defaultProps = {
	maintainList: null,
	productTpIds: null,
	langId: null
};

Platform.propTypes = {
	isLogin: PropTypes.bool.isRequired,
	productTpIds: PropTypes.arrayOf(PropTypes.number),
	maintainList: PropTypes.arrayOf(PropTypes.any),
	langId: PropTypes.string
};

export default Platform;
