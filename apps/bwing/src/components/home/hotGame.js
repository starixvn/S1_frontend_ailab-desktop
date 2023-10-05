import React, { useContext } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";
import { HOT_GAME_LIST } from "./def";
import productList, { defTpGameType } from "../../datas/productList";
import { popBoxContext, userInfoContext } from "../common/context";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { defPopBoxType } from "../common/defPopBoxType";
import { defMenuType } from "../layout/header.menu.def";
import { useGotoGame } from "../hook/useGotoGame";

const HotGames = ({ maintainList }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { handleGoToGame } = useGotoGame({ autoGetData: false });

	const handleItemClick = ({
		tpId,
		gameId,
		menuType,
		_subPath,
		isInMaintain,
		tpGameType,
		afterLogin
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
		if (menuType === defMenuType.useGoToGame) {
			handleGoToGame({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				tpGameType
			});
		} else if (_subPath) {
			if (afterLogin && !userInfo.isLogin) {
				loginCallback();
			} else {
				navigate(`/${userInfo.langId}/${_subPath}`);
			}
		} else {
			SET_ENTER_PAGE({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				loginCallback,
				tpGameType
			});
		}
	};

	const handleHotGameClick = ({
		href,
		tpId,
		gameId,
		tpGameType,
		menuType = null,
		subPath = null,
		parameter = null,
		afterLogin = false
	}) => {
		const isMaintain = maintainList.find(
			({ tpId: maintainTpId, tpGameType: maintainTpGameType }) =>
				maintainTpId === tpId &&
				(maintainTpGameType === tpGameType ||
					maintainTpGameType === defTpGameType.All)
		);

		let _subPath;
		if (subPath) {
			if (tpId === productList.sportSaba.tpId) {
				_subPath = `${subPath}?game=${parameter?.name}`;
			} else {
				_subPath = subPath;
			}
		}

		if (isMaintain) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.UnderMaintain,
				clickClose: () => setPopBox({ isOpen: false }),
				content: t("lbl_underMaintenance"),
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button
							className="btn-gray"
							onClick={() => {
								setPopBox({ isOpen: false });
							}}>
							OK
						</button>
					</div>
				)
			});
		} else {
			if (tpId) {
				handleItemClick({
					tpId,
					gameId,
					menuType,
					_subPath,
					isInMaintain: isMaintain,
					tpGameType,
					afterLogin
				});
			}
			if (href) {
				navigate(href);
			}
		}
	};

	return (
		<div className="col-12">
			<div className="home-title">
				<i className="icon-games" />
				{t("lbl_HOT_GAMES")}
			</div>
			<div className="home-hotgame mb-6">
				<a
					className="home-hotgame-left"
					onClick={() => handleHotGameClick({ ...HOT_GAME_LIST[0] })}>
					<i className="tag-live" />
					<img
						src={`${bannerImgUrl}/desktop/img/4.0/hotgames/${HOT_GAME_LIST[0].category}.png`}
						alt=""
					/>
					<div className="subtitle">
						{t(HOT_GAME_LIST[0].displayKey)}
					</div>
				</a>
				<div className="home-hotgame-right">
					{HOT_GAME_LIST.slice(1).map(
						({ displayKey, category, ...rest }) => (
							<a
								className="home-hotgame-item"
								key={`${displayKey}_${category}`}
								onClick={() => handleHotGameClick({ ...rest })}>
								<img
									src={`${bannerImgUrl}/desktop/img/4.0/hotgames/${category}.png`}
									alt=""
								/>
								<div className="subtitle">{t(displayKey)}</div>
							</a>
						)
					)}
				</div>
			</div>
		</div>
	);
};

HotGames.defaultProps = {
	maintainList: []
};

HotGames.propTypes = {
	maintainList: PropTypes.arrayOf(PropTypes.any)
};

export default HotGames;
