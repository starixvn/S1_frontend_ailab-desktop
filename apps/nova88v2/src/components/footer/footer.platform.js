import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import path from "../../router";
import productList from "../../datas/productList";
import { popBoxContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { bannerImgUrl } from "../../config";
import { defCurrencyList } from "../common/common";
import allowedCurrencyList from "../../datas/allowedCurrencyList";
import { getPPAllowCurrencies } from "../header/header.menu.def";

const useHandleLogoList = () => {
	const [onMouseOverImg, setOnMouseOverImg] = useState({});

	const handleOnMouseOverImg = imgName => {
		setOnMouseOverImg(imgName);
	};

	return { onMouseOverImg, handleOnMouseOverImg };
};

const PlatformSection = ({ langId, isLogin, productTpIds, currencyId }) => {
	const defPlatfrom = [
		{
			...productList.sports,
			path: path.sports.root,
			parameter: { ...productList.sports },
			imgName: "saba",
			hoverImgName: "sabab"
		},
		{
			...productList.liveCasino_Allbet,
			imgName: "ab",
			hoverImgName: "aba"
		},
		{
			...productList.liveCasino_DG,
			imgName: "dg",
			hoverImgName: "dga"
		},
		{
			...productList.liveCasino_AG,
			imgName: "ag",
			hoverImgName: "aga"
		},
		{
			...productList.liveCasino_AE,
			imgName: "ae",
			hoverImgName: "aea"
		},
		{
			...productList.liveCasino_SA,
			imgName: "sa",
			hoverImgName: "saa"
		},
		{
			...productList.casino_PP,
			path: path.casino.root,
			parameter: { ...productList.casino_PP },
			imgName: "casino_pp",
			hoverImgName: "casino_ppa",
			allowCurrencies: getPPAllowCurrencies()
		},
		{
			...productList.casino_MGPSW,
			path: path.casino.root,
			parameter: { ...productList.casino_MGPSW },
			imgName: "casino_mg",
			hoverImgName: "casino_mga"
		},
		{
			...productList.casino_PT,
			path: path.casino.root,
			parameter: { ...productList.casino_PT },
			imgName: "pt",
			hoverImgName: "pta"
		},
		{
			...productList.casino_YGG,
			path: path.casino.root,
			parameter: { ...productList.casino_YGG },
			imgName: "casino_ygg",
			hoverImgName: "casino_ygga"
		},
		{
			...productList.casino_JOKER,
			path: path.casino.root,
			parameter: { ...productList.casino_JOKER },
			imgName: "casino_joker",
			hoverImgName: "casino_jokera"
		},
		{
			...productList.casino_SG,
			path: path.casino.root,
			parameter: { ...productList.casino_SG },
			imgName: "casino_sg",
			hoverImgName: "casino_sga"
		},
		{
			...productList.casino_JILI,
			path: path.casino.root,
			parameter: { ...productList.casino_JILI },
			imgName: "casino_jili",
			hoverImgName: "casino_jilia"
		},
		{
			...productList.tcg,
			parameter: { ...productList.tcg },
			imgName: "tc",
			hoverImgName: "tcb"
		},
		{
			...productList.games_MPoker,
			imgName: "mp",
			hoverImgName: "mpa",
			allowCurrencies: [defCurrencyList.THB]
		},
		{
			...productList.casino_RedTiger,
			path: path.casino.root,
			parameter: { ...productList.casino_RedTiger },
			imgName: "casino_redtiger",
			hoverImgName: "casino_redtigera"
		},
		{
			...productList.casino_NetEnt,
			path: path.casino.root,
			parameter: { ...productList.casino_NetEnt },
			imgName: "casino_netent",
			hoverImgName: "casino_netenta"
		},
		{
			...productList.casino_AdvantPlay,
			path: path.casino.root,
			parameter: { ...productList.casino_AdvantPlay },
			imgName: "casino_ap",
			hoverImgName: "casino_apa"
		},
		{
			...productList.liveCasino_EVO,
			imgName: "ev",
			hoverImgName: "eva"
		},
		{
			...productList.mega888,
			path: path.mega888.root,
			imgName: "casino_mega",
			hoverImgName: "casino_megaa"
		},
		{
			...productList.casino_Habanero,
			path: path.casino.root,
			parameter: { ...productList.casino_Habanero },
			imgName: "casino_hb",
			hoverImgName: "casino_hba"
		},
		{
			...productList.casino_SimplePlay,
			path: path.casino.root,
			parameter: { ...productList.casino_SimplePlay },
			imgName: "casino_simpleplay",
			hoverImgName: "casino_simpleplaya"
		},
		{
			...productList.casino_AMB,
			path: path.casino.root,
			parameter: { ...productList.casino_AMB },
			imgName: "casino_amb",
			hoverImgName: "casino_amba",
			allowCurrencies: allowedCurrencyList.slotAMB
		},
		{
			...productList.casino_Skywind,
			path: path.casino.root,
			parameter: { ...productList.casino_Skywind },
			imgName: "sk",
			hoverImgName: "ska"
		}
	];

	const { setPopBox } = useContext(popBoxContext);
	const { onMouseOverImg, handleOnMouseOverImg } = useHandleLogoList();

	const ClickItem = ({
		path: _path,
		urlParams,
		tpId,
		gameId,
		needLogin,
		tpGameType
	}) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (_path) {
			return needLogin && !isLogin
				? loginCallback()
				: navigate(`/${langId}/${_path}${urlParams}`);
		}
		SET_ENTER_PAGE({
			isLogin,
			langId,
			tpId,
			gameId,
			loginCallback,
			tpGameType
		});
		return true;
	};

	const filterPlatform = defPlatfrom.filter(
		item => !item.tpId || (item.tpId && productTpIds?.includes(item.tpId))
	);

	const showRows = isLogin ? filterPlatform : defPlatfrom;

	const rows = showRows
		?.filter(p =>
			p?.allowCurrencies ? p.allowCurrencies.includes(currencyId) : true
		)
		?.map(p => {
			const key = `footer-platform-${p.tpId}-${p.gameId}`;
			let params = null;
			if (p.parameter) {
				params = Object.keys(p.parameter).map(
					_key => `${_key}=${p.parameter[_key]}`
				);
			}

			const _urlParams = params !== null ? `?${params.join("&")}` : "";
			const imgName =
				onMouseOverImg === p.imgName ? p.hoverImgName : p.imgName;

			return (
				<button
					className={imgName}
					key={key}
					onClick={ClickItem.bind(this, {
						...p,
						urlParams: _urlParams
					})}
				>
					<img
						src={`${bannerImgUrl}/desktop/img/venderlogo/${imgName}.png`}
						name={imgName}
						alt={`logo ${imgName}`}
						onMouseOver={handleOnMouseOverImg.bind(this, p.imgName)}
						onMouseOut={handleOnMouseOverImg.bind(this, "")}
						onBlur={() => 0}
						onFocus={() => 0}
					/>
				</button>
			);
		});

	return <div className="platform">{rows}</div>;
};

PlatformSection.defaultProps = {
	currencyId: null,
	productTpIds: null
};

PlatformSection.propTypes = {
	langId: PropTypes.string.isRequired,
	isLogin: PropTypes.bool.isRequired,
	productTpIds: PropTypes.arrayOf(PropTypes.any),
	currencyId: PropTypes.number
};

export default PlatformSection;
