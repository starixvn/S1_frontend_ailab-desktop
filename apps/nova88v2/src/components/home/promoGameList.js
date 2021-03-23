import React, { useEffect, useState, useRef } from "react";
import Swiper from "react-id-swiper";
import { Link, navigate } from "@reach/router";
import path from "../../router";
import usePrmotion from "../promotion/hook/usePromotion";
import { isExpiry } from "../promotion/promotion.common";
import usePopBox from "../hook/usePopBox";

export default ({ t, userInfo }) => {
	const isMountedRef = useRef(null);
	const { errorPopBox } = usePopBox();
	const { promoList, setPromoList, getPromotionListV2 } = usePrmotion({
		userInfo,
		isMountedRef,
		errorPopBox
	});

	useEffect(() => {
		if (userInfo.isLogin === null) return;
		async function getData() {
			await getPromotionListV2();
		}
		getData();
	}, [userInfo.isLogin, userInfo.langId]);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const defSwipperConfig = {
		spaceBetween: 20,
		slidesPerView: 8,
		centeredSlides: true,
		loopFillGroupWithBlank: true,
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false
		}
	};

	const params = {
		...defSwipperConfig
	};

	const filterPromoList = promoList.filter(p => {
		return !isExpiry({
			...p,
			isLogin: userInfo.isLogin
		});
	});

	const clickToGame = _bonusCode => {
		navigate(
			`/${userInfo.langId}/${path.promotion.root}/${path.promotion.sub.promotionInfo.root}?BonusCode=${_bonusCode}`
		);
	};

	const Rows = filterPromoList.map(p => {
		return (
			<div
				className="swiper-slide"
				key={`promotion.list-${p.bonusCode}-${p.categoryId}-${p.tpId}`}>
				<div>
					<img src={p.banner} alt={p.title} />
				</div>
				<div className="title">{p.title}</div>
				<div className="btnGroup">
					<button
						className="lightblue"
						onClick={clickToGame.bind(this, p.bonusCode)}>
						{t("lbl_Details")}
					</button>
					{/* <Link
						type="button"
						className="lightblue"
						to={`/${userInfo.langId}/${path.promotion.root}/${path.promotion.sub.promotionInfo.root}?BonusCode=${p.bonusCode}`}>
						{t("lbl_Details")}
					</Link> */}
				</div>
			</div>
		);
	});

	const [swiper, setSwiper] = useState(null);

	return Rows && Rows.length > 0 ? (
		<>
			<div className="moduleTitle icon icon-gift">Promos</div>
			<div className="promos">
				<div className="swiper-container gameSwiper">
					<div className="swiper-wrapper">
						<Swiper {...params} getSwiper={setSwiper}>
							{Rows}
						</Swiper>
					</div>
				</div>
			</div>
		</>
	) : (
		<></>
	);
};
