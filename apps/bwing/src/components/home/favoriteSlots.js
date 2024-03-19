import React, { useContext } from "react";
import Swiper from "react-id-swiper";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { defTpGameType } from "../../datas/productList";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import { defCategory } from "../promotion/promotion.def";
import { SET_CASINO_ENTER_PAGE, SET_ENTER_PAGE } from "../../service/enterPage";
import useDelayFunc from "../hook/useDelayFunc";
import {
	defLoginGameType,
	defSpecialSetting,
	useGotoGame
} from "../hook/useGotoGame";

const FavoriteSlots = ({ hotGameList, maintainList }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { throttle } = useDelayFunc();
	const { handleGoToGame } = useGotoGame({ autoGetData: false });

	const onClickPlay = ({ tpId, gameId, isFree, delay, tpGameType }) => {
		if (userInfo.isLogin || isFree) {
			throttle(
				() =>
					SET_CASINO_ENTER_PAGE({
						tpId,
						gameId,
						isFree,
						langId: userInfo.langId,
						tpGameType,
						execFunction:
							tpId === defSpecialSetting.PG
								? handleGoToGame.bind(this, {
										langId: userInfo.langId,
										tpId,
										gameId,
										isFun: isFree,
										tpGameType,
										loginGameType:
											defLoginGameType.returnHtml
								  })
								: null
					}),
				delay
			);
		}
	};

	const handleGameClick = ({ tpId, gameId, tpCategory, tpGameType }) => {
		if (
			maintainList?.some(
				m =>
					m.tpId === tpId &&
					(m.tpGameType === tpGameType ||
						m.tpGameType === defTpGameType.All)
			)
		) {
			setPopBox({
				isOpen: true,
				content: t("lbl_underMaintenance"),
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button
							className="btn-gray"
							onClick={() => {
								setPopBox({ isOpen: false });
							}}
						>
							OK
						</button>
					</div>
				)
			});
		} else if (userInfo.isLogin === false) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login,
				customLayout: true
			});
		} else if (tpCategory === defCategory.Slots) {
			onClickPlay({
				tpId,
				gameId,
				isFree: false,
				tpGameType
			});
		} else {
			SET_ENTER_PAGE({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				loginCallback: () =>
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.Login
					}),
				tpGameType
			});
		}
	};

	const swiperParams = {
		slidesPerView: 5.2,
		spaceBetween: 30
	};

	return (
		<div className="col-12">
			<div className="home-title">
				<i className="icon-slots" />
				{t("lbl_FavouriteSlots")}
			</div>
			<div className="home-fav mb-6">
				<Swiper {...swiperParams}>
					{hotGameList.map(
						({
							gameName,
							tpLogo,
							tpName,
							gameId,
							gameLogo,
							tpId,
							tpCategory,
							tpGameType
						}) => (
							<div key={`${tpId}_${tpGameType}_${gameId}`}>
								<a
									className="home-fav-item"
									onClick={() =>
										handleGameClick({
											tpId,
											gameId,
											tpCategory,
											tpGameType
										})
									}
								>
									<div
										className="home-fav-img"
										style={{
											backgroundImage: `url("${gameLogo}")`
										}}
									/>
									<div className="home-fav-info">
										<span>{gameName}</span>
										<img src={tpLogo} alt={tpName} />
									</div>
								</a>
							</div>
						)
					)}
				</Swiper>
			</div>
		</div>
	);
};
FavoriteSlots.defaultProps = {
	hotGameList: [],
	maintainList: []
};

FavoriteSlots.propTypes = {
	hotGameList: PropTypes.arrayOf(PropTypes.any),
	maintainList: PropTypes.arrayOf(PropTypes.any)
};

export default FavoriteSlots;
