import React from "react";

const HomeInfo = () => {
	return (
		<div className="home-informaticon">
			<div className="home-info">
				<div className="home-title">Info</div>
				{/* Link to FAQ page */}
				<a className="list">
					<i className="icon-faq" />
					FAQ
				</a>
				{/* Link to How to deposit page */}
				<a className="list">
					<i className="icon-deposit" />
					how to deposit
				</a>
				{/* Link to How to Withdraw page */}
				<a className="list">
					<i className="icon-withdraw" />
					how to Withdraw
				</a>
			</div>
			<div className="home-news">
				<div className="home-title">NEWS</div>
				{/* Display up to two news items */}
				<div className="inner">
					<a className="item">
						{/* News image */}
						<img
							src="https://goal123imgs.0814media.net/PRD/NewsManagement/b57bd289-d8e9-4f01-9165-2bf7cf2acd14.png"
							alt=""
						/>
						{/* Title */}
						<div className="title">
							<p>
								Messi khiến NHM Hồng Kông (Trung Quốc) bức xúc
								xúc xúc
							</p>
						</div>
					</a>
					<a className="item">
						{/* News image */}
						<img
							src="https://goal123imgs.0814media.net/PRD/NewsManagement/b57bd289-d8e9-4f01-9165-2bf7cf2acd14.png"
							alt=""
						/>
						{/* Title */}
						<div className="title">
							<p>
								Messi khiến NHM Hồng Kông (Trung Quốc) bức xúc
							</p>
						</div>
					</a>
					{/* Link to news page */}
					<button className="btn-more-text">
						More
						<i className="icon-dropdown" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default HomeInfo;
