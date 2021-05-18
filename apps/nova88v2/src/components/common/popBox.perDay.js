import React, { useContext } from "react";
import { Link } from "@reach/router";
import path from "../../router";
import { userInfoContext } from "./context";
import config from "../../config";

export default ({ onClickClose }) => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<div className="friend active">
			<button className="icon icon-close" onClick={onClickClose} />
			<img
				style={{ maxWidth: "900px" }}
				src={require("../../styles/img/indexCenterBanner.jpg")}
				alt="per-day-welcome"
			/>
		</div>
	);
};
