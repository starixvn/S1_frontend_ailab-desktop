import React from "react";

const HomeApp = () => {
	return (
		<div>
			<div className="home-app">
				<div className="app-content">
					<div className="app-title">
						<img
							className="app-title-icon"
							src="https://banner.goal123.org/desktop/img/home-page/goal123-appicon.png"
							alt=""
						/>
						<div className="app-title-text">
							<div className="text">
								<span>Great Games</span>
								<span>on all devices</span>
							</div>
							<div className="text">
								<span>NEW</span>
								<img
									className="brand"
									src="https://banner.goal123.org/desktop/img/home-page/goal123-brand.png"
									alt=""
								/>
								<span>APP</span>
							</div>
						</div>
					</div>
					<span>
						Sign up today for never ending rewards, promotion and
						lots of freebies.
					</span>
					<div className="app-qrcode">
						<div className="app-item">
							<div className="qr">
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/QR_code_of_Chinese_Wikipedia_main_page_20131019.svg/1200px-QR_code_of_Chinese_Wikipedia_main_page_20131019.svg.png"
									alt=""
								/>
							</div>
							<button
								className="btn-app"
								style={{ cursor: "default" }}>
								<i className="icon-android" />
								Android
							</button>
							<a className="instructions" href="#">
								Instructions
							</a>
						</div>
						<div className="app-item">
							<div className="qr">
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/QR_code_of_Chinese_Wikipedia_main_page_20131019.svg/1200px-QR_code_of_Chinese_Wikipedia_main_page_20131019.svg.png"
									alt=""
								/>
							</div>
							<button
								className="btn-app"
								style={{ cursor: "default" }}>
								<i className="icon-apple" />
								Apple iOS
							</button>
							<a className="instructions" href="#">
								Instructions
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeApp;
