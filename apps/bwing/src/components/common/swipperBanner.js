/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import { Link } from "@reach/router";
import {
	api_site_GetBannerV3,
	defBannerActionMode
} from "../../service/api/site";
import { userInfoContext, popBoxContext } from "./context";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import path from "../../router";
import productList, { defCasinoProviders } from "../../datas/productList";
import { defPopBoxType } from "./defPopBoxType";

const NeedLoginRoute = [];

export const ClickLink = ({
	tpId,
	gameId,
	matchId,
	actionMode,
	bannerLink,
	lang,
	isLogin,
	setPopBox,
	openInBlank
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
			openInBlank
		});
	}
};

export const SetPathParameter = ({ urlRouter, tpId, gameId, matchId }) => {
	let result = "";
	if (urlRouter === path.casino.root) {
		const providerName = Object.values(defCasinoProviders).find(
			// eslint-disable-next-line eqeqeq
			x => x.tpId == tpId
		)?.name;

		result = providerName ? `?provider=${providerName}` : "";
	} else if (urlRouter === path.sports.root) {
		const gameName = Object.values(productList).find(
			// eslint-disable-next-line eqeqeq
			x => x.tpId == tpId && x.gameId == gameId
		)?.name;

		result = gameName
			? `?game=${gameName}${matchId ? `&matchId=${matchId}` : ""}`
			: "";
	}
	return result;
};

export const useGetBanner = ({ langId, ImgFolder }) => {
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
					}
				});

				return true;
			} catch (error) {
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

const Panel = ({ ImgFolder, openInBlank }) => {
	const { userInfo } = useContext(userInfoContext);
	const { banner } = useGetBanner({ langId: userInfo.langId, ImgFolder });
	const { setPopBox } = useContext(popBoxContext);

	const rows = banner?.map((b, bIdx) => {
		let redirectLink = null;

		if (b.actionMode === defBannerActionMode.GoToBonus) {
			redirectLink = `/${path.promotion.root}/${path.promotion.sub.promotionInfo.root}?BonusCode=${b.bonusCode}`;
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
				onClick={ClickLink.bind(this, {
					...b,
					isLogin: userInfo.isLogin,
					lang: userInfo.langId,
					setPopBox,
					openInBlank
				})}>
				<img
					src={b.bannerMobileUrl}
					className="banner"
					alt={b.bannerName ?? ""}
				/>
			</button>
		);
	});

	return <Autoplay Rows={rows} />;
};

Panel.defaultProps = {
	openInBlank: false
};

Panel.propTypes = {
	ImgFolder: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	).isRequired,
	openInBlank: PropTypes.bool
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

export const Autoplay = props => {
	const params = defSwipperConfig;
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <Swiper {...params}>{props.Rows}</Swiper>;
};

Autoplay.propTypes = {
	Rows: PropTypes.arrayOf(PropTypes.node).isRequired
};

export const AutoPlayWithBtn = ({ Rows }) => {
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
		<div className="swiper-container">
			<div className="swiper-wrapper">
				{/* eslint-disable-next-line react/jsx-props-no-spreading */}
				<Swiper {...params}>{Rows}</Swiper>
			</div>
		</div>
	) : null;
};

AutoPlayWithBtn.propTypes = {
	Rows: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default Panel;
