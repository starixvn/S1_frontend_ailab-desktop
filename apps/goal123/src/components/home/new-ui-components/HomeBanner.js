import React from "react";

const HomeBanner = () => {
	return (
		<div className="home-banner ">
			<div className="swiper-container">
				<div className="swiper-wrapper">
					<a className="swiper-slide">
						<img src="https://goal123.org/Dec/Goal123-Direpay-Crypto-Cashback-EN.jpg" />
					</a>
					<a className="swiper-slide">
						<img src="https://goal123imgs.0814media.net/PRD/BannerManagement/24dac1a4-bdb7-4b45-808e-c0d981c6dc55.jpg" />
					</a>
					<a className="swiper-slide">
						<img src="https://goal123.org/Dec/Goal123-Direpay-Crypto-Cashback-EN.jpg" />
					</a>
					<a className="swiper-slide">
						<img src="https://goal123imgs.0814media.net/PRD/BannerManagement/24dac1a4-bdb7-4b45-808e-c0d981c6dc55.jpg" />
					</a>
					<div className="swiper-pagination" />
				</div>
			</div>
		</div>
	);
};

export default HomeBanner;
