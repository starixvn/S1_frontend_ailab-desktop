import React from "react";

import BannerImg from "../../styles/img/esports/banner.jpg";
import item from "../../styles/img/esports/item.png";
import title from "../../styles/img/esports/title.png";
import glow from "../../styles/img/esports/glow.png";

const EsportBanner = () => {
	return (
		<div className="aniBanner">
			<img src={BannerImg} alt="esportBanner-img" />

			<div className="items">
				<img src={item} alt="" />
				<img src={title} alt="" />
				<img src={glow} alt="" />
			</div>
		</div>
	);
};

export default EsportBanner;
