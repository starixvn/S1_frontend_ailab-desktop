import React from "react";

// 暫時未啟用
const TeachingBar = () => {
	return (
		<div className="teachingbar">
			<div className="teachingbar-deposit">
				<img
					className="teachingbar-deposit-icon"
					src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/wallet.png`}
					alt=""
				/>
				<div>How To Deposit</div>
				<img
					className="play-btn"
					src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/play.png`}
					alt=""
				/>
			</div>
			<div className="teachingbar-withdrawal">
				<img
					className="teachingbar-withdrawal-icon"
					src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/withdrawal.png`}
					alt=""
				/>
				<div>How To Withdraw</div>
				<img
					className="play-btn"
					src="https://banner.0814media.net/desktop/img/4.0/play.png"
					alt=""
				/>
			</div>
			<div className="teachingbar-faq">
				<img
					className="teachingbar-faq-icon"
					src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/faq.png`}
					alt=""
				/>
				<div>Frequently Asked Questions</div>
				<img
					className="play-btn"
					src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/play.png`}
					alt=""
				/>
			</div>
		</div>
	);
};

export default TeachingBar;
