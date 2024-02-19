import React from "react";

const HomeJoin = () => {
	return (
		<div className="home-join">
			<div className="item">
				<div className="title">professional image</div>
				<div className="text">
					High trust with Michael Ballack as brand ambassador.
				</div>
				<img
					src="https://banner.goal123.org/desktop/img/home-page/professional.png"
					alt=""
				/>
				<div className="bottom">
					{/* Button click to the content page of the information */}
					<button className="btn-more">More info</button>
				</div>
			</div>
			<div className="item">
				<div className="title">exclusives VIP</div>
				<div className="text">VIP Lounge with exclusives</div>
				<img
					src="https://banner.goal123.org/desktop/img/home-page/exclusives-vip.png"
					alt=""
				/>
				<div className="bottom">
					{/* Button click to the content page of the information */}
					<button className="btn-more">More info</button>
				</div>
			</div>
			<div className="item">
				<div className="title">Attractive bonus</div>
				<div className="text">
					welcome bonus, daily reload, unlimited rebate
				</div>
				<img
					src="https://banner.goal123.org/desktop/img/home-page/bouns.png"
					alt=""
				/>
				<div className="bottom">
					{/* Button click to the content page of the information */}
					<button className="btn-more">More info</button>
				</div>
			</div>
			<div className="item">
				<div className="title">Speedy transactions</div>
				<div className="text">
					Enjoy faster and more convenient transaction payments
				</div>
				<img
					src="https://banner.goal123.org/desktop/img/home-page/speedy.png"
					alt=""
				/>
				<div className="bottom">
					{/* Button click to the content page of the information */}
					<button className="btn-more">More info</button>
				</div>
			</div>
		</div>
	);
};

export default HomeJoin;
