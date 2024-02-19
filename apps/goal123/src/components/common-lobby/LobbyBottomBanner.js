import React, { useContext } from "react";
import { navigate } from "gatsby";
import { userInfoContext } from "../common/context";
import { bannerImgUrl } from "../../config";
import path from "../../router";

const LobbyBottomBanner = () => {
	const { userInfo } = useContext(userInfoContext);

	const handleClickButton = () => {
		navigate(`/${path.promotion.root}`);
	};

	return (
		<div className="lobby-bottom-banner" onClick={handleClickButton}>
			{userInfo.langId === "en" ? (
				<img
					src={`${bannerImgUrl}/desktop/img/home-page/lobbybanner/bottom-ad-en.jpg`}
				/>
			) : (
				<img
					src={`${bannerImgUrl}/desktop/img/home-page/lobbybanner/bottom-ad-vn.jpg`}
				/>
			)}
		</div>
	);
};

export default LobbyBottomBanner;
