import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { bannerImgUrl } from "../../config";

export const AmbassadorIntro = () => {
	const slidesData = [
		{
			type: "video",
			src: "https://streamable.com/e/vmq4q3?nocontrols=1"
		},
		{
			type: "image",
			src: "https://banner.goal123.org/desktop/img/ambassador/01.jpg"
		},
		{
			type: "image",
			src: "https://banner.goal123.org/desktop/img/ambassador/02.jpg"
		},
		{
			type: "image",
			src: "https://banner.goal123.org/desktop/img/ambassador/03.jpg"
		},
		{
			type: "image",
			src: "https://banner.goal123.org/desktop/img/ambassador/04.jpg"
		},
		{
			type: "image",
			src: "https://banner.goal123.org/desktop/img/ambassador/05.jpg"
		},
		{
			type: "image",
			src: "https://banner.goal123.org/desktop/img/ambassador/06.jpg"
		},
		{
			type: "image",
			src: "https://banner.goal123.org/desktop/img/ambassador/07.jpg"
		}
	];

	const swiper2SlidesData = [
		"https://banner.goal123.org/desktop/img/ambassador/01.jpg",
		"https://banner.goal123.org/desktop/img/ambassador/02.jpg",
		"https://banner.goal123.org/desktop/img/ambassador/03.jpg",
		"https://banner.goal123.org/desktop/img/ambassador/04.jpg",
		"https://banner.goal123.org/desktop/img/ambassador/05.jpg",
		"https://banner.goal123.org/desktop/img/ambassador/06.jpg",
		"https://banner.goal123.org/desktop/img/ambassador/07.jpg"
	];

	return (
		<div className="ambassador-intro">
			<div className="ambassador-gallery">
				{/* gallery */}
				<Swiper className="swiper gallery2">
					<div className="swiper-wrapper">
						<SwiperSlide>
							<div className="swiper-slide">
								<img src="https://banner.goal123.org/desktop/img/ambassador/01.jpg" />
							</div>
							<div className="swiper-slide">
								<img src="https://banner.goal123.org/desktop/img/ambassador/02.jpg" />
							</div>
							<div className="swiper-slide">
								<img src="https://banner.goal123.org/desktop/img/ambassador/03.jpg" />
							</div>
							<div className="swiper-slide">
								<img src="https://banner.goal123.org/desktop/img/ambassador/04.jpg" />
							</div>
							<div className="swiper-slide">
								<img src="https://banner.goal123.org/desktop/img/ambassador/05.jpg" />
							</div>
							<div className="swiper-slide">
								<img src="https://banner.goal123.org/desktop/img/ambassador/06.jpg" />
							</div>
							<div className="swiper-slide">
								<img src="https://banner.goal123.org/desktop/img/ambassador/07.jpg" />
							</div>
						</SwiperSlide>
					</div>
					<div className="swiper-button-next" />
					<div className="swiper-button-prev" />
				</Swiper>
				{/* gallery  btm */}
				{/* <Swiper className="swiper gallery">
					<div className="swiper-wrapper">
						{swiper2SlidesData.map((src, index) => (
							<SwiperSlide className="swiper-slide" key={index}>
								<img src={src} alt="" />
							</SwiperSlide>
						))}
					</div>
				</Swiper> */}
			</div>
			<div className="ambassador-intro-item">
				<div className="title">Collaboration Declaration</div>
				<div className="content">
					<p>
						As a leading bookmaker and online entertainment in
						Vietnam, our brand has made a significant announcement
						by signing former German & Chelsea football star Michael
						Ballack as our brand ambassador for the season 2023/24.
					</p>
					<p>
						This strategic move demonstrates our commitment to
						aligning our brand with a renowned and respected figure
						in the world of football. Michael Ballack, known for his
						exceptional skills and contributions to the sport, will
						now represent Goal123, adding value and prestige to our
						company's brand image.
					</p>
					<p>
						As the collaboration unfolds, fans and members can
						anticipate exciting developments and initiatives that
						showcase the synergy between Goal123 and Michael
						Ballack, ultimately creating a compelling narrative of
						excellence, integrity, and passion within the realm in
						sports and online entertainment.
					</p>
				</div>
			</div>
		</div>
	);
};
