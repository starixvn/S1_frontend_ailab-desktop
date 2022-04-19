import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import ReactMarquee from "react-fast-marquee";
import { defPopBoxType } from "../common/defPopBoxType";
import { SET_ENTER_PAGE, SET_CASINO_ENTER_PAGE } from "../../service/enterPage";
import path from "../../router";
import { defTpGameType, defCategory } from "../../datas/productList";
import { api_site_GetHotGames } from "../../service/api/site";

export default ({ setPopBox, t, userInfo, allMaintainList }) => {
	const [gameList, setGameList] = useState([]);

	useEffect(() => {
		api_site_GetHotGames({ langId: userInfo.langId })
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
	}, []);

	const openLoginPopBox = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	const onNavigate = (
		tpId,
		gameId,
		tpCategory,
		_isInMaintain,
		tpGameType
	) => {
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

		if (tpCategory === defCategory.Slots) {
			if (userInfo.isLogin !== true) {
				openLoginPopBox();
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
	return (
		<HotGameList
			t={t}
			gameList={gameList}
			allMaintainList={allMaintainList}
			onNavigate={onNavigate}
		/>
	);
};

const HotGameList = ({ t, gameList, allMaintainList, onNavigate }) => {
	const rows = gameList.map(g => {
		const isInMaintain = allMaintainList?.some(
			mt =>
				mt.tpId === g.tpId &&
				(mt.tpGameType === g.tpGameType ||
					mt.tpGameType === defTpGameType.All)
		);

		return (
			<a
				key={`hotgamelist-${g.tpId}-${g.gameId}-${g.tpCategory}`}
				onClick={() =>
					onNavigate(
						g.tpId,
						g.gameId,
						g.tpCategory,
						isInMaintain,
						g.tpGameType
					)
				}
				style={{
					margin: "0 10px"
				}}>
				<img className="gameimg" src={g.gameLogo} alt="" />
				<div className="title">
					<p>{g.gameName}</p>
					<img src={g.tpLogo} alt="" />
				</div>
			</a>
		);
	});
	return (
		<div className="hotgame">
			<div className="titleBox">
				<div className="title">{t("lbl_HOT_GAMES")}</div>
				<Link to={path.casino.root}>{t("lbl_More")}...</Link>
			</div>

			<div className="gameBox">
				<ReactMarquee
					speed={85}
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
		</div>
	);
};
