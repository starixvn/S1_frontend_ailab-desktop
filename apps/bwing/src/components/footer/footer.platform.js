import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import path from "../../router";
import productList, {
	defCasinoProviders,
	defTpGameType
} from "../../datas/productList";
import { popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { bannerImgUrl } from "../../config";

const defPlatform = [
	{
		...productList.eSport,
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
		path: path.sportSbo.root,
		imgName: "sbobet"
	},
	{
		...productList.sportBti,
		path: path.sportBti.root,
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
		...productList.liveCasino_n2live,
		imgName: "n2"
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
		imgName: "ygg"
	},
	{
		...defCasinoProviders.CQ9,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.CQ9.name },
		imgName: "cq9"
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
		imgName: "king"
	},
	{
		...productList.tcg,
		imgName: "tc"
	},
	{
		...defCasinoProviders.RedTiger,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.RedTiger.name },
		imgName: "red"
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
		imgName: "evo"
	},
	{
		...defCasinoProviders.Habanero,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.Habanero.name },
		imgName: "ho"
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
		...productList.eSport_IM,
		path: path.sportsIM.root,
		imgName: "im-sports"
	},

	{
		...defCasinoProviders.SPRIBE,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.SPRIBE.name },
		imgName: "spribe"
	},
	{
		...defCasinoProviders.PNG,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.PNG.name },
		imgName: "png"
	},
	{
		...defCasinoProviders.Endorphina,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.Endorphina.name },
		imgName: "es"
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
		...defCasinoProviders.eBET,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.eBET.name },
		imgName: "we"
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
	}
];

const ImageWithHover = ({ bannerImgUrl: url, imgName }) => {
	const [isHovered, setIsHovered] = useState(false);
	const imgUrl = `${url}/desktop/img/partherNew/${imgName}${
		isHovered ? "-a" : ""
	}.png`;
	return (
		<img
			src={imgUrl}
			alt={imgName}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		/>
	);
};
ImageWithHover.defaultProps = {
	bannerImgUrl: "",
	imgName: ""
};

ImageWithHover.propTypes = {
	bannerImgUrl: PropTypes.string,
	imgName: PropTypes.string
};

const Platform = ({ langId, isLogin, productTpIds, maintainList }) => {
	const { setPopBox } = useContext(popBoxContext);

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
			item =>
				item.tpId === p.tpId &&
				(item.tpGameType === p.tpGameType ||
					item.tpGameType === defTpGameType.All)
		);
		return (
			<button
				key={key}
				onClick={ClickItem.bind(this, {
					...p,
					urlParams: _urlParams,
					isInMaintain
				})}>
				<ImageWithHover
					bannerImgUrl={bannerImgUrl}
					imgName={p.imgName}
				/>
			</button>
		);
	});

	return <div>{rows}</div>;
};

Platform.defaultProps = {
	langId: null,
	isLogin: null,
	productTpIds: null,
	maintainList: null
};

Platform.propTypes = {
	langId: PropTypes.string,
	isLogin: PropTypes.bool,
	productTpIds: PropTypes.arrayOf(PropTypes.any),
	maintainList: PropTypes.arrayOf(PropTypes.any)
};

export default Platform;
