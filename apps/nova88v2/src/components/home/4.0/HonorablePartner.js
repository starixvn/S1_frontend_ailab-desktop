import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import allowedCurrencyList from "../../../datas/allowedCurrencyList";
import productList from "../../../datas/productList";
import paths from "../../../router";
import { defCurrencyList } from "../../common/common";
import { productTpIdsContext } from "../../common/context";
import { getPPAllowCurrencies } from "../../header/header.menu.def";
import { useAuth } from "../../hook";
import { SET_ENTER_PAGE } from "../../../service/enterPage";
import defPopBoxType from "../../common/defPopBoxType";
import usePopBox from "../../hook/usePopBox";

const HonorablePartner = () => {
	const { t } = useTranslation();
	const { setPopBox } = usePopBox();
	const { userInfo: { isLogin, currencyId, langId } = {} } = useAuth();
	const { productTpIds } = useContext(productTpIdsContext);
	const [products, setProducts] = useState([]);

	const onOpenProduct = ({
		path,
		tpId,
		gameId,
		needLogin,
		tpGameType,
		parameter = {}
	}) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (path) {
			const searchParams = new URLSearchParams(parameter);
			const urlParams = searchParams.toString();

			return needLogin && !isLogin
				? loginCallback()
				: navigate(`/${langId}/${path}?${urlParams}`);
		}

		SET_ENTER_PAGE({
			isLogin,
			langId,
			tpId,
			gameId,
			loginCallback,
			tpGameType
		});

		return null;
	};

	// * 透過條件過濾資料
	useEffect(() => {
		let partnerProducts = [
			{
				...productList.sports,
				path: paths.sports.root,
				parameter: { ...productList.sports },
				imgName: "saba"
			},
			{
				...productList.liveCasino_Allbet,
				imgName: "all"
			},
			{
				...productList.liveCasino_DG,
				imgName: "dg"
			},
			{
				...productList.liveCasino_AG,
				imgName: "ag"
			},
			{
				...productList.liveCasino_AE,
				imgName: "sexy"
			},
			{
				...productList.liveCasino_SA,
				imgName: "sa"
			},
			{
				...productList.casino_PP,
				path: paths.casino.root,
				parameter: { ...productList.casino_PP },
				imgName: "pp",
				allowCurrencies: getPPAllowCurrencies()
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
				...productList.casino_MGPSW,
				path: paths.casino.root,
				parameter: { ...productList.casino_MGPSW },
				imgName: "mic"
			},
			{
				...productList.casino_PlayTech,
				path: paths.casino.root,
				parameter: { ...productList.casino_PlayTech },
				imgName: "pt"
			},
			{
				...productList.casino_YGG,
				path: paths.casino.root,
				parameter: { ...productList.casino_YGG },
				imgName: "ygg"
			},
			{
				...productList.casino_JOKER,
				path: paths.casino.root,
				parameter: { ...productList.casino_JOKER },
				imgName: "joker"
			},
			{
				...productList.casino_SG,
				path: paths.casino.root,
				parameter: { ...productList.casino_SG },
				imgName: "spad"
			},
			{
				...productList.casino_JILI,
				path: paths.casino.root,
				parameter: { ...productList.casino_JILI },
				imgName: "jili"
			},
			{
				...productList.tcg,
				parameter: { ...productList.tcg },
				imgName: "tc"
			},
			{
				...productList.games_MPoker,
				imgName: "mp",
				allowCurrencies: [defCurrencyList.THB]
			},
			{
				...productList.casino_RedTiger,
				path: paths.casino.root,
				parameter: { ...productList.casino_RedTiger },
				imgName: "red"
			},
			{
				...productList.casino_NetEnt,
				path: paths.casino.root,
				parameter: { ...productList.casino_NetEnt },
				imgName: "net"
			},
			{
				...productList.casino_AdvantPlay,
				path: paths.casino.root,
				parameter: { ...productList.casino_AdvantPlay },
				imgName: "ap"
			},
			{
				...productList.liveCasino_EVO,
				imgName: "evo"
			},
			{
				...productList.casino_Habanero,
				path: paths.casino.root,
				parameter: { ...productList.casino_Habanero },
				imgName: "ha"
			},
			{
				...productList.casino_SimplePlay,
				path: paths.casino.root,
				parameter: { ...productList.casino_SimplePlay },
				imgName: "simple"
			},
			{
				...productList.casino_Skywind,
				path: paths.casino.root,
				parameter: { ...productList.casino_Skywind },
				imgName: "sky"
			},
			{
				...productList.casino_Nextspin,
				path: paths.casino.root,
				parameter: { ...productList.casino_Nextspin },
				imgName: "next"
			},
			{
				...productList.eSport_IM,
				imgName: "im-esports"
			},
			{
				...productList.casino_SPRIBE,
				path: paths.casino.root,
				parameter: { ...productList.casino_SPRIBE },
				imgName: "spribe"
			},
			{
				...productList.casino_PNG,
				path: paths.casino.root,
				parameter: { ...productList.casino_PNG },
				imgName: "png"
			},
			{
				...productList.casino_Endorphina,
				path: paths.casino.root,
				parameter: { ...productList.casino_Endorphina },
				imgName: "es"
			},
			{
				...productList.liveCasino_eBET,
				path: paths.casino.root,
				parameter: { ...productList.liveCasino_eBET },
				imgName: "we"
			},
			{
				...productList.casino_AMB,
				path: paths.casino.root,
				parameter: { ...productList.casino_AMB },
				imgName: "askme"
			},
			{
				...productList.casino_FaChai,
				path: paths.casino.root,
				parameter: { ...productList.casino_FaChai },
				imgName: "fachai"
			},
			{
				...productList.casino_BNG,
				path: paths.casino.root,
				parameter: { ...productList.casino_BNG },
				imgName: "bnga"
			},
			{
				...productList.casino_PEGASUS,
				path: paths.casino.root,
				parameter: { ...productList.casino_PEGASUS },
				imgName: "pegasus"
			},
			{
				...productList.games_V8Poker,
				imgName: "v8",
				allowCurrencies: [
					defCurrencyList.MYR,
					defCurrencyList.USD,
					defCurrencyList.THB,
					defCurrencyList.IDR,
					defCurrencyList.INR,
					defCurrencyList.CNY,
					defCurrencyList.KHM,
					defCurrencyList.VND,
					defCurrencyList.USDT
				]
			},
			{
				...productList.TFGaming,
				imgName: "tfg"
			},
			{
				...productList.casino_NoLimitCity,
				path: paths.casino.root,
				parameter: { ...productList.casino_NoLimitCity },
				imgName: "nlc"
			},
			{
				...productList.casino_Amigo,
				imgName: "amigo",
				allowCurrencies: allowedCurrencyList.casino_Amigo
			}
		];

		// * 有登入的話透過 api 的 tpIds 過濾一次
		partnerProducts = isLogin
			? partnerProducts.filter(({ tpId }) => productTpIds?.includes(tpId))
			: partnerProducts;

		// * 有 allowCurrencies 的話需過濾一次 currencyId
		partnerProducts = partnerProducts.filter(
			({ allowCurrencies }) =>
				!allowCurrencies || allowCurrencies?.includes(currencyId)
		);

		setProducts(partnerProducts);
	}, [isLogin, productTpIds]);

	return (
		<>
			<div className="partner-title">
				{t("Label_Home_HonorablePartner")}
			</div>
			<div className="partner-logo">
				{products.map(item => {
					const { imgName } = item;
					return (
						<a onClick={() => onOpenProduct(item)} key={imgName}>
							<img
								src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/providers-logo/${imgName}.png`}
								alt={`img-${imgName}`}
							/>
						</a>
					);
				})}
			</div>
		</>
	);
};

export default HonorablePartner;
