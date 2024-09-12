import React, { useContext } from "react";
import { userInfoContext, popBoxContext } from "./context";
import config from "../../config";
// import path from "../../router";

// eslint-disable-next-line react/prop-types
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
					// TODO: 2024.9.13先緊急導轉首頁
					// href={`/${userInfo.langId}/${path.appDownload.root}`}>
					href={`/${userInfo.langId}`}
				>
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
