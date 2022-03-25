import React from "react";
import { bannerImgUrl } from "../../config";

export default ({ linePayLink, langId, clickClose }) => {
	return (
		<div className="linepop">
			<i className="icon icon-close" onClick={clickClose} />
			<a href={linePayLink}>
				<img
					src={`${bannerImgUrl}/desktop/img/line/line-${
						langId === "th" ? "th" : "en"
					}.jpg`}
					alt=""
				/>
			</a>
		</div>
	);
};
