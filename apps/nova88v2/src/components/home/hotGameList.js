import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactMarquee from "react-fast-marquee";
import { SET_ENTER_PAGE, SET_CASINO_ENTER_PAGE } from "../../service/enterPage";
import defPopBoxType from "../common/defPopBoxType";
import { popBoxContext } from "../common/context";
import { useGotoGame } from "../hook/useGotoGame";
import {
	defTpGameType,
	defCategory,
	defSlotTpGameType
} from "../../datas/productList";
import { api_site_GetHotGames } from "../../service/api/site";
import usePopBox from "../hook/usePopBox";

// const defGameType = {
// 	table: "table",
// 	slots: "slots",
// 	poker: "poker"
// };

const HotGameList = ({ t, userInfo, maintainList }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const [gameList, setGameList] = useState([]);
	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});
	useEffect(() => {
		api_site_GetHotGames({
			langId: userInfo.langId,
			currencyId: userInfo.currencyId
		})
			.then(res => {
				if (res.data.errorCode === 0) {
					setGameList(res.data.data);
				} else {
					errorPopBox(
						res.data.message || "error",
						res.data.errorCode
					);
				}
			})
			.catch(() => errorPopBox());
	}, [userInfo.currencyId]);

	const ClickGame = (tpId, gameId, tpCategory, _isInMaintain, tpGameType) => {
		const clickClose = () => {
			setPopBox({ isOpen: false });
		};
		const LoginPopBox = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (_isInMaintain) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.UnderMaintain,
				clickClose
			});
			return;
		}
		if (tpId === defSlotTpGameType.PT.tpId) {
			handleGoToGame({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				tpGameType
			});
		} else if (tpCategory === defCategory.Slots) {
			if (userInfo.isLogin !== true) {
				LoginPopBox();
			} else {
				SET_CASINO_ENTER_PAGE({
					tpId,
					gameId,
					isFree: false,
					langId: userInfo.langId,
					tpGameType
				});
			}
		} else {
			SET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isLogin: userInfo.isLogin,
				loginCallback: LoginPopBox,
				tpGameType
			});
		}
	};

	const rows = gameList?.map(g => {
		const isInMaintain = maintainList?.some(
			mt =>
				mt.tpId === g.tpId &&
				(mt.tpGameType === g.tpGameType ||
					mt.tpGameType === defTpGameType.All)
		);

		return (
			<div
				key={`hotGame-${g.tpId}-${g.gameName}`}
				style={{
					width: "300px",
					margin: "0 15px"
				}}
				onClick={() =>
					ClickGame(
						g.tpId,
						g.gameId,
						g.tpCategory,
						isInMaintain,
						g.tpGameType
					)
				}>
				<img src={g.gameLogo} alt={g.gameName} />
				<div>
					<div className="title">{g.gameName}</div>
					<div>{g.tpName}</div>
				</div>
				<img alt={g.tpName} src={g.tpLogo} />
			</div>
		);
	});

	return (
		rows?.length > 0 && (
			<>
				<div className="moduleTitle icon icon-mediafire">
					{t("lbl_HOT_GAMES")}
				</div>

				<div className="hotGame">
					<ReactMarquee
						speed={145}
						pauseOnHover={true}
						gradientColor={false}>
						<div className="swiper-container">
							<div
								className="swiper-wrapper"
								style={{ display: "flex" }}>
								{rows}
							</div>
						</div>
					</ReactMarquee>
				</div>
			</>
		)
	);
};

HotGameList.propTypes = {
	t: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default HotGameList;
