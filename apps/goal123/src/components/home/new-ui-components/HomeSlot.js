import React from "react";

const HomeSlot = () => {
	return (
		<div className="home-popularslots">
			<div className="home-title">POPULAR slot games Ranking</div>
			<div className="popularslots-content">
				<div className="popularslots-inner">
					<div className="regular">
						{/* Clicking on the current brand links directly to that brand */}
						{/* PG */}
						<a className="item">
							<img
								src="https://banner.goal123.org/desktop/img/home-page/popular-slots-pg.png"
								alt=""
							/>
						</a>
					</div>
					{/* The following brands need to determine the "hottest game" within the specified brand. The cover may change depending on the popularity data */}
					<div className="variation">
						{/* PP */}
						<a className="item">
							{/* The hottest game cover of this brand */}
							<img
								src="https://banner.goal123.org/desktop/img/home-page/pop-pp.jpg"
								alt=""
							/>
							<div>
								<img
									src="https://banner.goal123.org/desktop/img/home-page/popular-slots-pp.png"
									alt=""
								/>
							</div>
						</a>
						{/* skywind */}
						<a className="item">
							{/* The hottest game cover of this brand */}
							<img
								src="https://banner.goal123.org/desktop/img/home-page/pop-sky.png"
								alt=""
							/>
							<div>
								<img
									src="https://banner.goal123.org/desktop/img/home-page/popular-slots-sky.png"
									alt=""
								/>
							</div>
						</a>
						{/* spadegaming */}
						<a className="item">
							{/* The hottest game cover of this brand */}
							<img
								src="https://banner.goal123.org/desktop/img/home-page/pop-spad.jpg"
								alt=""
							/>
							<div>
								<img
									src="https://banner.goal123.org/desktop/img/home-page/popular-slots-spade.png"
									alt=""
								/>
							</div>
						</a>
					</div>
				</div>
				<div className="popularslots-inner">
					<div className="regular">
						{/* Clicking on the current brand links directly to that brand */}
						{/* AP */}
						<a className="item">
							<img
								src="https://banner.goal123.org/desktop/img/home-page/popular-slots-ap.png"
								alt=""
							/>
						</a>
					</div>
					{/* The following brands need to determine the "hottest game" within the specified brand. The cover may change depending on the time and situation */}
					<div className="variation">
						{/* jili */}
						<a className="item">
							{/* The hottest game cover of this brand */}
							<img
								src="https://banner.goal123.org/desktop/img/home-page/pop-jili.jpg"
								alt=""
							/>
							<div>
								<img
									src="https://banner.goal123.org/desktop/img/home-page/popular-slots-jili.png"
									alt=""
								/>
							</div>
						</a>
						{/* microgaming */}
						<a className="item">
							{/* The hottest game cover of this brand */}
							<img
								src="https://banner.goal123.org/desktop/img/home-page/pop-micro.jpg"
								alt=""
							/>
							<div>
								<img
									src="https://banner.goal123.org/desktop/img/home-page/popular-slots-micro.png"
									alt=""
								/>
							</div>
						</a>
						{/* cq9 */}
						<a className="item">
							{/* The hottest game cover of this brand */}
							<img
								src="https://banner.goal123.org/desktop/img/home-page/pop-cq9.jpg"
								alt=""
							/>
							<div>
								<img
									src="https://banner.goal123.org/desktop/img/home-page/cq9.png"
									alt=""
								/>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeSlot;
