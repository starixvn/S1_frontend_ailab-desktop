import React, { useContext } from "react";
import { loadingContext } from "./context";

export default () => {
	const { loading } = useContext(loadingContext);
	return loading ? (
		<div id="Loading" className="active">
			<div className="container">
				<div className="cube">
					<div className="sides">
						<div className="top" />
						<div className="right" />
						<div className="bottom" />
						<div className="left" />
						<div className="front" />
						<div className="back" />
					</div>
				</div>
				<h1 />
				<div className="text">Loading...</div>
			</div>
		</div>
	) : null;
};
