import React from "react";
import { bannerImgUrl } from "../../config";

export default ({ displayText }) => (
	<div className="installGuide">
		{displayText}
		<div>
			<img src={`${bannerImgUrl}/desktop/img/918/en/Help_01.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/en/Help_02.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/en/Help_03.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/en/Help_04.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/en/Help_05.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/en/Help_06.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/en/Help_07.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/en/Help_08.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/en/Help_09.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/en/Help_10.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/en/Help_11.png`} />
		</div>
	</div>
);
