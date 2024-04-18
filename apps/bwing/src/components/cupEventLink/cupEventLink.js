import React, { useContext, useState } from "react";
import { navigate } from "gatsby";
import { userInfoContext } from "../common/context";
import { bannerImgUrl } from "../../config";
import path from "../../router";

const CupEventLink = () => {
	const { userInfo } = useContext(userInfoContext);
	const [display, setDisplay] = useState(true);

	if (!display) return null;

	return (
		<div className="eurocup-gif">
			<button
				className="icon-close-primary"
				onClick={() => setDisplay(false)}
			/>
			<button
				onClick={() =>
					navigate(`/${userInfo.langId}/${path.euroCup.root}`)
				}
			>
				<img
					className=""
					src={`${bannerImgUrl}/desktop/img/event/eurocup/euro-gif.webp`}
					alt="euro-gif"
				/>
			</button>
		</div>
	);
};

export default CupEventLink;
