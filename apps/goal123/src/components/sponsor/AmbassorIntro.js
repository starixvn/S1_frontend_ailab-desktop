import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { bannerImgUrl } from "../../config";

{
	/* <p>
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
					</p> */
}

export const AmbassadorIntro = () => {
	const { t } = useTranslation();
	const slidesData = [
		// {
		// 	type: "video",
		// 	src: "https://streamable.com/e/vmq4q3?nocontrols=1"
		// },
		{
			type: "image",
			src: `${bannerImgUrl}/desktop/img/ambassador/01.jpg`
		},
		{
			type: "image",
			src: `${bannerImgUrl}/desktop/img/ambassador/02.jpg`
		},
		{
			type: "image",
			src: `${bannerImgUrl}/desktop/img/ambassador/03.jpg`
		},
		{
			type: "image",
			src: `${bannerImgUrl}/desktop/img/ambassador/04.jpg`
		},
		{
			type: "image",
			src: `${bannerImgUrl}/desktop/img/ambassador/05.jpg`
		},
		{
			type: "image",
			src: `${bannerImgUrl}/desktop/img/ambassador/06.jpg`
		},
		{
			type: "image",
			src: `${bannerImgUrl}/desktop/img/ambassador/07.jpg`
		}
	];

	const swiper2SlidesData = [
		`${bannerImgUrl}/desktop/img/ambassador/01.jpg`,
		`${bannerImgUrl}/desktop/img/ambassador/02.jpg`,
		`${bannerImgUrl}/desktop/img/ambassador/03.jpg`,
		`${bannerImgUrl}/desktop/img/ambassador/04.jpg`,
		`${bannerImgUrl}/desktop/img/ambassador/05.jpg`,
		`${bannerImgUrl}/desktop/img/ambassador/06.jpg`,
		`${bannerImgUrl}/desktop/img/ambassador/07.jpg`
	];

	return (
		<div className="ambassador-intro">
			<div className="ambassador-gallery">
				{/* gallery */}
				{/* <Swiper className="swiper gallery2">
					<div className="swiper-wrapper">
						{slidesData.map((slide, index) => (
							<SwiperSlide className="swiper-slide" key={index}>
								<div>
									<img
										src={slide.src}
										alt={t("lbl_Ambassador_Slide_Image")}
									/>
								</div>
							</SwiperSlide>
						))}
						<div className="swiper-button-next" />
						<div className="swiper-button-prev" />
					</div>
				</Swiper> */}
				{/* gallery  btm */}
				{/* <Swiper className="swiper gallery">
					<div className="swiper-wrapper">
						{swiper2SlidesData.map((src, index) => (
							<SwiperSlide className="swiper-slide" key={index}>
								<img
									src={src}
									alt={t("lbl_Ambassador_Slide_Image")}
								/>
							</SwiperSlide>
						))}
					</div>
				</Swiper> */}
			</div>
			<div className="ambassador-intro-item">
				<div className="title">
					{t("lbl_Ambassador_Collaboration_Declaration_Title")}
				</div>
				<div className="content">
					<p>
						{t(
							"lbl_Ambassador_Collaboration_Declaration_Paragraph_1"
						)}
					</p>
					<p>
						{t(
							"lbl_Ambassador_Collaboration_Declaration_Paragraph_2"
						)}
					</p>
					<p>
						{t(
							"lbl_Ambassador_Collaboration_Declaration_Paragraph_3"
						)}
					</p>
				</div>
			</div>
		</div>
	);
};
