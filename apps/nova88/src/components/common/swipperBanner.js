import React, { useEffect, useState, useContext, useRef } from "react";
import Swiper from "react-id-swiper";
import { Link } from "@reach/router";
import config from "../../config";
import { api_site_GetBanner } from "../../service/api/site";
import { userInfoContext, popBoxContext } from "./context";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import path from "../../router";
import { defPopBoxType } from "./popBox";

export const defBannerFolder = {
	Sports: "Sports"
};

export const defSpecialActionLink = {
	SportsIndex: "Sports/Index"
};

export const ClickLink = (
	tpId,
	gameId,
	lang,
	href,
	isOuterLink,
	urlWithLang,
	isLogin,
	setPopBox,
	matchid,
	openInBlank
) => {
	const HandleLogin = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};
	if (href === "Casino/Lobby") {
		window.location.href = `/${lang}/${path.casino.root}${
			tpId ? `/${tpId}` : ""
		}`;
	} else if (tpId === null) {
		if (href === "Promotion/Index") {
			window.location.href = `/${lang}/${path.promotion.root}`;
		} else if (href === "Home/Register") {
			//
		} else if (href === "918kiss") {
			if (isLogin) {
				window.location.href = `/${lang}/${path["918kiss"].root}`;
			} else {
				HandleLogin();
			}
		} else if (href === "leaderBoard") {
			window.location.href = `/${lang}/${path.leaderBoard.root}`;
		} else if (href === "referral") {
			if (isLogin) {
				window.location.href = `/${lang}/${path.referral.root}`;
			} else {
				HandleLogin();
			}
		} else {
			window.open(
				isOuterLink
					? href
					: `${config.t_and_cURL}${
							urlWithLang ? `/${lang}` : ""
					  }/${href}`,
				"_blank"
			);
		}
	} else {
		SET_ENTER_PAGE({
			langId: lang,
			tpId,
			gameId,
			matchid,
			isLogin: isLogin === true,
			loginCallback: HandleLogin,
			openInBlank
		});
	}
};

const Panel = ({
	ImgFolder,
	withBtn,
	openInBlank,
	filterHideInHome = false,
	className = ""
}) => {
	const [banner, setBanner] = useState([]);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	useEffect(() => {
		let mounted = true;
		if (userInfo.isLogin === null) {
			if (mounted) {
				setBanner([]);
			}
		} else {
			api_site_GetBanner(
				ImgFolder,
				"",
				userInfo.langId,
				filterHideInHome
			).then(res => {
				if (res.data.errorCode === 0 && mounted) {
					setBanner(res.data.data);
				}
			});
		}

		return () => {
			mounted = false;
		};
	}, [userInfo.langId, userInfo.isLogin, ImgFolder, filterHideInHome]);

	const rows = banner?.map((b, idx) => {
		const _imgFolder = b.imgFolder ?? ImgFolder;
		const lang =
			b.fromDB || b.lang?.includes(userInfo.langId)
				? userInfo.langId
				: "en";

		const actionLinkByLang = b.fromDB
			? null
			: b.actionLinkByLang?.find(a => a.lang === userInfo.langId);
		const actionLink = actionLinkByLang
			? actionLinkByLang.link
			: b.actionLink;
		const imgSRC = b.imgURL
			? b.imgURL
			: `${config.imgUrl}/CMS/${config.siteName}/${_imgFolder}/${lang}/${b.img}`;

		const key = `${lang}-${b.img}-${idx}`;

		if (actionLink === defSpecialActionLink.SportsIndex) {
			return (
				<Link
					key={key}
					to={`/${userInfo.langId}/${path.sports.root}?tpId=${b.tpId}&gameId=${b.gameId}&matchid=${b.matchid}`}>
					<img src={imgSRC} className="banner" alt={b.img ?? ""} />
				</Link>
			);
		}
		if (actionLink?.startsWith("Promotion/Bonus?")) {
			const promoUrlParam = actionLink.split("?")?.[1];
			return (
				<Link
					key={key}
					to={`/${userInfo.langId}/${path.promotion.root}/${path.promotion.sub.promotionInfo.root}?${promoUrlParam}`}>
					<img src={imgSRC} className="banner" alt={b.img ?? ""} />
				</Link>
			);
		}
		if (
			b.fromDB &&
			b.actionLink.startsWith("promotion/promotionInfo?BonusCode=")
		) {
			return (
				<Link key={key} to={`${userInfo.langId}/${b.actionLink}`}>
					<img src={imgSRC} className="banner" alt={b.img ?? ""} />
				</Link>
			);
		}
		return (
			<button
				onClick={ClickLink.bind(
					this,
					b.tpId,
					b.gameId,
					lang,
					actionLink,
					b.outerLink === true,
					b.urlWithLang,
					userInfo.isLogin,
					setPopBox,
					b.matchid,
					openInBlank
				)}
				key={key}>
				<img src={imgSRC} className="banner" alt={b.img ?? ""} />
			</button>
		);
	});

	return withBtn ? (
		<AutoPlayWithBtn Rows={rows} className={className} />
	) : (
		<Autoplay Rows={rows} className={className} />
	);
};

const defSwipperConfig = {
	spaceBetween: 30,
	centeredSlides: true,
	loop: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	rebuildOnUpdate: true
};

const Autoplay = ({ Rows, className }) => {
	const params = defSwipperConfig;
	return Rows && Rows.length > 0 ? (
		<div className={`swiper-container ${className}`}>
			<div className="swiper-wrapper">
				<Swiper {...params}>{Rows}</Swiper>
			</div>
		</div>
	) : (
		<></>
	);
};

const AutoPlayWithBtn = ({ Rows, className }) => {
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
				<Swiper {...params}>{Rows}</Swiper>
			</div>
		</div>
	) : (
		<></>
	);
};

export default Panel;
