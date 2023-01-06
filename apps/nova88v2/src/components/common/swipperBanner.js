/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import SwiperCore, {
	Navigation,
	Pagination,
	Autoplay as SwiperCoreAutoPlay
} from "swiper";
import { Link } from "gatsby";
import config from "../../config";
import {
	api_site_GetBannerV3,
	defBannerActionMode
} from "../../service/api/site";
import { userInfoContext, popBoxContext } from "./context";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import path from "../../router";
import defPopBoxType from "./defPopBoxType";
import { useGotoGame } from "../hook/useGotoGame";
import productList from "../../datas/productList";

const NeedLoginRoute = [];

SwiperCore.use([Navigation, Pagination, SwiperCoreAutoPlay]);

export const ClickLink = ({
	tpId,
	gameId,
	matchId,
	actionMode,
	bannerLink,
	lang,
	isLogin,
	setPopBox,
	openInBlank,
	tpGameType
}) => {
	const HandleLogin = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	if (actionMode === defBannerActionMode.OpenWindow) {
		window.open(bannerLink, "_blank");
	} else if (actionMode === defBannerActionMode.RedirectPage) {
		window.location.href = bannerLink;
	} else if (actionMode === defBannerActionMode.RedirectPageOfThisSite) {
		HandleLogin();
	} else if (actionMode === defBannerActionMode.GoToGame) {
		SET_ENTER_PAGE({
			langId: lang,
			tpId,
			gameId,
			matchid: matchId,
			isLogin: isLogin === true,
			loginCallback: HandleLogin,
			openInBlank,
			tpGameType
		});
	}
};

export const SetPathParameter = ({
	urlRouter,
	tpId,
	gameId,
	matchId,
	tpGameType
}) => {
	let result = "";
	const isNumber = val => {
		const rex = /[0-9]/;
		return rex.test(val);
	};
	if (urlRouter === path.casino.root) {
		result = `?tpId=${tpId}${
			isNumber(tpGameType)
				? `&tpGameType=${tpGameType}`
				: "&tpGameType=undefined"
		}`;
	} else if (urlRouter === path.sports.root) {
		result = `?tpId=${tpId}${gameId ? `&gameId=${gameId}` : ""}${
			matchId ? `&matchId=${matchId}` : ""
		}`;
	}
	return result;
};

