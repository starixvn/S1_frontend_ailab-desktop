import React from "react";
import CustomSwipper from "../../common/customSwipper";

import { defBannerType } from "../../../service/api/site";

const HomeBanner = () => {

	

	// img data will be api response from api  k 


	return (
		<>
			<CustomSwipper
				ImgFolder={[defBannerType.Promotions]}
				withBtn={false}
				withPagination={true}
				config={{
					effect: "fade",
					autoplay: {
						delay: 5000,
						disableOnInteraction: false
					}
				}}>
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
			</CustomSwipper>

			{/* <div className="home-banner ">
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
			</div> */}
		</>
	);
};

export default HomeBanner;
