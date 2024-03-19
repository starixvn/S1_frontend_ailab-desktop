import React from "react";

const AppSection = () => {
	return (
		<div className="ambassador-app">
			<div className="ambassador-app-cover">
				<div className="subtitle">
					<img
						src="https://banner.goal123.org/desktop/img/ambassador/appicon.png"
						alt=""
					/>
					<div>
						Download App
						<div>
							<span>Great Games</span>
							On ALL Devices
						</div>
					</div>
				</div>
				<img
					src="https://banner.goal123.org/desktop/img/ambassador/app.png"
					alt=""
				/>
			</div>
			<div className="ambassador-app-info">
				<div className="ambassador-app-info-item">
					<img
						src="https://banner.goal123.org/desktop/img/ambassador/icon-vip.png"
						alt=""
					/>
					<div>
						exclusives VIP
						<span>VIP Lounge with exclusives</span>
					</div>
				</div>
				<div className="ambassador-app-info-item">
					<img
						src="https://banner.goal123.org/desktop/img/ambassador/icon-speedy.png"
						alt=""
					/>
					<div>
						Speedy transactions
						<span>
							Enjoy faster and more convenient transaction
							payments
						</span>
					</div>
				</div>
				<div className="ambassador-app-info-item">
					<img
						src="https://banner.goal123.org/desktop/img/ambassador/icon-bouns.png"
						alt=""
					/>
					<div>
						Attractive bonus
						<span>
							welcome bonus, daily reload, unlimited rebate
						</span>
					</div>
				</div>
				<div className="ambassador-app-info-item">
					<img
						src="https://banner.goal123.org/desktop/img/ambassador/icon-referral.png"
						alt=""
					/>
					<div>
						referral made easy
						<span>share your referral link and earn money</span>
					</div>
				</div>
			</div>
			<div className="ambassador-app-qrcode">
				<div className="ambassador-app-qrcode-item">
					<div className="qr">
						<svg
							shapeRendering="crispEdges"
							height="135"
							width="135"
							viewBox="0 0 37 37">
							<path fill="#FFFFFF" d="M0,0 h37v37H0z" />
							<path fill="#000000" />
						</svg>
					</div>
					<div className="qr-button">
						<img
							src="https://banner.goal123.org/desktop/img/ambassador/android.png"
							alt=""
						/>
						Android
					</div>
					<a href="appdownload.html"> Instructions </a>
				</div>
				<div className="ambassador-app-qrcode-item">
					<div className="qr">
						<svg
							shapeRendering="crispEdges"
							height="135"
							width="135"
							viewBox="0 0 37 37">
							<path fill="#FFFFFF" d="M0,0 h37v37H0z" />
							<path fill="#000000" />
						</svg>
					</div>
					<div className="qr-button">
						<img
							src="https://banner.goal123.org/desktop/img/ambassador/apple.png"
							alt=""
						/>
						Android
					</div>
					<a href="appdownload.html"> Instructions </a>
				</div>
			</div>
		</div>
	);
};

export default AppSection;
