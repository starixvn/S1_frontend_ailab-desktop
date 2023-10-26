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
				<button className="icon-close-primary" onClick={onClickClose} />
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={`/${userInfo.langId}/${path.appDownload.root}`}>
					<img
						src={`${config.bannerImgUrl}/desktop/img/4.0/nonlogin/750x350_popup.jpg`}
						alt="Official Announce"
						onClick={() => setPopBox({ isOpen: false })}
					/>
				</a>
			</div>
		</div>
	);
};
