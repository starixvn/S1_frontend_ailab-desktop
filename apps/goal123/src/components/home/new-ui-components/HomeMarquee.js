import React from "react";

const HomeMarquee = () => {
	return (
		<div id="Marquee">
			<div className="home-marquee">
				<i className="icon-speaker" />
				<div className="marquee-run">
					<a href="#">
						IMPORTANT!!! Local Transfer Bank Account Replacement!!!
					</a>
					<a href="#">
						本公司希望借此机会提醒各位尊贵的客户，恳请频繁重置您的密码以确保您的帐户安全。
					</a>
					<a href="#">
						本公司希望借此机会提醒各位尊贵的客户，恳请频繁重置您的密码以确保您的帐户安全。
					</a>
				</div>
				<button
					className="btn-info"
					onClick={() => alert("Button clicked!")}>
					More
				</button>
			</div>
		</div>
	);
};

export default HomeMarquee;
