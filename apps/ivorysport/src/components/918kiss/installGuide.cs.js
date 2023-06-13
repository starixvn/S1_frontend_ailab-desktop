import React from "react";
import { bannerImgUrl } from "../../config";

export default ({ displayText }) => (
	<div className="installGuide">
		{displayText}
		<div>
			<img src={`${bannerImgUrl}/desktop/img/918/cs/Help_01.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/cs/Help_02.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/cs/Help_03.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/cs/Help_04.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/cs/Help_05.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/cs/Help_06.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/cs/Help_07.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/cs/Help_08.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/cs/Help_09.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/cs/Help_10.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/cs/Help_11.png`} />
		</div>
	</div>
);
