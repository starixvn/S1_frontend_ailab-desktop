import React, { useContext } from "react";
import LoadingImg from "../../styles/img/loading_star.png";
import { loadingContext } from "./context";

export default () => {
	const { loading } = useContext(loadingContext);
	return loading ? (
		<div className="loading">
			<div>
				<img src={LoadingImg} />
				<img src={LoadingImg} />
				<img src={LoadingImg} />
				<img src={LoadingImg} />
				<img src={LoadingImg} />
			</div>
		</div>
	) : null;
};
