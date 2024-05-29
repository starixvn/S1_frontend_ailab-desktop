import React, { useState } from "react";
import useClickItem from "./hooks/useClickItem";
import productList from "../../datas/productList";

const VgamingLink = () => {
	const [displayVgaming, setDisplayVgaming] = useState(true);

	const { clickHomeItem } = useClickItem();

	if (!displayVgaming) {
		return null;
	}
	return (
		<div className="eventLink vgaming" style={{ cursor: "pointer" }}>
			<button
				className="icon icon-close"
				onClick={() => setDisplayVgaming(false)}
			/>
			<img
				onClick={() => clickHomeItem(productList.sabaClub)}
				alt="vgaming-link"
				src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/vgaming.gif`}
			/>
		</div>
	);
};

export default VgamingLink;
