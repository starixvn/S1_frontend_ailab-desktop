import React from "react";
import { bannerImgUrl } from "../../config";

export default ({ displayText }) => (
	<div className="installGuide">
		{displayText}
		<div>
			<img src={`${bannerImgUrl}/desktop/img/918/th/Help_01.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/th/Help_02.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/th/Help_03.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/th/Help_04.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/th/Help_05.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/th/Help_06.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/th/Help_07.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/th/Help_08.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/th/Help_09.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/th/Help_10.png`} />
			<img src={`${bannerImgUrl}/desktop/img/918/th/Help_11.png`} />
		</div>
	</div>
);
