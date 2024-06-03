/* eslint-disable react/no-array-index-key */
import React, {
	useEffect,
	useState,
	useContext,
	useRef,
	Children
} from "react";
import { products } from "@ailab-desktop/common";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import SwiperCore, {
	Navigation,
	Pagination,
	Autoplay as SwiperCoreAutoPlay
} from "swiper";
import { Link } from "gatsby";
import {
	api_site_GetBannerV3,
	defBannerActionMode
} from "../../service/api/site";
import { userInfoContext, popBoxContext } from "./context";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import path from "../../router";
import { defPopBoxType } from "./popBox";
import usePopBox from "../hook/usePopBox";

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
		const gameName =
			Object.keys(products).find(
				key =>
					products[key]?.tpId === tpId &&
					products[key]?.gameId === gameId
			) || "Soccer";

		result = gameName
			? `?game=${gameName}${matchId ? `&matchId=${matchId}` : ""}`
			: "";
	}
	return result;
};

export const useGetBanner = ({ langId, ImgFolder, errorPopBox }) => {
	const [banner, setBanner] = useState([]);

	useEffect(() => {
		let mounted = true;

		const getBanner = async () => {
			setBanner([]);
			try {
				ImgFolder.forEach(async BannerType => {
					const res = await api_site_GetBannerV3({
						lang: langId,
						BannerType
					});

					if (res.data.errorCode === 0 && mounted) {
						setBanner(prev => [...prev, ...res.data.data]);
					} else if (res.data.errorCode !== 0) {
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
					}
				});

				return true;
			} catch (error) {
				errorPopBox();
				return false;
			}
		};

		getBanner();

		return () => {
			mounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [langId]);

	return { banner };
};

const CustomSwipper = ({
	withBtn = true,
	withPagination = true,
	config = {},
	children
}) => {
	const childrenCount = Children.count(children);
	const ref = useRef(null);

	const params = {
		spaceBetween: 30,
		centeredSlides: true,
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false
		},
		rebuildOnUpdate: false,
		pagination: {
			el: withPagination ? ".swiper-pagination" : "",
			clickable: true
		},
		// 2024新版拿掉
		// navigation: {
		// 	nextEl: ".swiper-button-next",
		// 	prevEl: ".swiper-button-prev"
		// },
		getSwiper: obj => {
			ref.current = obj;
		},
		renderPrevButton: () =>
			withBtn && <div className="swiper-button-prev" onClick={goPrev} />,
		renderNextButton: () =>
			withBtn && <div className="swiper-button-next" onClick={goNext} />,
		...config
	};

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

	const onMouseOverHandlar = () => {
		if (params.autoplay) {
			ref.current?.autoplay?.stop();
		}
	};

	const onMouseLeaveHandlar = () => {
		if (params.autoplay) {
			ref.current?.autoplay?.start();
		}
	};

	if (childrenCount <= 0) return null;

	return (
		<div
			className="swiper-container"
			onMouseOver={() => onMouseOverHandlar()}
			onMouseLeave={() => onMouseLeaveHandlar()}
			onFocus={() => 0}>
			<div className="swiper-wrapper">
				{/* eslint-disable-next-line react/jsx-props-no-spreading */}
				<Swiper {...params}>{children}</Swiper>
			</div>
		</div>
	);
};

CustomSwipper.defaultProps = {
	withBtn: true,
	withPagination: true,
	config: {},
	children: null
};

CustomSwipper.propTypes = {
	withBtn: PropTypes.bool,
	withPagination: PropTypes.bool,
	config: PropTypes.objectOf(PropTypes.any),
	children: PropTypes.node
};

export const BannerSwipper = ({
	ImgFolder,
	openInBlank,
	withBtn,
	withPagination,
	config
}) => {
	const { userInfo } = useContext(userInfoContext);
	const { errorPopBox } = usePopBox();
	const { banner } = useGetBanner({
		langId: userInfo.langId,
		ImgFolder,
		errorPopBox
	});
	const { setPopBox } = useContext(popBoxContext);

	const handleClick = ({
		tpId,
		gameId,
		matchId,
		actionMode,
		bannerLink,
		tpGameType
	}) => {
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
					to={`/${userInfo.langId}${redirectLink}`}>
					<img
						src={b.bannerPCUrl}
						className="banner"
						alt={b.bannerName ?? ""}
					/>
				</Link>
			);
		}

		return (
			<button
				key={`${userInfo.langId}-${bIdx}`}
				onClick={() => handleClick(b)}>
				<img
					src={b.bannerPCUrl}
					className="banner"
					alt={b.bannerName ?? ""}
				/>
			</button>
		);
	});

	return (
		<CustomSwipper
			withBtn={withBtn}
			withPagination={withPagination}
			config={config}>
			{rows}
		</CustomSwipper>
	);
};

BannerSwipper.defaultProps = {
	withBtn: false,
	withPagination: true,
	openInBlank: false,
	config: {}
};

BannerSwipper.propTypes = {
	ImgFolder: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	).isRequired,
	openInBlank: PropTypes.bool,
	withBtn: PropTypes.bool,
	withPagination: PropTypes.bool,
	config: PropTypes.objectOf(PropTypes.any)
};

export default CustomSwipper;
