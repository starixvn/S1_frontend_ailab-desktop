import React from "react";
import oneGamingBg from "../../styles/img/onegame/bg.jpg";

export default ({ btnBar, clickClose }) => {
	return (
		<div className="poker active">
			<button className="icon icon-close" onClick={clickClose} />
			<div className="pokerModule">
				<img src={oneGamingBg} />
				{btnBar}
			</div>
		</div>
	);
};
