import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export default ({ lobbyImgList, activeProviderId, editSearchField }) => {
	const _slidesPerViewNum = 9;

	const params = {
		spaceBetween: 0,
		slidesPerView: _slidesPerViewNum,
		loop: true
	};

	const dataRows =
		lobbyImgList.length > _slidesPerViewNum
			? lobbyImgList
			: [...lobbyImgList, ...lobbyImgList];

	return (
		<div className="partnerSelect">
			<Swiper navigation {...params}>
				{dataRows.map((item, idx) => {
					return (
						<SwiperSlide
							key={`livacasino-slide-key-${item.lobbyDisplayName}-${idx}`}>
							<button
								className={
									activeProviderId === item.providerId
										? "active"
										: ""
								}
								onClick={() =>
									editSearchField(
										"provider",
										null,
										item.providerId
									)
								}>
								{activeProviderId === item.providerId ? (
									<img
										src={item.activeImg}
										alt="topquick-img"
									/>
								) : (
									<img src={item.img} alt="topquick-img" />
								)}

								<div>{item.lobbyDisplayName}</div>
							</button>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};
