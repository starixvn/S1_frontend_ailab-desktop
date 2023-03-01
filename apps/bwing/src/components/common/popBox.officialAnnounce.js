import React, { useContext } from "react";
import { userInfoContext, popBoxContext } from "./context";
import config from "../../config";
import path from "../../router";

export default ({ onClickClose }) => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	return (
		<div className="pop">
			<div className="friend active">
				<button className="icon icon-close" onClick={onClickClose} />
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={`/${userInfo.langId}/${path.appDownload.root}`}>
					<img
						src={`${config.bannerImgUrl}/desktop/img/nonlogin/750x350_bwing_${userInfo.langId}.jpg`}
						alt="Official Announce"
						onClick={() => setPopBox({ isOpen: false })}
					/>
				</a>
			</div>
		</div>
	);
};
