import React from "react";
import { bannerImgUrl } from "../../config";

export default ({ btnBar, clickClose }) => {
	return (
		<div className="poker active">
			<button className="icon icon-close" onClick={clickClose} />
			<div className="pokerModule">
				<img
					src={`${bannerImgUrl}/desktop/img/onegame/bg.jpg`}
					alt="One Gaming"
				/>
				{btnBar}
			</div>
		</div>
	);
};
