import React, { useContext, useState } from "react";
import { navigate } from "gatsby";
import { bannerImgUrl } from "../../config";
import path from "../../router";
import { userInfoContext } from "../common/context";

const CupEventLink = () => {
	const { userInfo } = useContext(userInfoContext);
	const [display, setDisplay] = useState(true);

	if (!display) return null;

	return (
		<div className="eventLink eurocup">
			<button
				className="icon icon-close"
				onClick={() => setDisplay(false)}
			/>
			<button
				onClick={() =>
					navigate(`/${userInfo.langId}/${path.euroCup.root}`)
				}>
				<img
					src={`${bannerImgUrl}/desktop/img/event/eurocup/eurocup-icon.webp`}
					alt=""
				/>
			</button>
		</div>
	);
};

export default CupEventLink;
