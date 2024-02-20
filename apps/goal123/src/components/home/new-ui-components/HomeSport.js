import React from "react";

const HomeSport = () => {
	return (
		<div className="home-sports">
			<div>
				<div className="home-title">Sports</div>
				<div className="sports-menu">
					<a href="" className="active">
						footerball
					</a>
					<a href="">basketball</a>
				</div>
			</div>
			<div className="ambassador">
				<img
					src="https://banner.goal123.org/desktop/img/home-page/hotmatches-bg.png"
					alt=""
				/>
				<span>Brand Ambassador 2023-2024 </span>
				<span>Michael Ballack</span>
			</div>
			<div className="video-content">
				<div
					style={{
						position: "relative",
						width: "100%",
						height: "0px",
						paddingBottom: "56.250%"
					}}>
					<iframe
						allowFullScreen
						allow="fullscreen"
						height="100%"
						src="https://streamable.com/e/vmq4q3?nocontrols=1"
						width="100%"
						style={{
							border: "none",
							width: "100%",
							height: "100%",
							position: "absolute",
							left: "0px",
							top: "0px",
							overflow: "hidden"
						}}
					/>
				</div>
			</div>
			<div className="sports-hotmatches">
				<div className="swiper-wrapper">
					<div className="swiper-slide">
						<div className="sports-item">
							<div className="title">
								Spain Primera Laliga Spain
							</div>
							<div className="date">
								<span>31/03/2024</span>
								<span>02:30</span>
							</div>
							<div className="team-content">
								<div className="team-item">
									<img
										src="https://sportsimgs.0814media.net/UEFA/Manchester City.png"
										alt=""
									/>
									<div className="team-name">
										Manchester CityManchester City
									</div>
									<div className="odds">
										<div className="handicap">+0.25</div>
										<div>0.88</div>
									</div>
								</div>
								<div className="team-item">
									<img
										src="https://sportsimgs.0814media.net/UEFA/Sevilla.png"
										alt=""
									/>
									<div className="team-name">Stoke City</div>
									<div className="odds">
										<div className="handicap">-0.25</div>
										<div>1</div>
									</div>
								</div>
							</div>
							<button className="btn-bet">Bet Now</button>
						</div>
					</div>

					{/* Repeat for each swiper-slide as needed */}
				</div>
				<div className="swiper-button-next" />
				<div className="swiper-button-prev" />
			</div>
		</div>
	);
};

export default HomeSport;