export const useGetBanner = ({ langId, ImgFolder, currencyId }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [banner, setBanner] = useState([]);

	useEffect(() => {
		let mounted = true;

		const getBanner = async () => {
			setBanner([]);
			try {
				ImgFolder.forEach(async BannerType => {
					const res = await api_site_GetBannerV3({
						lang: langId,
						BannerType,
						currencyId
					});

					if (res.data.errorCode === 0 && mounted) {
						setBanner(prev => [...prev, ...res.data.data]);
					} else if (res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: `[${res.data.errorCode}] ${res.data.message}`,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={() => {
											setPopBox({ isOpen: false });
										}}
									>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				});

				return true;
			} catch (error) {
				if (mounted) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: t("msg_ApiServerError"),
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-check"
									onClick={() => {
										setPopBox({ isOpen: false });
									}}
								>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
				return false;
			}
		};

		getBanner();

		return () => {
			mounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [langId, currencyId]);

	return { banner };
};

const Panel = ({ ImgFolder, className, openInBlank }) => {
	const { userInfo } = useContext(userInfoContext);
	const { banner } = useGetBanner({
		langId: userInfo.langId,
		ImgFolder,
		currencyId: userInfo.currencyId
	});
	const { setPopBox } = useContext(popBoxContext);

	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});

	const handleClick = ({
		tpId,
		gameId,
		matchId,
		actionMode,
		bannerLink,
		tpGameType
	}) => {
		if (Number(tpId) === productList.casino_PT.tpId)
			return handleGoToGame({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId: Number(tpId),
				gameId,
				tpGameType
			});

		// tpId 1 等於saba
		if (actionMode === defBannerActionMode.GoToGame && Number(tpId) === 1) {
			window.location.href = `${window.location.origin}/${userInfo.langId}/sports?provider=saba&type=soccer`;
			return false;
		}

		return ClickLink({
			tpId,
			gameId,
			matchId,
			actionMode,
			bannerLink,
			tpGameType,
			lang: userInfo.langId,
			isLogin: userInfo.isLogin,
			setPopBox,
			openInBlank
		});
	};

	const rows = banner?.map((b, bIdx) => {
		let redirectLink = null;

		if (b.actionMode === defBannerActionMode.GoToBonus) {
			redirectLink = `/${path.promotion.root}?BonusCode=${b.bonusCode}`;
		} else if (
			b.actionMode === defBannerActionMode.RedirectPageOfThisSite
		) {
			const parameter = SetPathParameter({ ...b });
			redirectLink =
				!userInfo.isLogin && NeedLoginRoute.includes(b.urlRouter)
					? null
					: `/${b.urlRouter}${parameter}`;
		}

		if (redirectLink) {
			return (
				<Link
					key={`${userInfo.langId}-${bIdx}`}
					replace={redirectLink === "/rewards"}
					to={
						redirectLink === "/rewards"
							? `${config.openURL}${redirectLink}`
							: `/${userInfo.langId}${redirectLink}`
					}
				>
					<img
						src={b.bannerMobileUrl}
						className="banner"
						alt={b.bannerName ?? ""}
					/>
				</Link>
			);
		}

		return (
			<button
				key={`${userInfo.langId}-${bIdx}`}
				onClick={() => handleClick(b)}
			>
				<img
					src={b.bannerMobileUrl}
					className="banner"
					alt={b.bannerName ?? ""}
				/>
			</button>
		);
	});
	return <Autoplay Rows={rows} className={className} />;
};

Panel.defaultProps = {
	openInBlank: false,
	className: null
};

Panel.propTypes = {
	ImgFolder: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	).isRequired,
	openInBlank: PropTypes.bool,
	className: PropTypes.string
};

const defSwipperConfig = {
	spaceBetween: 30,
	centeredSlides: true,
	loop: true,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	rebuildOnUpdate: true
};

export const Autoplay = ({ Rows, className }) => {
	const params = defSwipperConfig;
	return Rows && Rows.length > 0 ? (
		<div className={`swiper-container ${className}`}>
			<div className="swiper-wrapper">
				{/* eslint-disable-next-line react/jsx-props-no-spreading */}
				<Swiper {...params}>{Rows}</Swiper>
			</div>
		</div>
	) : null;
};

Autoplay.defaultProps = {
	className: null
};

Autoplay.propTypes = {
	Rows: PropTypes.arrayOf(PropTypes.node).isRequired,
	className: PropTypes.string
};

export const AutoPlayWithBtn = ({ Rows, className }) => {
	const params = {
		...defSwipperConfig,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		getSwiper: obj => {
			ref.current = obj;
		},
		renderPrevButton: () => (
			<div className="swiper-button-prev" onClick={goPrev} />
		),
		renderNextButton: () => (
			<div className="swiper-button-next" onClick={goNext} />
		)
	};
	const ref = useRef(null);

	const goNext = () => {
		if (ref.current !== null) {
			ref.current.slideNext();
		}
	};

	const goPrev = () => {
		if (ref.current !== null) {
			ref.current.slidePrev();
		}
	};

	return Rows && Rows.length > 0 ? (
		<div className={`swiper-container ${className}`}>
			<div className="swiper-wrapper">
				{/* eslint-disable-next-line react/jsx-props-no-spreading */}
				<Swiper {...params}>{Rows}</Swiper>
			</div>
		</div>
	) : null;
};

AutoPlayWithBtn.defaultProps = {
	className: null
};

AutoPlayWithBtn.propTypes = {
	Rows: PropTypes.arrayOf(PropTypes.node).isRequired,
	className: PropTypes.string
};

export default Panel;
