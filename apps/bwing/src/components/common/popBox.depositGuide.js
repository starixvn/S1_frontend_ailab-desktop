import React from "react";
import config from "../../config";
import useClickOutside from "../hook/useClickOutSide";

export default ({ onClickClose }) => {
	const videoSourceConfig = `${config.t_and_cURL}/SiteSkin/${config.siteName}/Static/images/How_To_Deposit.mp4`;

	const videoRef = useClickOutside(() => {
		onClickClose();
	});

	return (
		<div id="popup" className="active">
			<div style={{ width: "60%", height: "70%" }}>
				<div className="icon icon-close" onClick={onClickClose} />
				<video
					ref={videoRef}
					width="100%"
					height="100%"
					autoPlay
					controls>
					<source src={videoSourceConfig} type="video/mp4" />
					<track
						label="How to deposit"
						src={videoSourceConfig}
						kind="captions"
					/>
				</video>
			</div>
		</div>
	);
};
