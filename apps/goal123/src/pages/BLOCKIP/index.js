import React from "react";

export default () => {
	try {
		setInterval(() => {
			document.location.href = window?.location.origin;
		}, 30000);
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error("BlockIP Error", e);
	}
	return (
		<div className="content">
			<div className="content-left">
				<div>
					<img
						className="logo"
						src="https://banner.goal123.org/desktop/img/logo.png"
						alt="logo"
					/>
					<div className="title">ACCESS RESTRICTED</div>
				</div>
				<div className="content-item">
					<div>
						<div className="text">
							<span>Kính gửi Quý khách hàng,:</span>
							Xin thông báo web bạn truy cập đang bị chặn bởi vị
							trí truy cập.Vui lòng liên hệ hỗ trợ trực tuyến 24/7
							để biết thêm thông tin.
						</div>
						<div className="flag vn" />
					</div>
					<a href="https://direct.lc.chat/12171870/">Liên Hệ</a>
					<a
						href="https://t.me/Goal123csd"
						target="_blank"
						rel="noreferrer"
					>
						Liên Hệ Telegram
					</a>
				</div>
				<div className="content-item">
					<div>
						<div className="text">
							<span>Dear Valued Customers:</span>
							The page that you are trying to access has been
							restricted in this location.We apologize for the
							inconvenience. Please contact customer support for
							more details. Thank you for your utmost
							understanding.
						</div>
						<div className="flag en" />
					</div>
					<a href="https://direct.lc.chat/12171870/">Live Chat</a>
					<a
						href="https://t.me/Goal123csd"
						target="_blank"
						rel="noreferrer"
					>
						Telegram Contact
					</a>
				</div>
			</div>
			{/* <div className="content-right">
      <img className="character" src="img/character.png" alt="">
    </div>  */}
		</div>
	);
};
