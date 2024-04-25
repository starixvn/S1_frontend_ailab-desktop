import React from "react";

const LobbyBanner = ({ src }) => {
	return (
		<div className="lobby-top-banner">
			<img src={src} alt="main-lobby-banner" />
		</div>
	);
};

export default LobbyBanner;
